var countURL = "http://192.168.1.2:8000/count"

function countResources (){
//    document.getElementById("count").innerHTML = ""
    let xhc = new XMLHttpRequest()
    xhc.open("GET", countURL)
    xhc.onreadystatechange = () => {
        if (xhc.readyState === 4 ) {
            console.log(xhc.responseText)
            let res = JSON.parse(xhc.responseText)
//          let result = xhc.responseText.replace(/"/g, '')
            document.getElementById("iron").innerText = res.iron
        }
    }
    xhc.send()

}
