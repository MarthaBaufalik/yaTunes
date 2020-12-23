//export const videoPlayerInit = () => {
//  console.log('video Init');
//};

const videoPlayerInit = () => {
const videoPlayer = document.querySelector('.video-player');
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop');
const videoTimePassed = document.querySelector('.video-time__passed');
const videoProgress = document.querySelector('.video-progress');
const videoTimeTotal = document.querySelector('.video-time__total');
const videoVolume = document.querySelector('.video-volume');
const videoVolumeOff = document.querySelector('.fa-volume-off');
const videoVolumeUp = document.querySelector('.fa-volume-up');
const videoVolumeDown = document.querySelector('.fa-volume-down');
const videoFullscreen = document.querySelector('.video-fullscreen');

const toggleIcon = () => {
  if (videoPlayer.paused) {
    videoButtonPlay.classList.remove('fa-pause');
    videoButtonPlay.classList.add('fa-play');
  } else {
    videoButtonPlay.classList.add('fa-pause');
    videoButtonPlay.classList.remove('fa-play');
  }
};

const togglePlay = (event) => {
  event.preventDefault();
  if (videoPlayer.paused) videoPlayer.play();
  else (videoPlayer.pause());
  toggleIcon();
}

const stopPlay = () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  //toggleIcon();
}

const changeValue = () => {                         //регулятор громкости 
  const valueVolume = videoVolume.value;
  videoPlayer.volume = valueVolume / 100;
};

const addZero = n => n<10 ? '0'+ n : n;

videoPlayer.addEventListener('click',togglePlay);
videoButtonPlay.addEventListener('click',togglePlay);
videoButtonStop.addEventListener('click',stopPlay);
videoPlayer.addEventListener('play',toggleIcon);
videoPlayer.addEventListener('pause',toggleIcon);

videoPlayer.addEventListener('timeupdate', () => {
  const currentTime = videoPlayer.currentTime;
  const duration = videoPlayer.duration;

  videoProgress.value = (currentTime/duration)*100;

  let minutePassed = Math.floor(currentTime / 60);
  let secondsPassed = Math.floor(currentTime % 60);

  let minuteTotal = Math.floor(duration / 60);
  let secondsTotal = Math.floor(duration % 60);

  videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
  videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
});

videoProgress.addEventListener('input', () => {
  const duration = videoPlayer.duration;
  const value = videoProgress.value;
  videoPlayer.currentTime = (value * duration) / 100;
});

videoVolume.addEventListener('input', changeValue);

videoVolumeOff.addEventListener('click', () => {
  console
  if (videoPlayer.volume > 0) {
    localStorage.setItem('valueVolume',videoPlayer.volume);
    videoPlayer.volume = 0;
  }
  else videoPlayer.volume = localStorage.getItem('valueVolume');
});

videoVolumeUp.addEventListener('click', () => {
  if (videoVolume.value < 100) {
    videoVolume.value = Number(videoVolume.value) + Number(videoVolume.step);
    changeValue();
  }
});

videoVolumeDown.addEventListener('click', () => {
  if (videoVolume.value > 0) {
    videoVolume.value = Number(videoVolume.value) - Number(videoVolume.step);
    changeValue();
  }
});

videoFullscreen.addEventListener('click', () => {
  videoPlayer.requestFullscreen();
});

videoPlayer.addEventListener('volumechange', () => {
  videoVolume.value = Math.round(videoPlayer.volume * 100);
});

changeValue();

videoPlayerInit.stop = () => {
  videoPlayer.pause();
  toggleIcon();
}
};

export default videoPlayerInit;
