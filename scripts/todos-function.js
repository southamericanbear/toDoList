// const addForm = document.querySelector(".add");
// const list = document.querySelector(".todos");
// const search = document.querySelector(".search input");
// // var todos = [];
// // var todosString = localStorage.getItem("todos");
// // var todos = JSON.parse(todosString);

// // generate new toDo's
// const generateTemplate = (todos) => {
//   let html = ` <li class="list-group-item d-flex justify-content-between align-items-center">
//     <span>${todos}</span><i class="far fa-trash-alt delete"></i>
//   </li>`;
//   list.innerHTML += html;
// };

// // todos.forEach((todo) => generateTemplate(todo));

// // submit the todo
// addForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let todo = addForm.add.value.trim();
//   if (todo.length) {
//     // todos.push(todo);
//     // localStorage.setItem("todos", JSON.stringify(todos));
//     generateTemplate(todo);
//     addForm.reset();
//   }
// });

// // delete todo's

// list.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delete")) {
//     e.target.parentElement.remove();
//
//   }
// });

const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");
let listTodo, id;

let data = localStorage.getItem("TODO");
if (data) {
  listTodo = JSON.parse(data);
  id = listTodo.length;
  loadList(listTodo);
} else {
  listTodo = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.trash);
  });
}

function addTodo(todo, id, trash) {
  if (trash) {
    return;
  }

  let html = ` <li class="list-group-item d-flex justify-content-between align-items-center"><span>${todo}</span><i class="far fa-trash-alt delete" job="delete" id=${id}></i></li>`;

  const position = "beforeend";
  list.insertAdjacentHTML(position, html);
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    addTodo(todo, id, false);
    listTodo.push({
      name: todo,
      id: id,
      trash: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(listTodo));
  id++;
  addForm.reset();
});

function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listTodo[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJOB = element.attributes.job.value;
  if (elementJOB == "delete") {
    removeTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(listTodo));
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
