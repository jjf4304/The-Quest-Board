"use strict";

var handleNewPost = function handleNewPost(e) {
  e.preventDefault();
  $("#errorDiv").animate({
    left: '-40%'
  }, 350);
  $("#makePost").animate({
    left: '150%'
  }, 350);
  $("#fullPost").animate({
    top: '150%'
  }, 350);
  $("#darkLayer").hide(400);

  if ($("#postTitle").val() == '' || $("#postDescription").val() == "") {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function () {
    loadPostsFromServer();
  });
  return false;
};

var handleNewReply = function handleNewReply(e) {
  e.preventDefault();
  $("#errorDiv").animate({
    left: '-40%'
  }, 350);
  $("#makePost").animate({
    left: '150%'
  }, 350);
  $("#darkLayer").hide(400);

  if ($("#replyField").val() == "") {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#postReply").attr("action"), $("#postForm").serialize(), function () {
    displayPost();
  });
  return false;
};

var PostForm = function PostForm(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    id: "postForm",
    name: "postForm",
    onSubmit: handleNewPost,
    action: "/postGame",
    method: "POST",
    className: "postForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "postTitle"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "postTitle",
    type: "text",
    name: "postTitle",
    placeholder: "Post Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "postGame"
  }, "Game: "), /*#__PURE__*/React.createElement("input", {
    id: "postGame",
    type: "text",
    name: "postGame",
    placeholder: "What Game are you playing?"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "postRec"
  }, "Recurring Game? "), /*#__PURE__*/React.createElement("select", {
    id: "postRec",
    type: "select",
    name: "postRec"
  }, /*#__PURE__*/React.createElement("option", {
    value: "true"
  }, "Yes"), /*#__PURE__*/React.createElement("option", {
    value: "false"
  }, "No")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "postDescription"
  }, "Quest Description: "), /*#__PURE__*/React.createElement("textarea", {
    id: "postDescription",
    rows: "5",
    cols: "30",
    name: "postDescription",
    placeholder: "Post Description"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Make post"
  })), /*#__PURE__*/React.createElement("button", {
    id: "closePost",
    onClick: function onClick(e) {
      return hidePost();
    }
  }, "Close Post"));
};

var PostList = function PostList(props) {
  if (props.posts.length === 0) {
    //Change this to the image with No Groups Available when finished
    return /*#__PURE__*/React.createElement("div", {
      className: "postList"
    }, /*#__PURE__*/React.createElement("h3", null, "No Group Postings Yet Adventurer"));
  }

  var postNodes = props.posts.map(function (post) {
    return /*#__PURE__*/React.createElement("div", {
      className: "postNode",
      key: post._id,
      onClick: function onClick(e) {
        return displayPost(post);
      }
    }, /*#__PURE__*/React.createElement("h2", null, post.title), /*#__PURE__*/React.createElement("h4", null, "Posted by ", post.poster));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "posts"
  }, postNodes);
};

function displayPost(post) {
  console.log("IN DISPLAY");
  $("#fullPost").animate({
    top: '20%'
  }, 350);
  ReactDOM.render( /*#__PURE__*/React.createElement(FullPostData, {
    post: post
  }), document.querySelector("#fullDetails"));
  ReactDOM.render( /*#__PURE__*/React.createElement(FullPostReplyField, null), document.querySelector("#fullReplyField")); // ReactDOM.render(
  //     <AllReplies post={post}/>, document.querySelector("#fullReplies")
  // );
}

var loadPostsFromServer = function loadPostsFromServer() {
  sendAjax('GET', '/getGamePosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
      posts: data.posts
    }), document.querySelector("#questBoard"));
  });
};

var FullPostData = function FullPostData(post) {
  console.log("INT FULL POST DATA");
  console.log(post);
  return /*#__PURE__*/React.createElement("div", {
    id: "fullData"
  }, /*#__PURE__*/React.createElement("h2", null, "Game Title:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "fullTitle",
    value: post.post.title,
    readOnly: true
  }), /*#__PURE__*/React.createElement("h2", null, "Quest Giver:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "fullPoster",
    value: post.post.poster,
    readOnly: true
  }), /*#__PURE__*/React.createElement("h2", null, "When is the Game?"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    id: "fullDate",
    value: post.post.dateOfPlay,
    readOnly: true
  }), /*#__PURE__*/React.createElement("h2", null, "Is it a recurring game?"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "fullRec",
    value: post.post.recurring,
    readOnly: true
  }), /*#__PURE__*/React.createElement("h2", null, "Game Description"), /*#__PURE__*/React.createElement("textarea", {
    id: "fullDescription",
    rows: "5",
    cols: "30",
    readOnly: true
  }, post.post.description));
};

var FullPostReplyField = function FullPostReplyField(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "postReply",
    name: "postReply",
    onSubmit: handleNewReply,
    action: "/postReply",
    method: "POST",
    className: "postForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "thePostReply"
  }, "Reply: "), /*#__PURE__*/React.createElement("textarea", {
    id: "thePostReply",
    rows: "5",
    cols: "30",
    name: "thePostReply",
    placeholder: "Reply"
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Reply to Post"
  }));
};

var AllReplies = function AllReplies(post) {
  var replies = post.post.map(function (replies) {
    return /*#__PURE__*/React.createElement("div", {
      className: "gameReply",
      key: replies.poster
    }, /*#__PURE__*/React.createElement("h3", null, replies.poster), /*#__PURE__*/React.createElement("p", null, replies.reply));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "allReplies"
  }, replies);
};

var ShowMaker = function ShowMaker() {
  $("#makePost").animate({
    left: '30%'
  }, 350);
  $("#darkLayer").show(400);
};

var MakerPageButton = function MakerPageButton() {
  return /*#__PURE__*/React.createElement("div", {
    id: "makerButtonDiv"
  }, /*#__PURE__*/React.createElement("button", {
    id: "makerButton",
    onClick: function onClick(e) {
      return ShowMaker();
    }
  }, "Post a Quest!"));
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PostForm, {
    csrf: csrf
  }), document.querySelector("#makePost"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
    posts: []
  }), document.querySelector("#questBoard"));
  ReactDOM.render( /*#__PURE__*/React.createElement(MakerPageButton, null), document.querySelector("#makerButton"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ErrorModal, null), document.querySelector("#error"));
  loadPostsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  //I want to use this not for a side bar but for a modal like pop-in window
  // $("#errorMessage").text(message);
  // $("#errorMessage").animate({width:'toggle'});
  console.log("ERROR " + message);
  $("#errorMessage").text(message); //https://stackoverflow.com/questions/17863490/animate-css-display

  $("#darkLayer").show(400);
  $("#errorDiv").animate({
    left: '40%'
  }, 500);
};

var redirect = function redirect(response) {
  $("#errorDiv").animate({
    left: '-50%'
  }, 500);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("#errorDiv").animate({
    left: '-50%'
  }, 500);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password isempty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#errorDiv").animate({
    left: '-50%'
  }, 500);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

var hideError = function hideError() {
  $("#errorDiv").animate({
    left: '-50%'
  }, 500);
  $("#darkLayer").hide(400);
};

var hidePost = function hidePost() {
  $("#makePost").animate({
    left: '150%'
  }, 500);
  $("#darkLayer").hide(400);
};

var ErrorModal = function ErrorModal() {
  return /*#__PURE__*/React.createElement("div", {
    id: "errorDiv"
  }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("span", {
    id: "errorMessage"
  })), /*#__PURE__*/React.createElement("button", {
    id: "closeError",
    onClick: function onClick(e) {
      return hideError();
    }
  }, "Close Message"));
};
