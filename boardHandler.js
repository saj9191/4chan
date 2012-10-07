/* QuickChan - a project for 15-237, HW 4 */
/* By 
   Shannon Joyner (sjoyner)
   Laxman Dhulipala (ldhulipa)
*/
var boardHandler = {
	currentBoard: undefined,

	boards: {
		'Music': 'mu',
		'Video Games': 'v',
		'Technology': 'g',
        'Cooking': 'ck',
        'Television' : 'tv',
        'Fitness' : 'fit',
        'Sports' : 'sp',
        'Fashion' : 'fa',
        'Science' : 'sci',
        'Random' : 'b',
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
	    'g' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },
	    'ck' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },
	    'tv' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },
	    'fit' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },
	    'sp' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },
	    'fa' : {
	        followedThreadIds : {},
	        ignoredThreadIds : {},
	        threadIds: {},
	    },
	    'sci' : {
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
        thread.addClass('recentThread')
        thread.css('font-size', 'small');
        thread.css('padding-top', '10px');
        // Prevents cursor from changing when you
        // hover overs div
        thread.css('cursor', 'default');
        $('#recentThreads').append(thread);
        thread.click(scraper.onThreadClick);
    },

    removeThreadsFromSideBar: function() {
    	$('#recentThreads').empty();
    },

    addBoardToSidebar : function(boardname) {
        var board = $('<div/>');
        var noSpaces = boardname.replace(/\s+/g, '');
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
        var noSpaces = name.replace(/\s+/g, '');
        if ($('#'+noSpaces).length == 0) {
            boardHandler.addBoardToSidebar(name);
        }
		// Treat like no board selected
		if (folder === undefined) {
			return
		} else {
			scraper.removeThreadDiv();
			var boardName = $('#boardName');
			boardName.html(name + ' Board');
			boardName.css('text-align', 'center');
			boardName.css('font-size', 'large');
			boardHandler.removeThreadsFromSideBar();
			boardHandler.currentBoard = folder;
			scraper.followedThreadIds = boardHandler.boardThreads[folder].followedThreadIds;
			scraper.ignoredThreadIds = boardHandler.boardThreads[folder].ignoredThreadIds;
			scraper.threadIds = boardHandler.boardThreads[folder].threadIds;
			scraper.getPage(1);
			if (window.showThreadInstructions === false) {
				window.showThreadInstructions = true;
			}
		}
	},

	getBoardFolder: function(boardName) {
		return boardHandler.boards[boardName];
	}
}
