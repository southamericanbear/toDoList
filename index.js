const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");
var todos = [];
var todosString = localStorage.getItem("todos");
var todos = JSON.parse(todosString);

// generate new toDo's
const generateTemplate = (todos) => {
  let html = ` <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todos}</span><i class="far fa-trash-alt delete"></i>
  </li>`;
  list.innerHTML += html;
};

todos.forEach((todo) => generateTemplate(todo));

// submit the todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = addForm.add.value.trim();
  if (todo.length) {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    generateTemplate(todo);
    addForm.reset();
  }
});

// delete todo's

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

// filter the toDo's

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
