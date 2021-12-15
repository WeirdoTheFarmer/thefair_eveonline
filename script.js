let myUrl_ = 'https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=';
let typeIdUrl_OLD = 'https://www.fuzzwork.co.uk/api/typeid.php?typename='
let typeIdUrl = 'http://192.168.1.2:8000/itemID/'
let location_id_url = 'http://192.168.1.2:8000/location/'

let marketsData = [];
let itemID;



////////////////___________"Working"_CODE______________/////////////
function OnClick(id) {
	let childUl = document.getElementById(id);
	if (childUl.style.display === "block") {
		childUl.style.display = "none";
	} else {
		childUl.style.display = "block";
	} 
}

async function getData(elem_ID) {
//   Cleared table for new item or reload/update same.
	document.getElementById('tablebody').innerHTML = ""

// Send request GET item ID
	const itemID = await getItemID(elem_ID)

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
					const location = getLocation(element["location_id"]);
					td[0].innerText = element["volume_remain"];
					td[1].innerText = element["price"] + " ISK";
					td[2].innerText = location;
//					td[2].innerText = element["location_id"];
					tbody.appendChild(clone);
				}
			})
			
		})
		.catch(console.error);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

async function getItemID(_element) {
	
	let itemName = _element.innerText;  
	let getItemIDUrl = typeIdUrl + itemName; // URL  request get item IDs

	const getItemIDUrlEncod = encodeURI(getItemIDUrl);	
	let myHeader = new Headers();
	myHeader.append("Content-Type", "application/json");
	const idRequest = await fetch(getItemIDUrlEncod);
	let resp = await idRequest.json();
	return resp["typeID"];
}

async function getLocation(_locationID) {
	const id_request = await fetch (encodeURI(location_id_url + _locationID))	
	let resp = await id_request.json();
	return resp["locationID"];
}
