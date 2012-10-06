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
		var arrow = $('<div/>');
		arrow.attr('class', 'arrow');
		boardInstructions.append(arrow);
		arrow.attr('marginLeft','auto');
		arrow.attr('marginRight','auto');

		instructions.append(boardInstructions);
		content.prepend(instructions);
	},

	showThreadInstructions: function() {
		var arrow = $('.arrow');
		var instructions = $('#instructions');
		threadInstructions = $('<div/>');
		threadInstructions.attr('class', 'subInstructions');
		var threadText = "Now select a thread from the 'Threads' section.";
		threadInstructions.html(threadText);
		instructions.append(threadInstructions);
		threadInstructions.append(arrow);
	},

	hide: function() {
		var warning = $('#warning');
		warning.remove();
	}
}