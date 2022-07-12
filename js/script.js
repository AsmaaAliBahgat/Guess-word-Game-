const inputsContainer = document.querySelector(".inputs"),
discTitle = document.querySelector(".disc"),
guessCount = document.querySelector(".guess-count"),
resetButton = document.querySelector("button"),
typing = document.querySelector(".typing"),
succ = document.getElementById("music"),
loser = document.getElementById("lose"),
winner = document.querySelector(".winner");

//all words i use 
const words = [
    {
        word : "javascript",
        disc : " is the programming language of the Web"
    },
    {
        word : "angular",
        disc : "JavaScript open-source front-end framework"
    },
    {
        word : "nodejs",
        disc : "javascript runtime environment"
    },
    {
        word : "vue",
        disc : "javascript framwork"
    },
    {
        word : "python",
        disc : "open source programming language"
    },
    {
        word : "bootstrap",
        disc : "most famous css free framwork"
    },
    {
        word : "css",
        disc : "cascading style sheet"
    }

]
let word,
max_guess = 5,
countToWin = [];
//focus input after user keydown
document.addEventListener("keydown" , ()=> typing.focus());

// start game after keydown
typing.addEventListener("input",startGame);

//reset game
resetButton.addEventListener("click",getRandomWord);

//get random word
function getRandomWord(){
    //handle reset element
    reset();
    let randomObject = words[Math.floor(Math.random() * words.length)];
    let disc = randomObject.disc;
    //word overwrite
    word = randomObject.word;

    // add description
    discTitle.innerText = disc;

    //add guess count
    guessCount.innerText = max_guess;

    // creat inputs
    let inputs = "";
    for(i=0; i<word.length ; i++){
        inputs += '<input type="text" disabled></input>';
    }
    inputsContainer.innerHTML = inputs
}
getRandomWord();

// start game
function startGame(e){
    let char = e.target.value;
    if(!char.match(/[a-z]/i)) return;
    if(word.includes(char)){
        for(let i =0 ; i < word.length ; i++){
            // add char in position
            if(word[i] === char && !inputsContainer.querySelectorAll('input')[i].value){
                inputsContainer.querySelectorAll('input')[i].value = char;
                countToWin.push(char);
            }
        }
    }else{
        max_guess--;
    }
    guessCount.innerText = max_guess;
    typing.value = "";


   // winner
    if(countToWin.length === word.length){
        winner.classList.remove("hidden")
        succ.play();
        countToWin = [];
    }

    // lose
    setTimeout(()=> {
         if (max_guess <=0 ) {
            loser.play();
            for(i=o ;i<word.length ; i++){
                inputsContainer.querySelectorAll('input')[i].value = word[i];
            }
        }
    }
    )
   
}



function reset(){
   //guess count
    max_guess = 5;
   //hidden winner
   winner.classList.add("hidden");
   //countwin
   countToWin = [];
    succ.pause();
    loser.pause();
}
