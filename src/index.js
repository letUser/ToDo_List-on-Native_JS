import "./styles.css";
import anime from 'animejs/lib/anime.es.js';

let tasks = []; // ARRAY OF TASKS // МАССИВ ЗАДАНИЙ

/* TASK OBJECT TEMPLATE */
/* ШАБЛОН ОБЪЕКТА ЗАДАНИЯ */
class Task {
  constructor(text, elem, important, initDate) {
    this.text = text;
    this.elem = elem;
    this.important = important;
    this.initDate = initDate;
  }

  /* TASK RENDERING ON THE PAGE */
  /* РЕНДЕРИНГ ЗАДАЧИ НА СТРАНИЦЕ */
  showTask() {
    let task = document.createElement("task");
    let taskText = document.createElement("p");
    let bttns = document.createElement("div");
    let taskRemove = document.createElement("button");
    let importantBttn = document.createElement("button");
    let taskDate = document.createElement("div");
    let importantIcon = document.createElement("img");
    let removeIcon = document.createElement("img");

    input.value = "";
    taskText.textContent = this.text;
    taskText.classList.add("taskText");

    task.classList.add("task");
    list.append(task);

    bttns.classList.add("bttns");

    removeIcon.setAttribute("src", "./svg/times-solid.svg");
    removeIcon.classList.add('removeIcon');
    taskRemove.setAttribute("type", "button");
    taskRemove.classList.add("taskRemove");

    importantIcon.setAttribute("src", "./svg/exclamation-solid.svg");
    importantIcon.classList.add('importantIcon');
    importantBttn.setAttribute("type", "button");
    importantBttn.classList.add("importantBttn");

    taskDate.classList.add("date");
    if (this.initDate === null) this.initDate = this.createDate(); // date check // проверка наличи даты
    taskDate.innerHTML = this.initDate;

    task.append(taskText);
    task.append(bttns);
    bttns.append(importantBttn);
    importantBttn.append(importantIcon);
    bttns.append(taskRemove);
    taskRemove.append(removeIcon);
    task.append(taskDate);
    this.elem = task;

    taskRemove.addEventListener('click', this.removeTask.bind(this));
    importantBttn.addEventListener('click', this.importantTask.bind(this));

    if (this.important === true) this.elem.classList.add("importantTask");

    tasks.push(this);

    /* ANIMATION OF EASE OUT FOR TASKS */
    /* АНИМАЦИЯ ПОЯВЛЕНИЯ ЗАДАЧ */
    anime({
      targets: ".task",
      duration: 750,
      opacity: 1,
      easing: 'easeInOutSine',
    });
  }

  /* METHOD IMPORTANT/COMMON */
  /* МЕТОД ВАЖНОЕ/НЕВАЖНОЕ */
  importantTask() {
    if (this.important === false) {
      /* ANIMATION OF IMPORTANT FOR TASKS */
      /* АНИМАЦИЯ ВАЖНЫХ ЗАДАЧ */
      anime({
        targets: this.elem,
        duration: 500,
        scale: [{
            value: 1.1,
            duration: 500
          },
          {
            value: 1,
            duration: 500
          }
        ],
        easing: 'easeInOutSine',
      });
      this.important = true;
      this.elem.classList.add("importantTask");

    } else if (this.important === true) {
      this.important = false;
      this.elem.classList.remove("importantTask");
    }
  }

  /* METHOD OF DELETING TASK FROM THE PAGE AND ARRAY */
  /* МЕТОД УДАЛЕНИЯ ЗАДАЧИ СО СТР И МАССИВА */
  removeTask() {
    /* ANIMATION OF DELETING TASKS */
    /* АНИМАЦИЯ УДАЛЕНИЯ ЗАДАЧ */
    anime({
      targets: this.elem,
      duration: 1000,
      opacity: 0,
      easing: 'easeInOutSine',
    })
    setTimeout(() => this.elem.remove(), 500);
    for (let el of tasks) {
      if (el.text === this.text) tasks.splice(tasks.indexOf(el), 1);
    }
  }

