import Api from './api.js'

init()
async function init(){
    atribuirEventos()
    await atualizarPosts()
    await atualizarPerfil()
}

function atribuirEventos(){
    const $postBtn = document.getElementById('post-btn');
    const $postsContainer = document.getElementById('posts-container');

    $postBtn.addEventListener('click', (e) =>{postar(e)})
    window.addEventListener('click',btnEvents);
}

async function atualizarPerfil(){
    const user = await Api.getUser(Api.getUserId())
    const $perfilName = document.getElementById('perfil-name');
    const $perfilImage = document.querySelector('.perfil-image');
    $perfilImage.src = user.avatarUrl;
    $perfilName.innerText = user.username;
}

function btnEvents(e){
    if (e.target.id == 'logout-btn'){
        logOut(e)
    }
    if (e.target.classList.contains('apagar-btn')){
        apagarPost(e)
    }
    if (e.target.classList.contains('editar-btn')){
        openPostEdit(e)
    }
    if (e.target.classList.contains('confirm-btn')){
        confirmPostEdit(e)
    }
    if (e.target.classList.contains('cancel-btn')){
        cancelPostEdit(e)
    }
}

function logOut(e){
    Swal.fire({
      title: "Deseja sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deslogado!",
          "Você será redirecionado para o login!",
          "success"
        ).then(() => {
          localStorage.clear();
          location.replace("../../index.html");
        });
      }
    });
  }

async function apagarPost(e){
    const $card = e.target.closest('.post-card');
    const postId = $card.attributes.postId.value;
    let response = await Api.deletePost(postId);
    await atualizarPosts()
    console.log(response)
}

function cancelPostEdit(e){
    const $card = document.querySelector('.actual-editing-post');
    const $postEditArea = document.querySelector('.post-edit-area');
    const $editTextArea = document.querySelector('.post-content-edit-text-area');
    
    $editTextArea.value = '';
    $postEditArea.classList.add('hidden');
    $card.classList.remove('actual-editing-post')
}

async function confirmPostEdit(e){
    const $card = document.querySelector('.actual-editing-post');
    const $postEditArea = document.querySelector('.post-edit-area');
    const $editTextArea = document.querySelector('.post-content-edit-text-area');
    
    const postId = $card.attributes.postId.value
    const textContent = $editTextArea.value;
    const response = await Api.editPost(postId, textContent);
    atualizarPosts();
    $postEditArea.classList.add('hidden');
    $card.classList.remove('actual-editing-post');
    console.log(response)
}

function openPostEdit(e){
    const $card = e.target.closest('.post-card');
    const $postEditArea = document.querySelector('.post-edit-area');
    const $editTextArea = document.querySelector('.post-content-edit-text-area');
    const postTextContent = $card.querySelector('.post-text').innerText;

    
    $editTextArea.placeholder = postTextContent;
    $card.classList.add('actual-editing-post')
    $postEditArea.classList.remove('hidden')
}

async function atualizarPosts(){
    let postsArr = await Api.showPostsPage();
    const $postsContainer = document.getElementById('posts-container')
    $postsContainer.innerHTML = createHTML(postsArr.data, cardTemplate)
    aplicarBotoesNosPosts()
}

function createHTML(arr, template){
    let HTMLData = [];
    for (let i = 0; i < arr.length; i++) {
        HTMLData.push(template(arr[i]))
    }
    return HTMLData.join('')
}

function postar(e){
    const $postTextArea = document.getElementById('post-text-area');
    Api.createPost($postTextArea.value);
    setTimeout(atualizarPosts, 500)
    $postTextArea.value = '';
}

function aplicarBotoesNosPosts(){
    const $allPostsArr = [...document.querySelectorAll('.post-card')];
    const $correctPostsArr = $allPostsArr.filter((element, i, arr)=>{
        const postOwnerId = parseInt(element.attributes.ownerid.value)
        if (postOwnerId == Api.getUserId()) {
            return true
        }
    })
    $correctPostsArr.forEach((element)=>{
        const $editarBtn = element.querySelector('.editar-btn');
        const $apagarBtn = element.querySelector('.apagar-btn');

        $editarBtn.classList.remove('hidden')
        $apagarBtn.classList.remove('hidden')
    })
}


function cardTemplate(obj){
    return `
    <article class="post-card" ownerId="${obj.user.id}" postId="${obj.id}">
        <div class="post-card-container">
            <img class="card-user-image" src="${obj.user.avatarUrl}">
            <div class="post-content">
                <h2 class="user-name">${obj.user.username} <span class="id-in-user-name">(ID: ${obj.user.id})</span></h2>
                <p class="post-text">${obj.content}</p>
            </div>
        </div>
        <div class="card-user-btn-container">
            <button class="editar-btn hidden"><i class="fa-solid fa-pencil"></i></button>
            <button class="apagar-btn hidden"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="data-container">
            <span class="post-data">${formatPostDate(obj.createdAt)}</span>
        </div>
    </article>
    `
}

function formatPostDate(origDate){
    return origDate.replace(/T.*Z/, '')
}