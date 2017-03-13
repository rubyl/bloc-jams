var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4.26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { titile: 'Magenta', duration: '2:15' }
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglimo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15' }
    ]
};

var albumBeyonce = {
    title: 'Lemonade',
    artist: 'Beyonce',
    label: 'Columbia',
    year: '2016',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs: [
        { title: 'Pray You Catch Me', duration: '3:15' },
        { title: 'Hold up', duration: '3:41' },
        { title: "Don't Hurt Yourself", duration: '3:53' },
        { title: 'Sorry', duration: '3:52' },
        { title: '6 Inch', duration: '4:20' },
        { title: 'Daddy Lessons', duration: '4:47' },
        { title: 'Love Drought', duration: '3:57' },
        { title: 'Sandcastles', duration: '3:02' },
        { title: 'Forward', duration: '1:19' },
        { title: 'Freedom', duration: '4:49' },
        { title: 'All Night', duration: '5:21' },
        { title: 'Formation', duration: '3:26' }
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
    +'  <td class="song-item-number">' + songNumber + '</td>'
    +'  <td class="song-item-title">' + songName + '</td>'
    +' <td class="song-item-duration">' + songLength + '</td>'
    +'</trd>'
    ;
    
    return template;
};

var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {   
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    albumSongList.innerHTML = '';
    
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};


window.onload = function() {
    setCurrentAlbum(albumPicasso);
    
    var collection = [albumPicasso, albumMarconi, albumBeyonce];
    
    var index = 1;
    window.addEventListener('click', function(event) {
        setCurrentAlbum(collection[index]);
        index++;
        if (index == collection.length) {
            index = 0;
        } 
    });
};