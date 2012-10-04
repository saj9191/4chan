var globals = {
// Contains presets and user-defined globals
    minPosts : 20,    
    currentBoard : '/mu/',
}

var boards = {
    '/mu/' : {
        followedThreadIds : {},
        ignoredThreadIds : {},
    },
    '/v/' : {
        followedThreadIds : {},
        ignoredThreadIds : {},
    },
}

var scraper = {
	// Can't hit server too much.
	timeDelay: 20*1000,

    threadIds : {},

    followedThreadIds : {},   
    // Contains the threadIds of interesting threads that are currently followed.

	sortThread: function(x,y) {
		return x.posts.length - y.posts.length;
	},	

	onThreadClick: function(e) {
		console.log('onThreadClick');
		scraper.hideThread();
		var thread = $(e.target);
		var threadNumber = thread.attr('id');
		var response = scraper.followedThreadIds[threadNumber];
		dataHandler.addThread(response);
	},

	hideThread: function() {
    	var content = $('#content');
    	console.log(content.find('.thread'));
    	$('#content .thread').remove();
    	console.log(content.find('.thread'));
    },

    getThread: function(number) {
        var url = "http://hkr.me:8001/?url=http://api.4chan.org" +
		globals.currentBoard + "res/" + number + ".json&jsonp=?";

		$.getJSON(url, null, function(response) {
            scraper.threadIds[number] = response;
            if (response.posts.length > globals.minPosts) {
                // Map the key -> response in followedThreadIds
                scraper.followedThreadIds[number] = response;
                delete scraper.threadIds[number];
                // Render the thread
                //dataHandler.addThread(response); 
                var thread = $('<div/>');
		        thread.html('Thread '+ number);
		        thread.css('marginLeft', '10px');
		        thread.attr('id', number);
		        thread.css('font-size', 'small');
		        thread.css('padding-top', '10px');
		        thread.css('cursor', 'default');
		        $('#recentThreads').append(thread);
		        thread.click(scraper.onThreadClick);
            }
        });
    },

    parseThread: function(response) {
		var i;
		var length = response.posts.length;
        console.log(response);
        dataHandler.addThread(response);
	},
 
	getPage: function(number) {
		var url = "http://hkr.me:8001/?url=http://api.4chan.org/mu/" + number + ".json&jsonp=?";
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
    	var onload = function(e) {
    		var data = dataHandler.imagesToLoad[index];
    		data.imageSrc.onload = function() {
	    		$(data.username).after(data.imageSrc);
	    	}
    		index++;
    	}
    	document.addEventListener('imageLoad', onload);
        scraper.getPage(1);
//        setTimeout(scraper.onTimer, scraper.timeDelay);
    },

	onTimer: function() {
        scraper.getArbitraryThread();
		setTimeout(scraper.onTimer, scraper.timeDelay);
	},

}

scraper.onRun();
