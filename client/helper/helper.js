const handleError = (message) =>{
    //I want to use this not for a side bar but for a modal like pop-in window
    // $("#errorMessage").text(message);
    // $("#errorMessage").animate({width:'toggle'});
    console.log("ERROR " + message);
};

const redirect = (response) =>{
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