let addButton;
let newTaskInput;
let listOfTasks;
let form;
let template;
let allTasks;

(async () => {
  addButton = document.querySelector('.button_variant_add');
  newTaskInput = document.querySelector('.form__text');
  listOfTasks = document.querySelector('.list');
  form = document.querySelector('.form');
  template = document.querySelector('#template');

  allTasks = [];

  allTasks = await readTasks();
  if (allTasks.length > 0) {
    renderAllTask(allTasks);
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
    const cancelButton = target.classList.contains('button_variant_cancel');

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
      const editButton = target;
      const deleteButton = target.nextElementSibling;
      checkOpenInputAndChangeTask(p, li, editButton, deleteButton);

    } else if (confirmButton) {
      const input = target.previousElementSibling;
      const task = target.parentElement;
      changeTaskAndRenderAllTasks(input, task);

    } else if (cancelButton) {
      renderAllTask(allTasks);
    }
  });

  listOfTasks.addEventListener('dblclick', (evt) => {
    const taskText = evt.target.classList.contains('list__task-text');

    if (taskText) {
      const p = evt.target;
      const li = evt.target.parentElement;
      const editButton = evt.target.nextElementSibling;
      const deleteButton = evt.target.nextElementSibling.nextElementSibling;
      checkOpenInputAndChangeTask(p, li, editButton, deleteButton);
    }
  })
})();

//=================================================================
async function readTasks() {
  try {
    let allTasks = localStorage.getItem('allTasks');
    if (allTasks != null) {
      return await JSON.parse(allTasks);
    }

  } catch (err) {
    console.warn("Не удалось прочитать список задач", err);
    localStorage.removeItem('allTasks');
  }
  return [];
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

function saveAllTaskInLocalStorage() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
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

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function addNewTask(inputValue) {
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

function changeTaskStatus(id, status, tasks) {
  const task = findTaskById(tasks, id);
  task.isDone = !task.isDone;
  saveAllTaskInLocalStorage();
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

function addEnterEventListener() {
  const taskInput = document.querySelector('.list__task-input');
  taskInput.addEventListener('keyup', (evt) => {
    if (evt.keyCode === 13) {
      const input = evt.target;
      const task = evt.target.parentElement;
      changeTaskAndRenderAllTasks(input, task);
    }
  });
}

function changeTaskText(id, text, tasks) {
  const task = findTaskById(tasks, id);
  task.inputValue = text;
  saveAllTaskInLocalStorage();
}

function deleteTask(id, tasks) {
  allTasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveAllTaskInLocalStorage();
}

function addNewTaskAndRenderAllTasks() {
  if (newTaskInput.value && !checkForDuplicate(newTaskInput.value)) {
    addNewTask(newTaskInput.value);
    saveAllTaskInLocalStorage();
    deleteInputValue();
    renderAllTask(allTasks);
    newTaskInput.focus();
  } else if (!newTaskInput.value) {
    alert('Введите текст задачи');
  }
}

function changeTaskAndRenderAllTasks(input, task) {
  if (input.value && !checkForDuplicate(input.value)) {
    changeTaskText(task.id, input.value, allTasks);
    renderAllTask(allTasks);
  } else if (!input.value) {
    alert('Введите текст задачи');
  }
}

function checkOpenInputAndChangeTask(p, li, editButton, deleteButton) {
  const input = listOfTasks.querySelector('.list__task-input');

  if (input) {
    const pOfInput = document.createElement('p');
    const liOfInput = input.parentElement;
    const confirmButtonOfInput = input.nextElementSibling;
    const cancelButtonOfInput = input.nextElementSibling.nextElementSibling;
    const task = findTaskById(allTasks, liOfInput.id);
    pOfInput.classList.add('list__task-text');
    liOfInput.replaceChild(pOfInput, input);
    pOfInput.textContent = task.inputValue;
    confirmButtonOfInput.classList.remove('button_variant_confirm');
    confirmButtonOfInput.classList.add('button_variant_edit');
    confirmButtonOfInput.classList.remove('button_visible');
    cancelButtonOfInput.classList.remove('button_variant_cancel');
    cancelButtonOfInput.classList.add('button_variant_delete');
    cancelButtonOfInput.classList.remove('button_visible');
    liOfInput.classList.remove('list__task_active');
    changeTask(p, li, editButton, deleteButton);
    addEnterEventListener();

  } else {
    changeTask(p, li, editButton, deleteButton);
    addEnterEventListener();
  }
}