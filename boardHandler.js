var boardHandler = {
	currentBoard: undefined,

	boards: {
		'Music': 'mu',
		'Video Games': 'v',
		'Random': 'b'
	},

	boardThreads: {
	    'mu' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds : {},
	    },
	    'v' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },
	    'b' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },

	},

	addThreadToSideBar: function(number) {
    	var thread = $('<div/>');
        thread.html('Thread '+ number);
        thread.css('marginLeft', '10px');
        thread.attr('id', number);
        thread.css('font-size', 'small');
        thread.css('padding-top', '10px');
        // Prevents cursor from changing when you
        // hover overs div
        thread.css('cursor', 'default');
        $('#recentThreads').append(thread);
        thread.click(scraper.onThreadClick);
    },

    removeThreadsFromSideBar: function() {
    	console.log('b', document.getElementById('recentThreads'));
    	$('#recentThreads').empty();
    	console.log('a', $('recentThreads'));
    },

	changeBoard: function() {
		var selected = $('select option:selected')[0].text;
		var folder = boardHandler.getBoardFolder(selected);
		// Treat like no board selected
		if (folder === undefined) {
			return
		} else {
			scraper.removeThreadDiv();
			boardHandler.removeThreadsFromSideBar();
			boardHandler.currentBoard = folder;
			scraper.followedThreadIds = boardHandler.boardThreads[folder].followedThreadIds;
			scraper.ignoredThreadIds = boardHandler.boardThreads[folder].ignoredThreadIds;
			scraper.threadIds = boardHandler.boardThreads[folder].threadIds;
			scraper.getPage(1);
		}
	},

	getBoardFolder: function(boardName) {
		return boardHandler.boards[boardName];
	}
}