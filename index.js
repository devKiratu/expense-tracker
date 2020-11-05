const expenseName = document.querySelector("#name");
const purchaseDate = document.querySelector("#date");
const purchasePrice = document.querySelector("#amount");
const addBtn = document.querySelector("#add");
const table = document.querySelector(".added_expenses");
const totalCol = document.querySelector("#total");
const noExpenses = document.querySelector("#no-expenses");
window.addEventListener("load", () => expenseName.focus());
let summary = [];
let sum = 0.0;

// data input validation
//date validation - you can't enter a future date
const today = new Date();
let year = today.getFullYear();
let month =
	today.getMonth() + 1 < 10
		? `0${(today.getMonth() + 1).toString()}`
		: today.getMonth() + 1;
let day =
	today.getDate() < 10 ? `0${today.getDate().toString()}` : today.getDate();
let maxDate = `${year}-${month}-${day}`;

purchaseDate.setAttribute("max", maxDate);

//validating for amount
const regex = /\d+(\.\d{2})?/;
purchasePrice.addEventListener("input", () => {
	!regex.test(parseFloat(purchasePrice.value))
		? console.log((purchasePrice.value = ""))
		: null;
});

function addExpense(e) {
	e.preventDefault(); // keep page from refreshing

	//create an array to store all amounts to be used to calculate total amount
	let cleanedValue;
	if (purchasePrice.value != "") {
		cleanedValue = parseFloat(purchasePrice.value).toFixed(2);
		summary.push(parseFloat(cleanedValue));
		sum = summary.reduce((acc, val) => acc + val, 0).toFixed(2);
	}

	//collect data entered by user
	let name = document.createTextNode(expenseName.value);
	let date = document.createTextNode(
		purchaseDate.value.split("-").reverse().join("/")
	);
	let amount = document.createTextNode(
		parseFloat(purchasePrice.value).toFixed(2)
	);

	//create table row
	let tableRow = document.createElement("tr");

	//create table data elements and populate the collected data
	let nameCol = document.createElement("td");
	nameCol.appendChild(name);
	let dateCol = document.createElement("td");
	dateCol.appendChild(date);
	let amountCol = document.createElement("td");
	amountCol.appendChild(amount);
	let actionCol = document.createElement("td");
	let removeBtn = document.createElement("button");
	removeBtn.setAttribute("id", "remove");
	removeBtn.innerHTML = "❌";
	actionCol.appendChild(removeBtn);

	//append table data elements to the table row
	tableRow.appendChild(nameCol);
	tableRow.appendChild(dateCol);
	tableRow.appendChild(amountCol);
	tableRow.appendChild(actionCol);

	//append the table row to the table
	table.appendChild(tableRow);
	totalCol.innerHTML = sum;

	//clear all input after appending values to table
	expenseName.value = "";
	purchaseDate.value = "";
	purchasePrice.value = "";
	noExpenses.hidden = true;

	if (name.data == "" || date.data == "" || amount.data == "") {
		alert("Please fill out all the fields");
		table.removeChild(tableRow);
		if (summary.length == 0) {
			noExpenses.hidden = false;
		}
	}

	removeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		let amountToDelete = parseFloat(amountCol.textContent);
		summary.splice(summary.indexOf(amountToDelete), 1);
		sum = (sum - amountToDelete).toFixed(2);
		table.removeChild(tableRow);
		totalCol.innerHTML = sum;
		if (summary.length == 0) {
			noExpenses.hidden = false;
		}
	});
	expenseName.focus();
}

addBtn.addEventListener("click", addExpense);
