import { Status } from './util/status';
import { updateTasks } from './domNodes/createDomNodes';
import { sortType, getSortedList } from './util/sortType';

const init = () => {
  let toDoList = localStorage.getItem('toDoList') || [];
  let completedList = localStorage.getItem('completedList') || [];
  let currentSortType = sortType.ASC;

  const addTask = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const date = new Date();
    const toDoItem = {
      id: +date,
      title: formData.get('inputTitle'),
      text: formData.get('inputText'),
      priority: formData.get('gridRadios'),
      date: date,
      status: Status.NEW
    };
    toDoList.push(toDoItem);
    getSortedList(toDoList, currentSortType);
    updateTasks(document.querySelector('#currentTasks'), toDoList);
    currentTasksCount.textContent = toDoList.length;
    form.reset();
    document.querySelector('.close').click();
  }

  const handleItemAction = (e) => {
    const actionButton = e.target.closest('.dropdown-menu button');
    if (actionButton) {
      switch (actionButton.name) {
        case 'delete': {
          const id = actionButton.dataset.id;
          for (let i = 0; i < toDoList.length; i++) {
            if (toDoList[i].id === Number(id)) {
              toDoList.splice(i, 1);
            }
          }
          actionButton.closest('li').remove();
          currentTasksCount.textContent = toDoList.length;
          break;
        }
        case 'complete': {
          const id = actionButton.dataset.id;
          let completedItem;
          for (let i = 0; i < toDoList.length; i++) {
            if (toDoList[i].id === Number(id)) {
              completedItem = toDoList.splice(i, 1)[0];
            }
          }
          actionButton.closest('li').remove();

          completedItem.status = Status.COMPLETED;
          completedList.push(completedItem);
          getSortedList(completedList, currentSortType);
          updateTasks(document.querySelector('#completedTasks'), completedList);
          currentTasksCount.textContent = toDoList.length;
          completedTasksCount.textContent = completedList.length;
          break;
        }
      }
    }
  }

  const initToDoList = () => {
    document.querySelector('#currentTasksCount').textContent = completedList.length;
    document.querySelector('#completedTasksCount').textContent = completedList.length;
  }

  const form = document.querySelector('form');
  const currentTasksCount = document.querySelector('#currentTasksCount');
  const completedTasksCount = document.querySelector('#completedTasksCount');

  form.addEventListener('submit', addTask);
  document.querySelector('#currentTasks').addEventListener('click', handleItemAction);

  initToDoList();
};
document.addEventListener("DOMContentLoaded", init);
