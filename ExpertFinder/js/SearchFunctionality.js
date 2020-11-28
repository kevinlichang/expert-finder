//data inheritted from the index page
var data = localStorage['searchRequest'];
if(data){
localStorage.removeItem('searchRequest');
var inputString = JSON.parse(data).content;
var inputType = JSON.parse(data).type;
}
var apiKey = "";
var expertList = {};


//class that store the data returned from the database
class Expert{
	constructor(eid, fname, lname, email, phone, classes, skills, org, linkedin, twitter, github, project){
		this.eid = eid;
		this.fname = fname;
		this.lname = lname; 
		this.email = email;
		this.phone = phone
		this.classes = classes;
		this.skills = skills; 
		this.org = org; 
		this.linkedin = linkedin;
		this.twitter = twitter;
		this.github = github;
		this.project = project;
	}
}

//sent get request based on the search type 
function sendData(){
	var req = new XMLHttpRequest();
	//if search by Name
	if(inputType == 1){
		req.open("GET", "Link to search by name"+inputString+"&appid="+apiKey, true);
	//if search by classes, skills and org
	}else{
		req.open("GET", "Link to search by CSO"+inputString+"&appid="+apiKey, true);
	}
	req.send(null);
	req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for(let i = 0; i < response; i++){
        	let temp = new expert();
        	temp.eid = response[i].id;
        	temp.fname = response[i].fname;
        	temp.lname = response[i].lname;
        	temp.email = response[i].email;
        	temp.phone = response[i].phone;
        	temp.classes = response[i].classes;
        	temp.skills = response[i].skills;
        	temp.org = response[i].org;
        	temp.linkedin = response[i].linkedin;
        	temp.twitter = response[i].twitter;
        	temp.github = response[i].github;
        	temp.project = response[i].project;
        	expertList.push(temp);	
        }
      }else{
        console.log("Error in network request: " + req.statusText);
      }});
}


//implement temporary testing array is used before database implementation finishes. 
var exampleExperts = [
	new Expert(3, "Emily", "Earnhardt", "EEarnhardt@gmail.com", "5413602345", ["cs160","cs161","cs162","cs352","cs361","cs373","cs389","cs429","cs583","cs678"], 
		["Java","Javascript","Python","C","C++","C#","HTML"], ["Amazon"], "linkedin.com/EEarnhardt", "twitter.com/EEarnhardt",
		"github.com/EEarnhardt", 'https://api.github.com/users/kevinlichang/repos' ),
	new Expert(4, "Mark", "Smith", "MSmith@gmail.com", "5416472293", ["cs160","cs241","cs267","cs322","cs334","cs363","cs372","cs438","cs517","cs663"], 
		["Node","Javascript","Python","C","C++","HTML","mySQL"], ["NASA","Google"], "linkedin.com/MSmith", "twitter.com/MSmith",
		"github.com/MSmith", 'https://api.github.com/users/clarjohn/repos' )
];
expertList = exampleExperts;

//formate the string made by classes, skills, or org 
function formatStr(objStr){
	var tempStr = "";
	for(let j = 0; j < objStr.length; j++){
		tempStr += objStr[j];
		if(j != objStr.length - 1){
			tempStr += ", ";
		}
	}
	return tempStr;
}

//used to send current selected data to the menter-profile page
var profileIndex = 0;

function gitProject(reposLink){
	var request = new XMLHttpRequest();
    request.open('GET', reposLink, 
    true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        var statusHTML = '';
        $.each(data, function(i, status){
            statusHTML += '<div class="card"> \
                                <a href= '+status.html_url+'> ' + status.name +  ' </a> \
                            </div>';
        });
        $('.repos').html(statusHTML);
    }
    request.send();
	// Get the modal
	var modal = document.getElementById("myModal");
	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// When the user clicks on the button, open the modal
	btn.onclick = function() {
	  modal.style.display = "block";
	}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
}

//implementation of the page changed after clicking the expert's name 
function showProfile(result,index,event){
	let color = document.getElementsByClassName("clickable-row");
	for(let i = 0; i < color.length; i++){
		color[i].className = "clickable-row";
		if(i == index){
			color[i].className="clickable-row colored";
			profileIndex = i;
		}
	}
	document.getElementById("selectedName").innerHTML = result[index].lname+" "+result[index].fname;
	document.getElementById("selectedEmail").innerHTML = result[index].email;
	document.getElementById("selectedPhone").innerHTML = result[index].phone;
	document.getElementById("selectedClasses").innerHTML = formatStr(result[index].classes);
	document.getElementById("selectedSkills").innerHTML = formatStr(result[index].skills);
	document.getElementById("selectedOrg").innerHTML = formatStr(result[index].org);
	document.getElementById("selectedLinkedin").innerHTML = result[index].linkedin;
	document.getElementById("selectedLinkedin").href = result[index].linkedin;
	document.getElementById("selectedTwitter").innerHTML = result[index].twitter;
	document.getElementById("selectedTwitter").href = result[index].twitter;
	document.getElementById("selectedGit").innerHTML = result[index].github;
	document.getElementById("selectedGit").href = result[index].github;
	gitProject(result[index].project);
	if(event){
		event.preventDefault();
	}
}

//implementation of the clickable names listed in the left half of search result page
function listNames(result){
	if(inputString){
		document.getElementById('searchInputString').innerHTML = inputString;
	}
	var tbody = document.getElementById("tableBody");
	for(let i = 0; i < expertList.length; i++){
		var newRow = document.createElement("tr");
		newRow.className = "clickable-row";
		newRow.setAttribute('onclick', 'showProfile(expertList,'+ i +')')
		var newTH = document.createElement("th");
		tbody.appendChild(newRow);
		newRow.appendChild(newTH);
		newTH.innerHTML = expertList[i].lname+" "+expertList[i].fname;
	}
}

//to send data to mentor-profile page when user click update button in this page
function storeUpdate(){
	var update = expertList[profileIndex];
	localStorage.setItem("updateData", JSON.stringify(update));
}




//sendData();
listNames(expertList);
showProfile(expertList,0);
gitProject();

