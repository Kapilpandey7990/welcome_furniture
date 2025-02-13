const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
const personName = document.getElementById("personName");
const profession = document.getElementById("profession");
const description = document.getElementById("description");


let isChickenVisible;

let people = [
  {
    photo:
      'url("https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843_960_720.jpg")',
    name: "ujjwal sharma",
    profession: "Interior Designer",
    description:
      "The quality and craftsmanship of the furniture are outstanding. Every piece adds elegance and comfort to my projects. Highly recommended for anyone looking for modern and durable furniture!"
  },

  {
    photo:
      "url('https://cdn.pixabay.com/photo/2019/02/11/20/20/woman-3990680_960_720.jpg')",
    name: "manisha singh",
    profession: "Homeowner",
    description:
      "I absolutely love my new living room set! The design is stylish yet cozy, and the materials used are top-notch. It has completely transformed my space into a warm and inviting home."
  },

  {
    photo:
      "url('https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg')",
    name: "sanjay sharma",
    profession: "Furniture Store Owner",
    description:
      "As a store owner, I only sell the best furniture, and this brand never disappoints. My customers always leave satisfied, praising the durability and aesthetic appeal of the collections."
  },

  {
    photo:
      "url('')",
    
    name: "janki developers",
    profession: "Real Estate Agent",
    description:
      "A beautifully furnished home sells faster! I always recommend this brand to my clients because their furniture enhances any space, making it feel luxurious and welcoming."
  }
];

imgDiv.style.backgroundImage = people[0].photo;
personName.innerText = people[0].name;
profession.innerText = people[0].profession;
description.innerText = people[0].description;
let currentPerson = 0;

//Select the side where you want to slide
function slide(whichSide, personNumber) {
  let reviewWrapWidth = reviewWrap.offsetWidth + "px";
  let descriptionHeight = description.offsetHeight + "px";
  //(+ or -)
  let side1symbol = whichSide === "left" ? "" : "-";
  let side2symbol = whichSide === "left" ? "-" : "";

  let tl = gsap.timeline();

  if (isChickenVisible) {
    tl.to(chicken, {
      duration: 0.4,
      opacity: 0
    });
  }

  tl.to(reviewWrap, {
    duration: 0.4,
    opacity: 0,
    translateX: `${side1symbol + reviewWrapWidth}`
  });

  tl.to(reviewWrap, {
    duration: 0,
    translateX: `${side2symbol + reviewWrapWidth}`
  });

  setTimeout(() => {
    imgDiv.style.backgroundImage = people[personNumber].photo;
  }, 400);
  setTimeout(() => {
    description.style.height = descriptionHeight;
  }, 400);
  setTimeout(() => {
    personName.innerText = people[personNumber].name;
  }, 400);
  setTimeout(() => {
    profession.innerText = people[personNumber].profession;
  }, 400);
  setTimeout(() => {
    description.innerText = people[personNumber].description;
  }, 400);

  tl.to(reviewWrap, {
    duration: 0.4,
    opacity: 1,
    translateX: 0
  });

  if (isChickenVisible) {
    tl.to(chicken, {
      duration: 0.4,
      opacity: 1
    });
  }
}

function setNextCardLeft() {
  if (currentPerson === 3) {
    currentPerson = 0;
    slide("left", currentPerson);
  } else {
    currentPerson++;
  }

  slide("left", currentPerson);
}

function setNextCardRight() {
  if (currentPerson === 0) {
    currentPerson = 3;
    slide("right", currentPerson);
  } else {
    currentPerson--;
  }

  slide("right", currentPerson);
}

leftArrow.addEventListener("click", setNextCardLeft);
rightArrow.addEventListener("click", setNextCardRight);

window.addEventListener("resize", () => {
  description.style.height = "100%";
});


function toggleReadMore(event) {
  event.preventDefault();
  let extraText = event.target.previousElementSibling.querySelector('.extra-text-mod');
  if (extraText.style.display === "none" || extraText.style.display === "") {
      extraText.style.display = "inline";
      event.target.textContent = "Read less";
  } else {
      extraText.style.display = "none";
      event.target.textContent = "Read more";
  }
}