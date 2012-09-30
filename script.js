var response = {
    "threads": [
        {
            "posts": [
                {
                    "closed": 0, 
                    "com": "<span class=\"quote\">&gt;go to friend's house for party</span><br><span class=\"quote\">&gt;see qt chilling on the couch</span><br><span class=\"quote\">&gt;go over there with friend and hit on her smoothly</span><br><span class=\"quote\">&gt;&quot;H..How are you?&quot;</span><br><span class=\"quote\">&gt;suddenly she starts laughing</span><br><span class=\"quote\">&gt;&quot;Are you two related?&quot;</span><br><span class=\"quote\">&gt;look at friend</span><br><span class=\"quote\">&gt;&quot;No.&quot;</span><br><span class=\"quote\">&gt;Shorty said we look like Puerto Rican cousins</span><br><span class=\"quote\">&gt;tfw</span>", 
                    "ext": ".jpg", 
                    "filename": "wat", 
                    "fsize": 27147, 
                    "h": 470, 
                    "md5": "iMkmIfUTZzwvzbnFO7hG3Q==", 
                    "name": "Pro Namefag", 
                    "no": 28677197, 
                    "now": "09/29/12(Sat)17:47", 
                    "resto": 0, 
                    "sticky": 0, 
                    "tim": 1348955242125, 
                    "time": 1348955242, 
                    "tn_h": 250, 
                    "tn_w": 159, 
                    "trip": "!lMkw8/sKD6", 
                    "w": 300
                }
            ]
        }, 
        {
            "posts": [
                {
                    "closed": 0, 
                    "com": "Hey /mu/,<br><br>Can anyone upload a v0/320 of Broken Social Scene's self-titled? I've looked for an hour and downloaded about 10 rips and all of them were 192s.<br><br>I would go to rutracker or wherever but all p2p is blocked at my college.", 
                    "ext": ".gif", 
                    "filename": "1339732101497", 
                    "fsize": 1127324, 
                    "h": 260, 
                    "md5": "BTG7U4wmIKPcQls8QItz+A==", 
                    "name": "Anonymous", 
                    "no": 28677007, 
                    "now": "09/29/12(Sat)17:39", 
                    "resto": 0, 
                    "sticky": 0, 
                    "sub": "Request Thread", 
                    "tim": 1348954776570, 
                    "time": 1348954776, 
                    "tn_h": 235, 
                    "tn_w": 250, 
                    "w": 276
                }, 
                {
                    "com": "<span class=\"quote\"><a href=\"28677007#p28677007\" class=\"quotelink\">&gt;&gt;28677007</a></span><br>DUDE THE ENTIRE THING WAS RECORDED ON MAGNETIC TAPE<br>LISTEN TO THE 192 AND STOP BEING SUCH AN ASPIE.<br>for real though.", 
                    "name": "Anonymous", 
                    "no": 28677074, 
                    "now": "09/29/12(Sat)17:42", 
                    "resto": 28677007, 
                    "time": 1348954955
                }, 
                {
                    "com": "<span class=\"quote\"><a href=\"28677007#p28677074\" class=\"quotelink\">&gt;&gt;28677074</a></span><br><span class=\"quote\">&gt;tfw 2 autistic for anything below a v2 rip</span>", 
                    "name": "Anonymous", 
                    "no": 28677150, 
                    "now": "09/29/12(Sat)17:45", 
                    "resto": 28677007, 
                    "time": 1348955136
                }, 
                {
                    "com": "192 is the cutoff for acceptable quality, imo.", 
                    "name": "Anonymous", 
                    "no": 28677196, 
                    "now": "09/29/12(Sat)17:47", 
                    "resto": 28677007, 
                    "time": 1348955235
                }
            ]
        }
    ]
};

var scraper = {
	sortThread: function(x,y) {
		return x.posts.length - y.posts.length;
	},	

	parseResponse: function(response) {
		var i;
		var length = response.threads.length
		console.log(response.threads);
		response.threads.sort(scraper.sortThreads);
	}
}

scraper.parseResponse(response);
