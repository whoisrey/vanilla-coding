export default function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function (value) {
  const createdNode = new BinarySearchTree(value);
  let parentNode = this;

  if (parentNode.value > createdNode.value) {
    if (!this.left) {
      this.left = createdNode;
    } else {
      this.left.insert(value);
    }
  }

  if (parentNode.value < createdNode.value) {
    if (!this.right) {
      this.right = createdNode;
    } else {
      this.right.insert(value);
    }
  }
};

BinarySearchTree.prototype.contains = function (target) {
  let parentNode = this;

  while (parentNode) {
    if (parentNode.value === target) {
      return true;
    }

    parentNode = parentNode.value > target ? parentNode.left : parentNode.right;
  }

  return false;
};

BinarySearchTree.prototype.depthFirstLog = function (callback) {
  function searchValue(node) {
    if (node) {
      callback(node.value);
      searchValue(node.left);
      searchValue(node.right);
    }
  }

  searchValue(this);
};
