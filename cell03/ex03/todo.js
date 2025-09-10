const listEl = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");
const COOKIE_NAME = "todos_ex03";

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + (days || 365) * 864e5).toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires + ";path=/";
}
function getCookie(name) {
  const m = document.cookie.split("; ").find(r => r.startsWith(name + "="));
  return m ? m.split("=")[1] : "";
}

function save() {
  const items = Array.from(listEl.children).map(d => d.textContent);
  setCookie(COOKIE_NAME, JSON.stringify(items));
}

function makeItem(text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.onclick = () => {
    if (confirm("Do you want to remove this TO DO?")) {
      listEl.removeChild(div);
      save();
    }
  };
  return div;
}

(function load() {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return;
  let arr = [];
  try { arr = JSON.parse(decodeURIComponent(raw)); } catch {}
  arr.forEach(t => listEl.appendChild(makeItem(t)));
})();

newBtn.onclick = () => {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    const item = makeItem(text.trim());
    listEl.insertBefore(item, listEl.firstChild);
    save();
  }
};
