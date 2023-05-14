const container = document.querySelector(".container");
const btnStart = document.querySelector(".btn-start");


let images = [
  "alpaca.png",
  "cat.png",
  "dog.png",
  "flamingo.png",
  "flog.png",
  "lion.png",
  "owl.png",
  "parrot.png",
  "seaDog.png",
  "whale.png",
];


class Time {
  constructor() {
    this.startTime = null;
    this.timeSet = document.querySelector(".timer");
    this.timerId = null;
  }

  start() {
    this.startTime = Date.now(); // 시작 시간
    this.timerId = setInterval(() => {
      let elapsedTime = Date.now() - this.startTime; // 경과 시간

      let seconds = Math.floor(elapsedTime / 1000 % 60);
      let minutes = Math.floor(elapsedTime / 1000 / 60 % 60);
      let hours = Math.floor(elapsedTime / 1000 / 60 / 60 % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      hours = hours < 10 ? "0" + hours : hours;

      this.timeSet.innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000); // 1초마다 업데이트
  }

  stop() {
    clearInterval(this.timerId);
    this.timeSet.innerText = "";
  }
}



function shuffle(array) {
  return [...array, ...array].sort(() => Math.random() - 0.5);
}

function MakeCardItem() {
  let cardItemArr = [];

  images = shuffle(images);
  images.map((item) => {
    cardItemArr.push(`
    <li class="card-item">
        <div class="card front">
            <img src='./asset/card1.png' alt="">
        </div>
        <div class="card back" data-item="${item}">
            <img src="./asset/${item}" alt="">
        </div>
    </li>
        `);
  });
  container.innerHTML = cardItemArr.join("");
}

function reverseAll(front, back) {
  front.forEach((item) => {
    item.style.transform = `rotateY(180deg)`;
  });
  back.forEach((item) => {
    item.style.transform = `rotateY(0deg)`;
  });
  setTimeout(() => {
    front.forEach((item) => {
      item.style.transform = `rotateY(0deg)`;
    });
    back.forEach((item) => {
      item.style.transform = `rotateY(180deg)`;
    });
  }, 2000);
}

function reverse(front, back, checkPair) {
  for (let i = 0; i < front.length; i++) {
    front[i].addEventListener("click", () => {
      front[i].style.transform = `rotateY(180deg)`;
      back[i].style.transform = `rotateY(0deg)`;
      if (checkPair.getCount() === 0){
        checkPair.check(back[i].dataset.item, i);
      } 
      else if (checkPair.getCount() === 1) {
        if (checkPair.check(back[i].dataset.item) === 1) {
            console.log('correct');
        }
        else {
          setTimeout(() => {
            front[i].style.transform = `rotateY(0deg)`;
            back[i].style.transform = `rotateY(180deg)`;
            front[checkPair.getId()].style.transform = `rotateY(0deg)`;
            back[checkPair.getId()].style.transform = `rotateY(180deg)`;
          }, 1500);
        }
      }
    });
  }
}

function getStart(checkPair) {
  const front = document.querySelectorAll(".card-item .front");
  const back = document.querySelectorAll(".card-item .back");

  reverseAll(front, back);
  reverse(front, back, checkPair);
}

let CheckPair = (function () {
  let count = 0;
  let cardItem = '';
  let cardId = 0;

  function CheckPair() {
  }
  CheckPair.prototype.check = function (card, id) {
    count++;
    if (count === 2) {
      count = 0;
      if (cardItem === card)
      {
        cardItem = ''
        return 1;
      }
      else {
        cardItem = ''
        return [-1, id];
      }
    }
    else {
      cardItem = card;
      cardId = id;
      return 0
    }
  }
  CheckPair.prototype.getCount = function() {
    return count;
  }
  CheckPair.prototype.getId = function() {
    return cardId;
  }
  return CheckPair;
} ());

(function App() {
  MakeCardItem();
})();

btnStart.addEventListener("click", () => {
  const checkPair = new CheckPair();
  const time = new Time();
  
  getStart(checkPair);
  setTimeout(() => {time.start()}, 2000);
  btnStart.textContent = 'GIVE UP'
});
