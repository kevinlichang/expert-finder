var data = localStorage['searchRequest'];
if(data){
localStorage.removeItem('searchRequest');
var inputString = JSON.parse(data).content;
var inputType = JSON.parse(data).type;
}
var apiKey = "";
var expertList = {};

function Expert(name, email, classes, skills, org, linkedin, twitter, github, project) {
  this.name = name; 
  this.email = email;
  this.classes = classes;
  this.skills = skills; 
  this.org = org; 
  this.linkedin = linkedin;
  this.twitter = twitter;
  this.github = github;
  this.project = project;
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
        	expertList.push(new Expert(response[i].name, response[i].email, response[i].classes,
        		response[i].skills, response[i].org, response[i].linkedin, response[i].twitter,
        		response[i].github, response[i].project));	
        }
      }else{
        console.log("Error in network request: " + req.statusText);
      }});
}


var exampleExperts = [
	new Expert("Emily Earnhardt", "EEarnhardt@gmail.com", "cs160 cs161 cs162 cs352 cs361 cs373 cs389 cs429 cs583 cs678", 
		"Java Javascript Python C C++ C# HTML", "Amazon", "linkedin.com/EEarnhardt", "twitter.com/EEarnhardt",
		"github.com/EEarnhardt", "Project5 github.com/EEarnhardt/project5"),
	new Expert("Mark Smith", "MSmith@gmail.com", "cs160 cs241 cs267 cs322 cs334 cs363 cs372 cs438 cs517 cs663", 
		"Node Javascript Python C C++ HTML mySQL", "NASA Google", "linkedin.com/MSmith", "twitter.com/MSmith",
		"github.com/MSmith", "Project2 github.com/MSmith/project2")
];



function showProfile(result,index,event){
	let color = document.getElementsByClassName("clickable-row");
	for(let i = 0; i < color.length; i++){
		color[i].className = "clickable-row";
		if(i == index){
			color[i].className="clickable-row colored";
		}
	}
	document.getElementById("selectedName").innerHTML = result[index].name;
	document.getElementById("selectedEmail").innerHTML = result[index].email;
	document.getElementById("selectedClasses").innerHTML = result[index].classes;
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
	for(let i = 0; i < exampleExperts.length; i++){
		var newRow = document.createElement("tr");
		newRow.className = "clickable-row";
		newRow.setAttribute('onclick', 'showProfile(exampleExperts,'+ i +')')
		var newTH = document.createElement("th");
		tbody.appendChild(newRow);
		newRow.appendChild(newTH);
		newTH.innerHTML = exampleExperts[i].name;
	}
}

expertList = exampleExperts;
//sendData();
listNames(expertList);
showProfile(expertList,0);

var request = new XMLHttpRequest();
        request.open('GET','https://api.github.com/users/kevinlichang/repos' , 
        true)
        request.onload = function() {
            var data = JSON.parse(this.response);
            console.log(data);
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
