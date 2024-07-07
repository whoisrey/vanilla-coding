import { expect, describe, it, beforeEach } from "vitest";
import Tree from "../src/02_Tree";

describe("tree", function () {
  let tree;

  beforeEach(function () {
    tree = new Tree();
  });

  it('should have methods named "addChild" and "contains", and a property named "value"', function () {
    expect(tree.addChild).to.be.a("function");
    expect(tree.contains).to.be.a("function");
    expect(tree.hasOwnProperty("value")).to.equal(true);
  });

  it("should add children to the tree", function () {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it("should return true for a value that the tree contains", function () {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it("should return false for a value that was not added", function () {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it("should be able to add children to a tree's child", function () {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it("should correctly detect nested children", function () {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

  it("should handle non-primitive values", function () {
    const object = { key: "value" };
    const array = [1, 2, 3];
    tree.addChild(object);
    tree.addChild(array);
    expect(tree.contains(object)).to.equal(true);
    expect(tree.contains(array)).to.equal(true);
  });

  it("should handle adding null and undefined as children", function () {
    tree.addChild(null);
    tree.addChild(undefined);
    expect(tree.contains(null)).to.equal(true);
    expect(tree.contains(undefined)).to.equal(true);
  });

  it("should handle duplicate values", function () {
    tree.addChild(5);
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
    expect(tree.children.length).to.equal(2);
  });
});
