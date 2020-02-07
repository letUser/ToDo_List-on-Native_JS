import "./styles.css";

let tasks = []; // МАССИВ ЗАДАНИЙ

/* ШАБЛОН ОБЪЕКТА ЗАДАНИЯ */
class Task {
  constructor(text, elem, important) {
    this.text = text;
    this.elem = elem;
    this.important = important;
  }

  /* РЕНДЕРИНГ ЗАДАЧИ НА СТРАНИЦЕ */
  showTask() {
    let li = document.createElement("li");
    let liText = document.createElement("span");
    let date = new Date();
    let liRemove = document.createElement("input");
    let importantBttn = document.createElement("input");
    let liDate = document.createElement("div");

    liText.textContent = this.text;
    li.classList.add("li");
    list.prepend(li);
    input.value = "";
    liText.classList.add("liText");
    liRemove.setAttribute("type", "button");
    liRemove.setAttribute("value", "[x]");
    liRemove.classList.add("ulRemove");
    importantBttn.setAttribute("type", "button");
    importantBttn.setAttribute("value", "[!]");
    importantBttn.classList.add("important");
    liDate.classList.add("liDate");
    liDate = this.showDate(date);
    li.append(liText);
    li.append(importantBttn);
    li.append(liRemove);
    li.append(liDate);
    this.elem = li;
    liRemove.onclick = this.removeBranch.bind(this);
    importantBttn.onclick = this.importantBranch.bind(this);
    tasks.push(this);
  }

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

  /* МЕТОД УДАЛЕНИЯ ЗАДАЧИ СО СТР И МАССИВА */
  removeBranch() {
    this.elem.remove();
    for (let el of tasks) {
      if (el.text === this.text) tasks.splice(tasks.indexOf(el), 1);
    }
  }

  /* МЕТОД СОЗДАНИЯ СТРОКИ С ДАТОЙ */
  showDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    let yy = date.getFullYear();

    let hh = date.getHours();
    if (hh < 10) hh = "0" + hh;

    let min = date.getMinutes();
    if (min < 10) min = "0" + min;

    return `${dd}.${mm}.${yy}. ${hh}:${min}`;
  }
}

/* ПЕРВИЧНЫЙ РЕНДЕРИНГ СТР */
let input = document.createElement("input");
let bttn = document.createElement("input");
let div = document.createElement("div");
let list = document.createElement("ul");

div.classList.add("main");
document.body.append(div);

input.setAttribute("type", "text");
input.setAttribute("placeholder", "Введите название задачи...");
input.classList.add("input");
div.append(input);

bttn.setAttribute("type", "button");
bttn.setAttribute("value", "Добавить задачу");
bttn.classList.add("bttn");
div.append(bttn);

list.classList.add("list");
div.append(list);

/* КНОПКА ДОБАВЛЕНИЯ ЗАДАЧИ ПО КЛИКУ*/
bttn.onclick = function () {
  if (checkEmpty() === false) {
    let task = new Task(input.value, null, false);
    task.showTask();
  } else {
    alertEmpty();
  }
};

/* КНОПКА ДОБАВЛЕНИЯ ЗАДАЧИ ПО ENTER*/
input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    if (checkEmpty() === false) {
      let task = new Task(input.value, null, false);
      task.showTask();
    } else {
      alertEmpty();
    }
  }
});

/* ФУНКЦИЯ ПРОВЕРКИ ПУСТОТЫ INPUT */
let checkEmpty = () => (input.value.trim() === "" ? true : false);

/* ФУНКЦИЯ СОЗДАНИЯ СООБЩЕНИЯ ОБ ОШИБКЕ */
let alertEmpty = () => {
  let alertEmpty = document.createElement("div");
  alertEmpty.textContent = "Вы ничего не написали!";
  list.append(alertEmpty);

  setTimeout(() => alertEmpty.remove(), 3000); // убираем алерт
};

/* ФУНКЦИЯ РЕНДЕРИНГА КЛАССА ИЗ LOCALSTORAGE */
function reStoreLocal(tasks) {
  for (let task of tasks) {
    task = Object.assign(
      new Task(task.text, task.elem, task.important),
      task
    );
    input.value = null;
    task.showTask();
  }
}

/* ИНИЦИАЦИЯ LOCALSTORAGE */
window.onunload = function () {
  // выгрузка при закрытии
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
window.onload = function () {
  // загрузка при открытии
  if (localStorage.length !== 0) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    reStoreLocal(tasks); // 133line
  }
};