const handleError = (message) =>{
    $("#errorMessage").text(message);
    $("#errorMessage").animate({width:'toggle'});
    console.log("ERROR " + message);
};

//Soruces https://api.jquery.com/animate/
const showPage = (post)=>{

    //this.... this is probably not the best way to do this


    $("#fullPostTitle").text(post.title);
    $("#fullPostPoster").text(post.author);
    $("#fullPostDesc").text(post.description);
    //Replies?

    $("#fullPost").animate({width:'toggle', opacity:'toggle'});
};

const redirect = (response) =>{
    $("#errorMessage").animate({width:'hide'}, 350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) =>{
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr,status,error){
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};

const handleLogin = (e) =>{
    e.preventDefault();

    $("#errorMessage").animate({width:'hide'},350);

    if($("#user").val() == ''||$("#pass").val()==''){
        handleError("Username or password isempty");
        return false;
    }

    console.log($("input[name=_csrf]").val());
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(),redirect);

    return false;
};

const handleSignup = (e) =>{
    e.preventDefault();

    console.log("IN HANDLE");

    $("#errorMessage").animate({width:'hide'},350);

    if($("#user").val() == ''||$("#pass").val()==''|| $("#pass2").val()==''){
        handleError("All fields required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};