var dataHandler = {
	postNumberToDiv : [],
    
    processThread : function(thread){
        var len = thread.posts.length;
        var i;
        var post;

        for (i = 0; i < len; i++) {
            post = new this.post(thread.posts[i]);
            this.extract_thread(post);
        }
    },

	addThread: function(thread) {
		var contentDiv = document.getElementById('content');
		var len = thread.posts.length;
		var threadDiv = document.createElement('div');
		var postDiv;
		var post;
		var i;

		threadDiv.className = "thread";
		for (i = 0; i < len; i++) {
			postDiv = document.createElement('div');
			postDiv.className = "post";
			post = new this.post(thread.posts[i]);

			this.formatPost(postDiv, post);
			this.postNumberToDiv[post.postNumber] = postDiv;
			threadDiv.appendChild(postDiv);
		}
		contentDiv.appendChild(threadDiv);
		this.reorderPosts();
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
		var postNumberDiv = document.createElement('div');
		var postNumberText = 'Post Number: ' + post.postNumber;
		postNumberDiv.innerHTML = postNumberText ;
		postDiv.appendChild(postNumberDiv);

		var usernameDiv = document.createElement('div');
		var usernameText = 'Username: ' + post.username;
		usernameDiv.innerHTML = usernameText;
		postDiv.appendChild(usernameDiv);

		if (post.subject != undefined) {
			var subjectDiv = document.createElement('div');
			var subjectText = 'Subject: ' + post.subject;
			subjectDiv.innerHTML = subjectText;
			postDiv.appendChild(subjectDiv);
		}

		var commentDiv = document.createElement('div');
		var commentText = 'Comment:<br>' + post.comment;
		commentDiv.innerHTML = commentText;
		postDiv.appendChild(commentDiv);
		if (post.timePlusNanoseconds != undefined) {
			var imageSrc = dataHandler.getImageSrc(post);
			postDiv.appendChild(imageSrc);
		}
	},
    
    extract_thread : function(post) {
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
                scraper.thread_ids[t_number] = "thread_here!";
            }
        }
    },
    

	getImageSrc: function(post) {
		var imageSrc = document.createElement("img");
		var url = "https://images.4chan.org/mu/src/" + 
			post.timePlusNanoseconds + post.ext;
		imageSrc.setAttribute('src', url);
		imageSrc.setAttribute('width', post.thumbnailWidth);
		imageSrc.setAttribute('height', post.thumbnailHeight);
		return imageSrc;
	},

	getThumbNailSrc: function(post) {
		var imageSrc = document.createElement("img");
		var url = "https://0.thumbs.4chan.org/mu/thumb/" + 
			post.timePlusNanoseconds + ".jpg";
		imageSrc.setAttribute('src', url);
		imageSrc.setAttribute('width', post.thumbnailWidth);
		imageSrc.setAttribute('height', post.thumbnailHeight);
		return imageSrc;
	},

	// Find reply comments and make them
	// the children of the original comment.
	reorderPosts: function() {
		var replies = document.getElementsByClassName('quotelink');
		var len = replies.length;
		var parentDiv;
		var postNumber;
		var postDiv;
		var reply;
		var i;
		for (i = 0; i < len; i++) {
			postNumber = this.getPostNumber(replies[i].innerHTML);
			parentDiv = this.postNumberToDiv[postNumber];
			if (parentDiv != undefined) {
				// First parentNode: 'quotelink'
				// Second parentNode: Comment div
				// Third parentNode: Post div
				postDiv = replies[i].parentNode.parentNode.parentNode;
				parentDiv.appendChild(postDiv);
			}
		}
	},

	// Remove &gt;&gt; from post number and converts to float.
	getPostNumber: function(postNumber) {
		postNumber = postNumber.replace('&gt;&gt;', '');
		return parseInt(postNumber);
	}

}
