var dataHandler = {
	postNumberToDiv : [],

	addThread: function(thread) {
		var len = thread.posts.length;
		var threadDiv = $('<div/>');
		var postDiv;
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
		$('#content').append(threadDiv);
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
		var postNumberDiv = $('<div/>');
		postNumberDiv.html('Post Number: ' + post.postNumber);
		postDiv.append(postNumberDiv);

		var usernameDiv = $('<div/>');
		usernameDiv.html('Username: ' + post.username);
		postDiv.append(usernameDiv);

		if (post.subject != undefined) {
			var subjectDiv = $('<div/>');
			subjectDiv.html('Subject: ' + post.subject);
			postDiv.append(subjectDiv);
		}

		if (post.comment != undefined) {
			var commentDiv = $('<div/>');
			commentDiv.html('Comment:<br>' + post.comment);
			postDiv.append(commentDiv);
		}

		if (post.timePlusNanoseconds != undefined) {
			var imageSrc = dataHandler.getImageSrc(post);
			postDiv.append(imageSrc);
		}
	},

	getImageSrc: function(post) {
		var imageSrc = $('<img/>');
		var url = 'https://images.4chan.org/mu/src/' + 
			post.timePlusNanoseconds + post.ext;
		imageSrc.attr('src', url);
		imageSrc.attr('width', post.thumbnailWidth);
		imageSrc.attr('height', post.thumbnailHeight);
		return imageSrc;
	},

	getThumbNailSrc: function(post) {
		var imageSrc = document.createElement('img');
		var url = 'https://0.thumbs.4chan.org/mu/thumb/' + 
			post.timePlusNanoseconds + '.jpg';
		imageSrc.attr('src', url);
		imageSrc.attr('width', post.thumbnailWidth);
		imageSrc.attr('height', post.thumbnailHeight);
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
			postNumber = this.getPostNumber(replies[i].innerHTML);
			parentDiv = this.postNumberToDiv[postNumber];
			if (parentDiv != undefined) {
				// First parentNode: 'quotelink'
				// Second parentNode: Comment div
				// Third parentNode: Post div
				postDiv = replies[i].parentNode.parentNode.parentNode;
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