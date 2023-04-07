const addButton = document.querySelector('.button_variant_add');
const newTaskInput = document.querySelector('.form__text');

const allTasks = [];

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
  deleteInputValue();
}

addButton.addEventListener('click', () => {
  if (newTaskInput.value) {
    addNewTask(newTaskInput.value);
  }
});
