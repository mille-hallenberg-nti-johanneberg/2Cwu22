let box = document.querySelector('.hamburger_menu_button');
let container = document.querySelector('#index_container_section');
/*
let height = box.clientHeight;
box_data = getComputedStyle(box);
console.log(container)
console.log("Detta är höjden " + height);
box.width = height;
console.log("Detta är bredden: " + box.width);
container.style.gridTemplateColumns = "height, auto";
console.log(container.style.gridTemplateColumns)*/

//console.log(box_data);

// Make the DIV element draggable:
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

var firstTouch = false;

touch_drag.addEventListener("touchmove", function(ev){
    var touchLocation = ev.targetTouches[0];
    if (!firstTouch){
        offsetX = touch_drag.style.left - touchLocation.pageX;
        offsetY = touch_drag.style.top - touchLocation.pageY;
        firstTouch = true;
    }

    touch_drag.style.left = touchLocation.pageX + offsetX + "px";
    touch_drag.style.top = touchLocation.pageY + offsetY + "px";
})

touch_drag.addEventListener("touchend", function(ev){
    var x = parseInt(touch_drag.style.left);
    var y = parseInt(touch_drag.style.top);
    firstTouch = false;
})