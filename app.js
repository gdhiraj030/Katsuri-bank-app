"use strict";
// login section
const loginContainer = document.querySelector(".login__container");
const loginUsername = document.querySelector(".login--username");
const loginPassword = document.querySelector(".login--password");
const loginBtn = document.querySelector(".login--btn");
// message and total
const labelWelcome = document.querySelector(".label--welcome");
const totalBalance = document.querySelector(".total--balance");
// app container
const appContainer = document.querySelector(".app__container");
// transaction
const transactionHistory = document.querySelector(".transaction__history");
const transactionRow = document.querySelector(".transaction__row");
const typeDeposited = document.querySelector(".type--deposited");
const typeWithdrawal = document.querySelector(".type--withdrawal");

// label summary
const labelIncome = document.querySelector(".label--income");
const labelOutcome = document.querySelector(".label--outcome");
const btnSort = document.querySelector(".sort--btn");

// operation inputs
const receiverInput = document.querySelector(".receiver--input");
const loanInput = document.querySelector(".loan--input");
const closeInput = document.querySelector(".close--input");

// operation password
const receiverAmount = document.querySelector(".receiver--amount");
const closePassword = document.querySelector(".close--password");

// operation button btn
const sendBtn = document.querySelector(".send--btn");
const loanBtn = document.querySelector(".loan--btn");
const closeBtn = document.querySelector(".close--btn");

// data

const account1 = {
  owner: "John Doe",
  movements: [3307, 373, 719, 1213, 477, 2244, -109, 3076, -177],
  interestRate: 2.0, // %
  password: 6460,
};
const account2 = {
  owner: "Jane Smith",
  movements: [747, 4411, 2724, 2418, -216, 4808, 3103, 4263],
  interestRate: 4.3, // %
  password: 1419,
};
const account3 = {
  owner: "Tom Brown",
  movements: [1933, -663, 1497, -909, -209, -1000, 3793, 2067, 3874, 4987],
  interestRate: 1.7, // %
  password: 9088,
};
const account4 = {
  owner: "Sara White",
  movements: [-634, -858, 224, 1539, -821, 2395],
  interestRate: 1.3, // %
  password: 1316,
};
const account5 = {
  owner: "Mike Green",
  movements: [2837, -503, 3389, 1407, 2022, 1829],
  interestRate: 1.0, // %
  password: 6755,
};

const accounts = [account1, account2, account3, account4, account5];

// create username for each accounts
function createUsername(accs) {
  accs.forEach((acc) => {
    let firstLetter = acc.owner.toLowerCase().slice(0, 1);
    let restLetter = acc.owner.toLowerCase().split(" ").slice(1).join("");
    acc.username = `${firstLetter}${restLetter}`;
  });
}
createUsername(accounts);

function displayUI(accs) {
  // welcome message
  labelWelcome.textContent = `Hi, ${currentAccount.owner.split(" ")[0]}`;
  // display transaction
  transactionHistory.textContent = "";
  accs.movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposited" : "withdrawal";
    const html = `
          <div class="transaction__row">
            <p> ${i + 1}. <span class="type type--${type}">${type}</span></p>
            <p>${mov}€</p>
          </div> `;
    transactionHistory.insertAdjacentHTML("afterbegin", html);
  });
  // total balnce
  accs.total = accs.movements.reduce((acc, mov) => acc + mov, 0);
  totalBalance.textContent = `${accs.total}€`;

  // display income
  let income = accs.movements
    .filter((mov) => mov > 0)
    .reduce((acc, el) => acc + el, 0);
  labelIncome.textContent = `${income}€`;
  // display outcome
  let outcome = accs.movements
    .filter((mov) => mov < 0)
    .reduce((acc, el) => acc + el, 0);
  labelOutcome.textContent = `${outcome}€`;
}

// login btn functionality
let currentAccount;
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let loginUsernameValue = loginUsername.value.toLowerCase();
  currentAccount = accounts.find((acc) => acc.username === loginUsernameValue);
  if (currentAccount) {
    loginContainer.style.display = "none";
    appContainer.style.display = "grid";
    displayUI(currentAccount);
  } else {
    console.log("no user found");
  }
});

// send money btn functionality
sendBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("send");
  let receiverUsernameInputValue = receiverInput.value;
  console.log(receiverAmount);
  let amount = +receiverAmount.value;
  let receiverAcc = accounts.find(
    (acc) => acc.username === receiverUsernameInputValue
  );
  console.log(receiverAcc);
  if (
    receiverAcc &&
    amount > 0 &&
    amount <= currentAccount.total &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
    displayUI(currentAccount)
    receiverUsernameInputValue=amount=''
    receiverAmount.blur()
  }
});
