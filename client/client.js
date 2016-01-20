/**
 * Created by user on 1/20/16.
 */
var abilityData = [];

$(document).ready(function(){
   $("#skillsForm").submit(function(event){
      event.preventDefault();

       var skillsData = $("#skillsForm").serialize();

       $.ajax({
          type: "POST",
           data: skillsData,
           url: "api/addSkills",
           success: function(data){
               abilityData = data;
               appendTasks();
           }

       });
   });
});

function appendTasks(){
    $("#someContainer").empty();

    for(var i = 0 ; i < abilityData.length ; i ++){
        $("#someContainer").append("<div class='skillsClass'></div>");
        var $el = $("#someContainer").children().last();
        $el.data("name", abilityData[i].name);
        $el.append("<p class='lead'>" + abilityData[i].name + "</p>");
        //$el.append("<button class='btn btn-danger delete'>X</button>");
    }
}

