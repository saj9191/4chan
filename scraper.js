var scraper = {
	// Can't hit server too much.
	timeDelay: 20*1000,

    thread_ids : {},

	sortThread: function(x,y) {
		return x.posts.length - y.posts.length;
	},	

    getThread: function(number) {
        console.log("number", number);
        var url = "http://hkr.me:8001/?url=http://api.4chan.org/mu/res/" + number + ".json&jsonp=?";
		$.getJSON(url, null, this.parseThread);
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
        scraper.getArbitraryThread();
	},

    getArbitraryThread: function() {
        var thread_num = 0;
        for (var key in scraper.thread_ids) {
            thread_num = key; 
        }
        if (thread_num != 0) {
            scraper.getThread(thread_num);
        }
    },

    onRun : function () {
        scraper.getPage(1);
        setTimeout(scraper.onTimer, scraper.timeDelay);
    },

	onTimer: function() {
        scraper.getArbitraryThread();
		setTimeout(scraper.onTimer, scraper.timeDelay);
	},
}

scraper.onRun();
