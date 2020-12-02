const handleNewPost = (e) =>{
    e.preventDefault();

    $("#errorMessage").animate({width: 'hide'}, 350);

    if($("#postTitle").val() == '' || $("#postDescription").val() == "") {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function(){
        loadPostsFromServer();
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
            <label htmlFor="postTitle">Name: </label>
            <input id="postTitle" type="text" name="postTitle" placeholder="Post Title"/>
            <label htmlFor="postGame">Game: </label>
            <input id="postGame" type="text" name="postGame" placeholder="What Game are you playing?"/>
            <label htmlFor="postDate">When is the game? </label>
            <input id="postDate" type="date" name="postDate" min="2020-01-01" max="2030-01-01"/>
            <label htmlFor="postRec">Recurring Game? </label>
            <input id="postRec" type="checkbox" name="postRec"/>
            <label htmlFor="postDescription">Quest Description: </label>
            <textarea id="postDescription" rows="5" cols="30" name="postDescription" placeholder="Post Description"></textarea>
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
            <div className="postNode" key={post._id} onClick={e =>displayPost(post)}>
                <h2>{post.title}</h2>
                <h4>Posted by {post.poster}</h4>
            </div> 
        );
    });

    return(
        <div className="posts">
            {postNodes}
        </div>
    )
}

function displayPost(post, e){
    //e.preventDefault();
    console.log("IN CLICK");
    console.log(post.description);
    //change the display to singular post that shows everything,
    //title, poster, desc and replies with form to reply with
    showPage(post);

}

//Soruces https://api.jquery.com/animate/
const showPage = (post)=>{

    //this.... this is probably not the best way to do this


    $("#fullPostTitle").text(post.title);
    $("#fullPostPoster").text(post.author);
    $("#fullPostDesc").text(post.description);
    //Replies?

    $("#fullPost").animate({top:'toggle', opacity:'toggle'});
};



const loadPostsFromServer = () =>{
    sendAjax('GET', '/getGamePosts', null, (data)=>{
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