const DEFAULT_OPTIONSC = {
  autoClose: 5000,
  position: "top-left",
};

export default class Toast {
  #toastElement;
  #autoCloseTimout;

  /**
   *
   * @param {{
   *  text: string,
   *  position: "top-right" | "top-left" | "bottom_right" | "bottom-left"
   *  autoClose?: boolean | number
   * }} options
   */
  constructor(options) {
    this.#toastElement = document.createElement("div");
    Object.entries({ ...DEFAULT_OPTIONSC, ...options }).forEach(
      ([key, value]) => {
        this[key] = value;
      }
    );
  }

  /**
   *
   * @param {"top-right" | "top-left" | "bottom_right" | "bottom-left"} value
   */
  set position(value) {
    this.#toastElement.classList.add("toast");

    const toastContainer =
      document.querySelector(`[data-position=${value}]`) ||
      createToastContainer(value);

    toastContainer.append(this.#toastElement);
  }

  /**
   *
   * @param {string} text
   */
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

  /**
   *
   * @param {boolean} value
   */

  set autoClose(value) {
    if (this.#autoCloseTimout !== null) {
      clearInterval(this.#autoCloseTimout);
    }

    if (value) {
      this.#autoCloseTimout = setTimeout(() => {
        this.remove();
      }, value);
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
