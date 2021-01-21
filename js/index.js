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

//populate all products
for (let i = 0; i < productImages.length; i++) {
  const image = productImages[i];
  const path = "img/assets/" + image;
  const name = image.split(".")[0];
  allProducts.push(new Product(name, path));
}

function Product(name, imgPath) {
  this.name = name;
  this.img = imgPath;
  this.timesShown = 0;
  this.timesClicked = 0;
  this.element = document.createElement("img");
  this.element.src = imgPath;
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
  const randomProducts = getRandomProducts(3);
  const imageSection = document.getElementById("productImages");
  imageSection.innerHTML = "";
  for (const product of randomProducts) {
    imageSection.appendChild(product.element);
  }
}
