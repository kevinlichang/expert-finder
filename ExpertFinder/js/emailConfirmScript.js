var url = 'http://flip3.engr.oregonstate.edu:4001/';
var confirmURL = "http://flip3.engr.oregonstate.edu:4001/confirm-profile.html"

$(document).ready(function(){
  var from,to,subject,text;
  $("#register-submit").click(function(){     
    to=$("#email").val();

    subject = "Confirm Profile for " + $("#firstname").val();

    text = "A new profile has been registered for " + $("#firstname").val() + " " + $("#lastname").val() + ". Please click here to confirm: " + confirmURL + "?email=" + $("#email").val();
    
    $.get(url + "send-email-confirm",
    {
      to:to,
      subject:subject,
      text:text},
      function(data){
        alert("Confirmation email sent");
  });
  });



});