var instructions = {

	showBoardInstructions: function() {
		var content = $('#content');
		var instructions = $('<div/>');
		instructions.attr('id', 'instructions');
		
		var warning = $('<div/>');
		var warningText = "WARNING: Many of the images/comment on 4chan are either extremely gore or sexual related.<br>" +
		"Do not view any of the threads if you do not want to see these pictures or comments.<br>" +
		 "This website filters for the best 4chan posts. <br>";
		 // "In the sidebar, under 'All boards', select a board whose content you would like to view.<br>" + 
	  //     "The best threads from that board will then be listed under 'Threads', which you may then select to view.";
		warning.html(warningText);
		instructions.append(warning);

		var boardInstructions = $('<div/>');
		boardInstructions.attr('class', 'subInstructions');
		var boardText = "Select a board from the 'All boards' drop down menu.";
		boardInstructions.html(boardText);
		instructions.append(boardInstructions);
		content.prepend(instructions);
		this.addArrows();
		
	},

	addArrows: function() {
		var instructions = $('#instructions');
		var arrowLeft = $('<div/>');
		arrowLeft.attr('class', 'arrow');
		arrowLeft.attr('id', 'left');
		instructions.append(arrowLeft);
		
		var arrowRight = $('<div/>');
		arrowRight.attr('class', 'arrow');
		arrowRight.attr('id', 'right');
		instructions.append(arrowRight);
	},

	removeArrows: function() {
		$('.arrow').remove();
	},

	showThreadInstructions: function() {
		this.removeArrows();
		var instructions = $('#instructions');
		threadInstructions = $('<div/>');
		threadInstructions.attr('class', 'subInstructions');
		var threadText = "Now select a thread from the 'Threads' section.";
		threadInstructions.html(threadText);
		instructions.append(threadInstructions);
		this.addArrows();
	},

	hide: function() {
		var instructions = $('#instructions');
		instructions.remove();
	}
}