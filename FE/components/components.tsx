import * as React from 'react';

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

const artists = [
    {
        id: '1',
        title: 'Đen Vâu',
        image: 'https://vtv1.mediacdn.vn/zoom/640_400/2021/5/14/2j3a9577-editc-1620944229636282182804-crop-16210641534952132081719.jpg'

    },
    {
        id: '2',
        title: 'Hà Anh Tuấn',
        image: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/06/27/e/8/8/5/1530074198530_600.jpg'
    },
    {
        id: '3',
        title: 'Tuấn Ngọc',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Tuan_Ngoc.jpg'
    },
    {
        id: '4',
        title: 'Mozart',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/195px-Wolfgang-amadeus-mozart_1.jpg'
    },
    {
        id: '5',
        title: 'Trịnh Trung Kiên',
        image: 'https://yt3.googleusercontent.com/ytc/APkrFKYunKRAH-WlHsD2rB_L0Qy_lu1sHpdSV9-Bphlr=s900-c-k-c0x00ffffff-no-rj'
    },
    {
        id: '6',
        title: 'Thịnh Suy',
        image: 'https://static.wikia.nocookie.net/producerviet/images/1/1a/Th%E1%BB%8Bnh_Suy.jpeg/revision/latest?cb=20221201113323'
    },
];

const songs = [
    {
        id: '1',
        title: 'Đưa nhau đi trốn',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '1 5 6',
        artist: 'Đen Vâu',
    },
    {
        id: '2',
        title: 'Nấu ăn cho em',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '1 5 6',
        artist: 'Đen Vâu',
    },
    {
        id: '3',
        title: 'Ai muốn nghe không',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '1 6',
        artist: 'Đen Vâu',
    },
    {
        id: '4',
        title: 'Tháng tư là lời nói dối của em',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '2 5',
        artist: 'Hà Anh Tuấn',
    },
    {
        id: '5',
        title: 'Thành phố sương',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '1 2',
        artist: 'Hà Anh Tuấn',
    },
    {
        id: '6',
        title: 'Chỉ Còn Những Mùa Nhớ',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '2 5',
        artist: 'Hà Anh Tuấn',
    },
    {
        id: '7',
        title: 'Riêng một góc trời',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '1 3',
        artist: 'Tuấn Ngọc',
    },
    {
        id: '8',
        title: 'Khúc thụy du',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '3 5',
        artist: 'Tuấn Ngọc',
    },
    {
        id: '9',
        title: 'Như đã dấu yêu',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '3 5',
        artist: 'Tuấn Ngọc',
    },
    {
        id: '10',
        title: 'Requiem',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '4',
        artist: 'Mozart',
    },
    {
        id: '11',
        title: 'Eine kleine Nachtmusik',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '4',
        artist: 'Mozart',
    },
    {
        id: '12',
        title: 'Le nozze di Figaro',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '4',
        artist: 'Mozart',
    },
    {
        id: '13',
        title: 'Tập thể dục',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '2 6',
        artist: 'Trịnh Trung Kiên',
    },
    {
        id: '14',
        title: 'Mẹ chẳng có gì',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '2 5',
        artist: 'Trịnh Trung Kiên',
    },
    {
        id: '15',
        title: 'Bên trái',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '5 6',
        artist: 'Trịnh Trung Kiên',
    },
    {
        id: '16',
        title: 'Nghe em',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '2 5',
        artist: 'Thịnh Suy',
    },
    {
        id: '17',
        title: 'Chuyện rằng',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '1 5',
        artist: 'Thịnh Suy',
    },
    {
        id: '18',
        title: 'Thay đổi',
        image: 'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329',
        playlist: '1 2',
        artist: 'Thịnh Suy',
    },
];

export {categories, playlists, artists, songs}