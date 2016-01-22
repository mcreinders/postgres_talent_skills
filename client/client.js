/**
 * Created by user on 1/20/16.
 */
var abilityData = [];
var returnedData = [];

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


    $('.hideSkills').on('click',function(){
       $('#skillsContainer').hide();
    });

    $('.showSkills').on('click',function(){
        $('#skillsContainer').show();
        $.ajax({
            type: "GET",
            url: "api/getSkills",
            success: function(data){
                abilityData = data;
                appendTasks();
            }
        });
    });

    $("#talentForm").submit(function(event){
        event.preventDefault();

        var talentData = $("#talentForm, .skillsClass").serialize();

        $.ajax({
            type: "POST",
            data: talentData,
            url: "api/addTalent",
            success: function(data){
                returnedData = data;
                appendTalent();
            }

        });
    });
});


function appendTasks(){
    $("#someContainer").empty();

    $("#someContainer").append("<form class='skillsClass'></form>");

    for(var i = 0 ; i < abilityData.length ; i ++){
        var $el = $("#someContainer").children().last();
        $el.data("name", abilityData[i].name);
        $el.append("<input type='checkbox' name='idOfSkill' class='lead' value=" + abilityData[i].id + ">" + abilityData[i].name + "</input>");
    }
}

function appendTalent(){
    $("#anotherContainer").empty();

    for(var i = 0 ; i < returnedData.length ; i ++){
        $("#anotherContainer").append("<div class='talentClass'></div>");
        var $el = $("#anotherContainer").children().last();
        $el.append("<p name='talent' class='lead'>" + returnedData[i].first_name + ' ' + returnedData[i].last_name + ' ' + returnedData[i].phone + ' $'+ returnedData[i].low_range + ' $'+ returnedData[i].high_range +"</p>");
    }
}

