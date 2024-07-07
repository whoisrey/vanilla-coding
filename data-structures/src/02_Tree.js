export default function Tree(value) {
  this.value = value;
  this.children = [];
}

Tree.prototype.addChild = function (value) {
  const createdNode = new Tree(value);

  this.children.push(createdNode);
};

Tree.prototype.contains = function (target) {
  if (this.value === target) {
    return true;
  }

  return this.children.some((child) => child.contains(target));
};
