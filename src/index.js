const addButton = document.querySelector('.button_variant_add');
const newTaskInput = document.querySelector('.form__text');
const listOfTasks = document.querySelector('.list');

const allTasks = [];

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
  const id = allTasks.length + 1;
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
        <button class="button button_variant_delete" type="button" aria-label="Удалить задачу"></button>
      </div>
    `

    htmlList = htmlList + htmlTask;
  })

  listOfTasks.innerHTML = htmlList;
}

addButton.addEventListener('click', () => {
  if (newTaskInput.value && !checkForDuplicate(newTaskInput.value)) {
    addNewTask(newTaskInput.value);
    deleteInputValue();
    renderAllTask(allTasks);
  }
});
