
// deck of all cards
const deck = document.getElementById("memory-cards");

// holder for all cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

// variable moves
let moves = 0;
let counter = document.querySelector(".moves");

// variable stars
const stars = document.querySelectorAll(".fa-star");

// variable matchedCards
let matchedCard = document.getElementsByClassName("match");

// variable starsList
let starsList = document.querySelectorAll(".stars li");

// variable modal
let modal = document.getElementById("modal-window");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// opened cards array
var openedCards = [];


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @description when page is refreshed/loaded shuffles the cards
document.body.onload = newGame();


// @description starts new game
function newGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // moves are reset
    moves = 0;
    counter.innerHTML = moves;
    // rating is reset
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    // horologe is reset
    second = 0;
    minute = 0; 
    hour = 0;
    var horologe = document.querySelector(".horologe");
    horologe.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// @description switching open and show class
var showCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function openCard() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        countMoves();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// @description when match is made
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when match is not made
function unmatched(){
    openedCards[0].classList.add("unmatch");
    openedCards[1].classList.add("unmatch");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatch");
        openedCards[1].classList.remove("show", "open", "no-event","unmatch");
        enable();
        openedCards = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function countMoves(){
    moves++;
    counter.innerHTML = moves;
    //start horologe on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startHorologe();
    }
    // setting rates based on moves
    if (moves > 10 && moves < 14){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 15){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game horologe
var second = 0, minute = 0; hour = 0;
var horologe = document.querySelector(".horologe");
var interval;
function startHorologe(){
    interval = setInterval(function(){
        horologe.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// @description show modal and moves, time and rating
function gameEnds(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = horologe.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("moveFinal").innerHTML = moves;
        document.getElementById("timeTotal").innerHTML = finalTime;
        document.getElementById("starRating").innerHTML = starRating;

        //close icon on modal
        closeModal();
    };
}

// When the user clicks on <span> (x), close the modal
span.onclick = function closeModal() {
    modal.style.display = "none";
    newGame();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        newGame();
    }
}

// @desciption start a new game
function startGame(){
    modal.classList.remove("show");
    newGame();
}


// Adds event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", openCard);
    card.addEventListener("click", gameEnds);
};