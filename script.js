let myUrl_ = 'https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=';
let typeIdUrl_OLD = 'https://www.fuzzwork.co.uk/api/typeid.php?typename='
let typeIdUrl = 'http://192.168.1.2:8000/itemID/'

let marketsData = [];
let itemID;



////////////////___________"Working"_CODE______________/////////////
function OnClick(id) {
	let childUl = document.getElementById(id);
	if (childUl.style.display === "block") {
		childUl.style.display = "none";
//		} else if (childUl.style.display === undefined) {
//			childUl.style.display = "none";
	} else {
		childUl.style.display = "block";
	} 
}

async function getData(elem_ID) {
//   Cleared table for new item or reload/update same.
	document.getElementById('tablebody').innerHTML = ""
	
// Replace "space" in item name to "%20" cuz dindt work LOL
//	let itemName = elem_ID.innerText.replace(" ", "%20");  
	let itemName = elem_ID.innerText;  

	let getItemIDUrl = typeIdUrl + itemName; // URL for request to fuzzwork and get item IDs

	const getItemIDUrlEncod = encodeURI(getItemIDUrl);	
	
	let myHeader = new Headers();
	myHeader.append("Content-Type", "application/json");
	const idRequest = await fetch(getItemIDUrlEncod);
	let resp = await idRequest.json();
	itemID = resp["typeID"];

	let req = myUrl_ + itemID; // URL for request to esi evetech for prices/location/quantity etc.
	await fetch(req)
		.then(response => response.json())
		.then(data => {
			data.forEach((element, index, array) => {
				let tbody = document.querySelector("tbody"); 
				let template = document.querySelector('#itemrow');

				let clone = template.content.cloneNode(true);
				let td = clone.querySelectorAll('td');

				if (!element["is_buy_order"]){
					td[0].innerText = element["volume_remain"];
					td[1].innerText = element["price"] + " ISK";
					td[2].innerText = element["location_id"];
					tbody.appendChild(clone);
				}
			})
			
		})
		.catch(console.error);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

function getPrices(thisElement) {
	let tbody = document.querySelector("tbody");
	let template = document.querySelector('#itemrow');

	let clone = template.content.cloneNode(true);
	let td = clone.querySelectorAll('td');



	let myTable = document.getElementById('pricetable');
	let thisElementId = ""

	let itemName = thisElement.innerText;
	itemName = itemName.replace(" ", "%20");
	console.log(typeIdUrl + itemName)

	let myRequest = new Request(typeIdUrl + itemName, {mode: 'no-cors'});
	
	makeRequest(myRequest);


	let itemUrl = myUrl_ + thisElementId; 

	fetch(itemUrl)
		.then(response => response.json().then(data =>{
			myTable.innerHTML = '<tr>' + '<th>Quantity</th>' +	'<th>Price</th>' + '<th>Location</th>' + '</tr>';
			data.forEach(element  => {
				if (!element["is_buy_order"]) {
					td[0].innerText = element["volume_ramain"];
					tbody.appendChild(clone);

//				myTable.innerHTML += '<tr>' + '<td>' + element["volume_remain"] + '</td>' +
//											  '<td>' + element["price"] + '</td>' +
//											  '<td>' + element["location_id"] + '</td>' +
//									'</tr>';
				}
			})
		}));
}	
	

function getTypeId(itemName) {
	fetch((typeIdUrl + _typeID))
		.then(response => response.json().then(data => {
			if (data["typeName"] === _typeID){
				console.log("1")
//				return toString(data["typeID"]);
				return "27920";
			} else {
				console.log("Wrong TypeName For ID")
			}
		}))
}
