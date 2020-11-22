
function storeInput(){
	let inputString = document.getElementById("searchInput").value;
	let inputType = 0;
	if(document.getElementById('searchInputName').checked){
		inputType = 1;
	}
	var data = {'content':inputString, 'type':inputType};
	localStorage.setItem("searchRequest", JSON.stringify(data));
}