window.onload = () => {
  const linkOfTheWebsiteUserCame = document.referrer
  console.log(linkOfTheWebsiteUserCame)
  if (linkOfTheWebsiteUserCame[linkOfTheWebsiteUserCame.length - 1] === '/') {
    window.scrollTo(0, 1953)
  }
}

document.querySelector('.nav-butReserv').onclick = async () => {
  await window.scrollTo(0, 1953)
}

//reservation
const LS = localStorage
let res = []
if (LS.getItem('res')) {
  const raw = LS.getItem('res')
  const person = JSON.parse(raw)
  res = person
}

//get data from input
function getN() {
  let bookRoom = []
  res.forEach((element) => bookRoom.push(element.id))
  let person = {
    id: '',
    name: '',
    location: '',
    departure: '',
  }
  var getName = document.getElementById('name').value
  var getDisc = document.getElementById('location').value
  var getRoom = document.getElementById('id').value
  var getDeparture = document.getElementById('date-of-departure').value

  let d1 = new Date(getDisc)
  let d2 = new Date(getDeparture)
  let today = new Date()

  if (bookRoom.includes(getRoom)) {
    alert('This room is booked!')
  } else if (d1.getTime() > d2.getTime() || d1.getTime() < today.getTime()) {
    alert('Wrong date!')
  } else if (
    getName === '' ||
    getDisc === '' ||
    getRoom === '' ||
    getDeparture === ''
  ) {
    alert('Form don`t filed')
  } else {
    person.name = getName
    person.location = getDisc
    person.id = getRoom
    person.departure = getDeparture
    if (person.name && person.location && person.id && person.departure) {
      res.push(person)
      const form = document.querySelector('form')
      form.reset()

      addArrayToStorage(res)

      document.location.reload()
    }
  }
}

//add users to storage
function addArrayToStorage(res) {
  LS.setItem('res', JSON.stringify(res))
}
//get users from storage
function getArrayFromStorage() {
  if (LS.getItem('res')) {
    const raw = LS.getItem('res')
    const person = JSON.parse(raw)

    for (let i = 0; i < person.length; i++) {
      const list = document.querySelector('#user-list')

      const row = document.createElement('tr')

      row.innerHTML = `
                    <td>${person[i].id}</td>
                    <td>${person[i].name}</td>
                    <td>${person[i].location}</td>
                    <td>${person[i].departure}</td>

                    <td><a class="btn btn-danger bg-danger" id = "${person[i].id}">x</a></td>
                `
      list.after(row)
    }
  }
}

// do program
var addTime = document.getElementById('add')

addTime.addEventListener('click', getN)
getArrayFromStorage()

//get date from input

function formatDate() {
  var firstDate = document.getElementById('location').value
  var secondDate = document.getElementById('date-of-departure').value
  if (firstDate && secondDate) {
    date1 = new Date(firstDate)
    date2 = new Date(secondDate)
    if (date1 > date2) {
      alert('wrong')
    } else {
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      LS.setItem('diffDays', JSON.stringify(diffDays))

      addPrice()
    }
  }
}
// add adaptive price
const mainForm = document.forms.main
const mainFormInput = mainForm.nameInput
mainFormInput.addEventListener('input', addPrice)
function addPrice() {
  const raw = LS.getItem('diffDays')
  const diffDays = JSON.parse(raw)

  let rooms = document.querySelectorAll('.price1')
  let currInput = mainFormInput.value

  let countOfRooms = document.querySelectorAll('.room-card')

  let comfort = document.getElementById(`${currInput}comfort`)
  let disComfort = document.getElementById('disComfort')

  // console.log(comfort.innerHTML);
  if (document.getElementById(`${currInput}comfort`)) {
    disComfort.innerHTML = ` Comfort   :    ${comfort.innerHTML}`
  } else {
    disComfort.innerHTML = ``
  }

  if (Number(currInput) > countOfRooms.length) {
    alert(
      `We don have room #${currInput}.
Please try change number`
    )
  } else if (currInput && Number(currInput) <= rooms.length) {
    let price = document.getElementById(currInput)
    price = price.textContent
    let disPrice = document.getElementById('dis-price')
    if (
      document.getElementById('flexCheckIndeterminate1').checked &&
      document.getElementById('flexCheckIndeterminate0').checked
    ) {
      disPrice.innerHTML =
        diffDays !== null
          ? Number(price) * Number(diffDays) * 0.8
          : Number(price) * 0.8
    } else if (
      document.getElementById('flexCheckIndeterminate1').checked ||
      document.getElementById('flexCheckIndeterminate0').checked
    ) {
      disPrice.innerHTML =
        diffDays !== null
          ? Number(price) * Number(diffDays) * 0.9
          : Number(price) * 0.9
    } else {
      disPrice.innerHTML =
        diffDays !== null ? Number(price) * Number(diffDays) : Number(price)
    }
  } else if (Number(currInput) > rooms.length) {
    let disPrice = document.getElementById('dis-price')
    disPrice.innerHTML = ''
  } else {
    let disPrice = document.getElementById('dis-price')
    disPrice.innerHTML = ''
  }
}

//change ptice on click in checkbox

let checkBox1 = document.querySelector('input[name=checkbox1]')
let checkBox2 = document.querySelector('input[name=checkbox2]')
checkBox1.addEventListener('change', addPrice)
checkBox2.addEventListener('change', addPrice)

//When page reload delete diffDays from storage
window.onbeforeunload = function () {
  LS.removeItem('diffDays')
}

let but = document.querySelectorAll('.btn-danger')
let arrBut = []
for (let key of but) {
  arrBut.unshift(key)
}

for (let key of but) {
  key.addEventListener('click', () => {
    const raw = LS.getItem('res')
    const person = JSON.parse(raw)
    person.splice(arrBut.indexOf(key), 1)
    LS.setItem('res', JSON.stringify(person))
    location.reload()
  })
}
