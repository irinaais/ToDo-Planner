// function showTasks() {
//   let storageSize = localStorage.length;
//   if (storageSize > 0) {
//     for (let i = 0; i < storageSize; i++) {
//       let key = localStorage.key(i);
//       if ()
//     }
//   }
// }

const addButton = document.querySelector('.button_variant_add');
const newTaskInput = document.querySelector('.form__text');

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

addButton.addEventListener('click', () => {
  if (newTaskInput.value && !checkForDuplicate(newTaskInput.value)) {
    addNewTask(newTaskInput.value);
    deleteInputValue();
  }
});
