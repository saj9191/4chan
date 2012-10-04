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

    onButtonClick: function(e) {
    	$(e.target.parentNode).hide();
    },

	addThread: function(thread) {
		var len = thread.posts.length;
		var threadDiv = $('<div/>');
		threadDiv.addClass('thread');
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

		removeDiv.click(this.onButtonClick);

		threadDiv.append(removeDiv);
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
		var postNumberDiv = $('<div/>');
		postNumberDiv.html('Post Number: ' + post.postNumber);
		postNumberDiv.addClass('postNumber');
		postDiv.append(postNumberDiv);

		var subjectDiv = $('<div/>');
		if (post.subject != undefined) {
			subjectDiv.html('Subject: ' + post.subject);
			subjectDiv.addClass('subject');
			postDiv.append(subjectDiv);
		}
		
		var usernameDiv = $('<div/>');
		usernameDiv.html('Username: ' + post.username);
		usernameDiv.addClass('username');
		postDiv.append(usernameDiv);

		if (post.timePlusNanoseconds != undefined) {
			var tempDiv = $('<div/>');
			var imageSrc = dataHandler.getImageSrc(post, usernameDiv);
			//postDiv.append(imageSrc);
		}

		if (post.comment != undefined) {
			var commentDiv = $('<div/>');
			commentDiv.html('Comment:<br>' + post.comment);
			commentDiv.addClass('comment');
			postDiv.append(commentDiv);
		}
	},
    
    extractThread : function(post) {
        var comment = post.comment;
        var valid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var t_number = "";
        if (comment) { 
            if (comment.indexOf("#p") != -1) {
                var index = comment.indexOf("#p");
/*                while (parseInt(comment.substring(index-1,index))) {
                    t_number += comment.substring(index-1, index);
                    index -= 1; 
                } */
                t_number = parseInt(comment.substring(index-8, index));
//                t_number = parseInt(t_number.split("").reverse().join(""));
                scraper.thread_ids[t_number] = "";
            }
        }
    },

    imageData: function(usernameDiv, imageSrc) {
    	this.username = usernameDiv;
    	this.imageSrc = imageSrc;
    },

	getImageSrc: function(post, usernameDiv) {
		var imageSrc = new Image();
		var url = 'https://images.4chan.org'+ globals.currentBoard + '/src/' + 
			post.timePlusNanoseconds + post.ext;
		imageSrc.src = url;
		imageSrc.width = post.thumbnailWidth;
		imageSrc.height = post.thumbnailHeight;

		this.imagesToLoad.push(new this.imageData(usernameDiv, imageSrc));

		var imageEvent = new CustomEvent('imageLoad', {});
		document.dispatchEvent(imageEvent);
	},

	// Don't know if we're going to use this. 
	getThumbNailSrc: function(post) {
		var imageSrc = document.createElement('img');
		var url = 'https://0.thumbs.4chan.org/mu/thumb/' + 
			post.timePlusNanoseconds + '.jpg';
		imageSrc.attr('src', url);
		imageSrc.attr('width', post.thumbnailWidth);
		imageSrc.attr('height', post.thumbnailHeight);
		imageSrc.onload = function () {

		}
		return imageSrc;
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
