

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
    favorit : document.querySelector('.favorite-btn'),
    errorMessage : document.querySelector('.error-message'),
    retryBtn : document.querySelector(".retry-btn")
}

//functin to get the users informationt from a public api

async function getUser(){
        let response = await fetch(urlBuilder())
        let data = await response.json()

        if (!data.results || data.results.length === 0) {
            throw new Error("No users returned from API")
        }
        return data.results[0]
}
 
//display the user on the screen 
async function displayUser(){
    try{
        hideError()
        showLoading()
        let user = await getUser()
        updateUi(user)

    }catch(err){
        showError(err)
    }finally{
        hideLoading()
    }

}
// error related functions
function hideError(){
    ui.errorMessage.style.display = 'none'
    ui.errorMessage.querySelector("#error-text").textContent = ''
}
function showError(err){
    ui.errorMessage.style.display = 'block'
    ui.errorMessage.querySelector("#error-text").textContent = err.message
}
//functin to undate the user
function updateUi(user){
    const {
        email,
        dob:{age},
        phone,
        picture: {large},
        login:{username},
        name:{first,last},
        location: {country, city}
        } = user
    ui.name.textContent =` ${first} ${last}`
    ui.country.textContent = `${country}, ${city}`
    ui.image.setAttribute("src" , large)
    ui.email.textContent = email
    ui.age.textContent = `${age} years old`
    ui.phone.textContent = phone
    ui.userName.textContent = username
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
function urlBuilder(){
    const gender = document.getElementById("gender-filter").value
    const nationality = document.getElementById("nationality-filter").value;

    let url = "https://randomuser.me/api/";

    if(gender !== '') url += `?gender=${gender}`;
    if(nationality !== '') url += `&nat=${nationality}`;

    return url

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
ui.retryBtn.addEventListener('click', () => {
    displayUser()
})


