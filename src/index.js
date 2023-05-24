import './style.css';

let addButton; //TODO нужно ли удалить тут объявление переменных, если сделать все функции чистыми
let newTaskInput;
let listOfTasks;
let form;
let template;

(async () => {
  addButton = document.querySelector('.button_variant_add');
  newTaskInput = document.querySelector('.form__text');
  listOfTasks = document.querySelector('.list');
  form = document.querySelector('.form');
  template = document.querySelector('#template');

  let allTasks = [];

  allTasks = await readTasks(allTasks);
  if (allTasks.length > 0) {
    renderAllTask(allTasks, listOfTasks);
  }

  addButton.addEventListener('click', () => {
    addNewTaskAndRenderAllTasks(newTaskInput, allTasks, listOfTasks);
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addNewTaskAndRenderAllTasks(newTaskInput, allTasks, listOfTasks);
  });

  listOfTasks.addEventListener('click', (evt) => {
    const target = evt.target;

    const checkbox = target.classList.contains('list__checkbox-toggle');
    const deleteButton = target.classList.contains('button_variant_delete');
    const editButton = target.classList.contains('button_variant_edit');
    const confirmButton = target.classList.contains('button_variant_confirm');
    const cancelButton = target.classList.contains('button_variant_cancel');

    if (checkbox) {
      const isInputChecked = !target.previousElementSibling.checked;
      const task = target.parentElement.parentElement;
      changeTaskStatus(task.id, isInputChecked, allTasks)
      renderAllTask(allTasks, listOfTasks);

    } else if (deleteButton) {
      const task = target.parentElement;
      let filteredTasks = deleteTask(task.id, allTasks);
      allTasks = filteredTasks;
      saveAllTaskInLocalStorage(filteredTasks);
      renderAllTask(filteredTasks, listOfTasks);

    } else if (editButton) {
      const li = target.parentElement;
      const p = target.previousElementSibling;
      const editButton = target;
      const deleteButton = target.nextElementSibling;
      checkOpenInputAndChangeTask(p, li, editButton, deleteButton, listOfTasks, allTasks);

    } else if (confirmButton) {
      const input = target.previousElementSibling;
      const task = target.parentElement;
      changeTaskAndRenderAllTasks(input, task, allTasks, listOfTasks);

    } else if (cancelButton) {
      renderAllTask(allTasks, listOfTasks);
    }
  });

  listOfTasks.addEventListener('dblclick', (evt) => {
    const taskText = evt.target.classList.contains('list__task-text');

    if (taskText) {
      const p = evt.target;
      const li = evt.target.parentElement;
      const editButton = evt.target.nextElementSibling;
      const deleteButton = evt.target.nextElementSibling.nextElementSibling;
      checkOpenInputAndChangeTask(p, li, editButton, deleteButton, listOfTasks, allTasks);
    }
  })
})();

//=================================================================
async function readTasks(allTasks) {
  try {
    allTasks = localStorage.getItem('allTasks');
    if (allTasks != null) {
      return await JSON.parse(allTasks);
    }

  } catch (err) {
    console.warn("Не удалось прочитать список задач", err);
    localStorage.removeItem('allTasks');
  }
  return [];
}

function renderAllTask(allTasks, listOfTasks) {
  listOfTasks.innerHTML = '';
  for (const task of allTasks) {
    const templateItem = template.content.cloneNode(true);
    const li = templateItem.querySelector('li');
    const p = templateItem.querySelector('.list__task-text');
    if (task.isDone) li.classList.add('list__task_completed');
    li.id = task.id;
    p.textContent = task.inputValue;
    listOfTasks.append(templateItem);
  }
}

