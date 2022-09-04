export default class Api {
    static async showPostsPage(page){
        const token = this.getToken();
        let response = await fetch(`https://blog-m2.herokuapp.com/posts?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        .then(response => response.json())
        //console.log(response)
        return response;
    }
    
    static async cadastrar(body){
        let response = await fetch(`https://blog-m2.herokuapp.com/users/register`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        //console.log(response)
        return response;
    }

    static async login(body){
        let response = await fetch(`https://blog-m2.herokuapp.com/users/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
        //.then(response => response.json())
        let responseJSON = await response.json();
        if (response.status === 200) {
            this.setToken(responseJSON.token)
            this.setUserId(responseJSON.userId)
        }
        //console.log(response.status)
        //console.log(responseJSON)
        return responseJSON
    }

    static async createPost(message){
        let response = await fetch(`https://blog-m2.herokuapp.com/posts`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': this.getToken()
            },
            body: JSON.stringify({
                "content": `${message}`
            })
            
        })
        .then(response => response.json())
        //console.log(response)
        return response
    }

    static async editPost(postNumber, message){
        let response = await fetch(`https://blog-m2.herokuapp.com/posts/${postNumber}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': this.getToken()
            },
            body: JSON.stringify({
                "content": `${message}`
            })
            
        })
        .then(response => response.json())
        //console.log(response)
        return response
    }

    static async deletePost(postNumber){
        let response = await fetch(`https://blog-m2.herokuapp.com/posts/${postNumber}`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': this.getToken()
            }
        })
        //console.log(response.status)
        return response.status
    }

    static async getUser(Id){
        let response = await fetch(`https://blog-m2.herokuapp.com/users/${Id}`,{
            method: 'GET',
            headers: {
                'Authorization': this.getToken()
            }            
        })
        .then(response => response.json())
        //console.log(response)
        return response
    }

    static getToken(){
        return localStorage.getItem('Token')
    }

    static getUserId(){
        return localStorage.getItem('userId')
    }

    static setToken(tokenData){
        localStorage.setItem('Token', `Bearer ${tokenData}`)
    }

    static setUserId(userId){
        localStorage.setItem('userId', userId)
    }
}
//Api.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1Y2FzTE0iLCJpYXQiOjE2NjE0NzAxMDUsImV4cCI6MTY2MTQ4MDkwNX0.3tUx5jRMTj008KwRPe-uVe3oab0vjYuy-8ZFqRt1lSw')
//Api.showPostsPage(1)
/* Api.cadastrar({
    "username": "lucasLM2",
    "email": "lklssjgcbr2@gmail.com.br",
    "avatarUrl": "https://github.com/phmc99.png",
    "password": "Lucas123"
  })
  Api.login(
      {
          "email": "lklssjgcbr@gmail.com.br",
          "password": "Lucas123"
        }
  ) 
  */
//Api.createPost('aeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

//Api.editPost(45, 'É isso aíiiiii')

//Api.deletePost(52)