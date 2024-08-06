import Toast from "./Toast.js";

let a = 0;
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  new Toast({
    text: `${a}`,
    position: "top-left",
    canClose: true,
    autoClose: false,
  });
  a++;
});
