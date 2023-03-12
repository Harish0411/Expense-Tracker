let form =  document.querySelector("form");
let text = document.getElementById("text");
let amount = document.getElementById("amount");
let error = document.getElementById("errormsg");
let balance = document.getElementById("balance");
let income = document.getElementById("inc");
let expense = document.getElementById("exp");
let list = document.getElementById("list");
text.focus();


let localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions= localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

if(amount.value ==="" || text.value === ""){
        error.innerHTML = "Enter valid details";
	}
 else if(isNaN(amount.value)){
      error.innerHTML="Amount must be in numbers";
}
else if(!isNaN(text.value)){
     error.innerHTML = "Transaction name can't be in numbers"
}
	else{
	 let transaction ={
      id : generateId(),
	  text : text.value,
	  amount : +amount.value
       };
   console.log(transaction);
   
     transactions.push(transaction);
	 addTransaction(transaction);
	 updateLocalStorage();
	 update();
	 text.value ="";
	 amount.value ="";
	 error.innerHTML ="";
	}
});

function generateId(){
   return Math.floor(Math.random()*1000000);
}

let addTransaction = function(transaction){
     let sign = transaction.amount < 0 ? "-" : "+";
	 let listItem = document.createElement("li");
	 listItem.classList.add(transaction.amount < 0 ? "sub" : "add");
	 listItem.setAttribute("id", `${transaction.id}`);
	
	 listItem.innerHTML = `
	 ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
	 <button id="btn2" onclick="deleteHistory(${transaction.id})">X</button>
	 `
	 list.appendChild(listItem);
}



/*function deleteHistory(id){
    if(transactions.id == id){
	     list.innerHTML = "";
	}
	updateStorage();
}
 function updateStorage(){
   localStorage.setItem("transactions", JSON.stringify(transactions));
 }*/


function update(){
     let amounts = transactions.map(transaction => transaction.amount);
	 let total = amounts.reduce(function(acc, item){
        return (acc += item);
		}, 0);
	 let incomes = amounts.filter(value => value > 0).reduce((acc, value) => (acc += value),0);
	 let expenses = amounts.filter(value => value<0).reduce((acc, value) => (acc += value),0)*-1;
	 	 console.log(amounts);
		 console.log(incomes);
		 console.log(expenses);
		 console.log(total);
     balance.innerText = `$${total}`;
	 income.innerText = `$${incomes}`;
	 expense.innerText = `$${expenses}`;
	 
	 }

function deleteHistory(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
	updateLocalStorage();
	remove();
}
 function updateLocalStorage(){
   localStorage.setItem("transactions", JSON.stringify(transactions));
 }
function remove(){
    list.innerHTML = "";
	transactions.forEach(addTransaction);
	update()
}
remove();
	 
