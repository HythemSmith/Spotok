import * as React from 'react';
import axios from 'axios';

// Define the types based on your provided response structure
type Song = {
    _id: string;
    title: string;
    creator: string; // ten artist
    duration: string;
    storageURL: string;
    image: string;
};

type Video = {
    _id: string;
    title: string;
    creator: string; // ten artist
    duration: string;
    storageURL: string;
}

type Artist = {
    _id: string;
    title: string; // Changed from userName to title
    image: string; // Changed from avatar to image
};

export const songs: Song[] = [];
export const artists: Artist[] = [];

export const fetchDataFromBackend = async () => {
    try {
        const response = await axios.get('https://spotok.onrender.com/homebase'); // Replace with your API endpoint
        const responseData = response.data.responseData;

        responseData.forEach((item: any) => {
            const artist: Artist = {
                _id: item.artist._id,
                title: item.artist.userName, // Assigning userName to title
                image: item.artist.avatar // Assigning avatar to image
            };
            artists.push(artist);
            console.log()
            item.songs.forEach((song_item: any) => {
                const song: Song = {
                    _id: song_item._id,
                    title: song_item.title,
                    creator: item.artist.userName,
                    duration: song_item.duration,
                    storageURL: song_item.storageURL,
                    image: song_item.coverURL
                }
                songs.push(song)
            })

        });

        return { songs, artists };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const categories = [
    {
        id: '1',
        title: 'Music',
        next: '/(tabs)/Playlist',
    },
    {
        id: '2',
        title: 'Podcast',
        next: '/user/Podcast',
    },
    {
        id: '3',
        title: 'Short',
        next: '/user/Short',
    },
    {
        id: '4',
        title: 'Trending',
        next: '/user/Songlist',
        image: 'https://cdn-icons-png.flaticon.com/512/8675/8675807.png'
    },

];

const playlists = [
    {
        id: '1',
        title: 'Relaxing',
        image: 'https://i1.sndcdn.com/artworks-l1hz5GC4MM04y358-5cqmWQ-t500x500.jpg',
        next:'Songlist',
    },
    {
        id: '2',
        title: 'Ballad',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        next:'Songlist',
    },
    {
        id: '3',
        title: 'Bolero',
        image: 'https://i1.sndcdn.com/artworks-000036836626-ba57tu-t500x500.jpg',
        next:'Songlist',
    },
    {
        id: '4',
        title: 'Classical',
        image: 'https://i.scdn.co/image/ab67616d0000b27300b21b2b6d41893ed6c6b840',
        next:'Songlist',
    },
    {
        id: '5',
        title: 'Love',
        image: 'https://ratedrnb.com/?attachment_id=14386',
        next:'Songlist',
    },
    {
        id: '6',
        title: 'Rap',
        image: 'https://i.redd.it/7r3d9nlxyd991.png',
        next:'Songlist',
    },
];

export {categories, playlists}