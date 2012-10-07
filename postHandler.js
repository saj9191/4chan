var PostHandler = (function() {
	function PostDiv(post) {
		this.post = post;
	};

	PostDiv.prototype.makeSubDiv = function(postDiv, title, className) {
		var subPost = $('<div/>');
		subPost.html(title + ": " +  this.post);
		subPost.addClass(className);
		postDiv.append(subPost)
	};

	function CommentDiv(post) {
		PostDiv.call(this, post);
	};

	CommentDiv.prototype = new PostDiv();
	CommentDiv.prototype.constructor = PostDiv;
	CommentDiv.prototype.makeSubDiv = function(postDiv, title, className) {
		var subPost = $('<div/>');
		subPost.html(title + ":<br>" +  this.post);
		subPost.addClass(className);
		postDiv.append(subPost)
	};

	return { "postDiv": PostDiv, "commentDiv": CommentDiv };
})();

