var display = {

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
			threadDiv.appendChild(postDiv);
		}
		contentDiv.appendChild(threadDiv);
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
		var postNumberText = document.createTextNode('Post Number: ' + post.postNumber);
		postNumberDiv.appendChild(postNumberText);
		postDiv.appendChild(postNumberDiv);

		var usernameDiv = document.createElement('div');
		var usernameText = document.createTextNode('Username: ' + post.username);
		usernameDiv.appendChild(usernameText);
		postDiv.appendChild(usernameDiv);

		var subjectDiv = document.createElement('div');
		var subjectText = document.createTextNode('Subject: ' + post.subject);
		subjectDiv.appendChild(subjectText);
		postDiv.appendChild(subjectDiv);

		var commentDiv = document.createElement('div');
		var commentText = 'Comment: ' + post.comment;
		commentDiv.innerHTML = commentText;
		postDiv.appendChild(commentDiv);
	}

}