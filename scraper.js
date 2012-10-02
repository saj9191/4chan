var scraper = {
	// Can't hit server too much.
	timeDelay: 20*1000,

	sortThread: function(x,y) {
		return x.posts.length - y.posts.length;
	},	
 
	getThread: function(number) {
		var url = "http://hkr.me:8001/?url=http://api.4chan.org/mu/" + number + ".json&jsonp=?";
		$.getJSON(url, null, this.parseResponse);
	},

	parseResponse: function(response) {
		var i;
		var length = response.threads.length;
		response.threads.sort(this.sortThreads);
		for (i = 0; i < length; i++) {
			dataHandler.addThread(response.threads[i]);
		}
	},

	onTimer: function() {
		scraper.getThread(1);
		setTimeout(scraper.onTimer, scraper.timeDelay);
	},
}

scraper.onTimer(1);
