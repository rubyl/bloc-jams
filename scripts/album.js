var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
    +'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    +'  <td class="song-item-title">' + songName + '</td>'
    +' <td class="song-item-duration">' + songLength + '</td>'
    +'</trd>'
    ;
    
    var $row = $(template);
    
    var clickHandler = function () {
        var songItem = parseInt($(this).attr('data-song-number'));
    
        if (currentlyPlayingSongNumber !== null) {
            var currentPlaying = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		currentPlaying.html(currentlyPlayingSongNumber);
        } 
        
        if (currentlyPlayingSongNumber !== songItem) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songItem;
            currentSongFromAlbum = currentAlbum.songs[songItem - 1];
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songItem) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        } 
    };
    
    var onHover = function(event) {
        var songRow = $(this).find('.song-item-number');
        var songNumber = parseInt($(songRow).attr('data-song-number'));
        
            if (songNumber !== currentlyPlayingSongNumber) {
                songRow.html(playButtonTemplate);
            }
    };

    var offHover = function(event) {
        var songRow = $(this).find('.song-item-number')
        var songNumber = parseInt($(songRow).attr('data-song-number'));
            
        if (songNumber !== currentlyPlayingSongNumber) {
            songRow.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
    
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text( album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration)
        $albumSongList.append($newRow);
    }
};

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function () {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);

};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);

});