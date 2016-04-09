var SplitInLines = class SplitInLines {
  constructor(el) {
    this.el = el;
    this.init();
  }

  init() {
    this.lines = [];
    this.chars = [];

    this.text = this.el.textContent;
    this.empty();

    this.text.split('').forEach((text) => {
      const span = document.createElement('span');
      span.textContent = text;

      this.chars.push(span);
      this.el.appendChild(span);
    });

    this.parseChars();
    this.writeLines();
  }

  parseChars() {
    let oldTop = null;
    let index = -1;

    this.chars.forEach((span) => {
      const top = span.getBoundingClientRect().top;

      if (top !== oldTop) {
        this.lines.push([]);
        index++;
      }

      this.lines[index].push(span.textContent);
      oldTop = top;
    });
  }

  writeLines() {
    this.empty();

    this.lines.forEach((line) => {
      const outerWrapper = document.createElement('div');
      const wrapper = document.createElement('span');

      outerWrapper.classList.add('split-lines-outer');
      wrapper.classList.add('split-lines-inner');

      wrapper.textContent = line.join('');

      outerWrapper.appendChild(wrapper);
      this.el.appendChild(outerWrapper);
    });
  }

  empty() {
    this.el.textContent = '';
  }

  clear() {
    this.el.textContent = this.text;
  }
}

if (typeof module !== 'undefined') {
  module.exports = SplitInLines;
}
