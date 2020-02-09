import "./styles.css";

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
    let li = document.createElement("li");
    let liText = document.createElement("p");
    let bttns = document.createElement("div");
    let liRemove = document.createElement("button");
    let importantBttn = document.createElement("button");
    let liDate = document.createElement("div");
    let importantIcon = document.createElement("img");
    let removeIcon = document.createElement("img");

    input.value = "";
    liText.textContent = this.text;
    liText.classList.add("liText");

    li.classList.add("li");
    list.prepend(li);

    bttns.classList.add("bttns");

    removeIcon.setAttribute("src", "./svg/times-solid.svg");
    removeIcon.classList.add('removeIcon');
    liRemove.setAttribute("type", "button");
    liRemove.classList.add("liRemove");

    importantIcon.setAttribute("src", "./svg/exclamation-solid.svg");
    importantIcon.classList.add('importantIcon');
    importantBttn.setAttribute("type", "button");
    importantBttn.classList.add("importantBttn");

    liDate.classList.add("date");
    if (this.initDate === null) this.initDate = this.createDate();
    liDate.innerHTML = this.initDate;

    li.append(liText);
    li.append(bttns);
    bttns.append(importantBttn);
    importantBttn.append(importantIcon);
    bttns.append(liRemove);
    liRemove.append(removeIcon);
    li.append(liDate);
    this.elem = li;

    liRemove.onclick = this.removeBranch.bind(this);
    importantBttn.onclick = this.importantBranch.bind(this);

    if (this.important === true) this.elem.classList.add("importantTask");

    tasks.push(this);
  }

  /* METHOD IMPORTANT/COMMON */
  /* МЕТОД ВАЖНОЕ/НЕВАЖНОЕ */
  importantBranch() {
    if (this.important === false) {
      this.important = true;
      this.elem.classList.add("importantTask");

    } else if (this.important === true) {
      this.important = false;
      this.elem.classList.remove("importantTask");
    }
  }

  /* METHOD OF DELETING TASK FROM THE PAGE AND ARRAY */
  /* МЕТОД УДАЛЕНИЯ ЗАДАЧИ СО СТР И МАССИВА */
  removeBranch() {
    this.elem.remove();
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

input.setAttribute("type", "text");
input.setAttribute("placeholder", "Введите задачу...");
input.classList.add("input");
header.append(input);

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