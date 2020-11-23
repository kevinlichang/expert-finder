var data = localStorage['searchRequest'];
if(data){
localStorage.removeItem('searchRequest');
var inputString = JSON.parse(data).content;
var inputType = JSON.parse(data).type;
}
var apiKey = "";
var expertList = {};

class Expert{
	constructor(fname, lname, email, phone, classes, skills, org, linkedin, twitter, github, project){
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


var exampleExperts = [
	new Expert("Emily", "Earnhardt", "EEarnhardt@gmail.com", "5413602345", ["cs160","cs161","cs162","cs352","cs361","cs373","cs389","cs429","cs583","cs678"], 
		"[Java,Javascript,Python,C,C++,C#,HTML]", "[Amazon]", "linkedin.com/EEarnhardt", "twitter.com/EEarnhardt",
		"github.com/EEarnhardt", "Project5 github.com/EEarnhardt/project5"),
	new Expert("Mark", "Smith", "MSmith@gmail.com", "5416472293", ["cs160","cs241","cs267","cs322","cs334","cs363","cs372","cs438","cs517","cs663"], 
		"[Node,Javascript,Python,C,C++,HTML,mySQL]", "[NASA,Google]", "linkedin.com/MSmith", "twitter.com/MSmith",
		"github.com/MSmith", "Project2 github.com/MSmith/project2")
];
expertList = exampleExperts;



function showProfile(result,index,event){
	previousTD = document.getElementsByClassName("fixedTD");
	let pl = previousTD.length;
	for(let i = 0; i < pl; i++){
		previousTD[i].parentElement.removeChild(previousTD[i]);
	}
	let color = document.getElementsByClassName("clickable-row");
	for(let i = 0; i < color.length; i++){
		color[i].className = "clickable-row";
		if(i == index){
			color[i].className="clickable-row colored";
		}
	}
	document.getElementById("selectedName").innerHTML = result[index].fname + " "+result[index].lname;
	document.getElementById("selectedEmail").innerHTML = result[index].email;
	document.getElementById("selectedPhone").innerHTML = result[index].phone;
	let tempClass = document.getElementById("selectedClasses");
	for(let j = 0; j < result[index].classes.length; j++){
		var newTD = document.createElement("td");
		newTD.className="fixedTD";
		tempClass.appendChild(newTD);
		newTD.innerHTML = result[index].classes[j];
	}
	
	document.getElementById("selectedSkills").innerHTML = result[index].skills;
	document.getElementById("selectedOrg").innerHTML = result[index].org;
	document.getElementById("selectedLinkedin").innerHTML = result[index].linkedin;
	document.getElementById("selectedLinkedin").href = result[index].linkedin;
	document.getElementById("selectedTwitter").innerHTML = result[index].twitter;
	document.getElementById("selectedTwitter").href = result[index].twitter;
	document.getElementById("selectedGit").innerHTML = result[index].github;
	document.getElementById("selectedGit").href = result[index].github;
	document.getElementById("selectedProject").innerHTML = result[index].project;
	document.getElementById("selectedProject").href = result[index].project;
	if(event){
		event.preventDefault();
	}
}

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


//sendData();
listNames(expertList);
showProfile(expertList,0);

