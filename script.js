const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");

// const request = new XMLHttpRequest();

// const api = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

// function fetchData() {
//     const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
   
//     fetch(corsProxyUrl + api)
//         .then(response => response.json())
//         .then(data => {
//             // Process the JSON response
//             console.log(data[0].word);
            
//         })
//         .catch(error => {
//             // Handle any errors
//             console.log(error);
//         });
// }

// function setselectedword() {
//     console.log(request.response);
// }

const words = ['apple', 'joker', 'javascript', 'giant', 'baloon' , 'elegant', 'frog', 'whooper' ,'basic'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'You Won';
        popup.style.display= 'flex';
        window.removeEventListener('keydown',disp);
    }
}

const disp = (e) =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
}

window.addEventListener('keydown', disp );

function updateWrongLetterE1(){
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong Letters :</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = `You Lost. The word was "${selectedWord}"\nBetter luck next time!`;
        popup.style.display = 'flex';
        window.removeEventListener('keydown',disp);
    }
}

function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    window.addEventListener('keydown', disp );

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();