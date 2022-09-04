import Api from "./js/api.js";
import RenderPost from "./js/Render.post.js";
import CreateMyPost from "./js/Create.post.js";
import DeleteButton from "./js/Delete.post.js";

const dataUser = await Api.getUserId(
  localStorage.getItem("@kenzie-blog:userId")
);

const imagePerfil = document.querySelector("#img_perfil");

const nomeUser = document.querySelector("#nome_user");

nomeUser.innerHTML = dataUser.username;
imagePerfil.src = dataUser.avatarUrl;

const logoutButton = document.querySelector(".logout_button");

logoutButton.addEventListener("click", () => {
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
});

CreateMyPost.addPost();

DeleteButton.deletePostUser();