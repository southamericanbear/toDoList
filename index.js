const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// generate new toDo's
const generateTemplate = (todo) => {
  let html = ` <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span><i class="far fa-trash-alt delete"></i>
  </li>`;
  list.innerHTML += html;
};

// submit the todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = addForm.add.value.trim();
  var todos = [];
  todos.push(todo);
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// delete todo's

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// save data to localStorage
function saveTodos() {
  var str = JSON.stringify(todos);
  localStorage.setItem("todos", str);
}
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
