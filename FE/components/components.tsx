import * as React from 'react';
import axios from 'axios';

// Define the types based on your provided response structure
type Song = {
    _id: string;
    title: string;
    creator: string;
    duration: string;
    storageURL: string;
    image: string;
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

// const artists = [
//     {
//         id: '1',
//         title: 'Đen Vâu',
//         image: 'https://vtv1.mediacdn.vn/zoom/640_400/2021/5/14/2j3a9577-editc-1620944229636282182804-crop-16210641534952132081719.jpg'

//     },
//     {
//         id: '2',
//         title: 'Hà Anh Tuấn',
//         image: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/06/27/e/8/8/5/1530074198530_600.jpg'
//     },
//     {
//         id: '3',
//         title: 'Tuấn Ngọc',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Tuan_Ngoc.jpg'
//     },
//     {
//         id: '4',
//         title: 'Mozart',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/195px-Wolfgang-amadeus-mozart_1.jpg'
//     },
//     {
//         id: '5',
//         title: 'Trịnh Trung Kiên',
//         image: 'https://yt3.googleusercontent.com/ytc/APkrFKYunKRAH-WlHsD2rB_L0Qy_lu1sHpdSV9-Bphlr=s900-c-k-c0x00ffffff-no-rj'
//     },
//     {
//         id: '6',
//         title: 'Thịnh Suy',
//         image: 'https://static.wikia.nocookie.net/producerviet/images/1/1a/Th%E1%BB%8Bnh_Suy.jpeg/revision/latest?cb=20221201113323'
//     },
// ];

// const songs = [
//     {
//         id: '1',
//         title: 'Đưa nhau đi trốn',
//         image: 'https://i1.sndcdn.com/artworks-000141815077-mm8lki-t500x500.jpg',
//         playlist: 'Relaxing Love Rap Trending',
//         artist: 'Đen Vâu',
//     },
//     {
//         id: '2',
//         title: 'Nấu ăn cho em',
//         image: 'https://i1.sndcdn.com/artworks-vBDzuUBF3Q2NET38-elAMvA-t500x500.jpg',
//         playlist: 'Relaxing Love Rap',
//         artist: 'Đen Vâu',
//     },
//     {
//         id: '3',
//         title: 'Ai muốn nghe không',
//         image: 'https://i1.sndcdn.com/artworks-lShHCeaAcZ6Wz3Ay-57FURQ-t500x500.jpg',
//         playlist: 'Relaxing Rap',
//         artist: 'Đen Vâu',
//     },
//     {
//         id: '4',
//         title: 'Tháng tư là lời nói dối của em',
//         image: 'https://i1.sndcdn.com/artworks-lE9pHuzXI8PY-0-t500x500.jpg',
//         playlist: 'Ballad Love Trending',
//         artist: 'Hà Anh Tuấn',
//     },
//     {
//         id: '5',
//         title: 'Thành phố sương',
//         image: 'https://i1.sndcdn.com/artworks-000641928511-x06icu-t500x500.jpg',
//         playlist: 'Relaxing Ballad',
//         artist: 'Hà Anh Tuấn',
//     },
//     {
//         id: '6',
//         title: 'Chỉ Còn Những Mùa Nhớ',
//         image: 'https://i1.sndcdn.com/artworks-H4576JQHXKOOZqvz-Epinig-t500x500.jpg',
//         playlist: 'Ballad Love',
//         artist: 'Hà Anh Tuấn',
//     },
//     {
//         id: '7',
//         title: 'Riêng một góc trời',
//         image: 'https://i1.sndcdn.com/artworks-000487670628-q84tbq-t500x500.jpg',
//         playlist: 'Relaxing Bolero',
//         artist: 'Tuấn Ngọc',
//     },
//     {
//         id: '8',
//         title: 'Khúc thụy du',
//         image: 'https://i1.sndcdn.com/artworks-000072576869-g1fspu-t500x500.jpg',
//         playlist: 'Bolero Love Trending',
//         artist: 'Tuấn Ngọc',
//     },
//     {
//         id: '9',
//         title: 'Như đã dấu yêu',
//         image: 'https://i1.sndcdn.com/artworks-000401848656-dbivu6-t240x240.jpg',
//         playlist: 'Bolero Love',
//         artist: 'Tuấn Ngọc',
//     },
//     {
//         id: '10',
//         title: 'Requiem',
//         image: 'https://i1.sndcdn.com/artworks-000016755322-fg6tp1-t500x500.jpg',
//         playlist: 'Classical Trending',
//         artist: 'Mozart',
//     },
//     {
//         id: '11',
//         title: 'Eine kleine Nachtmusik',
//         image: 'https://i1.sndcdn.com/artworks-000105270327-uy9mak-t500x500.jpg',
//         playlist: 'Classical',
//         artist: 'Mozart',
//     },
//     {
//         id: '12',
//         title: 'Le nozze di Figaro',
//         image: 'https://i1.sndcdn.com/artworks-000090554324-e1s6p6-t500x500.jpg',
//         playlist: 'Classical',
//         artist: 'Mozart',
//     },
//     {
//         id: '13',
//         title: 'Tập thể dục',
//         image: 'https://i.scdn.co/image/ab67616d0000b273859a1df5ea0336da6ca6ae50',
//         playlist: 'Ballad Rap',
//         artist: 'Trịnh Trung Kiên',
//     },
//     {
//         id: '14',
//         title: 'Mẹ chẳng có gì',
//         image: 'https://event.mediacdn.vn/257767050295742464/image/hot14/2020/12/23/avafit-1608690071656345701024.png',
//         playlist: 'Ballad Love Trending',
//         artist: 'Trịnh Trung Kiên',
//     },
//     {
//         id: '15',
//         title: 'Bên trái',
//         image: 'https://i1.sndcdn.com/artworks-Cc9HbdpJ3xBd-0-t500x500.jpg',
//         playlist: 'Love Rap',
//         artist: 'Trịnh Trung Kiên',
//     },
//     {
//         id: '16',
//         title: 'Nghe em',
//         image: 'https://i1.sndcdn.com/artworks-000611337106-4h1quw-t500x500.jpg',
//         playlist: 'Ballad Love Trending',
//         artist: 'Thịnh Suy',
//     },
//     {
//         id: '17',
//         title: 'Chuyện rằng',
//         image: 'https://i1.sndcdn.com/artworks-pTWOsozj4ugBoELE-PLAOmw-t500x500.jpg',
//         playlist: 'Relaxing Love',
//         artist: 'Thịnh Suy',
//     },
//     {
//         id: '18',
//         title: 'Thay đổi',
//         image: 'https://i1.sndcdn.com/artworks-R5CxLdE9Ei74-0-t500x500.jpg',
//         playlist: 'Relaxing Ballad',
//         artist: 'Thịnh Suy',
//     },
// ];

export {categories, playlists}