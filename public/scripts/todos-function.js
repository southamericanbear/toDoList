const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// generate new toDo's
const generateTemplate = (toDo, id) => {
  let html = ` <li data-id=${id} class="list-group-item d-flex justify-content-between align-items-center">
    <span>${toDo.title}</span><i class="far fa-trash-alt delete"></i>
  </li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, html);
};

const deleteTodo = (id) => {
  const todos = document.querySelectorAll("li");
  todos.forEach((toDo) => {
    if (toDo.getAttribute("data-id") === id) {
      toDo.remove();
    }
  });
};

// get the info in the page
db.collection("Todos")
  .orderBy("created_at")
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const doc = change.doc;
      if (change.type === "added") {
        generateTemplate(doc.data(), doc.id);
      } else if (change.type === "removed") {
        deleteTodo(doc.id);
      }
    });
  });

// submit the todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const now = new Date();

  const toDo = {
    title: addForm.add.value.trim(),
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  db.collection("Todos")
    .add(toDo)
    .then(() => {
      console.log("todo added");
    })
    .catch((err) => {
      console.log(err);
    });

  addForm.reset();
});

// delete todo's

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.getAttribute("data-id");
    db.collection("Todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Todo Deleted");
      });
  }
});

// search todo's
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

db.collection("Todos")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => console.log(doc.data()));
  });
