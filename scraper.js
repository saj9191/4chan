var globals = {
// Contains presets and user-defined globals
    minPosts : 20,    
    currentBoard : '/mu/',
}

var boards = {
    '/mu/' : {
        followed_thread_ids : {},
        ignored_thread_ids : {},
    },
    '/v/' : {
        followed_thread_ids : {},
        ignored_thread_ids : {},
    },
}

var scraper = {
	// Can't hit server too much.
	timeDelay: 20*1000,

    thread_ids : {},

    followed_thread_ids : {},   
    // Contains the thread_ids of interesting threads that are currently followed.

	sortThread: function(x,y) {
		return x.posts.length - y.posts.length;
	},	

    getThread: function(number) {
        console.log("number", number);
        var url = "http://hkr.me:8001/?url=http://api.4chan.org" +
globals.currentBoard + "res/" + number + ".json&jsonp=?";
		$.getJSON(url, null, function(response) {
            scraper.thread_ids[number] = response;
            console.log(response);
            if (response.posts.length > globals.minPosts) {
                // Map the key -> response in followed_thread_ids
                scraper.followed_thread_ids[number] = response;
                // Render the thread
                dataHandler.addThread(response); 
                console.log("added to datahandler");
            }
        });
    },
 
	getPage: function(number) {
		var url = "http://hkr.me:8001/?url=http://api.4chan.org/mu/" + number + ".json&jsonp=?";
		$.getJSON(url, null, this.parsePage);
	},

	parseThread: function(response) {
		var i;
		var length = response.posts.length;
        console.log(response);
        dataHandler.addThread(response);
	},

	parsePage: function(response) {
		var i;
		var length = response.threads.length;
		response.threads.sort(this.sortThreads);
		for (i = 0; i < length; i++) {
			dataHandler.processThread(response.threads[i]);
		}
        //scraper.getArbitraryThread();
        scraper.fetchThreadJson();
	},

    addInterestingThread: function() {
        var the_thread;
        for (var key in scraper.thread_ids) {
            the_thread = scraper[key];
            if (the_thread != "") {
                if (the_thread.posts.length > 20) {
                    interesting_thread_ids[key] = the_thread;
                }
            }
        }
    },

    getArbitraryThread: function() {
        // Gets the last thread from the object
        var thread_num = 0;
        for (var key in scraper.thread_ids) {
            thread_num = key; 
        }
        if (thread_num != 0) {
            scraper.getThread(thread_num);
        }
    },

    fetchThreadJson: function() {
        for (var key in scraper.thread_ids) {
            scraper.getThread(key);
        }
    },

    onRun : function () {
	    scraper.addEventListeners();
        scraper.getPage(1);
//        setTimeout(scraper.onTimer, scraper.timeDelay);
    },

	onTimer: function() {
        scraper.getArbitraryThread();
		setTimeout(scraper.onTimer, scraper.timeDelay);
	},

	onButtonClick: function(e) {
		if (e.target.className === 'section show') {
			e.target.className = 'section';
		} else {
			e.target.className = 'section show';
		}
	},

	addEventListeners: function() {
		var sections = document.getElementsByClassName('section');
		var length = sections.length;
		for (i = 0; i < length; i++) {
			var section = sections[i];
			section.addEventListener('click', this.onButtonClick, false);
		}
	}
}

scraper.onRun();
