import './style.css'

const mail = document.getElementById('mail')
const countrySelect = document.getElementById('country')
const countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
const zip = document.getElementById('zipcode')
const pass = document.getElementById('pass')
const passConf = document.getElementById('conf-pass')
const form = document.querySelector('form')


function createOptions(countryList) {
  for (let i = 0; i < countryList.length; i++) {
    let country = document.createElement('option')
    country.innerHTML = countryList[i]
    countrySelect.appendChild(country)
  }
}

createOptions(countryList)
const inputs = [mail, countrySelect, zip, pass]

function showError(element) {
  let isZip = element.type == 'number' ? 'zipcode' : element.type;
  if (element.validity.valueMissing) {
    element.setCustomValidity(`${isZip} is required`)
    element.reportValidity()
  }
  else if (element.validity.typeMismatch) {
    element.setCustomValidity(`an ${isZip} is expected in this field`)
    element.reportValidity()
  }
  else if (element.validity.tooShort) {
    element.setCustomValidity(`${isZip} is too short, the minimum character should be 8`)
    element.reportValidity()
  }
  return element.validity.valid
}

function confirmPass() {
  if (passConf.value === pass.value) {
    passConf.setCustomValidity('')
  } else {
    passConf.setCustomValidity('password must match')
  }
  return passConf.value === pass.value
}



mail.addEventListener('input', () => {
  if (mail.validity.valid) {
    mail.setCustomValidity('')
  } else {
    showError(mail)
  }
})

pass.addEventListener('input', () => {
  if (pass.validity.valid) {
    pass.setCustomValidity('')
  } else {
    showError(pass)
  }
})

zip.addEventListener('input', () => {
  if (zip.validity.valid) {
    zip.setCustomValidity('')
  } else {
    showError(zip)
  }
})

countrySelect.addEventListener('click', () => {
  if (countrySelect.validity.valid) {
    countrySelect.setCustomValidity('')
  } else if (countrySelect.value == '') {
    countrySelect.setCustomValidity('country is required')
    countrySelect.reportValidity()
  }
})

form.addEventListener('submit', (e) => {
  inputs.forEach(input => {
    if (!input.validity.valid) {
      e.preventDefault()
      input.reportValidity()
    }
  })
  if (!confirmPass()) {
    e.preventDefault()
    passConf.reportValidity()
  }
})

