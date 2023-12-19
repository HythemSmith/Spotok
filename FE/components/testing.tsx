import axios from 'axios';

export const songs = []; // Exported songs array

export const fetchDataFromBackend = async () => {
  try {
    const response = await axios.get('http://localhost:3000/home');
    const responseData = response.data; // Access the 'data' property
    console.log(responseData)
    
    return songs; // Return the updated 'songs' array
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // or handle the error as needed
  }
};
