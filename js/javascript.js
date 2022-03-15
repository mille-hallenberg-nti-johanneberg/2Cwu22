let box = document.querySelector('.hamburger_menu_button');
let container = document.querySelector('#index_container_section');
/*
let home_button = querySelector('.home_page_button');
home_button.addEventListener("OnClick", function(ev){
  document.location.href = index.html;
});*/

var screen_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var screen_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

let body = document.getElementsByTagName("body");
//body.width = screen_width;

//Drag on computer
dragElement(document.getElementById("map"));

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
var touch_drag = document.getElementById("map");

var offsetX = 0;
var offsetY = 0;

var touch_drag_left = 0 + "px";
var touch_drag_top = 0 + "px";

touch_drag.addEventListener("touchstart", function(ev){
  var touchLocation = ev.targetTouches[0];

  offsetX = parseInt(touch_drag_left) - touchLocation.pageX;
  offsetY = parseInt(touch_drag_top) - touchLocation.pageY;
})

touch_drag.addEventListener("touchmove", function(ev){
    var touchLocation = ev.targetTouches[0];
    
    touch_drag.style.left = (touchLocation.pageX + offsetX) + "px";
    touch_drag.style.top = (touchLocation.pageY + offsetY) + "px";
    
    touch_drag_left = touch_drag.style.left;
    touch_drag_top = touch_drag.style.top;
})