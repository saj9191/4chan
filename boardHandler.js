var boardHandler = {
	currentBoard: undefined,

	boards: {
		'Music': 'mu',
		'Video Games': 'v'
	},

	boardNameMap: {
		'Music': 'Music',
		'VideoGames': 'Video Games',
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

    addBoardToSidebar : function(boardname) {
        var board = $('<div/>');
        var noSpaces = boardname.replace(/\s+/g, '');
        console.log("noSpaces", noSpaces);
        board.html(boardname);
        board.addClass('sidebar-board');
        board.css('cursor', 'default');
        board.attr('id', noSpaces);
        $('#recentBoards').append(board);
        board.click(scraper.onBoardClick);
    },

    changeBoard: function() {
		var selected = $('select option:selected')[0].text;
        boardHandler.changeBoardWithName(selected);
    },

	changeBoardWithName: function(name) {
		var folder = boardHandler.getBoardFolder(name);
        console.log("name = ", name);
        var noSpaces = name.replace(/\s+/g, '');
        if ($('#'+noSpaces).length == 0) {
            boardHandler.addBoardToSidebar(name);
        }
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
