const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: 'https://images.saymedia-content.com/.image/t_share/MTc0OTkxNTE4MTgzMDczMjIw/alternative-ways-to-say-thank-you.jpg',
        text:"Thank You"
    },
    {
        image: 'https://i.pinimg.com/originals/27/8e/da/278eda1d46267cfb67fc06d827faa874.jpg',
        text:"Sorry"
    },
    {
        image: 'https://i.kym-cdn.com/entries/icons/facebook/000/014/436/icon.jpg',
        text:"I'm Hungry"
    },
    {
        image: 'https://lifestyletv.se/wp-content/uploads/2014/06/kids_drink_water_700x394.jpg',
        text:"I'm Thirsty"
    },
    {
        image: 'https://dz9yg0snnohlc.cloudfront.net/tiredhand.jpg',
        text:"I don't feel good"
    },
    {
        image: 'https://d2sslp958cft0.cloudfront.net/wp-content/uploads/2019/01/19152534/Why-Some-Don%E2%80%99t-Ask-for-Help-%E2%80%93-Depression-Taboos.png',
        text:"HELP!!!"
    }
]

data.forEach(createBox);

function createBox(item) {
    const box = document.createElement('div');
    const { image, text } = item;
    box.classList.add('box');
    box.innerHTML = `
                    <img src ="${image}" "${text}" />
                    <p class="info">${text}</p> 
                    `;
    
    box.addEventListener('click', () => {
        setTextMsg(text);
        speakText();
        //css active class
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
    
    main.appendChild(box);
}

const msg = new SpeechSynthesisUtterance();

toggleBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show'));
    
closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show'));

let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();
  
    voices.forEach(voice => {
      const option = document.createElement('option');
  
      option.value = voice.name;
      option.innerText = `${voice.name} ${voice.lang}`;
  
      voicesSelect.appendChild(option);
    });
}

function setTextMsg(text) {
    msg.text = text;
}

function speakText() {
    speechSynthesis.speak(msg);
    if (msg.text === "HELP!!!") {
        
        count = 3;
        while (count >= 0) {
            msg.volume = 1;
            speechSynthesis.speak(msg);
            count--;
            //speaks help 5 times
        }
    }
}

function setVoice(e) {
    msg.voice = voices.find(voice => voice.name === e.target.value);
}

readBtn.addEventListener('click', () => {
    setTextMsg(textarea.value);
    speakText();
})

speechSynthesis.addEventListener('voiceschanged', getVoices);
      
 getVoices();