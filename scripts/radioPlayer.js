export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');

    const radioVolume = document.querySelector('.radio-volume');
    const radioVolumeOff = document.querySelector('.radio-volume-off');
    const radioVolumeUp = document.querySelector('.radio-volume-up');
    const radioVolumeDown = document.querySelector('.radio-volume-down');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
          radio.classList.remove('play');
          radioStop.classList.add('fa-play');
          radioStop.classList.remove('fa-stop');
        }
        else {
          radio.classList.add('play');
          radioStop.classList.remove('fa-play');
          radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
      radioItem.forEach(item => item.classList.remove('select') );
      elem.classList.add('select');
    }
    
    const changeValue = () => {                         //регулятор громкости 
      const valueVolume = radioVolume.value;
      audio.volume = valueVolume / 100;
      };

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        const title = parent.querySelector('.radio-name').textContent;
        const urlImg = parent.querySelector('.radio-img').src;

        selectItem(parent);

        radioHeaderBig.textContent = title;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;

        audio.src = target.dataset.radioStantion;
        audio.play();

        changeIconPlay();
    });

    radioStop.addEventListener ('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();
        changeIconPlay();
    });

    radioVolume.addEventListener('input', changeValue);

    radioVolumeOff.addEventListener('click', () => {
      if (audio.volume > 0) {
        localStorage.setItem('valueVolume',audio.volume);
        audio.volume = 0;
      }
      else audio.volume = localStorage.getItem('valueVolume');
    });

    radioVolumeUp.addEventListener('click', () => {
      if (radioVolume.value < 100) {
        radioVolume.value = Number(radioVolume.value) + Number(radioVolume.step);
        changeValue();
      }
    });

    radioVolumeDown.addEventListener('click', () => {
      if (radioVolume.value > 0) {
        radioVolume.value = Number(radioVolume.value) - Number(radioVolume.step);
        changeValue();
      }
    });

  audio.addEventListener('volumechange', () => {
  radioVolume.value = Math.round(audio.volume * 100);
  });
  changeValue();
};

//Добавить регулятор громкости!!!!