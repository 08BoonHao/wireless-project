import sqlite3
db = sqlite3.connect('abcde.sqlite')

db.execute('DROP TABLE IF EXISTS booklist')

db.execute('''CREATE TABLE booklist(
    id integer PRIMARY KEY,
    name text NOT NULL,
    category text NOT NULL,
    image text NOT NULL,
    wishlist text NOT NULL,
    cart text NOT NULL,
    orders text NOT NULL,
    author text NOT NULL
)''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Identity and Digital Communication: Concepts, Theories, Practices',
        '01', 'book1.jpg', 'no', 'no', 'no', 'Rob Cover')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('All of Programming',
        '01', 'book2.jpg', 'no', 'no', 'no', 'Andrew Hilton & Anne Bracy')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Chalk: The Art and Erasure of Cy Twombly',
        '02', 'book3.jpg', 'no', 'no', 'no', 'Joshua Rivkin')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Your Brain on Art: How the Arts Transform Us',
        '02', 'book4.jpg', 'no', 'no', 'no', 'Susan Magsamen & Ivy Ross')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('The Walking Dead: Compendium 1',
        '03', 'book5.jpg', 'no', 'no', 'no', 'Robert Kirkman')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Teenage Mutant Ninja Turtles: The Last Ronin',
        '03', 'book6.jpg', 'no', 'no', 'no', 'Kevin Eastman')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('The 48 Laws of Power',
        '04', 'book7.jpg', 'no', 'no', 'no', 'Robert Greene')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('The Bullet Journal Method: Track the Past, Order the Present, Design the Future',
        '04', 'book8.jpg', 'no', 'no', 'no', 'Ryder Carroll')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Problem-Solving and Decision Making Professional Level',
        '05', 'book9.jpg', 'no', 'no', 'no', 'CPA John Kimani & Dr. James Scott')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Psychology: The Science of Mind and Behaviour 8th Edition',
        '05', 'book10.jpg', 'no', 'no', 'no', 'Richard Gross')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('My Life in Full: Work, Family and Our Future',
        '06', 'book11.jpg', 'no', 'no', 'no', 'Indra Nooyi')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer',
        '06', 'book12.jpg', 'no', 'no', 'no', 'Kai Bird & Martin J. Sherwin')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Nintendo Video Game Designer Shigeru Miyamoto',
        '07', 'book13.jpg', 'no', 'no', 'no', 'Kari Cornell')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Deki: The Adventures of a Dog and a Boy in Tibet',
        '07', 'book14.jpg', 'no', 'no', 'no', 'George B. Schaller')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('The Little Teochew Cookbook',
        '08', 'book15.jpg', 'no', 'no', 'no', 'Eric Low')
''')

cursor.execute('''
    INSERT INTO booklist(name,category,image,wishlist,cart,orders, author)
    VALUES('Mom Unwritten Recipes: Main Courses',
        '08', 'book16.jpg', 'no', 'no', 'no', 'Joselyn Schmitt')
''')

db.commit()
db.close()