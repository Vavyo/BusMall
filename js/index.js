"use strict";

const productImages = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "usb.gif",
  "water-can.jpg",
  "wine-glass.jpg",
];

const allProducts = [];
var randomProducts = [];
var imageElements = document.getElementsByTagName("img");
var totalClicks = 0;
var sampleSize = 25;

for (let i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener("click", productClick);
}

//populate all products
for (let i = 0; i < productImages.length; i++) {
  const image = productImages[i];
  const path = "img/assets/" + image;
  const name = image.split(".")[0];
  new Product(name, path);
}

function Product(name, imgPath) {
  this.name = name;
  this.img = imgPath;
  this.timesShown = 0;
  this.timesClicked = 0;
  allProducts.push(this);
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}

function removeRandom(arr) {
  const i = getRandomInt(arr.length);
  const ele = arr.splice(i, 1)[0];
  return ele;
}
function getRandomProducts(n) {
  // to skip writing a for loop -Calvin Hall
  const possibilities = [];
  for (let i = 0; i < allProducts.length; i++) {
    possibilities.push(allProducts[i]);
  }
  const products = [];
  for (let i = 0; i < n; i++) {
    products.push(removeRandom(possibilities));
  }
  return products;
}

function populateProducts() {
  randomProducts = getRandomProducts(3);
  for (let i = 0; i < randomProducts.length; i++) {
    imageElements[i].src = randomProducts[i].img;
    randomProducts[i].timesShown++;
  }
}

function productClick(event) {
  if (totalClicks < sampleSize) {
    totalClicks++;
    console.log(totalClicks);
    randomProducts[event.srcElement.id].timesClicked++;
    populateProducts();
  } else {
    for (let i = 0; i < imageElements.length; i++) {
      imageElements[i].removeEventListener("click", productClick);
    }
  }
}

function showResults() {
  var results = document.getElementById("results");
  results.innerHTML = "";
  for (let i = 0; i < allProducts.length; i++) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(
      allProducts[i].name +
        " had " +
        allProducts[i].timesClicked +
        " votes, and was seen " +
        allProducts[i].timesShown +
        " times."
    );
    node.appendChild(textnode);
    results.appendChild(node);
  }
}
