import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from datetime import datetime
import json

DB = 'android/app/src/main/assets/abcde.sqlite'

def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'name': row[1],
        'category': row[2],
        'image': row[3],
        'wishlist': row[4],
        'cart': row[5],
        'orders': row[6],
        'author': row[7],
    }

    return row_dict


app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@app.route('/')
def sessions():
    return render_template('index.html')


@socketio.on('connect', namespace='/chat')
def handle_connect_chat():
    print('connected')


@socketio.on('web_client_connected', namespace='/chat')
def handle_client_connected_chat(json):
    print("Web client connected, status: " + str(json['connected']))


@socketio.on('contact_us_message', namespace='/chat')
def handle_contact_us_message(data):
    user_name = data['name']  # Use 'name' as the field name
    question = data['question']
    email = data['email']
    contact_number = data['contactNumber']

    # Handle the contact form data here (you can customize this part)
    # For demonstration purposes, we'll emit the message back to all clients

    timestamp = str(datetime.now())
    response_data = {
        'timestamp': timestamp,
        'name': user_name,  # Change 'sender' to 'name'
        'question': question,
        'email': email,
        'contactNumber': contact_number,
    }

    # Emit the message to all connected clients
    emit('contact_us_response', json.dumps(
        response_data), namespace='/chat', broadcast=True)

@app.route('/api/booklist', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('SELECT * FROM booklist ORDER BY name')
    rows = cursor.fetchall()

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/booklist/<int:book>', methods=['GET'])
def show(book):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM booklist WHERE id=?', (str(book),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

@app.route('/api/booklist', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_member = (
        request.json['name'],
        request.json['category'],
        request.json['image'],
        request.json['wishlist'],
        request.json['cart'],
        request.json['orders'],
        request.json['author'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO booklist(name,category,image,wishlist,cart,orders,author)
        VALUES(?,?,?,?,?,?,?)
    ''', new_member)

    member_id = cursor.lastrowid

    db.commit()

    response = {
        'id': member_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/booklist/<int:book>', methods=['PUT'])
def update(book):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != book:
        abort(400)

    update_member = (
        request.json['name'],
        request.json['category'],
        request.json['image'],
        request.json['wishlist'],
        request.json['cart'],
        request.json['orders'],
        request.json['author'],
        str(book),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE booklist SET
            name=?,category=?,image=?,wishlist=?,cart=?,orders=?,author=?
        WHERE id=?
    ''', update_member)

    db.commit()

    response = {
        'id': book,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/booklist/<int:book>', methods=['DELETE'])
def delete(book):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != book:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM booklist WHERE id=?', (str(book),))

    db.commit()

    response = {
        'id': book,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/booklist/add_to_wishlist/<int:book>', methods=['PUT'])
def add_to_wishlist(book):
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('SELECT * FROM booklist WHERE id=?', (str(book),))
    row = cursor.fetchone()

    if row:
        current_wishlist_status = row[4]  # Assuming 'wishlist' is at index 4 in your database
        if current_wishlist_status == 'yes':
            db.close()
            return jsonify({'message': 'Book is already in the wishlist'}), 400
        else:
            cursor.execute('UPDATE booklist SET wishlist=? WHERE id=?', ('yes', str(book),))
            db.commit()
            db.close()
            return jsonify({'message': 'Added to wishlist successfully'}), 201
    else:
        db.close()
        return jsonify({'message': 'Book not found'}), 404
    
@app.route('/api/booklist/add_to_cart/<int:book>', methods=['PUT'])
def add_to_cart(book):
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('SELECT * FROM booklist WHERE id=?', (str(book),))
    row = cursor.fetchone()

    if row:
        current_cart_status = row[5]  # Assuming 'wishlist' is at index 4 in your database
        if current_cart_status == 'yes':
            db.close()
            return jsonify({'message': 'Book is already in the cart'}), 400
        else:
            cursor.execute('UPDATE booklist SET cart=? WHERE id=?', ('yes', str(book),))
            db.commit()
            db.close()
            return jsonify({'message': 'Added to cart successfully'}), 201
    else:
        db.close()
        return jsonify({'message': 'Book not found'}), 404
    
@app.route('/api/booklist/wishlist', methods=['GET'])
def get_wishlist_books():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM booklist WHERE wishlist=? ORDER BY name', ('yes',))
    rows = cursor.fetchall()
    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/booklist/cart', methods=['GET'])
def get_cart_books():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM booklist WHERE cart=? ORDER BY name', ('yes',))
    rows = cursor.fetchall()
    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/booklist/remove_from_wishlist/<int:book>', methods=['PUT'])
def remove_from_wishlist(book):
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('UPDATE booklist SET wishlist=? WHERE id=?', ('no', str(book),))
    db.commit()
    db.close()
    return jsonify({'message': 'Remove from wishlist successfully'}), 200

@app.route('/api/booklist/remove_from_cart/<int:book>', methods=['PUT'])
def remove_from_cart(book):
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('UPDATE booklist SET cart=? WHERE id=?', ('no', str(book),))
    db.commit()
    db.close()
    return jsonify({'message': 'Remove from cart successfully'}), 200

@app.route('/api/booklist/place_order', methods=['PUT'])
def place_order():
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('UPDATE booklist SET cart=?, orders=? WHERE cart=?', ('no', 'yes', 'yes',))
    db.commit()
    db.close()
    return jsonify({'message': 'Order made successfully'}), 200

@app.route('/api/booklist/orders', methods=['GET'])
def get_orders_books():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM booklist WHERE orders=? ORDER BY name', ('yes',))
    rows = cursor.fetchall()
    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/booklist/clear_history', methods=['PUT'])
def clear_history():
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('UPDATE booklist SET orders=? WHERE orders=?', ('no', 'yes',))
    db.commit()
    db.close()
    return jsonify({'message': 'Order history clear'}), 200

@app.route('/api/booklist/search/<string:text>', methods = ['GET'])
def search(text):
    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('SELECT * FROM booklist WHERE name LIKE ? ORDER BY name', ('%' + text + '%',))

    rows = cursor.fetchall()
    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    socketio.run(app, debug=True, host='0.0.0.0', port=port)