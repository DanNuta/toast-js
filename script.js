import Toast from "./Toast.js";

const toast = new Toast({ position: "top-right", text: "New toast" });

setTimeout(() => {
  toast.remove();
}, 1000);
