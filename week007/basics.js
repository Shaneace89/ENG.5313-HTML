let jas = "Jas James";

console.log(jas);

const x = 7 + 8;

const animals = ["lions", "tigers", "bears", "zebra"];

let kidSnacks = ["chips", "apples", "milk", "fruit snacks"];

const kid = "hungry";

jas = "J. James is a great teacher";

const buttonA = document.querySelector("#button_A");
const headingA = document.querySelector("#heading_A");

let count = 1;

buttonA.onclick = () => {
  buttonA.textContent = "Try again!";
  headingA.textContent = `${count} clicks so far`;
  count += 1;
};

console.log(count);
console.log(jas);
console.log(x, "This is the value of x");
console.log(animals[3], ": zebra is here");
console.log(animals[0], ": lion is here");


if (kid === "hungry") {
  console.log("If the kid is hungry give them a snack");
  console.log("throw " + kidSnacks[3] + " at kid");
} else {
  FALSE;
}

console.log(kidSnacks[1], ": apple is here");

if (animals[0] === "lions") {
  console.log("The first animal is a lion");
} else {
  console.log("The first animal is not a lion");
}