function saveAllTaskInLocalStorage(allTasks) {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function deleteInputValue(newTaskInput) {
  newTaskInput.value = '';
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function checkForSpace(string) {
  if (string === '' || string.trim() === '') {
    alert('Введите текст задачи');
    return true;
  }
}

function addNewTask(inputValue, allTasks) {
  const id = uuidv4();
  const task = {
    id,
    inputValue,
    isDone: false
  }
  allTasks.push(task);
}

function findTaskById(tasks, id) {
  return tasks.find(function (task) {
    return task.id === id;
  });
}

function changeTaskStatus(id, status, allTasks) {
  const task = findTaskById(allTasks, id);
  task.isDone = !task.isDone;
  saveAllTaskInLocalStorage(allTasks);
}

function changeTask(p, li, editButton, deleteButton) {
  const input = document.createElement('input');

  input.classList.add('list__task-input');
  input.value = p.innerText;
  input.setAttribute('maxlength', '180');
  li.replaceChild(input, p);
  editButton.classList.remove('button_variant_edit');
  editButton.classList.add('button_variant_confirm');
  editButton.classList.add('button_visible');
  deleteButton.classList.remove('button_variant_delete');
  deleteButton.classList.add('button_variant_cancel');
  deleteButton.classList.add('button_visible');
  input.focus();
  li.classList.add('list__task_active');
}

function addEnterEventListener(allTasks) {
  const taskInput = document.querySelector('.list__task-input');
  taskInput.addEventListener('keyup', (evt) => {
    if (evt.keyCode === 13) {
      const input = evt.target;
      const task = evt.target.parentElement;
      changeTaskAndRenderAllTasks(input, task, allTasks, listOfTasks);
    }
  });
}

function changeTaskText(id, text, allTasks) {
  const task = findTaskById(allTasks, id);
  task.inputValue = text;
  saveAllTaskInLocalStorage(allTasks);
}

function deleteTask(id, allTasks) {
  return allTasks.filter(function (task) {
    return task.id !== id;
  });
}

function addNewTaskAndRenderAllTasks(newTaskInput, allTasks, listOfTasks) {
  if (newTaskInput.value && !checkForSpace(newTaskInput.value)) {
    addNewTask(newTaskInput.value, allTasks);
    saveAllTaskInLocalStorage(allTasks);
    deleteInputValue(newTaskInput);
    renderAllTask(allTasks, listOfTasks);
    newTaskInput.focus();

  } else if (!newTaskInput.value) {
    alert('Введите текст задачи');
  }
}

function changeTaskAndRenderAllTasks(input, task, allTasks, listOfTasks) {
  if (input.value && !checkForSpace(input.value)) {
    changeTaskText(task.id, input.value, allTasks);
    renderAllTask(allTasks, listOfTasks);

  } else if (!input.value) {
    alert('Введите текст задачи');
  }
}

function checkOpenInputAndChangeTask(p, li, editButton, deleteButton, listOfTasks, allTasks) {
  const input = listOfTasks.querySelector('.list__task-input');

  if (input) {
    const pOfInput = document.createElement('p');
    const liOfInput = input.parentElement;
    const confirmButtonOfInput = input.nextElementSibling;
    const cancelButtonOfInput = input.nextElementSibling.nextElementSibling;
    pOfInput.classList.add('list__task-text');
    liOfInput.replaceChild(pOfInput, input);
    pOfInput.textContent = input.value;
    changeTaskText(liOfInput.id, input.value, allTasks);
    confirmButtonOfInput.classList.remove('button_variant_confirm');
    confirmButtonOfInput.classList.add('button_variant_edit');
    confirmButtonOfInput.classList.remove('button_visible');
    cancelButtonOfInput.classList.remove('button_variant_cancel');
    cancelButtonOfInput.classList.add('button_variant_delete');
    cancelButtonOfInput.classList.remove('button_visible');
    liOfInput.classList.remove('list__task_active');
    changeTask(p, li, editButton, deleteButton);
    addEnterEventListener(allTasks);

  } else {
    changeTask(p, li, editButton, deleteButton);
    addEnterEventListener(allTasks);
  }
}