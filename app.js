let dataBase = [
  { task: '', status: '' },
  { task: '', status: '' },
  { task: '', status: '' }
]

//if what have before the ?? doesn't exist, pass the next thing after the ??, in this case is a empty array
//this function is responsable for go to the database(localStorage) and return what he has there
const getdataBase = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setdataBase = dataBase =>
  localStorage.setItem('todoList', JSON.stringify(dataBase))

//index is responsable for differentiate the tasks
const createTask = (task, status, index) => {
  const item = document.createElement('label')
  //creating a label with the class todo__item
  item.classList.add('todo__item')
  item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index} >
      <div>${task}</div>
    <input type="button" value="X" data-index=${index}>
  `
  document.getElementById('todoList').appendChild(item)
}

const cleanTasks = () => {
  const todoList = document.getElementById('todoList')
  //while exist the first child execute this task
  while (todoList.firstChild) {
    //exclude the last child
    todoList.removeChild(todoList.lastChild)
  }
}

// mudar para handerScreen
const updateScreen = () => {
  cleanTasks()
  const dataBase = getdataBase()
  //method that will cross de array iten by iten
  dataBase.forEach((item, index) => createTask(item.task, item.status, index))
}

const insertTask = event => {
  const key = event.key
  const text = event.target.value
  if (key === 'Enter') {
    const dataBase = getdataBase()
    dataBase.push({ task: text, status: '' })
    setdataBase(dataBase)
    updateScreen()
    //responsable for clean the task
    event.target.value = ''
  }
}

const removeTask = index => {
  const dataBase = getdataBase()
  dataBase.splice(index, 1)
  setdataBase(dataBase)
  updateScreen()
}

// know what was clicked
const clickItem = event => {
  const element = event.target
  if (element.type === 'button') {
    const index = element.dataset.index
    removeTask(index)
  } else if (element.type === 'checkbox') {
    const index = element.dataset.index
    updateTask(index)
  }
}

const updateTask = index => {
  const dataBase = getdataBase()
  //if status be equal to empty, then checked, if not, don't mark anything
  dataBase[index].status = dataBase[index].status === '' ? 'checked' : ''
  setdataBase(dataBase)
  updateScreen()
}

//when someone click "enter" on the input, add at the database
document.getElementById('newItem').addEventListener('keypress', insertTask)
document.getElementById('todoList').addEventListener('click', clickItem)
updateScreen()
