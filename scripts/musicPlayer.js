import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioButtonPlay = document.querySelector('.audio-button__play'); 
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimeTotal = document.querySelector('.audio-time__total');

  const audioVolume = document.querySelector('.audio-volume');
  const audioVolumeOff = document.querySelector('.audio-volume-off');
  const audioVolumeUp = document.querySelector('.audio-volume-up');
  const audioVolumeDown = document.querySelector('.audio-volume-down');

  const playList = ['hello','flow','speed'];
  
  let trackIndex = 0;

  const loadTrack = () => {
      const isPlayed = audioPlayer.paused;
      const track = playList[trackIndex];

      audioImg.src = `./audio/${track}.jpg`
      audioHeader.textContent = track.toUpperCase();
      audioPlayer.src = `./audio/${track}.mp3`

      if (isPlayed) audioPlayer.pause();
      else audioPlayer.play();
  };

  const nextTrack = () => {
      if (trackIndex !== playList.length-1) trackIndex++;
      else trackIndex = 0;
      loadTrack();
  };

  const prevTrack = () => {
      if (trackIndex !== 0) trackIndex--;
      else trackIndex = playList.length - 1;
      loadTrack();
  };

  const changeValue = () => {                         //регулятор громкости 
      const valueVolume = audioVolume.value;
      audioPlayer.volume = valueVolume / 100;
      audioPlayer.muted = false;
      };

  audioNavigation.addEventListener('click',event => {
      const target = event.target;

      if (target.classList.contains('audio-button__play')) {
          const track = playList[trackIndex];

          audio.classList.toggle('play');
          audioButtonPlay.classList.toggle('fa-play');
          audioButtonPlay.classList.toggle('fa-pause');

          if (audioPlayer.paused) audioPlayer.play();
          else audioPlayer.pause();

          audioHeader.textContent = track.toUpperCase();
          
      };

      if (target.classList.contains('audio-button__next')) nextTrack();

      if (target.classList.contains('audio-button__prev')) prevTrack();

  });

  audioPlayer.addEventListener('ended', () => {
      nextTrack();
      audioPlayer.play();
  });

  audioPlayer.addEventListener('timeupdate', () => {
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      const progress = (currentTime / duration) * 100;

      audioProgressTiming.style.width = progress + '%';

      const minutePassed = Math.floor(currentTime / 60) || '0';
      const secondsPassed = Math.floor(currentTime % 60) || '0';
      const minuteTotal = Math.floor(duration / 60) || '0';
      const secondsTotal = Math.floor(duration % 60) || '0';

      audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
      audioTimeTotal.textContent =`${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  audioProgress.addEventListener('click', event => {
      const x = event.offsetX;
      const allWidth = audioProgress.clientWidth;
      const progress = (x / allWidth) * audioPlayer.duration;

      audioPlayer.currentTime = progress;
  });

  audioVolume.addEventListener('input', changeValue);

  audioVolumeOff.addEventListener('click', () => {
      audioPlayer.muted = !audioPlayer.muted;
  });

    audioVolumeUp.addEventListener('click', () => {
      if (audioVolume.value < 100) {
        audioVolume.value = Number(audioVolume.value) + Number(audioVolume.step);
        changeValue();
      }
    });

    audioVolumeDown.addEventListener('click', () => {
      if (audioVolume.value > 0) {
        audioVolume.value = Number(audioVolume.value) - Number(audioVolume.step);
        changeValue();
      }
    });

  audio.addEventListener('volumechange', () => {
  audioVolume.value = Math.round(audioPlayer.volume * 100);
  });

  changeValue();


  musicPlayerInit.stop = () => {
  if (!audioPlayer.paused) {
      audioPlayer.pause();
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');
  }
}
};