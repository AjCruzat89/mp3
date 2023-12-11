document.addEventListener("DOMContentLoaded", function () {
    var songElements = document.getElementsByClassName('song');
    var currentIndex = 0;
    var audioPlayer = document.getElementById('audioPlayer');
    var songImage = document.getElementById('songImage');
    var songTitle = document.getElementById('songTitle');
    var progressBarContainer = document.getElementById('progressBarContainer');
    var progressBar = document.getElementById('progressBar');
    var playPauseButton = document.getElementById('playPauseButton');
    var shuffleRepeatButton = document.getElementById('shuffleRepeatButton');
  
    function loadSong(index) {
        var songElement = songElements[index];
        var audioSrc = songElement.getAttribute('data-src');
        var imageSrc = songElement.getAttribute('data-img');
        var title = songElement.innerText;
  
        audioPlayer.src = audioSrc;
        songImage.src = imageSrc;
        songTitle.innerText = title;
    }
  
    function updateProgressBar() {
        var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = progress + '%';
    }
  
    function playPause() {
        if (audioPlayer.paused || audioPlayer.ended) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }
  
    audioPlayer.addEventListener('play', function() {
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    });
  
    audioPlayer.addEventListener('pause', function() {
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    });
  
    audioPlayer.addEventListener('ended', function() {
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    });
  
    function nextSong() {
        currentIndex = (currentIndex + 1) % songElements.length;
        loadSong(currentIndex);
        audioPlayer.play();
    }
  
    function prevSong() {
        currentIndex = (currentIndex - 1 + songElements.length) % songElements.length;
        loadSong(currentIndex);
        audioPlayer.play();
    }
  
    function shuffleRepeat() {
        if (audioPlayer.shuffle) {
            audioPlayer.shuffle = false;
            shuffleRepeatButton.innerHTML = '<i class="fas fa-random"></i>';
        } else {
            audioPlayer.shuffle = true;
            shuffleRepeatButton.innerHTML = '<i class="fas fa-redo"></i>';
        }
    }
  
    function updateProgress(event) {
        var percent = (event.offsetX / progressBarContainer.offsetWidth);
        audioPlayer.currentTime = percent * audioPlayer.duration;
    }
  
    function playNextOnEnd() {
        if (!audioPlayer.shuffle) {
            currentIndex = (currentIndex + 1) % songElements.length;
        } else {
            currentIndex = Math.floor(Math.random() * songElements.length);
        }
        loadSong(currentIndex);
        audioPlayer.play();
    }
  
    function adjustVolume(volume) {
        audioPlayer.volume = parseFloat(volume);
    }
  
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    audioPlayer.addEventListener('ended', playNextOnEnd);
  
    progressBarContainer.addEventListener('click', updateProgress);
  
    document.getElementById('shuffleRepeatButton').addEventListener('click', shuffleRepeat);
    document.getElementById('prevButton').addEventListener('click', prevSong);
    document.getElementById('playPauseButton').addEventListener('click', playPause);
    document.getElementById('nextButton').addEventListener('click', nextSong);
  
    document.getElementById('volumeControl').addEventListener('input', function (e) {
        adjustVolume(e.target.value);
    });
  
    document.getElementById('songList').addEventListener('click', function (e) {
        if (e.target.classList.contains('song')) {
            var index = Array.from(songElements).indexOf(e.target);
            currentIndex = index;
            loadSong(currentIndex);
            audioPlayer.play();
        }
    });
  
    const showList = document.getElementById('showList');
    const songList = document.getElementById('songList');
  
    showList.addEventListener('click', function() {
      songList.classList.toggle('d-none');
      songList.classList.toggle('d-flex');
    });
  
    loadSong(currentIndex);
  });
  