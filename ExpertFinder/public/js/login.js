
function getSessionID(){
    var req = new XMLHttpRequest();
    var sessID;
    
    req.open('GET', 'localhost:4001/sessionID', true);

    req.onload = function () {
        if (this.status === 200){
            console.log('Inside the getSession')
            console.log(this.response);
        }
    }
    req.send()
    return sessID;
}


function storeSessionID(){
	let inputString = req.body("searchInput").value;
	let inputType = 0;
	if(document.getElementById('searchInputName').checked){
		inputType = 1;
	}
	var data = {'content':inputString, 'type':inputType};
	if(localStorage['searchRequest']){
		localStorage.removeItem('searchRequest');
	}
	localStorage.setItem("searchRequest", JSON.stringify(data));
}

var sessID = getSessionID();
