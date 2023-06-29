let myUrl_ = 'https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=';
let typeIdUrl_OLD = 'https://www.fuzzwork.co.uk/api/typeid.php?typename='
let typeIdUrl = 'http://localhost:8000/itemID/'
let location_id_url = 'http://localhost:8000/stationID/'
const esi_url = ["https://esi.evetech.net/latest/markets/", "/orders/?datasource=tranquility&order_type=all&page=1&type_id="]

const capitals_regions = ["10000043", "10000002", "10000032", "10000030"];

let marketsData = [];
let itemID;


//async function getItemID(_element) {
async function getData(_element) {
	
	let itemName = _element.innerText;  
	let getItemIDUrl = typeIdUrl_OLD + itemName; // URL  request get item IDs
	let result;
	

	const getItemIDUrlEncod = encodeURI(getItemIDUrl);
	let xhr = new XMLHttpRequest();
    xhr.open("GET", getItemIDUrlEncod);
    xhr.onreadystatechange = await function () {
        if (xhr.readyState === 4) {
        let resp = JSON.parse(xhr.responseText);
	result = resp["typeID"];
	itemID = resp["typeID"];
	return result;
        }
    }
    xhr.send();
	getItemID(_element);
}



////////////////___________"Working"_CODE______________/////////////

function OnClick(id) {
	let childUl = document.getElementById(id);
	if (childUl.style.display === "block") {
		childUl.style.display = "none";
	} else {childUl.style.display = "block";}
} 


async function getData(elem_ID) {

//   Cleared table for new item or reload/update same.
	document.getElementById('tablebody').innerHTML = ""

// Send request GET item ID

	let itemName = elem_ID.innerText;  
	let getItemIDUrl = typeIdUrl + itemName; // URL  request get item IDs

	const getItemIDUrlEncod = encodeURI(getItemIDUrl);
	let xhr = new XMLHttpRequest();
	xhr.open("GET", getItemIDUrlEncod);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			let resp = JSON.parse(xhr.responseText);
			result = resp["typeID"];
			let itemID = resp["typeID"];
   		
			const req_orders_responce = [];
			capitals_regions.forEach(async function(item){
				const rq_url = encodeURI(esi_url[0] + item + esi_url[1] + itemID);
				let xhr = new XMLHttpRequest();
				xhr.open('GET', rq_url);
				xhr.onreadystatechange = async function () {
					if (xhr.readyState === 4) {
						let resp = JSON.parse(xhr.responseText);
						let orders  = JSON.parse(xhr.responseText);
						for (let order of orders) {
							req_orders_responce.push(order);
							if (!order["is_buy_order"]) {
								let tbody = document.querySelector("tbody"); 
								let template = document.querySelector('#itemrow');
								let clone = template.content.cloneNode(true);
								let td = clone.querySelectorAll('td');
							
								let location_id = order["location_id"];
								location_id = location_id.toString();
								td[0].innerText = order["volume_remain"];
								td[1].innerText = order["price"] + " ISK";
								let xhr = new XMLHttpRequest();
								xhr.open('GET', location_id_url + location_id);
								xhr.onreadystatechange = async function(){
									if (xhr.readyState === 4) {
										let resp = JSON.parse(xhr.responseText);
										td[2].innerText = resp["stationName"]; 

									}
								}
								xhr.send();
								tbody.appendChild(clone);	
							};
						};
					};
				}
				xhr.send();
			})

		}
	}
	xhr.send();

}




//////////////////////////////////////////////////////////////////////////////////////////////////////






	

async function getLocation(_locationID) {
	let id_request = await fetch (location_id_url + _locationID, {method: 'GET', mode: 'no-cors'})
	console.log(id_request);
	let resp = await id_request.json();
	resp = JSON.parse(resp);
	console.log(resp);
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

