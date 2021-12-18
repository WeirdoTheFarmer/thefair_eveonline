let myUrl_ = 'https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=';
let typeIdUrl_OLD = 'https://www.fuzzwork.co.uk/api/typeid.php?typename='
let typeIdUrl = 'http://192.168.1.2:8000/itemID/'
let location_id_url = 'http://192.168.1.2:8000/stationID/'
const esi_url = ["https://esi.evetech.net/latest/markets/", "/orders/?datasource=tranquility&order_type=all&page=1&type_id="]

const capitals_regions = ["10000043", "10000002", "10000032", "10000030"];

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

	const req_orders_responce = [];
	
	capitals_regions.forEach(async function(item){
		
		const rq_url = encodeURI(esi_url[0] + item + esi_url[1] + itemID);
		let request = new XMLHttpRequest();
		request.open('GET', rq_url);
		request.responseType = 'json';
		request.onload = async function() {
			let orders  = JSON.stringify(request.response);
			orders = JSON.parse(orders);
		
			for (let order of orders) {
				req_orders_responce.push(order);
				if (!order["is_buy_order"]) {
					let tbody = document.querySelector("tbody"); 
					let template = document.querySelector('#itemrow');
					let clone = template.content.cloneNode(true);
					let td = clone.querySelectorAll('td');
				
					let location_id = order["location_id"];
					location_id = location_id.toString();
					let location = await getLocation(location_id);
					td[0].innerText = order["volume_remain"];
					td[1].innerText = order["price"] + " ISK";
					td[2].innerText = location;
					tbody.appendChild(clone);	
				
				}
			
			}
		
		}
		request.send();
	})


}	
//////////////////////////////////////////////////////////////////////////////////////////////////////

async function getItemID(_element) {
	
	let itemName = _element.innerText;  
	let getItemIDUrl = typeIdUrl + itemName; // URL  request get item IDs

	const getItemIDUrlEncod = encodeURI(getItemIDUrl);	
	let myHeader = new Headers();
	myHeader.append("Content-Type", "application/json");
	const idRequest = await fetch(getItemIDUrl);
	let resp = await idRequest.json();
	return resp["typeID"];
}

async function getLocation(_locationID) {
	const id_request = await fetch (location_id_url + _locationID);
	let resp = await id_request.json();
	return resp["stationName"];
}

async function get_orders_data(_item_id) {
	const orders_request = await fetch(encodeURI(myUrl_ + _item_id));
	const orders_json = await orders_request.json();
	return orders_json;
}

function get_orders(_item_id) {
	const rq_url = encodeURI(myUrl_ + _item_id);
	let request = new XMLHttpRequest();
	request.open('GET', rq_url);
	request.responseType = 'json';
	request.onload = function() {
		let orders  = JSON.stringify(request.response);
		return orders;
	}
	request.send();
}

async function open_json_file(_locationID) {
	const id_request = await fetch ('http://192.168.1.2/stationID.json');
	let resp = await id_request.json();
	return resp[_locationID]["stationName"];
	
}