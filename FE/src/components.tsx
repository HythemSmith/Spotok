import * as React from 'react';

const categories = [
    {
        id: '1',
        title: 'Music',
        next: 'Home',
    },
    {
        id: '2',
        title: 'Recently',
        next: 'Songlist',
        category: 'recent',
    },
    {
        id: '3',
        title: 'Discover',
        next: 'Songlist',
        category: 'new',
    },
    {
        id: '4',
        title: 'Trending',
        next: 'Songlist',
        category: 'trend',
    },
    {
        id: '5',
        title: 'News',
        next: 'News',
    },
];

const playlists = [
    {
        id: '1',
        title: 'Relaxing',
        image: {uri:'https://i1.sndcdn.com/artworks-l1hz5GC4MM04y358-5cqmWQ-t500x500.jpg'},
        next:'Songlist',
    },
    {
        id: '2',
        title: 'Ballad',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        next:'Songlist',
    },
    {
        id: '3',
        title: 'Bolero',
        image: {uri:'https://i1.sndcdn.com/artworks-000036836626-ba57tu-t500x500.jpg'},
        next:'Songlist',
    },
    {
        id: '4',
        title: 'Classical',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b27300b21b2b6d41893ed6c6b840'},
        next:'Songlist',
    },
    {
        id: '5',
        title: 'Love',
        image: {uri:'https://ratedrnb.com/?attachment_id=14386'},
        next:'Songlist',
    },
    {
        id: '6',
        title: 'Rap',
        image: {uri:'https://i.redd.it/7r3d9nlxyd991.png'},
        next:'Songlist',
    },
];

const artists = [
    {
        id: '1',
        title: 'Đen Vâu',
        image: {uri:'https://vtv1.mediacdn.vn/zoom/640_400/2021/5/14/2j3a9577-editc-1620944229636282182804-crop-16210641534952132081719.jpg'}

    },
    {
        id: '2',
        title: 'Hà Anh Tuấn',
        image: {uri:'https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/06/27/e/8/8/5/1530074198530_600.jpg'}
    },
    {
        id: '3',
        title: 'Tuấn Ngọc',
        image: {uri:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tuan_Ngoc.jpg'}
    },
    {
        id: '4',
        title: 'Mozart',
        image: {uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/195px-Wolfgang-amadeus-mozart_1.jpg'}
    },
    {
        id: '5',
        title: 'Trịnh Trung Kiên',
        image: {uri:'https://yt3.googleusercontent.com/ytc/APkrFKYunKRAH-WlHsD2rB_L0Qy_lu1sHpdSV9-Bphlr=s900-c-k-c0x00ffffff-no-rj'}
    },
    {
        id: '6',
        title: 'Thịnh Suy',
        image: {uri:'https://static.wikia.nocookie.net/producerviet/images/1/1a/Th%E1%BB%8Bnh_Suy.jpeg/revision/latest?cb=20221201113323'}
    },
];

const songs = [
    {
        id: '1',
        title: 'Đưa nhau đi trốn',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '1 5 6',
        artist: 1,
    },
    {
        id: '2',
        title: 'Nấu ăn cho em',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '1 5 6',
        artist: 1,
    },
    {
        id: '3',
        title: 'Ai muốn nghe không',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '1 6',
        artist: 1,
    },
    {
        id: '4',
        title: 'Tháng tư là lời nói dối của em',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '2 5',
        artist: 2,
    },
    {
        id: '5',
        title: 'Thành phố sương',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '1 2',
        artist: 2,
    },
    {
        id: '6',
        title: 'Chỉ Còn Những Mùa Nhớ',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '2 5',
        artist: 2,
    },
    {
        id: '7',
        title: 'Riêng một góc trời',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '1 3',
        artist: 3,
    },
    {
        id: '8',
        title: 'Khúc thụy du',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '3 5',
        artist: 3,
    },
    {
        id: '9',
        title: 'Như đã dấu yêu',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '3 5',
        artist: 3,
    },
    {
        id: '10',
        title: 'Requiem',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '4',
        artist: 4,
    },
    {
        id: '11',
        title: 'Eine kleine Nachtmusik',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '4',
        artist: 4,
    },
    {
        id: '12',
        title: 'Le nozze di Figaro',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '4',
        artist: 4,
    },
    {
        id: '13',
        title: 'Tập thể dục',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '2 6',
        artist: 5,
    },
    {
        id: '14',
        title: 'Mẹ chẳng có gì',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '2 5',
        artist: 5,
    },
    {
        id: '15',
        title: 'Bên trái',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '5 6',
        artist: 5,
    },
    {
        id: '16',
        title: 'Nghe em',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '2 5',
        artist: 6,
    },
    {
        id: '17',
        title: 'Chuyện rằng',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '1 5',
        artist: 6,
    },
    {
        id: '18',
        title: 'Thay đổi',
        image: {uri:'https://i.scdn.co/image/ab67616d0000b273836cad6ae30c47ccf3eb1329'},
        playlist: '1 2',
        artist: 6,
    },
];

export {categories, playlists, artists, songs}