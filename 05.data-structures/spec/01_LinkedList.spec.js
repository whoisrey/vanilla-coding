import { expect, describe, it, beforeEach } from "vitest";
import createLinkedList from "../src/01_LinkedList";

describe("linkedList", function () {
  let linkedList;

  beforeEach(function () {
    linkedList = createLinkedList();
  });

  it("should have a head and tail", function () {
    expect(linkedList).to.have.property("head");
    expect(linkedList).to.have.property("tail");
  });

  it('should have methods named "addToTail", "removeHead", and "contains"', function () {
    expect(linkedList.addToTail).to.be.a("function");
    expect(linkedList.removeHead).to.be.a("function");
    expect(linkedList.contains).to.be.a("function");
  });

  it("should designate a new tail when new nodes are added", function () {
    linkedList.addToTail(4);
    expect(linkedList.tail.value).to.equal(4);
    linkedList.addToTail(5);
    expect(linkedList.tail.value).to.equal(5);
  });

  it("should remove the head from the list when removeHead is called", function () {
    linkedList.addToTail(4);
    linkedList.addToTail(5);
    expect(linkedList.head.value).to.equal(4);
    linkedList.removeHead();
    expect(linkedList.head.value).to.equal(5);
  });

  it("should return the value of the former head when removeHead is called", function () {
    linkedList.addToTail(4);
    expect(linkedList.removeHead()).to.equal(4);
  });

  it("should contain a value that was added", function () {
    linkedList.addToTail(4);
    linkedList.addToTail(5);
    expect(linkedList.contains(4)).to.equal(true);
    expect(linkedList.contains(5)).to.equal(true);
    expect(linkedList.contains(6)).to.equal(false);
  });

  it("should not contain a value that was removed", function () {
    linkedList.addToTail(4);
    linkedList.addToTail(5);
    linkedList.removeHead();
    expect(linkedList.contains(4)).to.equal(false);
  });

  it("should handle the case where the head is also the tail correctly", function () {
    linkedList.addToTail(1);
    expect(linkedList.head).to.equal(linkedList.tail);
    linkedList.removeHead();
    expect(linkedList.head).to.equal(null);
    expect(linkedList.tail).to.equal(null);
  });

  it("should return false for contains method on an empty list", function () {
    expect(linkedList.contains(1)).to.equal(false);
  });

  it("should update head and tail to null when all nodes are removed", function () {
    linkedList.addToTail(1);
    linkedList.addToTail(2);
    linkedList.removeHead();
    linkedList.removeHead();
    expect(linkedList.head).to.equal(null);
    expect(linkedList.tail).to.equal(null);
  });
});
