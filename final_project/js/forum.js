var opened = [];
var newPostFlag = 1;
var newCommentFlag = [];
var parentPostId;

$(document).ready(function() {

	var posts = $.getJSON("php/forum_get_posts.php");

	posts.done(function(data) {
		posts = data;
		init(posts);
	});
});

function init(posts) {
	for (var i = 0; i < posts.length; i++) {
		opened[i] = 0;
		newCommentFlag[i] = 0;
	}

	$('#addPost').click(toggleNewPost);

	$('#sticky').append(buildPost(posts[posts.length - 1]));
	$('#sticky').click(togglePost(posts[posts.length - 1], posts.length - 1));

	for (var i = 0; i < posts.length - 1; i++) {
		var idStr = "post" + i;
		$('#memberPosts').append('<div id="'
			+ idStr
			+ '"class="post">'
			+ buildPost(posts[i])
			+ '</div>');
		$('#' + idStr).click(togglePost(posts[i], i));
	}
}

function buildPost(postData) {
	var postStr = '<div class="postTitle">' + postData.title
		+ '<div class="postDate">' + postData.datePosted + '</div></div>'
		+ '<div class="postOwner">' + postData.username + '</div>';

	return postStr;
}

function togglePost(postData, index) {
	return function() {
		if (opened[index]) {
			var postStr = '<div class="postTitle">' + postData.title
				+ '<div class="postDate">' + postData.datePosted + '</div></div>'
				+ '<div class="postOwner">' + postData.username + '</div>';
			$(this).html(postStr);
			opened[index] = 0;
			newCommentFlag[index] = 0;
		}
		else {
			parentPostId = postData.id;
			var commentStr = getComments(postData.id);
			var postStr = '<div class="postTitle">' + postData.title
				+ '<div class="postDate">' + postData.datePosted + '</div></div>'
				+ '<div class="postContent">' + postData.content + '</div>'
				+ commentStr
				+ '<div id="addCommentContent'+index+'" class="addCommentContent">'
				+ '<div style="height: 15px">'
				+ '<img id="addComment'+index+'" src="icons/plus.svg"/></div>'
				+ '<div id="newComment'+index+'"></div></div>'
				+ '<div class="postOwner">' + postData.username + '</div>';

			$(this).html(postStr);
			$('#addComment'+index).click(toggleNewComment(index));
			opened[index] = 1;
		}
	}
}

function toggleNewPost() {
	if (newPostFlag) {
		$('.addControl').css('height', '250px');
		$('#addPost').attr('src','icons/minus.svg');
		$('#newPost').html(buildNewPostForm());
		$('#submit').click(function() {
			var postObject = {
				'title': $('#postTitle').val(),
				'memberCode': $('#postCode').val(),
				'content': $('#postContent').val()
			};
			if (postObject.memberCode == '' || postObject.content == '' || postObject.title == '') {
				if (postObject.memberCode == '')
					$('#postCode').attr('placeholder','please enter your member code');
				if (postObject.content == '')
					$('#postContent').attr('placeholder','please enter some content');
				if (postObject.title == '')
					$('#postTitle').attr('placeholder','please enter a title');
				return;
			}
			$.ajax({
				url: 'php/forum_make_post.php',
				type: 'POST',
				data: postObject,
				success: function(data) {
					data = JSON.parse(data);
					if (data == 'success') {
						location.reload();
					}
					else {
						$('#postCode').val('');
						$('#postCode').attr('placeholder','Please enter a valid member code');
					}
				},
				error: function() {
					console.log('error');
				}
			});
		});
		newPostFlag = 0;
	}
	else {
		$('.addControl').css('height', '');
		$('img').attr('src','icons/plus.svg');
		$('#newPost').html('');
		newPostFlag = 1;
	}
}

function toggleNewComment(index) {
	return function() {
		event.stopPropagation();
		if (!newCommentFlag[index]) {
			$('#addCommentContent'+index).css('height', '250px');
			$('#addComment'+index).attr('src','icons/minus.svg');
			$('#newComment'+index).html(buildNewCommentForm(index));
			$('#postCommentCode'+index+', #postCommentContent'+index).click(function() {
				event.stopPropagation();
			});
			$('#commentSubmit'+index).click(function() {
				event.stopPropagation();
				var postObject = {
					'parentId': parentPostId,
					'memberCode': $('#postCommentCode'+index).val(),
					'content': $('#postCommentContent'+index).val()
				};
				if (postObject.memberCode == '' || postObject.content == '') {
					if (postObject.memberCode == '')
						$('#postCommentCode'+index).attr('placeholder','please enter your member code');
					if (postObject.content == '')
						$('#postCommentContent'+index).attr('placeholder','please enter some content');
					return;
				}
				$.ajax({
					url: 'php/forum_make_comment.php',
					type: 'POST',
					data: postObject,
					success: function(data) {
						data = JSON.parse(data);
						if (data == 'success') {
							location.reload();
						}
						else {
							$('#postCommentCode'+index).val('');
							$('#postCommentCode'+index).attr('placeholder','Please enter a valid member code');
						}
					},
					error: function() {
						console.log('error');
					}
				});
			});
			newCommentFlag[index] = 1;
		}
		else {
			$('#addCommentContent'+index).css('height', '');
			$('#addComment'+index).attr('src','icons/plus.svg');
			$('#newComment'+index).html('');
			newCommentFlag[index] = 0;
		}
	}
}

function buildNewPostForm() {
	var str = '<textarea id="postTitle" class="halfInput" placeholder="Title of post" />\
	<textarea id="postCode" class="halfInput" placeholder="Member code" />\
	<textarea id="postContent" class="fullInput" rows="3" cols="10" placeholder="Content" /><br />\
	<button id="submit">Submit</button></form>';
	return str;
}

function buildNewCommentForm(index) {
	var str = '<textarea id="postCommentCode'+index+'" class="halfInput" placeholder="Member code"/>\
	<textarea id="postCommentContent'+index+'" class="fullInput" rows="3" cols="10" placeholder="Content" /><br />\
	<button id="commentSubmit'+index+'">Submit</button></form>';
	return str;
}

function getComments(postId) {
	var str = '';
	var comments;
	$.ajax({
		url: 'php/forum_get_comments.php?postId=' + postId,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			comments = data;
			str = buildComment(comments);
		},
		error: function() {
			console.log('error');
		},
		async: false
	});
	return str;
}

function buildComment(comments) {
	var str = '';

	for (var i = 0; i < comments.length; i++) {
		str += '<div class="comment">\
		<div class="postDate">' + comments[i].datePosted + '</div>\
		<div class="commentContent">' + comments[i].content + '</div>\
		<div class="postOwner">' + comments[i].username + '</div>\
		</div>';
	}
	return str;
}