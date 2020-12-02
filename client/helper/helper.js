const handleError = (message) =>{
    //I want to use this not for a side bar but for a modal like pop-in window
    // $("#errorMessage").text(message);
    // $("#errorMessage").animate({width:'toggle'});
    console.log("ERROR " + message);
    $("#errorMessage").text(message);
    //https://stackoverflow.com/questions/17863490/animate-css-display
    $("#darkLayer").show(400);
    $("#errorDiv").animate({left: '40%'}, 500);

};

const redirect = (response) =>{
    $("#errorDiv").animate({left: '-50%'}, 500);
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

    $("#errorDiv").animate({left: '-50%'}, 500);

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

    $("#errorDiv").animate({left: '-50%'}, 500);

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

const hideError = () =>{
    $("#errorDiv").animate({left: '-50%'}, 500);
    $("#darkLayer").hide(400);
};

const hidePost = () =>{
    $("#makePost").animate({left: '150%'}, 500);
    $("#darkLayer").hide(400);
};

const ErrorModal = function(){

    return(
        <div id="errorDiv">
            <h3><span id="errorMessage"></span></h3>
            <button id="closeError" onClick={e =>hideError()}>Close Message</button>
        </div>
    );

};