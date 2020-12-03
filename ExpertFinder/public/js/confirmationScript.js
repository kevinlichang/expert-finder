let url = document.URL;
urlArr = url.split("/confirm")
url = urlArr[0]
console.log(url);

$(document).ready(function(){
  let profileID = $("#profile-ID").val();

  $("#accept-btn").click(function(){
    $.ajax({
      url: url + "/queries/account/activate",
      method:"PUT",
      data: {
        accountid: profileID
      },
      success: window.location=url+"/approve-profile.html"
    })
  });

  $("#decline-btn").click(function(){
    $.ajax({
      url: url + "/queries/account/activate",
      method:"DELETE",
      data: {
        accountid: profileID
      },
      success: window.location=url+"/decline-profile.html"
    })
  });

});