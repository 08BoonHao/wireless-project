import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import io from 'socket.io-client';
import styles from '../styles';

const socket = io('http://10.0.2.2:5000/chat');

const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleSubmit = () => {
    // Initialize the errors object
    const validationErrors = {};

    // Validate that all fields are filled
    if (!name || !question || !email || !contactNumber) {
      validationErrors.allFields = 'All fields are required';
    }

    // Validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      validationErrors.email = 'Invalid email address';
    }

    // Validate phone number format (assuming a simple format with 10 digits)
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(contactNumber)) {
      validationErrors.contactNumber = 'Invalid phone number (10 digits required)';
    }

    // Update the errors state with the validation errors
    setErrors(validationErrors);

    // If there are validation errors, show the error modal
    if (Object.keys(validationErrors).length > 0) {
      setModalVisible(true);
      return;
    }

    
    const contactData = {
      name,
      question,
      email,
      contactNumber,
    };

    socket.emit('contact_us_message', contactData);

    // Show the success modal
    setSuccessModalVisible(true);
  };

  const resetForm = () => {
    setName('');
    setQuestion('');
    setEmail('');
    setContactNumber('');
    setErrors({});
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);

    // Only reset the form when the success modal is closed and there are no validation errors
    if (!Object.keys(errors).length) {
      resetForm(); // Call the resetForm function
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerContactUs}>
      <Text style={styles.titleContactUs}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Name or Username"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Question or Feedback"
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors({});
        }}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={(text) => {
          setContactNumber(text);
          setErrors({});
        }}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Validation Error Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        {/* Modal content */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Validation Errors</Text>
            {Object.keys(errors).map((key) => (
              <Text key={key} style={styles.modalErrorText}>
                {errors[key]}
              </Text>
            ))}
            <Pressable
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={handleSuccessModalClose}
      >
        {/* Modal content */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submission Successful</Text>
            <Text style={styles.modalSuccessText}>Thank you for your submission!</Text>
            <Pressable
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={handleSuccessModalClose}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ContactUsScreen;
