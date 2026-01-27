let url = 'https://randomuser.me/api/'

let elements = { 
    loader : document.querySelector('.loader'),
    card : document.querySelector('.card'),
    name : document.querySelector("#user-name"),
    country : document.querySelector("#user-country"),
    image : document.querySelector("#user-img"),
    email : document.querySelector('#user-email'),
    age : document.querySelector('#user-age'),
    btn : document.querySelector('#btn')
}

//functin to get the users informationt from a public api 
async function getUser(){
    try{
        let response = await fetch(url)
        let data = await response.json()

        return data.results[0]

    }catch(err){
        console.log(`the error message : ${err}`)
    }
}
 
//display the user on the screen 
async function displayUsre(){
    try{
        showLoading()
            let user = await getUser()
        updateUi(user)

    }catch(err){
        console.log(err)
    }finally{
        hideLoading()
    }

}
//functin to undate the user
function updateUi(user){
    elements.name.textContent =` ${user.name.first} ${user.name.last}`
    elements.country.textContent = user.location.country
    elements.image.setAttribute("src" , user.picture.large)
    elements.email.textContent = user.email
    elements.age.textContent = user.dob.age
}
// show and hide the loading style
function showLoading(){
    elements.loader.style.display = "block";
    elements.card.style.opacity = ".3"
}
function hideLoading(){
    elements.loader.style.display = 'none'
    elements.card.style.opacity = '1'
}
// event listener 
elements.btn.addEventListener('click', () => {
    displayUsre()
})



