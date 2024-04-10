let users = []
function Render(){
    axios.get('https://66062665d92166b2e3c34fed.mockapi.io/api/test1/users')
      .then(respone => {
        users = respone.data
        let render = users.map((user,index) => {
            return `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.email}</td>
                    <td>
                <button data-toggle="modal" data-target="#updateProduct" id="update" onclick="updatedUser(${user.id})" ><i class="fa fa-cogs"></i></button>
                <button onclick="deletedUser(${user.id})" id="deleted"><i class="fa fa-trash"></i></button>
              </td>
                </tr>
            `
        })
        document.getElementById('tbl').innerHTML = render
      })
      .catch(error => {
        console.log(error);
      })
}
function addUser(){
    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value
    }
    axios.post('https://66062665d92166b2e3c34fed.mockapi.io/api/test1/users', user)
      .then(response => {
        Render()
      })
      .catch(error => {
        console.log(error);
      })
    resetAdd()
}
function resetAdd(){
    document.getElementById('username').value = " ",
    document.getElementById('password').value = " ",
    document.getElementById('email').value = " "
}
function deletedUser(id){
    axios.delete(`https://66062665d92166b2e3c34fed.mockapi.io/api/test1/users/${id}`)
      .then(response =>{
        Render()
      })
      .catch(error => {
        console.log(error);
      })
} 
function updatedUser(id){
    axios.get(`https://66062665d92166b2e3c34fed.mockapi.io/api/test1/users/${id}`)
      .then(responsive => {
        let user = responsive.data
        document.getElementById('idUp').value = user.id
        document.getElementById('idUp').setAttribute('disabled', true)
        document.getElementById('usernameUp').value = user.username
        document.getElementById('passwordUp').value = user.password
        document.getElementById('emailUp').value = user.email

        document.getElementById('updated').addEventListener('click', function(){
          let userUp = {
            username: document.getElementById('usernameUp').value,
            password: document.getElementById('passwordUp').value,
            email: document.getElementById('emailUp').value
        }
          axios.put(`https://66062665d92166b2e3c34fed.mockapi.io/api/test1/users/${id}` , userUp)
            .then(responsive => {
                Render()
            })
            .catch(error =>{
              console.log(error);
            })
        })
      })
      .catch(error =>{
        console.log(error);
      })
}




