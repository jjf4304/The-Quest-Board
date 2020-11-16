const handleNewPost = (e) =>{
    e.preventDefault();

    $("#errorMessage").animate({width: 'hide'}, 350);

    if($("#postTitle").val() == '' || $("#postDescription").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function(){
        loadpostsFromServer();
    });

    return false;
};


const PostForm = (props) =>{
    return(
        <form id="postForm" name="postForm"
            onSubmit={handleNewPost}
            action="/postGame"
            method="POST"
            className="postForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="postTitle" type="text" name="name" placeholder="Post Title"/>
            <label htmlFor="age">Age: </label>
            <textarea id="postDescription" rows="5" cols="30" name="age" placeholder="Post Description"></textarea>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makepostSubmit" type="submit" value="Make post"/>

        </form>
    );
};

const PostList = function(props){
    if(props.posts.length === 0){
        //Change this to the image with No Groups Available when finished
        return(
            <div className="postList">
                <h3>No Group Postings Yet Adventurer</h3>
            </div>
        );
    }

    const postNodes = props.posts.map(function(post){
        return(
            <div class="postNode" onclick={displayPost(post)}>
                <h2>{post.title}</h2>
                <h5>{post.author}</h5>
            </div> 
        );
    });

    return(
        <div className="posts">
            {postNodes}
        </div>
    )
}

function displayPost(e, post){
    e.preventDefault();
    console.log("IN CLICK");
    //change the display to singular post that shows everything,
    //title, poster, desc and replies with form to reply with
    showPage(post);

    return false;
}


const loadPostsFromServer = () =>{
    sendAjax('GET', '/getPosts', null, (data)=>{
        ReactDOM.render(
            <PostList posts = {data.posts}/>, document.querySelector("#questBoard")
        );
    });
}

const setup = function(csrf){
    ReactDOM.render(
        <PostForm csrf={csrf}/>, document.querySelector("#makePost")
    );

    ReactDOM.render(
        <PostList posts ={[]}/>,document.querySelector("#questBoard")
    );

    loadPostsFromServer();
}


const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result) =>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});