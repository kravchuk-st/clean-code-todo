const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createCheckbox = function () {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  return checkBox;
};

const createLabel = function (text) {
  const label = document.createElement('label');
  // innerText inserts user input as plain text, not as HTML
  label.innerText = text;
  label.className = 'task';
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');
  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.appendChild(createCheckbox());
  listItem.appendChild(createLabel(taskString));
  listItem.appendChild(createEditInput());
  listItem.appendChild(createEditButton());
  listItem.appendChild(createDeleteButton());
  return listItem;
};

const addTask = function () {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  const listItem = createNewTaskElement(taskText);

  moveTask(listItem, incompleteTaskHolder, moveTaskToCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTask = function (listItem, targetHolder, nextHandler) {
  targetHolder.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
};

const moveTaskToCompleted = function () {
  moveTask(this.parentNode, completedTasksHolder, moveTaskToIncomplete);
};

const moveTaskToIncomplete = function () {
  moveTask(this.parentNode, incompleteTaskHolder, moveTaskToCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = onCheckboxChange;
};

const bindListEvents = function (taskHolder, onCheckboxChange) {
  for (const taskListItem of taskHolder.children) {
    bindTaskEvents(taskListItem, onCheckboxChange);
  }
};

bindListEvents(incompleteTaskHolder, moveTaskToCompleted);
bindListEvents(completedTasksHolder, moveTaskToIncomplete);
