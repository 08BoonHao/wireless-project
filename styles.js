import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  adminLoginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%', // Set a fixed width for all bottom buttons
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  adminLoginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust opacity here (0.5 is 50% opacity)
    zIndex: 1, // Ensure the overlay is above the background image
  },  
  bookBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    elevation: 2, // Add shadow (Android)
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.2, // Shadow opacity
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowRadius: 4, // Shadow radius
  },
  bookInfo: {
    flex: 1,
  },
  booklist:{
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
  },      
  bottomBar: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomBarCart:{
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  button: {
    fontSize: 16,
  },
  button1:{
    fontSize: 14,
  },
  button2:{
    flexDirection: 'row',
  },      
  buttonCart:{
    position: 'absolute',
    fontSize: 14,
  },      
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Align items evenly between buttons
  },
  buttonContainerCart: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },  
  buttonContent: {
    alignItems: 'center',
  },  
  buttonView:{
    paddingTop: 10,
  },  
  buttonWrapper: {
    width: '49%', // Adjust as needed for spacing between buttons
    marginBottom: 20, // Adjust as needed for spacing between buttons
  },
  cartCountText: {
    position: 'absolute',
    bottom: 10, // Adjust the bottom position as needed
    left: 10, // Adjust the left position as needed
    fontSize: 24,
    backgroundColor: 'black',
    color: 'white',
  },    
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move buttonContainer upwards
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 30,
  },
  container1: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background
    paddingTop: 20, // Add padding to the top of the content
  },  
  container2: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background
    padding: 20, // Add padding to the top of the content
  },    
  containerAdminLogin: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerContactUs: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },  
  containerSearch: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background
    paddingTop: 10, // Add padding to the top of the content
  },
  containerSearchBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },  
  emptyMessage: {
    fontSize: 30,
    color: '#888', // Gray color
    textAlign: 'center',
    marginTop: 20, // Add margin to space it from the list or container
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },      
  headerStyleOption:{  
    headerTitleAlign:'center',
    headerStyle: {
      backgroundColor: '#212990',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',

    },
  },
  heading: {
    fontSize: 36,
    marginBottom: 20,
  },
  icon:{
    flex: 0.5,
  },      
  image: {
    width: 70, // Adjust the image size as needed
    height: 70, // Adjust the image size as needed
    marginTop: 10, // Space between the button and the image
    borderRadius: 10,
  },
  image1: {
    width: 80,
    height: 150,
    marginRight: 12,
  },  
  imageCart: {
    width: 80,
    height: 120,
    alignSelf: 'center',
    marginRight: 12,
  },  
  imageAdminView: {
    width: 256,
    height: 256,
    alignSelf: 'center',
    borderRadius: 32,
  },  
  imageView: {
    width: 192,
    height: 256,
    alignSelf: 'center',
  },  
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },  
  itemTitle: {
    fontSize: 18,
    fontWeight: '600', // Medium bold
    color: '#333', // Dark gray color
  },    
  itemSubtitle: {
    fontSize: 16,
    color: '#666', // Gray color
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
  },
  modalButtonClose: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },  
  modalErrorText: {
    color: 'red',
    marginBottom: 10,
  },  
  modalSuccessText: {
    color: 'green', // Success message text color
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue', // Title text color
  },    
  MultilineTextInput:{
    fontSize: 18,
    color: 'black',
  },      
  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },  
  searchBar: {
    backgroundColor: '#FFFFFF',
    margin: 5,
    borderRadius: 8,
    width: 160,
    height: 40,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    margin: 5,
    borderRadius: 8,
    height: 40,
    width: 85,
    textAlign: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  textarea: {
    width: '100%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },    
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },    
  TextInput: {
    fontSize: 24,
    color: '#000099',
  },  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10, // Reduce the margin between the title and buttons
    color: 'white',
  },
  titleContactUs: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

 export default styles; 