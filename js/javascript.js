let box = document.querySelector('.hamburger_menu_button');
let container = document.querySelector('#index_container_section');

try{document.querySelector(".menu_button_open").addEventListener("click", showMenu, false)}
catch{console.log("No menu")}
try{document.querySelector(".menu_button_close").addEventListener("click", showMenu, false)}
catch{console.log("No menu")}


function showMenu(){
  console.log("This shit was pressed");
  let menu = document.querySelector(".nav_hamburger_menu")
  menu.classList.toggle("show")
}

instantiatePageButton(".map_page_button", "/map.html");
instantiatePageButton(".map_page_button2", "/map.html");

instantiatePageButton(".home_page_button", "/index.html");
instantiatePageButton(".home_page_button2", "/index.html");

instantiatePageButton("#mille_hallenberg_page_button", "/mille.hallenberg.html");
instantiatePageButton("#adam_adamsson_page_button", "/adam.adamsson.html");

//A function that tries to add button
function instantiatePageButton(element, page){
  try{
    document.querySelector(element).addEventListener("click", function() { location.href = page }, false );
  }
  catch{
    console.log("Could not create button");
  }
}

// document.getElementsByClassName("map_node").addEventListener("click", switchShit());

function switchShit(){
  
}

var screen_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var screen_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

let body = document.getElementsByTagName("body");



//Disables scrolling on desktop (Could not get it working with CSS)
window.onscroll = function() {
  window.scrollTo(0, 0);
};

//Disable scrolling on phone (I found this solution on this page: 
//https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily)

//Disables default operation
function preventDefault(e) {
  e.preventDefault();
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
//Adds an eventListener that listens to "touchmove" and prevents the operation.

window.onload = (event) => {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  
  if (page == "map.html") {
    console.log("yes this was called");
    window.addEventListener('touchmove', preventDefault, wheelOpt);
  }
  else window.removeEventListener('touchmove', preventDefault, wheelOpt);
  // else enablePageScrolling();
};


//Drag on computer
try{
  dragElement(document.getElementById("map"));
}
catch{
  console.log("There is no draggable element on this page (Computer)");
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Drag on mobile
try {
  var touch_drag = document.getElementById("map")
} 
catch{
  console.log("There is no draggable element on this page (Touch)")
}

var offsetX = 0
var offsetY = 0

var touch_drag_left = 0 + "px";
var touch_drag_top = 0 + "px";

if (touch_drag != null){
  touch_drag.addEventListener("touchstart", function(ev){
    var touchLocation = ev.targetTouches[0];
  
    offsetX = parseInt(touch_drag_left) - touchLocation.pageX;
    offsetY = parseInt(touch_drag_top) - touchLocation.pageY;
  })
  
  touch_drag.addEventListener("touchmove", function(ev){
      var touchLocation = ev.targetTouches[0];
      
      var x = touchLocation.pageX + offsetX;
      var y = touchLocation.pageY + offsetY;
  
      x = clampValue(x, -touch_drag.offsetWidth + parseFloat(screen.width / 2), parseFloat(screen.width / 2));
      y = clampValue(y, -touch_drag.offsetHeight + parseFloat(screen.height / 2), parseFloat(screen.height / 2));

      console.log(touch_drag.offsetTop);
      touch_drag.style.left = x + "px";
      touch_drag.style.top = y + "px";
  
      touch_drag_left = touch_drag.style.left;
      //console.log(touch_drag.style.left);
      touch_drag_top = touch_drag.style.top;
  })
}

function clampValue(variable, min, max){
  if (variable < min) return min;
  if (variable > max) return max;

  return variable;
}