import Status from './util/status';
import updateTasks from './domNodes/createDomNodes';
import { SortType, sortList } from './util/sortUtil';
import { getColor } from './util/colorUtil';
import { getPriorityIndex } from './util/priority';
import {
  form, titleInput, textInput, currentTasksCount, completedTasksCount, currentTasksContainer, completedTasksContainer,
  ascSort, descSort, openAddTaskModal, addTaskButton, updateTaskButton, exampleModal, modalLabel, closeModalButton,
  xButton,
} from './util/querySelectors';
import Key from './util/localStorageKeyUtil';

const init = () => {
  const toDoList = JSON.parse(localStorage.getItem(Key.TO_DO_LIST)) || [];
  const completedList = JSON.parse(localStorage.getItem(Key.COMPLETED_LIST)) || [];
  let currentSortType = SortType.ASC;

  const addTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = new Date();
    const toDoItem = {
      id: +date,
      title: formData.get('inputTitle'),
      text: formData.get('inputText'),
      priority: formData.get('gridRadios'),
      date,
      status: Status.NEW,
      color: getColor(formData.get('color').toUpperCase()),
    };
    toDoList.push(toDoItem);
    sortList(toDoList, currentSortType);
    updateTasks(currentTasksContainer, toDoList);
    currentTasksCount.textContent = toDoList.length;
    form.reset();
    closeModalButton.click();

    localStorage.setItem(Key.TO_DO_LIST, JSON.stringify(toDoList));
  };

  const updateTask = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const toDoItem = {
      title: formData.get('inputTitle'),
      text: formData.get('inputText'),
      priority: formData.get('gridRadios'),
      color: getColor(formData.get('color').toUpperCase()),
    };
    const index = toDoList.findIndex((listItem) => listItem.id === Number(id));
    const oldToDoItem = toDoList[index];
    toDoList[index] = { ...oldToDoItem, ...toDoItem };
    sortList(toDoList, currentSortType);
    updateTasks(currentTasksContainer, toDoList);
    currentTasksCount.textContent = toDoList.length;
    form.reset();
    closeModalButton.click();

    localStorage.setItem(Key.TO_DO_LIST, JSON.stringify(toDoList));
  };

  const handleItemAction = (e) => {
    const actionButton = e.target.closest('.dropdown-menu button');
    if (actionButton) {
      switch (actionButton.name) {
        case 'delete': {
          const { id } = actionButton.dataset;
          for (let i = 0; i < toDoList.length; i += 1) {
            if (toDoList[i].id === Number(id)) {
              toDoList.splice(i, 1);
            }
          }
          actionButton.closest('li').remove();
          currentTasksCount.textContent = toDoList.length;

          localStorage.setItem(Key.TO_DO_LIST, JSON.stringify(toDoList));
          break;
        }
        case 'edit': {
          const { id } = actionButton.dataset;
          const toDoItem = toDoList.find((listItem) => listItem.id === Number(id));
          exampleModal.style.display = 'block';
          addTaskButton.style.display = 'none';
          updateTaskButton.style.display = 'inline-block';
          updateTaskButton.dataset.id = toDoItem.id;
          titleInput.value = toDoItem.title;
          textInput.value = toDoItem.text;
          document.toDoForm.gridRadios[getPriorityIndex(toDoItem.priority.toUpperCase())].checked = true;
          document.toDoForm.color[toDoItem.color].checked = true;
          modalLabel.textContent = 'Update task';
          break;
        }
        case 'complete': {
          const { id } = actionButton.dataset;
          let completedItem;
          for (let i = 0; i < toDoList.length; i += 1) {
            if (toDoList[i].id === Number(id)) {
              [completedItem] = toDoList.splice(i, 1);
            }
          }
          actionButton.closest('li').remove();

          completedItem.status = Status.COMPLETED;
          completedList.push(completedItem);
          sortList(completedList, currentSortType);
          updateTasks(completedTasksContainer, completedList);
          currentTasksCount.textContent = toDoList.length;
          completedTasksCount.textContent = completedList.length;

          localStorage.setItem(Key.TO_DO_LIST, JSON.stringify(toDoList));
          localStorage.setItem(Key.COMPLETED_LIST, JSON.stringify(completedList));
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const sort = (sortType) => {
    currentSortType = sortType;
    sortList(completedList, sortType);
    sortList(toDoList, sortType);
    updateTasks(currentTasksContainer, toDoList);
    updateTasks(completedTasksContainer, completedList);

    localStorage.setItem(Key.TO_DO_LIST, JSON.stringify(toDoList));
    localStorage.setItem(Key.COMPLETED_LIST, JSON.stringify(completedList));
  };

  const hideUpdateButton = () => {
    addTaskButton.style.display = 'inline-block';
    updateTaskButton.style.display = 'none';
    modalLabel.textContent = 'Add task';
  };

  const resetForm = () => {
    form.reset();
  };

  const initToDoList = () => {
    updateTasks(currentTasksContainer, toDoList);
    updateTasks(completedTasksContainer, completedList);

    currentTasksCount.textContent = toDoList.length;
    completedTasksCount.textContent = completedList.length;
  };

  form.addEventListener('submit', (e) => {
    const submitButton = document.activeElement;
    switch (submitButton.value) {
      case 'add': {
        addTask(e);
        break;
      }
      case 'update': {
        updateTask(e, submitButton.dataset.id);
        break;
      }
      default: {
        throw new Error('Button not found');
      }
    }
  });
  currentTasksContainer.addEventListener('click', handleItemAction);
  ascSort.addEventListener('click', () => sort(SortType.ASC));
  descSort.addEventListener('click', () => sort(SortType.DESC));
  openAddTaskModal.addEventListener('click', hideUpdateButton);
  closeModalButton.addEventListener('click', resetForm);
  xButton.addEventListener('click', resetForm);
  initToDoList();
};
document.addEventListener('DOMContentLoaded', init);
