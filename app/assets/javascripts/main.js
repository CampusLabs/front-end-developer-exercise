//create array of nodes from menu items
var menu = document.querySelectorAll(".stepSelect");
var friendList = document.querySelectorAll(".friendList");
var wrapper = document.querySelector("#babyStep-viewport");
var highlight = document.querySelector("#highlight");
var activeItem = 0;

var xmlhttp = new XMLHttpRequest();
var url = "assets/javascripts/baby-steps.json";


// event listeners
for (var i = 0; i < menu.length; i++) {
    var menuItem = menu[i];
    menuItem.addEventListener('click', setClickedItem, false);
 
    // Store ID value in each item
    menuItem.itemID = i;
    //create empty array to store friends from JSON data
    menuItem.friends = [];
}
 
// set first menu item as active
menu[activeItem].classList.add("active");

//load JSON data
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var text = (xmlhttp.responseText);
        var obj = JSON.parse(text);
        var array = obj.friends;
        var sortedArray = sortByKey(array, 'lastName');
        populateSteps(sortedArray);
        //console.log(newArray);

    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

//when menu is clicked, sets active menu item
function setClickedItem(e) {
    removeActiveLinks();
    var clickedItem = e.target;
    activeItem = clickedItem.itemID;
    changePosition(clickedItem);
}
 
function removeActiveLinks() {
    for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("active");
    }
}
 
// Handles moving the position of the active menu highlight
// as well as the Baby Step window position
function changePosition(link) {
    highlight.style.top = (60* activeItem) + "px";
    link.classList.add("active");
 
    var position = link.getAttribute("data-pos") + "px";
    wrapper.style.top = position;
}
//takes the alphabetized array and pushes each name onto the corresponding friends array
function populateSteps(arr){
    for(i=0; i<arr.length;i++){
    	var step = arr[i].babyStep;
    	menu[step-1].friends.push(arr[i].firstName + " " + arr[i].lastName);    
    }
    for(j=0; j<menu.length; j++){
    	var str;
    	var length = menu[j].friends.length;
		switch (length) {
			case 0:
				str = "";
				break;
			case 1:
				str = "<a href='#' class='friendName'>" + menu[j].friends[0] + "</a> is also in Baby Step " + (j + 1);
				break;
			case 2:
				str = "<a href='#' class='friendName'>" + menu[j].friends[0] + "</a> and <a href='#'>" + menu[j].friends[1] + "</a> are also in Baby Step " + (j + 1);
				break;
			case 3:
				str = "<a href='#' class='friendName'>" + menu[j].friends[0] + "</a>, <a href='#'>" + menu[j].friends[1] + "</a> and 1 other friend are also in Baby Step " + (j + 1);
				break;
			default:
				str = "<a href='#' class='friendName'>" + menu[j].friends[0] + "</a>, <a href='#'>" + menu[j].friends[1] + "</a> and " + (length-2) + " other friends are also in Baby Step " + (j + 1);
				break;
		} 
		friendList[j].innerHTML = "<p>"+str+"</p>";
    }
}
//sorts array by key
function sortByKey(arr, key) {
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
});
    
}
