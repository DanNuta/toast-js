export default class Toast {
  #toastElement;
  #positionToast;
  constructor(options) {
    this.#positionToast = options.position;
    this.#toastElement = document.createElement("div");
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });

    this.getName;
  }

  set position(value) {
    this.#toastElement.classList.add("toast");

    const toastContainer =
      document.querySelector(`[data-position=${value}]`) ||
      createToastContainer(value);

    toastContainer.append(this.#toastElement);
  }

  set text(text) {
    this.#toastElement.textContent = text;
  }

  remove() {
    const parentToastContainer = this.#toastElement.parentElement;

    this.#toastElement.remove();

    if (!parentToastContainer.hasChildNodes()) {
      parentToastContainer.remove();
    }
  }
}

function createToastContainer(value) {
  const toastContainer = document.createElement("div");
  toastContainer.dataset.position = value;
  toastContainer.classList.add("toast-container");

  document.body.append(toastContainer);

  return toastContainer;
}
