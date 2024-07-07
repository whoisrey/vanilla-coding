export default function linkedList() {
  const list = {};

  list.head = null;
  list.tail = null;

  list.addToTail = function (node) {
    this.head ?? (this.head = node);

    if (this.tail) {
      this.tail.next = node;
    }

    this.tail = node;
  };

  list.createNode = function (value) {
    const node = {
      value: value,
      next: null,
    };

    return node;
  };

  list.reset = function () {
    this.head = null;
    this.tail = null;
  };

  return list;
}
