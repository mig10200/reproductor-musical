
var songs = [
  { title: 'Photograph', artist: 'Edd Sheeran', path: 'music/Photograph.mp3', cover: 'img/poster-photograph.jpg' },
  { title: 'Starboy', artist: 'The Weekend', path: 'music/Starboy.mp3', cover: 'img/poster-starboy.jpg' },
  { title: 'Stressed Out', artist: 'Twenty One Pilots', path: 'music/Stressed-Out.mp3', cover: 'img/poster-stressed.out.jpg' },
  { title: 'Con Calma', artist: 'Daddy Yanke', path: 'music/Con-Calma.mp3', cover: 'img/poster-con.calma.jpg' },
  { title: 'B.Y.O.B', artist: 'System of a Down', path: 'music/BYOB.mp3', cover: 'img/poster-B.Y.O.B.jpg' },
  { title: 'Come and Get Your Love', artist: 'Redbone', path: 'music/Come-and-Get-Your-Love.mp3', cover: 'img/poster-redbone.jpg' },
  { title: 'Callaita', artist: 'Bad Bunny', path: 'music/Callaita.mp3', cover: 'img/poster-callaita.jpg' },
  { title: 'New Rules', artist: 'Dua Lipa', path: 'music/New-Rules.mp3', cover: 'img/poster-new.rules.jpg' }
];

var currentSongIndex = 0;
var audioPlayer = new Audio();

function loadSong(path, artist, cover) {
  audioPlayer.src = path;
  audioPlayer.load();
  togglePlay();
  updateSongInfo(artist, cover);

}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    document.getElementById('play').textContent = '⏸';
  } else {
    audioPlayer.pause();
    document.getElementById('play').textContent = '▶';
  }
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  var nextSong = songs[currentSongIndex];
  loadSong(nextSong.path, nextSong.artist, nextSong.cover);
}

function previousSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  var previousSong = songs[currentSongIndex];
  loadSong(previousSong.path, previousSong.artist, previousSong.cover);
}

function updateProgressBar() {
  var progressBar = document.getElementById('progress-bar');
  var currentTime = document.getElementById('current-time');
  var duration = document.getElementById('duration');

  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  currentTime.textContent = formatTime(audioPlayer.currentTime);
  duration.textContent = formatTime(audioPlayer.duration);
}

function seekSong() {
  var progressBar = document.getElementById('progress-bar');
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
}

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function updateSongInfo(artist, cover) {
  var coverArt = document.getElementById('cover-art');
  var songInfo = document.getElementById('song-info');

  coverArt.style.backgroundImage = 'url(' + cover + ')';
  songInfo.innerHTML = '<h3>' + songs[currentSongIndex].title + '</h3><p>' + artist + '</p>';
}

audioPlayer.addEventListener('timeupdate', updateProgressBar);


