//implement temporary testing array is used before database implementation finishes. 
var testExperts = [
  {
      userid: 1,
      fname: "John",
      lname: "clarke",
      phone: "999999999",
      email: "clarjohn@oregonstate.edu",
      linkedin: "https://www.linkedin.com/in/jclarkew/",
      github: "https://github.com/clarjohn",
      twitter: "",
      classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
                {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
                {tag_name: "CS 290", tag_description:"Intro web development" ,tag_show:true}],
      skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
              {tag_name: "SQL", tag_description:"" ,tag_show:true}],
      org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
  {
    userid: 2,
    fname: "Jane",
    lname: "Doe",
    phone: "999999999",
    email: "DoeJane@oregonstate.edu",
    linkedin: "",
    github: "",
    twitter: "",
    classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
            {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
            {tag_name: "CS 290", tag_description:"Intro web development" ,tag_show:true}],
    skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
            {tag_name: "SQL", tag_description:"" ,tag_show:true}],
    org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
  {
      userid: 3,
      fname: "Emily",
      lname: "Earnhardt",
      phone: "5413602345",
      email: "EEarnhardt@oregonstate.edu",
      linkedin: "https://www.linkedin.com/in/EEarnhardt/",
      github: "https://github.com/kevinlichang",
      twitter: "https://twitter.com/EEarnhardt",
      classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
                {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
                {tag_name: "CS 290", tag_description:"Intro web development" ,tag_show:true}],
      skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
              {tag_name: "SQL", tag_description:"" ,tag_show:true}],
      org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
  {
    userid: 4,
    fname: "Mark",
    lname: "Smith",
    phone: "5413602345",
    email: "MSmith@oregonstate.edu",
    linkedin: "https://www.linkedin.com/in/MSmith/",
    github: "https://github.com/clarjohn",
    twitter: "https://twitter.com/MSmith",
    classes:[{tag_name: "CS 161", tag_description:"Intro Computer Science" ,tag_show:true},
            {tag_name: "CS 162", tag_description:"Intro Computer Science 2" ,tag_show:true},
            {tag_name: "CS 344", tag_description:"Intro web development" ,tag_show:true}],
    skills:[{tag_name: "Python", tag_description:"" ,tag_show:true},
            {tag_name: "SQL", tag_description:"" ,tag_show:true}],
    org:[{tag_name: "Climate Corp", tag_description:"Product Manager" ,tag_show:true}],
  },
];




$('#searchInput').keypress(function(e){
    if(e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

function storeInput(){
	let inputString = document.getElementById("searchInput").value;
	let inputType = 0;
	if(document.getElementById('searchInputName').checked){
		inputType = 1;
	}
	var data = {'content':inputString, 'type':inputType};
	if(localStorage['searchRequest']){
		localStorage.removeItem('searchRequest');
	}
	localStorage.setItem("searchRequest", JSON.stringify(data));

	/*var testData = {'content':testExperts};
	if(!(localStorage['experts'])){
		localStorage.setItem("experts", JSON.stringify(testData));
	}*/
}