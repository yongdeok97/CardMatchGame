const container = document.querySelector(".container");
const btnStart = document.querySelector(".btn-start");
const timeSet = document.querySelector(".timer");

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

let time = 0;
let Utimer = null;
let timetoggle = false;

// 이거 좁근 할 수 없게 만들어 볼까 클로저로?
function updateTime() {
  time++;
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  let hours = Math.floor(time / 3600);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  hours = hours < 10 ? "0" + hours : hours;

  hourEl.textContent = hours;
  minEl.textContent = minutes;
  secEl.textContent = seconds;
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

function timer() {
  time.textContent = "00";
}

function getStart(checkPair) {
  const front = document.querySelectorAll(".card-item .front");
  const back = document.querySelectorAll(".card-item .back");
  //   뒤집기
  reverseAll(front, back);
  //  시간 흐르기
  timer();
  //  카드 누르면 뒤집어
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
    console.log('count' + count);
    if (count === 2) {
      count = 0;
      if (cardItem === card)
      {
        cardItem = ''
        console.log('match ok')
        return 1;
      }
      else {
        cardItem = ''
        console.log('march not ok')
        return [-1, id];
      }
    }
    else {
      cardItem = card;
      cardId = id;
      console.log('one card picked')
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
  getStart(checkPair);
});
