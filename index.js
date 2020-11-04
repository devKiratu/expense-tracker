const expenseName = document.querySelector("#name");
const purchaseDate = document.querySelector("#date");
const purchasePrice = document.querySelector("#amount");
const addBtn = document.querySelector("#add");
const table = document.querySelector(".added_expenses");
const totalCol = document.querySelector("#total");
const noExpenses = document.querySelector("#no-expenses");
// const tbody = document.querySelector("tbody");
console.log(totalCol.value);
let summary = [];
let sum = 0;

function addExpense(e) {
	e.preventDefault(); // keep page from refreshing

	//create an array to store all amounts to be used to calculate total amount
	summary.push(parseFloat(purchasePrice.value));
	sum = summary.reduce((acc, val) => acc + val, 0).toFixed(2);

	//collect data entered by user
	let name = document.createTextNode(expenseName.value);
	let date = document.createTextNode(purchaseDate.value);
	let amount = document.createTextNode(purchasePrice.value);

	//create table row
	let tableRow = document.createElement("tr");

	//create table data elements and populate the collected data
	let nameCol = document.createElement("td");
	nameCol.appendChild(name);
	let dateCol = document.createElement("td");
	dateCol.appendChild(date);
	let amountCol = document.createElement("td");
	amountCol.appendChild(amount);
	let removeBtn = document.createElement("button");
	removeBtn.setAttribute("id", "remove");
	removeBtn.innerHTML = "❌";
	amountCol.appendChild(removeBtn);

	//append table data elements to the table row
	tableRow.appendChild(nameCol);
	tableRow.appendChild(dateCol);
	tableRow.appendChild(amountCol);

	//append the table row to the table
	table.appendChild(tableRow);
	totalCol.innerHTML = sum;

	expenseName.value = "";
	purchaseDate.value = "";
	purchasePrice.value = "";
	noExpenses.hidden = true;

	removeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		table.removeChild(tableRow);
	});
}

addBtn.addEventListener("click", addExpense);
