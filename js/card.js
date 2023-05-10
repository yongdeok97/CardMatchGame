const container = document.querySelector(".container");
const btnStart = document.querySelector('.btn-start')
// .card-item:hover .front {
//     transform: rotateY(180deg);
// }

// .card-item:hover .back {
//     transform: rotateY(0deg);
// }

// const
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
        <div class="card back">
            <img src="./asset/${item}" alt="">
        </div>
    </li>
        `);
  });
  container.innerHTML = cardItemArr.join("");
  //   console.log(cardItemArr);
}

function getStart() {
  const front = document.querySelectorAll(".card-item .front");
  const back = document.querySelectorAll(".card-item .back");
    console.log(front)
  front.forEach((item) => {
    item.style.transform = `rotateY(180deg)`;
  })
  back.forEach((item) => {
    item.style.transform = `rotateY(0deg)`;
  })
}

(function App() {
  MakeCardItem();
//   getStart();
})();

btnStart.addEventListener('click', () => {
    console.log(1)
    getStart();
})
