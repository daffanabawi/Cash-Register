let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const nameCid = [
  "Pennies", "Nickels", "Dimes", "Quarters", "Ones", "Fives", "Tens", "Twentys", "Hundreds"
];

let amount = [
  [100, cid[8][1]], [20, cid[7][1]], [10, cid[6][1]], [5, cid[5][1]], [1, cid[4][1]], [0.25, cid[3][1]], 
  [0.1, cid[2][1]], [0.05, cid[1][1]], [0.01, cid[0][1]],
];

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const cashDrawer = document.getElementById("cashDrawer")

purchaseBtn.addEventListener("click", ()=>{
const valueCash = Number(cash.value);
  if (valueCash < price){
    alert("Customer does not have enough money to purchase the item");
  }else if(valueCash === price){
    changeDue.textContent = "No change due - customer paid with exact cash"; 
  }else{
    changeCust();
  }
})


const changeCust = () => {
  let change = Math.round((Number(cash.value) - price) * 100) / 100;
  const drawer = [...cid].reverse();
  const newChange = [];

  for (let i = 0; i < drawer.length; i++) {
    let denom = drawer[i][0];
    let denomValue = amount[i][0]; 
    let available = drawer[i][1]; 
    let used = 0;

    while (change >= denomValue && available >= denomValue) {
      change = Math.round((change - denomValue) * 100) / 100;
      available = Math.round((available - denomValue) * 100) / 100;
      used = Math.round((used + denomValue) * 100) / 100;
    }

    if (used > 0) {
      newChange.push([denom, used]);
      cid[cid.length - 1 - i][1] = available;
    }
    console.log(change)
  }

  if (change > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const status = cid.every(item => item[1] === 0) ? "CLOSED" : "OPEN";
  changeDue.innerHTML = `Status: ${status}<br>`;

  const formatted = showAmountFraction(newChange);
  for (const key in formatted) {
    changeDue.innerHTML += ` ${key}: $${formatted[key]}<br>`;
  }

  // update display
  for (let i = 0; i < cid.length; i++) {
    const cashDrawerSpan = document.getElementById(`cashDrawerSpan${i}`);
    cashDrawerSpan.textContent = cid[i][1];
  }
  console.log(change)
};

function showAmountFraction(arr) {
const result = {}
  for (const [label, value] of arr) {
    if (result[label]) {
      result[label] = Math.round((result[label] + value)*100)/100;
    } else {
      result[label] = value;
    }
  }
  return result
  }

for(let i = 0; i < cid.length; i++){
  const p = document.createElement("p");
  p.id = 'cashDrawerP';
  const span = document.createElement("span");
  span.id = `cashDrawerSpan${i}`;
  span.textContent = cid[i][1]
  p.textContent = `${nameCid[i]}: `+ "$";
  p.appendChild(span);
  cashDrawer.appendChild(p)
}