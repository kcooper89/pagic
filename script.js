//create variables
var currentDay = $("#currentDay");
var timeBlock = $(".timeBlock");
var scheduleArea = $(".schedule");

var toDo = [];
//each object has a hour property and a text property
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//if we don't have any todos set up, let's set up the array of objects
function initializeSchedule(){
//  console.log(toDoItems);

//for each time block
  $timeBlock.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      //set related todo hour to same as data-hour
      hour: thisBlockHr,
      //get text ready to accept string input
      text: "",
    }
    //add this todo object to todoitems array
    toDo.push(todoObj);
  });

  //once we have looped thru timeblocks, save this array of objects to local storage by stringifying it first
  localStorage.setItem("todos", JSON.stringify(toDo));
  //console.log(toDoItems);
}

//format timeblock colors depending on time
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      //add style to time blocks to show where we are in the day
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  toDo = localStorage.getItem("todos");
  toDo = JSON.parse(toDo);

  //loop thru array then assign the text to the timeBlock with data-hour equal to hour. 
  //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDo[i].hour;
    var itemText = toDo[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDo);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  //see which item we need to update based on the hour of the button clicked matching
  for (var j = 0; j < toDo.length; j++){
    if (toDo[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDo[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDo));
  renderSchedule();
}

// when the document loads
(document).ready(function(){

  //format the timeblocks depending on time
  setUpTimeBlocks();
  //if there's nothing for the todos in local storage
  if(!localStorage.getItem("todos")){
    //initialize the array of objects
    initializeSchedule();
  } //otherwise dont bother bc we get it from local storage

  //display current date
  currentDay.text(currentDate);

  //render schedule from local storage
  renderSchedule();
  //when a todo item save button is clicked, save it
  scheduleArea.on("click", "button", saveHandler);
  
});