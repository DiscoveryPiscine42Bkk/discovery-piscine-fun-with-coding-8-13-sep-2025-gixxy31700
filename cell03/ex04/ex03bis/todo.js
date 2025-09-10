const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

window.onload = function () {
  const todos = getTodos();
  todos.forEach(text => addTodo(text, false));
};

newBtn.addEventListener("click", function () {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    addTodo(text.trim(), true);
  }
});

function addTodo(text, save) {
  const item = document.createElement("div");
  item.textContent = text;
  item.addEventListener("click", function () {
    if (confirm("Do you want to remove this TO DO?")) {
      ftList.removeChild(item);
      saveTodos();
    }
  });
  if (ftList.firstChild) {
    ftList.insertBefore(item, ftList.firstChild);
  } else {
    ftList.appendChild(item);
  }
  if (save) saveTodos();
}

function saveTodos() {
  const todos = [];
  ftList.querySelectorAll("div").forEach(div => {
    todos.push(div.textContent);
  });
  setCookie("todos", JSON.stringify(todos), 7);
}

function getTodos() {
  const val = getCookie("todos");
  return val ? JSON.parse(val) : [];
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for(let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}