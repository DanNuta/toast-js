const DEFAULT_OPTIONSC = {
  autoClose: 5000,
  position: "top-left",
  canClose: false,
  progressBar: true,
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
   *  canClose: boolean
   *  progressBar: boolean
   * }} options
   */
  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.update({ ...DEFAULT_OPTIONSC, ...options });

    requestAnimationFrame(() => {
      this.#toastElement.classList.add("show");
    });
  }

  /**
   *
   * @param {"top-right" | "top-left" | "bottom_right" | "bottom-left"} value
   */
  set position(value) {
    const parentToastContainer = this.#toastElement.parentElement;

    this.#toastElement.classList.add("toast");

    const toastContainer =
      document.querySelector(`[data-position=${value}]`) ||
      createToastContainer(value);

    toastContainer.append(this.#toastElement);

    if (
      parentToastContainer !== null &&
      !parentToastContainer.hasChildNodes()
    ) {
      parentToastContainer.remove();
    }
  }

  /**
   *
   * @param {string} text
   */
  set text(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    this.#toastElement.append(paragraph);
  }

  /**
   *
   * @param {boolean} value
   */
  set canClose(value) {
    if (value) {
      this.#toastElement.classList.toggle("can-close");
      this.#toastElement.addEventListener("click", () => {
        this.remove();
      });
    } else {
      this.#toastElement.removeEventListener("click", this.onClose);
    }
  }

  /**
   * @param {boolean} value
   */
  set progressBar(value) {
    if (value) {
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      this.#toastElement.append(progressBar);

      progressBarAnimation();
    }
  }

  onClose() {
    this.remove();
  }

  remove() {
    const parentToastContainer = this.#toastElement.parentElement;
    this.#toastElement.classList.remove("show");

    this.#toastElement.addEventListener("transitionend", () => {
      this.#toastElement.remove();

      if (!parentToastContainer.hasChildNodes()) {
        parentToastContainer.remove();
      }
    });
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

  /**
   *
   * @param {{
   *  text: string,
   *  position: "top-right" | "top-left" | "bottom_right" | "bottom-left"
   *  autoClose?: boolean | number
   * }} options
   */
  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}

function createToastContainer(value) {
  const toastContainer = document.createElement("div");
  toastContainer.dataset.position = value;
  toastContainer.classList.add("toast-container");

  document.body.append(toastContainer);

  return toastContainer;
}

/**
 * @param {number} time
 */
function progressBarAnimation() {
  let durationAnimation = 0;
  requestAnimationFrame((counter) => {
    const secondsSinceLastRender = (counter - durationAnimation) / 1000;
    durationAnimation = counter;

    console.log(secondsSinceLastRender);
    // if (counter - durationAnimation > 1000) {
    //   durationAnimation = counter;

    // }
    progressBarAnimation();
  });
}
