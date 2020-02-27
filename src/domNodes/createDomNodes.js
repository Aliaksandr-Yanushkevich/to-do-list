import Status from '../util/status';
import formatDate from '../util/dateUtil';
import getClassByColorType from './colorClassUtil';

const createTaskInfo = ({
  title, text, priority, date, color,
}) => {
  const taskInfoBlock = document.createElement('div');
  taskInfoBlock.classList.add('w-100', 'mr-2');

  const taskInfoBlockContent = document.createElement('div');
  taskInfoBlockContent.classList.add('d-flex', 'w-100', 'justify-content-between');

  const titleBlock = document.createElement('h5');
  titleBlock.classList.add(getClassByColorType(color), 'mb-1');
  titleBlock.textContent = title;
  taskInfoBlockContent.append(titleBlock);

  const additionalInfo = document.createElement('div');
  const priorityBlock = document.createElement('small');
  priorityBlock.textContent = `${priority} priority`;
  priorityBlock.classList.add('mr-2');
  additionalInfo.append(priorityBlock);

  const dateBlock = document.createElement('small');
  dateBlock.textContent = date instanceof Date ? formatDate(date) : formatDate(new Date(date));
  additionalInfo.append(dateBlock);
  taskInfoBlockContent.append(additionalInfo);

  const taskInfoText = document.createElement('p');
  taskInfoText.textContent = text;
  taskInfoText.classList.add('mb-1', 'w-100');

  taskInfoBlock.append(taskInfoBlockContent);
  taskInfoBlock.append(taskInfoText);
  return taskInfoBlock;
};

const createDropdownMenu = ({ id }) => {
  const dropdownBlock = document.createElement('div');
  dropdownBlock.classList.add('dropdown', 'm-2', 'dropleft');

  const dropdownButton = document.createElement('button');
  dropdownButton.classList.add('btn', 'btn-secondary', 'h-100');
  dropdownButton.type = 'button';
  dropdownButton.dataset.toggle = 'dropdown';
  dropdownButton.setAttribute('aria-haspopup', true);
  dropdownButton.setAttribute('aria-expanded', false);

  const dropdownIcon = document.createElement('i');
  dropdownIcon.classList.add('fas', 'fa-ellipsis-v');
  dropdownButton.append(dropdownIcon);

  const actionButtons = document.createElement('div');
  actionButtons.classList.add('dropdown-menu', 'p-2', 'flex-column');
  actionButtons.setAttribute('aria-labelledby', 'dropdownMenuItem1');

  const completeButton = document.createElement('button');
  completeButton.classList.add('btn', 'btn-success', 'w-100');
  completeButton.type = 'button';
  completeButton.textContent = 'Complete';
  completeButton.name = 'complete';
  completeButton.dataset.id = id;

  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-info', 'w-100', 'my-2');
  editButton.type = 'button';
  editButton.textContent = 'Edit';
  editButton.name = 'edit';
  editButton.dataset.id = id;
  editButton.dataset.toggle = 'modal';
  editButton.dataset.target = '#exampleModal';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'w-100');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.name = 'delete';
  deleteButton.dataset.id = id;

  actionButtons.append(completeButton);
  actionButtons.append(editButton);
  actionButtons.append(deleteButton);

  dropdownBlock.append(dropdownButton);
  dropdownBlock.append(actionButtons);
  return dropdownBlock;
};

const updateTasks = (parent, toDoItemList) => {
  parent.textContent = '';
  for (let i = 0; i < toDoItemList.length; i += 1) {
    const toDoItem = toDoItemList[i];

    const taskBlock = document.createElement('li');
    taskBlock.classList.add('list-group-item', 'd-flex', 'w-100', 'mb-2');
    taskBlock.style.background = toDoItem.color;

    taskBlock.append(createTaskInfo(toDoItem));
    if (toDoItem.status === Status.NEW) {
      taskBlock.append(createDropdownMenu(toDoItem));
    }
    parent.append(taskBlock);
  }
};

export default updateTasks;
