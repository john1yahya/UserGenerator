let url = 'https://randomuser.me/api/'


async function getUser(){
    try{
        let response = await fetch(url)
        let data = await response.json()

        console.log(data.results)


        return data.results[0]

    }catch(err){
        console.log(`the error message : ${err}`)
    }

}


async function displayUsre(){
    let loader = document.querySelector('.loader')
    let card = document.querySelector('.card')
    
    try{

        loader.style.display = "block"
        card.style.opacity = '.3'


        let user = await getUser()

        
        let name = document.querySelector('#user-name')
        name.textContent =` ${user.name.first} ${user.name.last}`

        let country = document.querySelector('#user-country')
        country.textContent = user.location.country


        let image = document.querySelector("#user-img")
        image.setAttribute("src" , user.picture.large)

        let email = document.querySelector('#user-email')
        email.textContent = user.email

        let age = document.querySelector('#user-age')
        age.textContent = user.dob.age


        }catch(err){
            console.log(err)
        }finally{
            loader.style.display = 'none'
            card.style.opacity = '1'

        }

}


let button = document.querySelector('#btn')
button.addEventListener('click', () => {
    displayUsre()
    console.log('clicked')
})



