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
  let isDuplicate = false;
  allTasks.forEach((task) => {
    if (task.inputValue === inputValue) {
      alert('Такая задача уже существует');
      isDuplicate = true;
    }
  });
  return isDuplicate;
}

function deleteInputValue() {
  newTaskInput.value = '';
}

function addNewTask(inputValue) {
  if (checkForDuplicate(inputValue)) {
    return;
  }

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
