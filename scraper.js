var globals = {
// Contains presets and user-defined globals
    minPosts : 20
}

var scraper = {
	// Can't hit server too much.
	timeDelay: 20*1000,

    threadIds : {},

    // Contains the threadIds of interesting threads that are currently followed.
    followedThreadIds : {},   
    ignoredThreadIds : {},

	sortThread: function(x,y) {
		return x.posts.length - y.posts.length;
	},	

	onThreadClick: function(e) {
        instructions.hide();
		scraper.removeThreadDiv();
        $("#warning").hide();
		var thread = $(e.target);
		var threadNumber = thread.attr('id');
		var response = scraper.followedThreadIds[threadNumber];
		dataHandler.addThread(response, threadNumber);
	},

    onBoardClick: function(e) {
        scraper.removeThreadDiv();
        var board = $(e.target);
        var boardName =  board.html();
        // var boardName = boardHandler.boards[boardNameNoSpaces];
        boardHandler.changeBoardWithName(boardName);
    },

	removeThreadDiv: function() {
    	var content = $('#content');
    	$('#content .thread').remove();
    	console.log(content.find('.thread'));
    },

    refreshThread: function(number) {
        var url = "http://hkr.me:8001/?url=http://api.4chan.org/" +
		boardHandler.currentBoard + "/res/" + number + ".json&jsonp=?";
        $.getJSON(url, null, function(response) {
            scraper.removeThreadDiv();
            scraper.threadIds[number] = response;
            scraper.followedThreadIds[number] = response;
            dataHandler.addThread(response, number);
        });
    },

    getThread: function(number) {
        var url = "http://hkr.me:8001/?url=http://api.4chan.org/" +
		boardHandler.currentBoard + "/res/" + number + ".json&jsonp=?";
		$.getJSON(url, null, function(response) {
            scraper.threadIds[number] = response;
            if (response.posts.length > globals.minPosts) {
                // Map the key -> response in followedThreadIds
                scraper.followedThreadIds[number] = response;
                // Render the thread
                //dataHandler.addThread(response); 
                boardHandler.addThreadToSideBar(number);
            }
            delete scraper.threadIds[number];
        });
    },

    parseThread: function(response) {
		var i;
		var length = response.posts.length;
        dataHandler.addThread(response);
	},
 
	getPage: function(number) {
		var url = "http://hkr.me:8001/?url=http://api.4chan.org/" + 
		boardHandler.currentBoard + "/" + number + ".json&jsonp=?";
		$.getJSON(url, null, this.parsePage);
	},

	parsePage: function(response) {
		var i;
		var length = response.threads.length;
		response.threads.sort(this.sortThreads);
		for (i = 0; i < length; i++) {
			dataHandler.processThread(response.threads[i]);
		}
        scraper.fetchThreadJson();
	},

    addInterestingThread: function() {
        var the_thread;
        for (var key in scraper.threadIds) {
            the_thread = scraper[key];
            if (the_thread != "") {
                if (the_thread.posts.length > 20) {
                    interesting_threadIds[key] = the_thread;
                }
            }
        }
    },

    getArbitraryThread: function() {
        // Gets the last thread from the object
        var thread_num = 0;
        for (var key in scraper.threadIds) {
            thread_num = key; 
        }
        if (thread_num != 0) {
            scraper.getThread(thread_num);
        }
    },

    fetchThreadJson: function() {
        for (var key in scraper.threadIds) {
            scraper.getThread(key);
        }
    },

    onRun : function () {
    	var index = 0;
        instructions.showBoardInstructions();
    	$('select').change(boardHandler.changeBoard);
        $('body').click(function(e) {
            if (e.target.className == "thread-image") {
                console.log("thread image clicked");
                e.preventDefault();
                var image_src = $(e.target).attr("src");
                // Code that makes the lightbox appear
                if ($('#lightbox').length > 0) {
                        $('#lightbox-img').html('<img src="' + image_src + '" />');
                        $('#lightbox').show();
                }
                else { //#lightbox does not exist
                    var lightbox =
                    '<div id="lightbox">' +
                        '<p>Click to close</p>' +
                        '<div id="lightbox-img">' + //insert clicked link's href into img src
                            '<img src="' + image_src +'" />' +
                        '</div>' +
                    '</div>';
                    //insert lightbox HTML into page
                    $('body').append(lightbox);
                    $('#full-page').click(function(e) {
                        e.stopPropagation();
                    });
                    $('#content').css("overflow", "hidden");
                }
                $('#lightbox').live('click', function() {
                    $('#lightbox').hide();
                    $('#full-page').unbind('click');
                    $('#content').css("overflow", "scroll");
                }); 
            }
        });

        $('#bubblegirl').click(function(e) {
            $('.sidebar').toggle('fast');
            $('.sidebar-collapsed').toggle();
           return false;
        });
        $('.sidebar-collapsed').click(function(e) {
            $('.sidebar-collapsed').toggle();
            $('.sidebar').toggle('fast');
            return false;
        });

    	var onload = function(e) {
    		var data = dataHandler.imagesToLoad[index];
    		console.log('here', data.imageSrc);
    		data.imageSrc.onload = function() {

    			console.log('onload');
    			console.log(data.username);
    			console.log(data.imageSrc);
	    		$(data.username).after(data.imageSrc);
	    	}
    		index++;
    	}
    	document.addEventListener('imageLoad', onload);
//        setTimeout(scraper.onTimer, scraper.timeDelay);
    },

	onTimer: function() {
        scraper.getArbitraryThread();
		setTimeout(scraper.onTimer, scraper.timeDelay);
	},

}

scraper.onRun();
