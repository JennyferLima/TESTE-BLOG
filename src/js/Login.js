import Api from "./api.js";

const formLogin = document.querySelector(".login_form")

const loginButton = document.querySelector(".login_btn")

const objectValues = [...formLogin.elements]

export default class Login {
    static async elementsForm() {
        const objectForm = {
            email: objectValues[0].value,
            password: objectValues[1].value
        }
        const response = await Api.login(objectForm)
        //localStorage.setItem("@kenzie-blog:token", response.token)
        /* if (response.userId) {
            const userData = await Api.getUserId(response.userId)
            localStorage.setItem("@kenzie-blog:avatarUrl", userData.avatarUrl)
            localStorage.setItem("@kenzie-blog:username", userData.username)
            location.replace("./src/pages/blog.html")
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${response.message}!`,
            })
        } */
        console.log('funfando')
        return response
    }
}

loginButton.addEventListener("click", async (event) => {
    event.preventDefault()
    await Login.elementsForm()
    window.location.href = '../src/pages/homepage.html'
})