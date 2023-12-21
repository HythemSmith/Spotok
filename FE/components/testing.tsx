import axios from 'axios';

// Define the types based on your provided response structure
type Song = {
    _id: string;
    title: string;
    creator: string;
    duration: string;
    storageURL: string;
    coverURL: string;
};

type Artist = {
    _id: string;
    title: string; // Changed from userName to title
    image: string; // Changed from avatar to image
};

export const songs: Song[] = [];
export const artists: Artist[] = [];

export const fetchDataFromBackend = async () => {
    try {
        const response = await axios.get('https://spotok.onrender.com/homerandom'); // Replace with your API endpoint
        const responseData = response.data.responseData;

        responseData.forEach((item: any) => {
            const artist: Artist = {
                _id: item.artist._id,
                title: item.artist.userName, // Assigning userName to title
                image: item.artist.avatar // Assigning avatar to image
            };
            artists.push(artist);
            songs.push(...item.songs);
        });

        return { songs, artists };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
