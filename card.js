let url = 'https://randomuser.me/api/'

let ui = { 
    loader : document.querySelector('.loader'),
    card : document.querySelector('.card'),
    name : document.querySelector("#user-name"),
    country : document.querySelector("#user-location"),
    image : document.querySelector("#user-img"),
    email : document.querySelector('#user-email'),
    age : document.querySelector('#user-age'),
    btn : document.querySelector('#btn'),
    phone : document.querySelector('#user-phone'),
    userName: document.querySelector('#user-username'),
    favorit : document.querySelector('.favorite-btn')
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
async function displayUser(){
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
    ui.name.textContent =` ${user.name.first} ${user.name.last}`
    ui.country.textContent = `${user.location.country}, ${user.location.city}`
    ui.image.setAttribute("src" , user.picture.large)
    ui.email.textContent = user.email
    ui.age.textContent = `${user.dob.age} years old`
    ui.phone.textContent = user.phone
    ui.userName.textContent = user.login.
    console.log(user)
}
// show and hide the loading style
function showLoading(){
    ui.loader.style.display = "block";
    ui.card.style.opacity = ".3"
}
function hideLoading(){
    ui.loader.style.display = 'none'
    ui.card.style.opacity = '1'
}
// event listener 
ui.btn.addEventListener('click', () => {
    displayUser()
    })
ui.favorit.addEventListener('click', () => {
    if(ui.favorit.classList.contains('favorite')){
        ui.favorit.classList.remove('favorite');
        ui.favorit.classList.add('active');
    } else {
        ui.favorit.classList.remove('active');
        ui.favorit.classList.add('favorite');
    }
});


