const API_URL = 'https://randomuser.me/api/'

// Cache DOM elements ONCE
const elements = {
  loader: document.querySelector('.loader'),
  card: document.querySelector('.card'),
  name: document.querySelector('#user-name'),
  country: document.querySelector('#user-country'),
  image: document.querySelector('#user-img'),
  email: document.querySelector('#user-email'),
  age: document.querySelector('#user-age'),
  button: document.querySelector('#btn'),
  error: document.querySelector('#error'),
}

// -------------------- API --------------------
async function getUser() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('Server error')
    }

    const data = await response.json()
    return data.results[0]
  } catch (err) {
    console.error(err)
    return null
  }
}

// -------------------- UI --------------------
function showLoading() {
  elements.loader.style.display = 'block'
  elements.card.style.opacity = '0.3'
  elements.button.disabled = true
}

function hideLoading() {
  elements.loader.style.display = 'none'
  elements.card.style.opacity = '1'
  elements.button.disabled = false
}

function (user) {
  elements.name.textContent = `${user.name.first} ${user.name.last}`
  elements.country.textContent = user.location.country
  elements.image.src = user.picture.large
  elements.email.textContent = user.email
  elements.age.textContent = user.dob.age
}

function showError(message) {
  elements.error.textContent = message
}

// -------------------- Controller --------------------
async function displayUser() {
  showLoading()
  elements.error.textContent = ''

  const user = await getUser()

  if (!user) {
    showError('Failed to load user. Please try again.')
    hideLoading()
    return
  }

  updateUI(user)
  hideLoading()
}

// -------------------- Events --------------------
elements.button.addEventListener('click', displayUser)

// Auto-load first user
displayUser()
