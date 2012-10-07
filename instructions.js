/* QuickChan - a project for 15-237, HW 4 */
/* By 
   Shannon Joyner (sjoyner)
   Laxman Dhulipala (ldhulipa)
*/

var showThreadInstructions = false;
var showInstructions = true;

var instructions = (function() {
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	var timeDelay = 20;
	var intervalId = setInterval(redrawAll, timeDelay);
	var xCenter = 0;

	function redrawAll() {
		if (window.showInstructions === true) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			showBoardInstructions();
			changeArrowPosition();
		} else {
			clearInterval(intervalId);
			$('#myCanvas').remove();
		}
	}

	function changeArrowPosition() {
		xCenter = (xCenter + 1) % 50;
	}

	function showBoardInstructions() {
		ctx.textAlign = "center";
		if (window.showThreadInstructions === true) {
			ctx.fillStyle = "rgba(156,156,156,0.6)";
		} else {
        	ctx.fillStyle = "rgba(41,41,41,0.6)";
        }
        ctx.font = 'Bold 20px Sans-Serif';
        ctx.fillText("WARNING: Many of the images/comment on 4chan are either extremely gore or sexual related.",
            canvas.width/2, 1*canvas.height/8);
        ctx.fillText("Do not view any of the threads if you do not want to see these pictures or comments.",
            canvas.width/2, 2*canvas.height/8);
        ctx.fillText("This website filters for the best 4chan posts.", canvas.width/2, 
                     3*canvas.height/8);
        ctx.fillText("To start, select a board from 'All Boards' on the left.",
        	canvas.width/2, 4*canvas.height/8);
        if (window.showThreadInstructions === true) {
        	ctx.fillStyle = "rgba(41,41,41,0.6)";
        	ctx.fillText("Now choose a thread from under 'Threads' to view the top threads.",
        	canvas.width/2, 5*canvas.height/8);
        	ctx.fillText("The threads you view will be saved under 'Recent Boards', unless you " + 
        		"choose to remove a thread by clicking the button.", canvas.width/2, 6*canvas.height/8);
        } else {
	        drawArrow(canvas.width/2 + xCenter, canvas.height/2 + 30);
	    }
	}

	// Top left coordinate of rectangle
	function drawArrow(x, y) {
		ctx.fillStyle = 'grey';
		ctx.fillRect(x, y, 40, 20);
		ctx.beginPath();
		ctx.moveTo(x, y - 10);
		ctx.lineTo(x - 20, y + 10);
		ctx.lineTo(x, y + 30);
		ctx.fill();
	}

	return { "showBoardInstructions": showBoardInstructions};
})();


