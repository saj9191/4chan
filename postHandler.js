var PostHandler = (function() {
	function postCategory(post) {
		this.post = post;
	};

	postCategory.prototype.makeSubDiv = function(postDiv, title, className) {
		var subPost = $('<div/>');
		subPost.html(title + this.post);
		subPost.addClass(className);
		postDiv.append(subPost)
	};

	function image(post) {
		PostHandler.postCategory.call(post);
	};

	image.prototype = new postCategory();
	image.prototype.constructor = postCategory;
	image.prototype.makeSubDiv = function(postDiv, title, className) {
		var subPost = $('<div/>');
		var imageSrc = dataHandler.getImageSrc(post, usernameDiv);
	};

	return { "postCategory": postCategory, "image": image };
})();

