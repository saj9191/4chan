var dataHandler = {
	postNumberToDiv : [],
	imagesToLoad: [],
    
    processThread : function(thread){
        var len = thread.posts.length;
        var i;
        var post;
        //this.addThread(thread);
	    for (i = 0; i < len; i++) {
	        post = new this.post(thread.posts[i]);
	        this.extractThread(post);
	    }
    },

    onRefreshClick: function(e) {
    	var removeDiv = $(e.target);
    	var removeId = removeDiv.attr('id');
    	var id = removeId.replace('b', '');
        scraper.refreshThread(id);
    },


    onRemoveClick: function(e) {
    	var removeDiv = $(e.target);
    	var removeId = removeDiv.attr('id');
    	var id = removeId.replace('r', '');
    	$('.sidebar #' + id).remove();
    	scraper.removeThreadDiv();
    	// Remove from following threads and
    	// put into non-following threads
    	scraper.ignoredThreadIds = scraper.followedThreadIds;
    	delete scraper.followedThreadIds[id];

    },

	addThread: function(thread, threadNumber) {
		var len = thread.posts.length;
		var threadDiv = $('<div/>');
		var postDiv;
		var removeDiv;
		var post;
		var i;
		threadDiv.addClass('thread');
		for (i = 0; i < len; i++) {
			postDiv = $('<div/>');
			postDiv.addClass('post');
			post = new this.post(thread.posts[i]);

			this.formatPost(postDiv, post);
			this.postNumberToDiv[post.postNumber] = postDiv;
			threadDiv.append(postDiv);
		}
		removeDiv = $('<div/>');
		removeDiv.html('Remove thread');
        removeDiv.addClass('remove');
        removeDiv.addClass('button');
		removeDiv.attr('id', 'r' + threadNumber);
		removeDiv.css('cursor', 'default');
		removeDiv.click(dataHandler.onRemoveClick);

        var buttonDiv = $('<div/>');
        buttonDiv.html('Refresh thread');
        buttonDiv.addClass('refresh');
        buttonDiv.addClass('button');
        buttonDiv.attr('id', 'b' + threadNumber);
        buttonDiv.css('cursort', 'default');
        buttonDiv.click(dataHandler.onRefreshClick);

		threadDiv.prepend(removeDiv);
        threadDiv.prepend(buttonDiv);
		$('#content').append(threadDiv);
		this.reorderPosts();
	},

    thread: function(thread) {
        this.posts = thread.posts;    
    },

	post: function(post) {
		this.postNumber = post.no;
		this.sticky = post.sticky;
		this.closed = post.closed;
		this.now = post.now;
		this.username = post.name;
		this.subject = post.sub;
		this.comment = post.com;
		this.filename = post.filename;
		this.ext = post.ext;
		this.imgWidth = post.w;
		this.imgHeight = post.h;
		this.thumbnailWidth = post.tn_w;
		this.thumbnailHeight = post.tn_h;
		this.timePlusNanoseconds = post.tim;
		this.time = post.time;
		// Unique identifier for each post.
		this.md5 = post.md5;
		this.fileSize = post.fsize;
		this.replyTo = post.resto;
	},

	formatPost: function(postDiv, post) {
		if (post.postNumber != undefined) {
			var postNumberDiv = new PostHandler.postDiv(post.postNumber);
			postNumberDiv.makeSubDiv(postDiv, 'Post Number', 'postNumber');
		}
		
		if (post.subject != undefined) {
			var subjectDiv = new PostHandler.postDiv(post.subject);
			subjectDiv.makeSubDiv(postDiv, 'Subject', 'subject');
		}
		
		if (post.username != undefined) {
			var usernameDiv = new PostHandler.postDiv(post.username);
			usernameDiv.makeSubDiv(postDiv, 'Username', 'username');
		}
		if (post.timePlusNanoseconds != undefined) {
			var tempDiv = $('<div/>');
			var imageSrc = dataHandler.getImageSrc(post, postDiv.find('.username'));
		}

		if (post.comment != undefined) {
			var commentDiv = new PostHandler.commentDiv(post.comment);
			commentDiv.makeSubDiv(postDiv, 'Comment', 'comment');
		}
	},
    
    extractThread : function(post) {
        var comment = post.comment;
        var valid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var tNumber = "";
        if (comment) { 
            if (comment.indexOf("#p") != -1) {
                threadNumber = comment.match('[0-9]*#p')[0];
                tNumber = threadNumber.replace('#p', '');
                scraper.threadIds[tNumber] = "";
            }
        }
    },

    imageData: function(usernameDiv, imageSrc) {
    	this.username = usernameDiv;
    	this.imageSrc = imageSrc;
    },

	getImageSrc: function(post, usernameDiv) {
		var imageSrc = new Image();
		var url = 'https://images.4chan.org/'+ boardHandler.currentBoard + '/src/' + 
			post.timePlusNanoseconds + post.ext;
		imageSrc.src = url;
		imageSrc.width = post.thumbnailWidth;
		imageSrc.height = post.thumbnailHeight;
        imageSrc.className = "thread-image";

		dataHandler.imagesToLoad.push(new this.imageData(usernameDiv, imageSrc));
		var imageEvent = new CustomEvent('imageLoad', {});
		document.dispatchEvent(imageEvent);
	},

	// Find reply comments and make them
	// the children of the original comment.
	reorderPosts: function() {
		var replies = $('.quotelink');
		var len = replies.length;
		var parentDiv;
		var postNumber;
		var postDiv;
		var reply;
		var i;
		for (i = 0; i < len; i++) {
			reply = $(replies[i]);
			postNumber = this.getPostNumber(reply.html());
			parentDiv = this.postNumberToDiv[postNumber];
			if (parentDiv != undefined) {
				// First parentNode: 'quotelink'
				// Second parentNode: Comment div
				// Third parentNode: Post div
				postDiv = replies[i].parentNode.parentNode.parentNode;
				jPostDiv = $(postDiv);
				jPostDiv.addClass('reply');
				jPostDiv.css('marginLeft', '10px');
				parentDiv.append(postDiv);
			}
		}
	},

	// Remove &gt;&gt; from post number and converts to float.
	getPostNumber: function(postNumber) {
		postNumber = postNumber.replace('&gt;&gt;', '');
		return parseInt(postNumber);
	}

}
