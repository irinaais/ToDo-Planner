const addButton = document.querySelector('.button_variant_add');
const newTaskInput = document.querySelector('.form__text');
const listOfTasks = document.querySelector('.list');
const form = document.querySelector('.form');
const template = document.querySelector('#template');

let allTasks = [];

if (localStorage.getItem('allTasks')) {
  allTasks = JSON.parse(localStorage.getItem('allTasks'));
  renderAllTask(allTasks);
}

function checkForDuplicate(inputValue) {
  const isDuplicate = allTasks.some(task => {
    return task.inputValue === inputValue;
  });

  if (isDuplicate) {
    alert('Такая задача уже существует');
  }

  return isDuplicate;
}

function deleteInputValue() {
  newTaskInput.value = '';
}

function addNewTask(inputValue) {
  const id = inputValue;
  const task = {
    id,
    inputValue,
    isDone: false
  }
  allTasks.push(task);
}

function renderAllTask(tasks) {
  listOfTasks.innerHTML = '';
  for (const task of tasks) {
    const templateItem = template.content.cloneNode(true);
    const li = templateItem.querySelector('li');
    const p = templateItem.querySelector('.list__task-text');
    if (task.isDone) li.classList.add('list__task_completed');
    li.id = task.id;
    p.textContent = task.inputValue;
    listOfTasks.append(templateItem);
  }
}

function changeTaskStatus(id, status, tasks) {
  const task = tasks.find(function (task) {
    return task.id === id;
  })
  task.isDone = !task.isDone;
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function changeTaskText(id, text, tasks) {
  const task = tasks.find(function (task) { //TODO вынести в отдельную ф-ю и в changeTaskStatus тоже
    return task.id === id;
  })
  task.inputValue = text;
  task.id = text;
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function deleteTask(id, tasks) {
  allTasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function addNewTaskAndRenderAllTasks() {
  if (newTaskInput.value && !checkForDuplicate(newTaskInput.value)) {
    addNewTask(newTaskInput.value);
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    deleteInputValue();
    renderAllTask(allTasks);
  }
}

addButton.addEventListener('click', () => {
  addNewTaskAndRenderAllTasks();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addNewTaskAndRenderAllTasks();
});

listOfTasks.addEventListener('click', (evt) => {
  const target = evt.target;

  const checkbox = target.classList.contains('list__checkbox-toggle');
  const deleteButton = target.classList.contains('button_variant_delete');
  const editButton = target.classList.contains('button_variant_edit');
  const confirmButton = target.classList.contains('button_variant_confirm');

  if (checkbox) {
    const isInputChecked = !target.previousElementSibling.checked;
    const task = target.parentElement.parentElement;
    changeTaskStatus(task.id, isInputChecked, allTasks)
    renderAllTask(allTasks);

  } else if (deleteButton) {
    const task = target.parentElement;
    deleteTask(task.id, allTasks);
    renderAllTask(allTasks);

  } else if (editButton) {
    const li = target.parentElement;
    const p = target.previousElementSibling;
    const input = document.createElement('input');
    const deleteButton = target.nextElementSibling;
    input.classList.add('list__task-input');
    input.value = p.innerText;
    li.replaceChild(input, p);
    target.classList.remove('button_variant_edit');
    target.classList.add('button_variant_confirm');
    target.classList.add('button_visible');
    deleteButton.classList.add('button_visible');

  } else if (confirmButton) {
    const input = target.previousElementSibling;
    const task = target.parentElement;
    changeTaskText(task.id, input.value, allTasks);
    renderAllTask(allTasks); //TODO убрать ф-ю? итак все работает
  }
});
