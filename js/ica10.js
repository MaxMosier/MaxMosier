function displayMessage(inputText, messageType) {

  const body = document.body;

  const panel = document.createElement("div");
  panel.setAttribute("class", "msgBox");
  body.appendChild(panel);

  const msg = document.createElement("p");
  msg.textContent = inputText;
  panel.appendChild(msg);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "x";
  panel.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => panel.parentNode.removeChild(panel));

  if (messageType === "warning") {
    msg.style.backgroundImage = "url(../img/warning.png)";
    panel.style.backgroundColor = "red";
  } else if (messageType === "chat") {
    msg.style.backgroundImage = "url(../img/chat.png)";
    panel.style.backgroundColor = "aqua";
  } else {
    msg.style.paddingLeft = "20px";
  }
}

const btn = document.querySelector("button");
  btn.addEventListener("click", () =>
    displayMessage("Task failed successfully.", "warning")
  );