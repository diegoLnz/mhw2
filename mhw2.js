document.addEventListener("DOMContentLoaded", function(){
    hideContent(this);

    /*---===AGGIUNTA ELEMENTO MOSTRA CONTENUTO ALLA SECTION===---*/
    const section = document.getElementsByClassName('content')[0];
    const readMoreElement = createReadMoreElement();
    section.appendChild(readMoreElement);

    /*---===AGGIUNTA ELEMENTO 'MOSTRA CONTENUTO' E 'CAMBIA IMMAGINE' AI POST USANDO I DATA ELEMENT===---*/
    const postsList = document.getElementsByClassName('single-post');
    for(let i = 0; i < postsList.length; i++){
        let post = postsList[i];
        if(post.dataset.type == 'image'){
            hideImg(post);
            const showImg = createShowImageElement(post);
            const changeImg = createChangeImageElement(post);
            post.appendChild(showImg);
            post.appendChild(changeImg);
        }
    }

    /*---===EVENT PER IL LIKE===---*/
    const likeActionItemsList = this.documentElement.querySelectorAll(".for-like");
    for(let i = 0; i < likeActionItemsList.length; i++){
        let likeActionItem = likeActionItemsList[i];
        likeActionItem.addEventListener("click", function() {
            toggleLike(likeActionItem);
        });
    }
});

function togglePostContent(){
    const postsList = document.getElementsByClassName('single-post');
    let contentHidden = true;
    for(let i = 0; i < postsList.length; i++){
        let post = postsList[i];
        toggleFlexElement(post);
        
        contentHidden = post.classList.contains("d-none");
    }
    return contentHidden;
}

function hideContent(element){
    const postsList = element.getElementsByClassName('single-post');
    for(let i = 0; i < postsList.length; i++){
        postsList[i].classList.add("d-none");
    }
}

function hideImg(element){
    let imgElement = element.querySelector(".post-image img");
    imgElement.classList.add("d-none");
}

function createReadMoreElement(){
    const readMoreElement = document.createElement("a");
    readMoreElement.textContent = "Visualizza i post";
    readMoreElement.href = "#";

    readMoreElement.classList.add("a-margin", "a-custom-white");

    readMoreElement.addEventListener("click", function(){
        this.textContent = togglePostContent() ? "Visualizza i post" : "Nascondi i post";
    });
    
    return readMoreElement;
}

function createShowImageElement(element){
    const showImgElement = document.createElement("a");
    showImgElement.textContent = "Mostra immagine";
    showImgElement.href = "#";

    showImgElement.classList.add("a-margin", "a-custom-white");

    showImgElement.addEventListener("click", function(){
        let imgElement = element.querySelector(".post-image img");
        this.textContent = toggleBlockElement(imgElement) ? "Mostra immagine" : "Nascondi immagine";
    });

    return showImgElement;
}

function createChangeImageElement(element){
    const changeImgElement = document.createElement("a");
    changeImgElement.textContent = "Passa all' altra immagine";
    changeImgElement.href = "#";

    changeImgElement.classList.add("a-custom-white");

    changeImgElement.addEventListener("click", function(){
        let imgElement = element.querySelector(".post-image img");
        imgElement.src = "images/Posts/kid.jpg";
    });

    return changeImgElement;
}

function toggleBlockElement(element){
    if(element.classList.contains("d-none")){
        element.classList.remove("d-none");
        element.classList.add("d-block");
    }else{
        element.classList.remove("d-block");
        element.classList.add("d-none"); 
    }
    return element.classList.contains("d-none");
}

function toggleFlexElement(element){
    if(element.classList.contains("d-none")){
        element.classList.remove("d-none");
        element.classList.add("d-flex");
    }else{
        element.classList.remove("d-flex");
        element.classList.add("d-none");
    }
    return element.classList.contains("d-none");
}

function toggleLike(element){
    if(!element.classList.contains('liked')){
        let svg = element.querySelector("svg");
        svg.setAttribute("fill", "red");
        let path = element.querySelector("svg path");
        path.setAttribute("d", "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314");
        element.classList.add('liked');
    }
    else{
        let svg = element.querySelector("svg");
        svg.setAttribute("fill", "currentColor");
        let path = element.querySelector("svg path");
        path.setAttribute("d", "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15");
        element.classList.remove('liked');
    }
}