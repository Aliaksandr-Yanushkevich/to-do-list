import { Status } from './util/status';
import { updateTasks } from './domNodes/createDomNodes';
import { SortType, sortList } from './util/sortUtil';
import { Color, getColor } from './util/colorUtil';

const init = () => {
  let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
  let completedList = JSON.parse(localStorage.getItem('completedList')) || [];
  let currentSortType = SortType.ASC;

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
      status: Status.NEW,
      color: getColor(formData.get('color').toUpperCase())
    };
    toDoList.push(toDoItem);
    sortList(toDoList, currentSortType);
    updateTasks(currentTasksContainer, toDoList);
    currentTasksCount.textContent = toDoList.length;
    form.reset();
    document.querySelector('.close').click();

    localStorage.setItem('toDoList', JSON.stringify(toDoList));
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

          localStorage.setItem('toDoList', JSON.stringify(toDoList));
          break;
        }
        case 'edit': {
          // const id = actionButton.dataset.id;
          // const toDoItem = toDoList.find((listItem) => { listItem.id === Number(id) });
          addTaskButton.style.display = 'none';
          updateTaskButton.style.display = 'inline-block';
          break;
          // const formData = new FormData();
          // Object.keys(toDoItem).forEach(key => formData.append(key, object[key]));
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
          sortList(completedList, currentSortType);
          updateTasks(completedTasksContainer, completedList);
          currentTasksCount.textContent = toDoList.length;
          completedTasksCount.textContent = completedList.length;

          localStorage.setItem('toDoList', JSON.stringify(toDoList));
          localStorage.setItem('completedList', JSON.stringify(completedList));
          break;
        }
      }
    }
  }

  const sort = (sortType) => {
    currentSortType = sortType;
    sortList(completedList, sortType)
    sortList(toDoList, sortType)
    updateTasks(currentTasksContainer, toDoList);
    updateTasks(completedTasksContainer, completedList);

    localStorage.setItem('toDoList', toDoList);
    localStorage.setItem('completedList', completedList);
  }

  const hideUpdateButton = () => {
    addTaskButton.style.display = 'inline-block';
    updateTaskButton.style.display = 'none';
  }

  const initToDoList = () => {
    updateTasks(currentTasksContainer, toDoList);
    updateTasks(completedTasksContainer, completedList);

    document.querySelector('#currentTasksCount').textContent = toDoList.length;
    document.querySelector('#completedTasksCount').textContent = completedList.length;
  }

  const form = document.querySelector('#toDoForm');
  const currentTasksCount = document.querySelector('#currentTasksCount');
  const completedTasksCount = document.querySelector('#completedTasksCount');
  const currentTasks = document.querySelector('#currentTasks');
  const currentTasksContainer = document.querySelector('#currentTasks');
  const completedTasksContainer = document.querySelector('#completedTasks');
  const ascSort = document.querySelector('#ascSort');
  const descSort = document.querySelector('#descSort');
  const addTaskButton = document.querySelector('#addTaskButton');
  const updateTaskButton = document.querySelector('#updateTaskButton');


  form.addEventListener('submit', addTask);
  currentTasks.addEventListener('click', handleItemAction);
  ascSort.addEventListener('click', () => sort(SortType.ASC));
  descSort.addEventListener('click', () => sort(SortType.DESC));
  document.querySelector('#addTaskButton').addEventListener('click', hideUpdateButton);

  initToDoList();
}
document.addEventListener("DOMContentLoaded", init);
