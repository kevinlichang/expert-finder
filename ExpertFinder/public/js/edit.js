var id = 0;

$(function() {
    var $classes = $('#classes');
    var $class = $('#class');
    var $title = $('#title');

    $.ajax({
        type: 'GET',
        headers: {"Content-Type": "application/json"},
        url: 'http://localhost:4001/queries/usertags?accountid=2&tagtype=class',
        success: function(classes) {
            $.each(classes, function(i, item) {
                $.each(item, function(i, cl) {
                    // Add 2 spans arounnd both cl.tag_name and cl.tag_desc, ADD two new input 
                    $classes.append('<li>Class: ' + "<span class='sclass'>" + cl.tag_name + '</span>' + 
                    "  <input class='editc'/>'" + '<br>Title: ' + "<span class='sdesc'>" + cl.tag_description 
                    + '</span>' + "  <input class='editd'/>'" + '<br>' + "<button class='remove'>X</button>" 
                    + "  <button class='save'>Save</button>" + '</li');
                }); 
            });
        } 
        //,
        //error: function() {
        //    alert('error loading classes');
        //}
    });

    var $skills = $('#skills');
    var $skill = $('#skill');

    $.ajax({
        type: 'GET',
        headers: {"Content-Type": "application/json"},
        url: 'http://localhost:4001/queries/usertags?accountid=1&tagtype=skill',
        success: function(classes) {
            $.each(classes, function(i, item) {
                $.each(item, function(i, cl) {
                    // Add 2 spans arounnd both cl.tag_name and cl.tag_desc, ADD two new input 
                    $skills.append('<li>Skill: ' + "<span class='sclass'>" + cl.tag_name + '</span>' + 
                    "  <input class='editc'/>'" + '<br>'+ "<button class='remove'>X</button>" 
                    + "  <button class='save'>Save</button>" + '</li');
                }); 
            });
        } 
        //,
        //error: function() {
        //    alert('error loading classes');
        //}
    });

     // Industry/org
     var $orgs = $('#orgs');
     var $organization = $('#org');
     var $position = $('#pos');
 
     $.ajax({
         type: 'GET',
         headers: {"Content-Type": "application/json"},
         url: 'http://localhost:4001/queries/usertags?accountid=1&tagtype=org',
         success: function(classes) {
             $.each(classes, function(i, item) {
                 $.each(item, function(i, cl) {
                     // Add 2 spans arounnd both cl.tag_name and cl.tag_desc, ADD two new input 
                     $orgs.append('<li>Organization: ' + "<span class='sclass'>" + cl.tag_name + '</span>' + 
                     "  <input class='editc'/>'" + '<br>Position: ' + "<span class='sdesc'>" + cl.tag_description 
                     + '</span>' + "  <input class='editd'/>'" + '<br>' + "<button class='remove'>X</button>" 
                     + "  <button class='save'>Save</button>" + '</li');
                 }); 
             });
         } 
         //,
         //error: function() {
         //    alert('error loading classes');
         //}
     });

    $('#add-class').on('click', function(){
        var name =  $class.val();
        var desc = $title.val();

        var add_class = {
            "tag_name": $class.val(),
            "tag_description": $title.val(),
            "tag_show": 1,
        };

        $classes.append('<li>Class: ' + "<span class='sclass'>" + name + '</span>' + 
        "  <input class='editc'/>'" + '<br>Title: ' + "<span class='sdesc'>" + desc 
        + '</span>' + "  <input class='editd'/>'" + '<br>' + "<button class='remove'>X</button>" 
        + "  <button class='save'>Save</button>" + '</li');

        $.ajax({
            type: 'POST',
            headers: {"Content-Type": "application/json"},
            url: 'http://localhost:4001/queries/usertags?accountid=2&tagtype=class',
            data: JSON.stringify(add_class),
            
            sucess: function() {
                $classes.append('<li>Class: ' + name +'<br>Title: ' + desc + '</li');
            }
        });
    });

    $classes.delegate('.remove', 'click', function(){
        var $li = $(this).closest('li');

        $li.remove();

    });

    $classes.delegate('.save', 'click', function(){
        var $li = $(this).closest('li');
        $li.find('span.sclass').text($li.find('input.editc').val() );
        $li.find('input.editc').val("");

        $li.find('span.sdesc').text($li.find('input.editd').val() );
        $li.find('input.editd').val("");

    });

    $('#add-skill').on('click', function(){
        var name =  $skill.val();

        var add_skill = {
            "tag_name": $skill.val(),
            "tag_show": 1,
        };

        $skills.append('<li>Skill: ' + "<span class='sclass'>" + name + '</span>' + 
        "  <input class='editc'/>'" + '<br>' + "<button class='remove'>X</button>" 
        + "  <button class='save'>Save</button>" + '</li');

        $.ajax({
            type: 'POST',
            headers: {"Content-Type": "application/json"},
            url: 'http://localhost:4001/queries/usertags?accountid=1&tagtype=skill',
            data: JSON.stringify(add_skill),
            
            sucess: function() {
                
            }
        });
    });

    $skills.delegate('.remove', 'click', function(){
        var $li = $(this).closest('li');

        $li.remove();

    });

    $skills.delegate('.save', 'click', function(){
        var $li = $(this).closest('li');
        $li.find('span.sclass').text($li.find('input.editc').val() );
        $li.find('input.editc').val("");

        $li.find('span.sdesc').text($li.find('input.editd').val() );
        $li.find('input.editd').val("");

    });

   

    $('#add-org').on('click', function(){
        var name =  $organization.val();
        var desc = $position.val();

        var add_org = {
            "tag_name": $organization.val(),
            "tag_description": $position.val(),
            "tag_show": 1,
        };

        $orgs.append('<li>Organization: ' + "<span class='sclass'>" + name + '</span>' + 
        "  <input class='editc'/>'" + '<br>Position: ' + "<span class='sdesc'>" + desc 
        + '</span>' + "  <input class='editd'/>'" + '<br>' + "<button class='remove'>X</button>" 
        + "  <button class='save'>Save</button>" + '</li');

        $.ajax({
            type: 'POST',
            headers: {"Content-Type": "application/json"},
            url: 'http://localhost:4001/queries/usertags?accountid=1&tagtype=org',
            data: JSON.stringify(add_org),
            
            sucess: function() {

            }
        });
    });

    $orgs.delegate('.remove', 'click', function(){
        var $li = $(this).closest('li');

        $li.remove();

    });

    $orgs.delegate('.save', 'click', function(){
        var $li = $(this).closest('li');

        if ($li.find('input.editc').val().length != 0 && $li.find('input.editd').val().length != 0) {
            $li.find('span.sdesc').text($li.find('input.editd').val() );
            $li.find('input.editd').val("");
            $li.find('span.sclass').text($li.find('input.editc').val() );
            $li.find('input.editc').val(""); 
        }
        else if($li.find('input.editc').val().length === 0) {
            $li.find('span.sdesc').text($li.find('input.editd').val() );
            $li.find('input.editd').val("");
        } else {
            $li.find('span.sclass').text($li.find('input.editc').val() );
            $li.find('input.editc').val(""); 
        }
     
    });

});