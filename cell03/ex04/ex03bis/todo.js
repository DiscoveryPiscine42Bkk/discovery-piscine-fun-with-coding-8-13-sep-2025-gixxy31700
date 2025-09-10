$(function () {
  const $ftList = $("#ft_list");
  const COOKIE_NAME = "todos";

  getTodos().forEach(text => addTodo(text, false));

  $("#newBtn").on("click", function () {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") addTodo(text.trim(), true);
  });

  function addTodo(text, save) {
    const $item = $("<div>").text(text);

    $item.on("click", function () {
      if (confirm("Do you want to remove this TO DO?")) {
        $(this).remove();
        saveTodos();
      }
    });

    $ftList.prepend($item);

    if (save) saveTodos();
  }

  function saveTodos() {
    const todos = $ftList.children("div").map(function () {
      return $(this).text();
    }).get();
    setCookie(COOKIE_NAME, JSON.stringify(todos), 7);
  }

  function getTodos() {
    const val = getCookie(COOKIE_NAME);
    try { return val ? JSON.parse(val) : []; }
    catch { return []; }
  }


  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
  }

  function getCookie(name) {
    const cname = name + "=";
    const decoded = decodeURIComponent(document.cookie);
    const parts = decoded.split(";")
      .map(s => s.trim());
    for (const part of parts) {
      if (part.indexOf(cname) === 0) return part.substring(cname.length);
    }
    return "";
  }
});
