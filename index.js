const expenseName = document.querySelector("#name");
const purchaseDate = document.querySelector("#date");
const purchasePrice = document.querySelector("#amount");
const addBtn = document.querySelector("#add");
const table = document.querySelector(".added_expenses");
const totalAmount = document.querySelector("#summary");
let summary = [];
let sum = 0;
// console.log(parseInt(purchasePrice.value));

function addExpense(e) {
	e.preventDefault(); // keep page from refreshing

	//collect data entered by user
	let name = document.createTextNode(expenseName.value);
	let date = document.createTextNode(purchaseDate.value);
	let amount = document.createTextNode(purchasePrice.value);
	// console.log(parseInt(amount));

	//create an array to store all amounts to be used to calculate total amount
	// summary.push(amount);
	// sum = summary.reduce((acc, val) => acc + val, 0);
	// console.log(sum);

	//create table row
	let tableRow = document.createElement("tr");

	//create table data elements and populate the collected data
	let nameCol = document.createElement("td");
	nameCol.appendChild(name);
	let dateCol = document.createElement("td");
	dateCol.appendChild(date);
	let amountCol = document.createElement("td");
	amountCol.appendChild(amount);

	//append table data elements to the table row
	tableRow.appendChild(nameCol);
	tableRow.appendChild(dateCol);
	tableRow.appendChild(amountCol);

	//append the table row to the table
	table.appendChild(tableRow);

	expenseName.value = "";
	purchaseDate.value = "";
	purchasePrice.value = "";
}

addBtn.addEventListener("click", addExpense);
