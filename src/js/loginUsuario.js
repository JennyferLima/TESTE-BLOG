import Api from "./api.js";

const formLogin = document.querySelector(".login__form")

const loginButton = document.querySelector(".button__login")

const objectValues = [...formLogin.elements]

export default class Login {
    static async elementsForm() {
        const objectForm = {
            email: objectValues[0].value,
            password: objectValues[1].value
        }
        const response = await Api.login(objectForm)

        console.log('funcionando')
        return response
    }
}

loginButton.addEventListener("click", async (event) => {
    event.preventDefault()
    await Login.elementsForm()
    window.location.href = '../src/pages/homepage.html'
})
