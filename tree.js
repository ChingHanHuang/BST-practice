import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array.sort((a, b) => a - b))]);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    if (root == null) {
      root = new Node(value);
      return root;
    }

    if (root.data < value) root.right = this.insert(value, root.right);
    else if (root.data > value) root.left = this.insert(value, root.left);

    return root;
  }

  delete(value, root = this.root) {
    if (root == null) return root;

    if (root.data < value) root.right = this.delete(value, root.right);
    else if (root.data > value) root.left = this.delete(value, root.left);
    else {
      if (root.left == null) return root.right;
      else if (root.right == null) return root.left;
      else {
        root.data = (function (root) {
          let minVal = root.data;
          while (root.left != null) {
            minVal = root.left.data;
            root = root.left;
          }
          return minVal;
        })(root.right);

        root.right = this.delete(root.data, root.right);
      }
    }
    return root;
  }

  find(value, root = this.root) {
    if (root == null || root.data == value) return root;

    return root.data > value
      ? this.find(value, root.left)
      : this.find(value, root.right);
  }

  levelOrder() {
    if (this.root == null) return [];

    let order = [];
    let q = [];
    q.push(this.root);
    while (q.length > 0) {
      let tempNode = q.shift();
      order.push(tempNode.data);
      if (tempNode.left != null) q.push(tempNode.left);
      if (tempNode.right != null) q.push(tempNode.right);
    }
    return order;
  }

  inorder(node = this.root, arr = []) {
    if (node == null) return;

    this.inorder(node.left, arr);
    arr.push(node.data);
    this.inorder(node.right, arr);
    return arr;
  }

  preorder(node = this.root, arr = []) {
    if (node == null) return;

    arr.push(node.data);
    this.preorder(node.left, arr);
    this.preorder(node.right, arr);
    return arr;
  }

  postorder(node = this.root, arr = []) {
    if (node == null) return;

    this.postorder(node.left, arr);
    this.postorder(node.right, arr);
    arr.push(node.data);
    return arr;
  }

  height(node) {
    if (node == null) return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node, root = this.root, depth = 0) {
    if (node == null) return -1;

    if (root == node) {
      return depth;
    } else if (node.data > root.data) {
      return this.depth(node, root.right, ++depth);
    } else {
      return this.depth(node, root.left, ++depth);
    }
  }

  isBalanced(node = this.root) {
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  rebalance() {
    this.root = this.buildTree(this.inorder(this.root));
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "|     " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└──── " : "┌──── "}${node.data}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
    }
  }
}

Tree.fromValues = () => {
  let array = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
  return new Tree([3, 4, 5, 6, 7, 8]);
};
