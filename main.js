console.log("main.js loaded");

const overlay = document.getElementById("click");

overlay.addEventListener("click", () => {
  console.log("clicked");
  overlay.style.display = "none";
  document.body.style.background = "green";
});
