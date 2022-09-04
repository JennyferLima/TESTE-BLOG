import Api from "./api.js";

const formRegister = document.querySelector(".login__form")

const registerButton = document.querySelector(".button__login")

const objectValues = [...formRegister.elements]

class Register {
    static async elementsForm() {
        const objectForm = {
            username: objectValues[0].value,
            email: objectValues[1].value,
            avatarUrl: objectValues[2].value,
            password: objectValues[3].value
        }
        const response = await Api.cadastrar(objectForm)
        if (response.message) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${response.message}!`
            })
        } else {
            location.replace("../../index.html")
        }
        return response
    }
}

registerButton.addEventListener("click", async (event) => {
    event.preventDefault()
    let response = await Register.elementsForm()
    console.log(response)
    console.log(location)
})