  /* METHOD OF DATE CREATION AS A STRING */
  /* МЕТОД СОЗДАНИЯ ДАТЫ КАК СТРОКИ */
  createDate() {
    let date = new Date();

    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    let yy = date.getFullYear();

    let hh = date.getHours();
    if (hh < 10) hh = "0" + hh;

    let min = date.getMinutes();
    if (min < 10) min = "0" + min;

    return `<p>${hh}:${min} <br /> ${dd}.${mm}.${yy}</p>`;
  }
}

/* PRIMARY RENDERING OF THE PAGE */
/* ПЕРВИЧНЫЙ РЕНДЕРИНГ СТР */
let input = document.createElement("input");
let bttn = document.createElement("input");
let div = document.createElement("div");
let header = document.createElement("div");
let list = document.createElement("ul");

div.classList.add("main");
document.body.append(div);

header.classList.add("header");
div.append(header);

/* ANIMATION OF EASE OUT FOR HEADER */
/* АНИМАЦИЯ ПОЯВЛЕНИЯ ХЕДЕРА */
anime({
  targets: ".header",
  duration: 750,
  opacity: 1,
  easing: 'easeInOutSine',
});

input.setAttribute("type", "text");
input.setAttribute("placeholder", "Введите задачу...");
input.classList.add("input");
header.append(input);

/* EVENTS FOR INPUT FORM PLACEHOLDER */
/* ИМЕНТЫ ДЛЯ ПЛЕЙСХОЛДЕРА ИНПУТА */
input.onmouseover = function () {
  input.setAttribute("placeholder", "Осталось лишь кликнуть...");
};
input.onfocus = function () {
  input.setAttribute("placeholder", " ");
};
input.onmouseout = function () {
  input.setAttribute("placeholder", "Введите задачу...");
};

bttn.setAttribute("type", "button");
bttn.setAttribute("value", "Добавить задачу");
bttn.classList.add("bttn");
header.append(bttn);

list.classList.add("list");
div.append(list);

/* BUTTON OF ADDING TASK BY CLICK */
/* КНОПКА ДОБАВЛЕНИЯ ЗАДАЧИ ПО КЛИКУ*/
bttn.onclick = function () {
  if (checkEmpty() === false) {
    let task = new Task(input.value, null, false, null);
    task.showTask();
  } else {
    alertEmpty();
  }
};

/* BUTTON OF ADDING TASK BY ENTER */
/* КНОПКА ДОБАВЛЕНИЯ ЗАДАЧИ ПО ENTER*/
input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    if (checkEmpty() === false) {
      let task = new Task(input.value, null, false, null);
      task.showTask();
    } else {
      alertEmpty();
    }
  }
});

/* EMPTY CHECK OF INPUT.VALUE FUNC */
/* ФУНКЦИЯ ПРОВЕРКИ ПУСТОТЫ INPUT */
let checkEmpty = () => (input.value.trim() === "" ? true : false);

/* ALERT EMPTY CREATION FOR INPUT.VALUE FUNC */
/* ФУНКЦИЯ СОЗДАНИЯ СООБЩЕНИЯ ОБ ОШИБКЕ ПУСТОТЫ ДЛЯ INPUT.VALUE*/
let alertEmpty = () => {
  let alertEmpty = document.createElement("div");
  alertEmpty.classList.add("alert");
  alertEmpty.textContent = "Вы ничего не написали!";
  document.body.append(alertEmpty);

  setTimeout(() => alertEmpty.remove(), 3000); // убираем алерт
};

/* FUNC OF RENDERING OBJ BY CLASS FROM LOCALSTORAGE */
/* ФУНКЦИЯ РЕНДЕРИНГА КЛАССА ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА */
function reStoreLocal(tasks) {
  for (let task of tasks) {
    task = Object.assign(
      new Task(task.text, task.elem, task.important, task.initDate),
      task
    );
    input.value = "/";
    task.showTask();
  }
}

/* LOCALSTORAGE INITIALIZATION */
/* ИНИЦИАЦИЯ LOCALSTORAGE */
window.onunload = function () {
  //onunload when closing // выгрузка при закрытии
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
window.onload = function () {
  //onload when open // загрузка при открытии
  if (localStorage.length !== 0) {
    reStoreLocal(JSON.parse(localStorage.getItem("tasks")));
  }
};