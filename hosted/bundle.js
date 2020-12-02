"use strict";

var handleNewPost = function handleNewPost(e) {
  e.preventDefault();
  $("#errorMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#postTitle").val() == '' || $("#postDescription").val() == "") {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function () {
    loadPostsFromServer();
  });
  return false;
};

var PostForm = function PostForm(props) {
  return /*#__PURE__*/React.createElement("form", {
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
    htmlFor: "postDate"
  }, "When is the game? "), /*#__PURE__*/React.createElement("input", {
    id: "postDate",
    type: "date",
    name: "postDate",
    min: "2020-01-01",
    max: "2030-01-01"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "postRec"
  }, "Recurring Game? "), /*#__PURE__*/React.createElement("input", {
    id: "postRec",
    type: "checkbox",
    name: "postRec"
  }), /*#__PURE__*/React.createElement("label", {
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
    className: "makepostSubmit",
    type: "submit",
    value: "Make post"
  }));
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

function displayPost(post, e) {
  //e.preventDefault();
  console.log("IN CLICK");
  console.log(post.description); //change the display to singular post that shows everything,
  //title, poster, desc and replies with form to reply with

  showPage(post);
} //Soruces https://api.jquery.com/animate/


var showPage = function showPage(post) {
  //this.... this is probably not the best way to do this
  $("#fullPostTitle").text(post.title);
  $("#fullPostPoster").text(post.author);
  $("#fullPostDesc").text(post.description); //Replies?

  $("#fullPost").animate({
    top: 'toggle',
    opacity: 'toggle'
  });
};

var loadPostsFromServer = function loadPostsFromServer() {
  sendAjax('GET', '/getGamePosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
      posts: data.posts
    }), document.querySelector("#questBoard"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PostForm, {
    csrf: csrf
  }), document.querySelector("#makePost"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostList, {
    posts: []
  }), document.querySelector("#questBoard"));
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
};

var redirect = function redirect(response) {
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
  console.log("IN HANDLE");

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
