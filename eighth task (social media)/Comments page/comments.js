import * as utils from "../utility folder/util.js"

utils.createHeader("Comments");
utils.createFooter();

document.addEventListener("click", (event) => {
    const submitButton = document.querySelector(".submit");

    if (event.target && (event.target.id === "add-comment" || event.target.className === "add-post-btn")) {
        const addCommentButton = event.target;
        const postNode = addCommentButton.parentNode.parentNode.parentNode;
        utils.openModal();
        const submitButtonReference = () => {
            utils.submit(postNode);
        };

        submitButton.onclick = submitButtonReference;
    } 
});

async function loadAllComments(postId) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await res.json();
        return comments;
    } catch (error) {
        console.log(error);
    }
}

async function fetchPost(postId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await res.json();
    return post;
}

(async () => {
    const mainSection = document.querySelector(".main-section");
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

    const userData = utils.getLoggedInUserData();
    const post = await fetchPost(postId); 

    const postDiv = utils.renderPost(post.body, userData, post.id);

    const comments = await loadAllComments(postId);
    console.log(comments)

    const addCommentDiv = document.querySelector(".container-for-add-comments")

    comments.forEach(comment => {
        userData.username = comment.body;
        userData.name = comment.name;
        const commentDiv = utils.createUserElement(userData);
        addCommentDiv.appendChild(commentDiv);
    })

    mainSection.appendChild(postDiv);
})();
