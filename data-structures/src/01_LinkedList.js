function createNode(value) {
  const node = {};

  node.value = value;
  node.next = null;

  return node;
}

export default function createLinkedList() {
  const list = {};

  list.head = null;
  list.tail = null;

  list.addToTail = function (value) {
    const node = createNode(value);

    this.head ?? (this.head = node);

    if (this.tail) {
      this.head.next = node;
    }

    this.tail = node;
  };

  list.removeHead = function () {
    if (!this.head) {
      return null;
    }

    const removedValue = this.head.value;

    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    return removedValue;
  };

  list.contains = function (target) {
    let node = this.head;

    while (node) {
      if (node.value === target) {
        return true;
      }

      node = node.next;
    }

    return false;
  };

  return list;
}
