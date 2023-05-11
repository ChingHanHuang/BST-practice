import Tree from "./tree.js";

test("#buildTree, Takes an array of data and turns it into a balanced binary tree", () => {
  const tree = Tree.fromValues();
  tree.prettyPrint();
});

test("#insert, Accepts a value to insert", () => {
  const tree = Tree.fromValues();
  tree.insert(4);
  tree.prettyPrint();
});

test("#delete, Accepts a value to delete", () => {
  const tree = Tree.fromValues();
  tree.delete(1);
  tree.prettyPrint();
});

test("#find, Accepts a value and returns the node with the given value", () => {
  const tree = Tree.fromValues();
  console.log(tree.find(6));
});

test("#levelOrder", () => {
  const tree = Tree.fromValues();
  expect(tree.levelOrder()).toEqual([3, 1, 5, 2, 6]);
});

test("#inorder", () => {
  const tree = Tree.fromValues();
  expect(tree.inorder()).toEqual([1, 2, 3, 5, 6]);
});

test("#preorder", () => {
  const tree = Tree.fromValues();
  expect(tree.preorder()).toEqual([3, 1, 2, 5, 6]);
});

test("#postorder", () => {
  const tree = Tree.fromValues();
  expect(tree.postorder()).toEqual([2, 1, 6, 5, 3]);
});

test("#height, Accepts a node and returns its height", () => {
  const tree = Tree.fromValues();
  expect(tree.height(tree.root)).toBe(2);
  expect(tree.height(tree.root.right)).toBe(1);
  expect(tree.height(tree.root.left.right)).toBe(0);
});

test("#depth, Accepts a node and returns its depth", () => {
  const tree = Tree.fromValues();
  expect(tree.depth(tree.root)).toBe(0);
  expect(tree.depth(tree.root.right)).toBe(1);
  expect(tree.depth(tree.root.left.right)).toBe(2);
});

test("#isBalanced, Checks if the tree is balanced", () => {
  const tree = Tree.fromValues();
  tree.insert(4);
  tree.prettyPrint();
  expect(tree.isBalanced()).toBe(true);

  tree.insert(7);
  tree.insert(8);
  tree.prettyPrint();
  expect(tree.isBalanced()).toBe(false);
});

test("#rebalance, Rebalances an unbalance tree", () => {
  const tree = Tree.fromValues();
  tree.insert(7);
  tree.insert(8);
  tree.prettyPrint();
  tree.rebalance();
  tree.prettyPrint();
});

test("Tie all test together", () => {
  const tree = Tree.fromValues();
  tree.prettyPrint();
  console.log("It's balanced, " + tree.isBalanced());

  console.log("Lever order = " + tree.levelOrder());
  console.log("Inorder = " + tree.inorder());
  console.log("Preorder = " + tree.preorder());
  console.log("Postorder = " + tree.postorder());

  tree.insert(9);
  tree.insert(10);
  tree.insert(11);
  tree.prettyPrint();
  console.log("It's balanced, " + tree.isBalanced());

  tree.rebalance();
  tree.prettyPrint();
  console.log("It's balanced, " + tree.isBalanced());
  console.log("Lever order = " + tree.levelOrder());
  console.log("Inorder = " + tree.inorder());
  console.log("Preorder = " + tree.preorder());
  console.log("Postorder = " + tree.postorder());
});
