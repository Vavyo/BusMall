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

let allProducts = [];
var currentProducts = [];
var imageElements = document.getElementsByTagName("img");
var totalClicks = 0;
var sampleSize = 25;

for (let i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener("click", productClick);
}

//populate all products
function populateProducts() {
  for (let i = 0; i < productImages.length; i++) {
    const image = productImages[i];
    const path = "img/assets/" + image;
    const name = image.split(".")[0];
    allProducts.push(new Product(name, path));
  }
}

function Product(name, imgPath) {
  this.name = name;
  this.img = imgPath;
  this.timesShown = 0;
  this.timesClicked = 0;
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
  const possibilities = [];
  outer: for (let i = 0; i < allProducts.length; i++) {
    for (let j = 0; j < currentProducts.length; j++) {
      if (currentProducts[j] === allProducts[i]) {
        continue outer;
      }
    }

    possibilities.push(allProducts[i]);
  }
  const products = [];
  for (let i = 0; i < n; i++) {
    products.push(removeRandom(possibilities));
  }
  return products;
}

function refreshShownProducts() {
  currentProducts = getRandomProducts(3);
  for (let i = 0; i < currentProducts.length; i++) {
    imageElements[i].src = currentProducts[i].img;
    currentProducts[i].timesShown++;
  }
}

function productClick(event) {
  if (totalClicks < sampleSize) {
    totalClicks++;
    console.log(totalClicks);
    currentProducts[event.srcElement.id].timesClicked++;
    refreshShownProducts();
  } else {
    showResultsButton();
  }
  localStorage.setItem("products", JSON.stringify(allProducts));
  localStorage.setItem("totalClicks", totalClicks);
}

function showResultsButton() {
  for (let i = 0; i < imageElements.length; i++) {
    imageElements[i].removeEventListener("click", productClick);
    document.getElementById("showResults").style.display = "block";
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
    updateChart();
  }
}

function updateChart() {
  var names = [];
  var votes = [];
  var shown = [];
  for (let i = 0; i < allProducts.length; i++) {
    names.push(allProducts[i].name);
    votes.push(allProducts[i].timesClicked);
    shown.push(allProducts[i].timesShown);
  }
  var ctx = document.getElementById("chart");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: names,
      datasets: [
        {
          label: "votes",
          backgroundColor: "#ffffff",
          borderColor: "#99aab5",
          data: votes,
        },
        {
          label: "shown",
          backgroundColor: "#7289da",
          borderColor: "#99aab5",
          data: shown,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
}

function setup() {
  const productsJSON = localStorage.getItem("products");
  if (productsJSON) {
    allProducts = JSON.parse(productsJSON);
    totalClicks = Number.parseInt(localStorage.getItem("totalClicks"));
  } else {
    populateProducts();
  }
  refreshShownProducts();
  if (totalClicks >= sampleSize) {
    showResultsButton();
  }
}
