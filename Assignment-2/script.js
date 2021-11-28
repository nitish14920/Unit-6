var box = document.getElementById("box");
var nos = 1;
function addContent() {
  var c = nos;
  for (let i = c; i < c + 25; i++) {
    var div = document.createElement("div");
    div.classList.add("content");
    div.innerHTML = `Masai School ${nos}`;
    box.appendChild(div);
    nos++;
  }
}

box.addEventListener("scroll", () => {
  var ScrollTop = box.scrollTop;
  var ClientHeight = box.clientHeight;
  var ScrollHeight = box.scrollHeight;

  if (ScrollTop + ClientHeight == ScrollHeight) {
    addContent();
  }
});
addContent();
