const addButton = document.querySelector('.button_variant_add');
const newTaskInput = document.querySelector('.form__text');
const listOfTasks = document.querySelector('.list');
const form = document.querySelector('.form');

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
  let htmlList = '';

  tasks.forEach(task => {
    const taskClass = task.isDone
      ? 'list__task list__task_completed'
      : 'list__task';

    const isChecked = task.isDone ? 'checked' : '';

    const htmlTask = `
      <div class="${taskClass}" id = "${task.id}">
        <label class="list__label">
            <input class="list__checkbox-input" type="checkbox" ${isChecked}>
            <span class="list__checkbox-toggle"></span>
        </label>
        <div class="list__task-text">${task.inputValue}</div>
        <button class="button button_variant_edit" type="button" aria-label="Редактировать задачу"></button>
        <button class="button button_variant_delete" type="button" aria-label="Удалить задачу"></button>
      </div>
    `

    htmlList = htmlList + htmlTask;
  })

  listOfTasks.innerHTML = htmlList;
}

function changeTaskStatus(id, status, tasks) {
  const task = tasks.find(function (task) {
    return task.id === id;
  })
  task.isDone = !task.isDone;
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function deleteTask(id, tasks) {
  allTasks = tasks.filter(function (task) {
    return task.id !== id;
  });
}

function addNewTaskAndRenderAllTasks() {
  if (newTaskInput.value && !checkForDuplicate(newTaskInput.value)) {
    addNewTask(newTaskInput.value);
    deleteInputValue();
    renderAllTask(allTasks);
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
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

  if (checkbox) {
    const isInputChecked = !evt.target.previousElementSibling.checked;
    const task = evt.target.parentElement.parentElement;

    changeTaskStatus(task.id, isInputChecked, allTasks)
    renderAllTask(allTasks);

  } else if (deleteButton) {
    const task = evt.target.parentElement;

    deleteTask(task.id, allTasks);
    renderAllTask(allTasks);
  }
});
