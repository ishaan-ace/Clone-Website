const playlists = [
    {
        id: 1,
        name: "Aalas Ka Pedh",
        cover: "Assets/Cover/local train.jpg",
        artist: "The Local Train",

        songs: [
            {
                id: 101,
                title: "Kaisey Jiyun",
                artist: "The Local Train",
                album: "Aalas Ka Pedh",
                cover: "Assets/Cover/local train.jpg",
                src: "Songs/The Local Train - Aalas Ka Pedh - Kaisey Jiyun (Official Audio) - The Local Train.mp3",
                duration: "4:14"
            },

            {
                id: 102,
                title: "Aaoge Tum Kabhi",
                artist: "The Local Train",
                album: "Aalas Ka Pedh",
                cover: "Assets/Cover/local train.jpg",
                src: "Songs/The Local Train - Aaoge Tum Kabhi (Official) - The Local Train.mp3",
                duration: "5:17"
            },

            {
                id: 103,
                title: "Choo Lo",
                artist: "The Local Train",
                album: "Aalas Ka Pedh",
                cover: "Assets/Cover/local train.jpg",
                src: "Songs/The Local Train - Aalas Ka Pedh - Choo Lo (Official Audio) - The Local Train.mp3",
                duration: "3:55"
            }
        ]
    },

    {
        id: 2,
        name: "Best of Anuv Jain",
        cover: "Assets/Cover/arz kiya hai.jpg",
        artist: "Anuv Jain",

        songs: [
            {
                id: 201,
                title: "Arz Kiya Hai",
                artist: "Anuv Jain",
                album: "Best of Anuv Jain",
                cover: "Assets/Cover/arz kiya hai.jpg",
                src: "Songs/Arz Kiya Hai- Anuv Jain.mp3",
                duration: "4:31"
            },

            {
                id: 202,
                title: "Husn",
                artist: "Anuv Jain",
                album: "Best of Anuv Jain",
                cover: "Assets/Cover/husn.jpg",
                src: "Songs/Husn-Anuv Jain.mp3",
                duration: "3:48"
            }
        ]
    },

    {
        id: 3,
        name: "Khat",
        cover: "Assets/Cover/khat.jpg",
        artist: "Navjot Ahuja",

        songs: [
            {
                id: 301,
                title: "Khat",
                artist: "Navjot Ahuja",
                album: "Khat",
                cover: "Assets/Cover/khat.jpg",
                src: "Songs/Khat - Navjot Ahuja.mp3",
                duration: "4:10"
            }
        ]
    },
    {
        id:4,
        name:"Laavan",
        cover:"Assets/Cover/laavan.jpg",
        artist:"Jasmine Sandlas",

        songs:[
            {
                id:401,
                title:"Laavan",
                artist:"Jasmine Sandlas",
                album:"Laavan",
                cover:"Assets/Cover/laavan.jpg",
                src:"Songs/LAAVAN (Music Video) Jasmine Sandlas _ Mofusion _ Pro Media.mp3",
                duration:"3:06"
            }
        ]
    },

    {
       id:5,
        name:"Woh",
        cover:"Assets/Cover/woh.png",
        artist:"Khatth, Sthiti",

        songs:[
            {
                id:501,
                title:"Woh",
                artist:"Khatth, Sthiti",
                album:"Laavan",
                cover:"Assets/Cover/woh.png",
                src:"Songs/Woh - Khatth ft. Sthiti (Official Music Video)(MP3_160K).mp3",
                duration:"3:51"
            }
        ] 
    },

    {
        id:6,
        name:"Paaro",
        cover:"Assets/Cover/paaro.jpg",
        artist:"Aditya Rikhari",

        songs:[
            {
                id:601,
                title:"Paaro",
                artist:"Aditya Rikhari",
                album:"Paaro",
                cover:"",
                src:"Songs/Aditya Rikhari - Paaro (Official Video).mp3",
                duration:"3:51"
            }
        ] 
    },
    {
        id:7,
        name:"Pal Pal(with Tawiinder)",
        cover:"Assets/Cover/pal pal.jpg",
        artist:"Afusic, Talwiinder",

        songs:[
            {
                id:701,
                title:"Pal Pal",
                artist:"Afusic, Talwiinder",
                album:"Pal Pal(with Tawiinder)",
                cover:"",
                src:"Songs/Afusic - Pal Pal (Official Music Video) Prod. @AliSoomroMusic.mp3",
                duration:"2:27"
            }
        ] 
    },
    {
        id:8,
        name:"Zulfein",
        cover:"Assets/Cover/zulfein.jpg",
        artist:"Mehul Mahesh",

        songs:[
            {
                id:801,
                title:"Zulfein",
                artist:"Mehul Mahesh",
                album:"Zulfein",
                cover:"",
                src:"Songs/Zulfein - Mehul Mahesh Prod By Dj AYnik (Official Visualizer Video) Latest Hindi Romantic Song 2025.mp3",
                duration:"3:19"
            }
        ] 
    }
];

// Flatten all songs into one array
const allSongs = playlists.flatMap(playlist => playlist.songs);

window.playlists = playlists;
window.allSongs = allSongs;