import * as utils from "../utility folder/util.js"

utils.createHeader("Discover");
utils.createFooter();

document.addEventListener("click", (event) => {
    const submitButton = document.querySelector(".submit");

    if (event.target && event.target.id === "add-comment") {
        const addCommentButton = event.target;
        const postNode = addCommentButton.parentNode.parentNode.parentNode;
        utils.openModal();
        const submitButtonReference = () => {
            utils.submit(postNode);
        };

        submitButton.onclick = submitButtonReference;
    } else if (event.target && event.target.className === "add-post-btn") {
        const submitButtonReferenceP = () => {
            addPost();
        }
        utils.openModal();

        submitButton.onclick = submitButtonReferenceP;
    }
});

// document.addEventListener("click", (event) => {
//     if (event.target && event.target.className === "add-post-btn") {
//     }
// })

document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "see-comments") {
        const postNode = event.target.closest(".container-for-post");
        console.log(postNode)
        const postId = postNode.dataset.postId;
        location.href = `http://127.0.0.1:5500/eighth%20task/Comments%20page/comments.html?postId=${postId}`;

    }
})



function addComment(comment, post) {
    const loggedInUser = utils.getLoggedInUserData();
    loggedInUser.username = comment;
    post.getElementsByClassName("container-for-add-comments")[0].appendChild(utils.createUserElement(loggedInUser));
}

async function fetchAndRenderPosts() {
    try {
        const posts = await loadAllPosts();
        const users = await loadAllUsers()
        // console.log(loggedInUserData); // for testing
        const usrMap = new Map();

        const findUser = (id) => {
            let user = usrMap.get(id)
            if (user) {
                return user
            } else {
                user = users.find(user => user.id === id)
                usrMap.set(id, user)
                return user
            }
        }

        posts.forEach(post => {
            // renderPost(post, findUser(post.userId))
            utils.renderPost(post.body, findUser(post.userId), post.id, "post")
        });

    } catch (err) {
        console.log(err);
    }
}

function addPost() {
    const loggedInUser = utils.getLoggedInUserData();
    const postBody = document.querySelector("#textarea").value;
    const newPost = utils.renderPost(postBody, loggedInUser);
    console.log(newPost)
    const mainsection = document.querySelector(".main-section");
    document.querySelector("#textarea").value = ""
    mainsection.insertBefore(newPost, mainsection.childNodes[3]);
    utils.closeModal();
}

async function loadAllUsers() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await res.json();
        return users
    } catch (error) {
        console.log(error);
        // return []
    }

}

async function loadAllPosts() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await res.json();
        return posts;
    } catch (error) {
        console.log(error);
    }
}

fetchAndRenderPosts();


