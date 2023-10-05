export function createHeader(title) {
    const mainSection = document.querySelector(".main-section");
  
    const discoverDiv = document.createElement("div");
    discoverDiv.className = "discover";
    const titleDiv = document.createElement("p");
    titleDiv.textContent = title;
    discoverDiv.appendChild(titleDiv);
  
    const newDiv = document.createElement("div");
    newDiv.className = "new";
    const newText = document.createElement("p");
    newText.textContent = "What's new today";
    newDiv.appendChild(newText);
  
    mainSection.appendChild(discoverDiv);
    mainSection.appendChild(newDiv);
    createModal();
}

export function getLoggedInUserData() {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        const userData = JSON.parse(user);
        return userData;
    }
    return null;
}

export function renderPost(postBody, userData, postId, type) {
    const postContainer = document.createElement("div");
    postContainer.className = "container-for-post";
    postContainer.dataset.postId = postId;

    const userElement = createUserElement(userData, true);
    postContainer.appendChild(userElement);

    const postText = document.createElement("p");
    postText.className = "container-for-post-p";
    postText.textContent = postBody;

    const hr = document.createElement("hr");

    const commentsSection = document.createElement("div");
    commentsSection.className = "container-for-image-text-see";

    const commentsImageText = document.createElement("div");
    commentsImageText.className = "container-for-add-comments";
    commentsSection.appendChild(commentsImageText);

    if(type === "post") {
        const seeCommentsButton = document.createElement("button");
        seeCommentsButton.className = "btn-see-comments";
        seeCommentsButton.textContent = "See comments";
        seeCommentsButton.id = "see-comments"
        commentsSection.appendChild(seeCommentsButton);
    }


    const addCommentSection = document.createElement("div");
    addCommentSection.className = "add-comment-div";

    const commentImageDiv = document.createElement("div");
    const commentImage = document.createElement("img");
    commentImage.src = "./Images/Comment.svg";
    commentImageDiv.appendChild(commentImage);

    const addCommentButtonDiv = document.createElement("div");

    const addCommentButton = document.createElement("button");
    addCommentButton.className = "btn-see-comments";
    addCommentButton.textContent = "Add comment...";
    addCommentButton.id = `add-comment`;

    addCommentButtonDiv.appendChild(addCommentButton);

    addCommentSection.appendChild(commentImageDiv);
    addCommentSection.appendChild(addCommentButtonDiv);

    postContainer.appendChild(postText);
    postContainer.appendChild(hr);
    postContainer.appendChild(commentsSection);
    postContainer.appendChild(addCommentSection);

    const mainSection = document.querySelector(".main-section");
    mainSection.appendChild(postContainer);
    return postContainer;
}

export function createUserElement(user, includeAtSign = false) {
    const userElement = document.createElement("div");
    userElement.className = "container-for-image-text";

    const profilePictureDiv = document.createElement("div");
    const image = document.createElement("img");
    image.src = "./Images/Ellipse.svg";
    profilePictureDiv.appendChild(image);

    const nameAndTagDiv = document.createElement("div");
    nameAndTagDiv.className = "container-for-username-tag";

    const username = document.createElement("div");
    username.className = "username";
    username.textContent = user.name;

    const tag = document.createElement("div");
    tag.className = "tag";

    if (includeAtSign) {
        tag.textContent = `@${user.username}`;
    } else {
        tag.textContent = user.username;
    }

    nameAndTagDiv.appendChild(username);
    nameAndTagDiv.appendChild(tag);

    userElement.appendChild(profilePictureDiv);
    userElement.appendChild(nameAndTagDiv);

    return userElement;
}

export function submit(post) {
    let textContent = document.getElementById("textarea").value;
    if (!textContent) {
        return;
    }
    
    addComment(textContent, post);
    document.getElementById("textarea").value = ""
    closeModal();
}

export function addComment(comment, post) {
    const loggedInUser = getLoggedInUserData();
    loggedInUser.username = comment;
    post.getElementsByClassName("container-for-add-comments")[0].appendChild(createUserElement(loggedInUser));
}

function createModal() {
    
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalContainer.id = "modal";
    
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    
    const closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.id = "closeModal";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", closeModal);
    
    const textarea = document.createElement("textarea");
    textarea.className = "textarea";
    textarea.placeholder = "What's on your mind?";
    textarea.style.resize = "none";
    textarea.required = true;
    textarea.id = "textarea";
    
    const submitButton = document.createElement("span");
    submitButton.className = "submit";
    
    const submitImage = document.createElement("img");
    submitImage.src = "./Images/icons8-paper-plane-24.png";
    submitImage.alt = "";
    
    submitButton.appendChild(submitImage);
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(textarea);
    modalContent.appendChild(submitButton);
    
    modalContainer.appendChild(modalContent);
    
    const mainSection = document.querySelector(".main-section");
    mainSection.appendChild(modalContainer);
    
}

export function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

export function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

export function createFooter() {
    const main = document.querySelector("main");

    const footer = document.createElement("footer");
    footer.className = "footer";

    const addPostButton = document.createElement("img");
    addPostButton.src = "./Images/new.svg";
    addPostButton.className = "add-post-btn";

    footer.appendChild(addPostButton);
    main.appendChild(footer);
}
