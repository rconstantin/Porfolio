// Utility function to grab style properties when unset
function getStyleProp(elem, prop){
    if(window.getComputedStyle)
        return window.getComputedStyle(elem, null).getPropertyValue(prop);
    else if(elem.currentStyle) return elem.currentStyle[prop]; //IE
}

// 20ms event loop to update a global mouseX, mouseY position and handle scroll detection
var mouseX = null;
var mouseY = null;
//var scrollTimeline = null;
//var updateInterval = 1;
var scrolling = false;
//var buffer = window.innerWidth/4;

// RC: SetInverval function set the interval of 10 mseconds to repeatedly call function
// scroll() with 10 msec between each call. it return a unique ID: scrollTimeline.
window.onmousemove = function(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;
	/*
	if (!scrollTimeline) {
		scrollTimeline = window.setInterval(scroll, updateInterval);
	}
	*/
	scroll(event);
};

// Global access to all the project li's. RC: querySelectorAll returns a "NodeList"
var projects = document.querySelectorAll('#timeline li.project');
//RC: Array.prototype.slice returns an array of projects
projects = Array.prototype.slice.call(projects);
for (i = 0; i < projects.length; i++) {
	// RC: slide here is the function reference for onmouseover for projects[i]
	projects[i].onmouseover = slide; // Slide via highlight
}

// Global access to the timeline container
var timeline = document.querySelector("#timeline");
timeline.onmouseout = unslide; // Undo slides when out of timeline

function scroll(event) {

    animationId = webkitRequestAnimationFrame(scroll,event);
	
	var buffer = window.innerWidth/4;
	
	// distanceToCenter = Math.abs(window.innerWidth/2-mouseX);
    // speed = distanceToCenter/(window.innerWidth/2);
    // simplicity
    speed = 1;
	
	if (mouseX < buffer) {
		scrolling = true;
		scrollLeft(speed);
	}
	else if ((window.innerWidth - mouseX) < buffer) {
		scrolling = true;
		scrollRight(speed);
	}
	else {
		scrolling = false;
		//window.clearInterval(scrollTimeline);
		//scrollTimeline = null;
		webkitCancelAnimationFrame(animationId);
		count = 0;
	}
}

function scrollLeft(speed) {
	scrollRight(speed*-1);
}

function scrollRight(speed) {
	var leftPixels = parseInt(getStyleProp(timeline, 'left'), 10);
	// var toShift = Math.pow(speed,1)*10;
		
	var newLeft = leftPixels - speed;

	// boundaries at both ends between 0 & -1400
	if (newLeft >= -1400 && newLeft  <= 0) {
		timeline.style.left = newLeft + 'px';
	}
}

function slide(event)
{
	
	for (i = 0; i < projects.length; i++) {
		if (i <= projects.indexOf(this)) {
			projects[i].classList.add("slideLeft");
			projects[i].classList.remove("slideRight");
		}
		else {
			projects[i].classList.add("slideRight");
			projects[i].classList.remove("slideLeft");
		}
	}
	
}

function unslide(event) 
{
	
	for (i = 0; i < projects.length; i++) {
		projects[i].classList.remove("slideRight");
		projects[i].classList.remove("slideLeft");
	}
	
}