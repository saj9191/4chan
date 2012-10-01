var data = {
	postNumberToDiv : [],

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
			// First parentNode: 'quotelink'
			// Second parentNode: Comment div
			// Third parentNode: Post div
			postDiv = replies[i].parentNode.parentNode.parentNode;
			if (parentDiv != undefined) {
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