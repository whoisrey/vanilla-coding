import { expect, describe, it, beforeEach } from "vitest";
import HashTable from "../src/04_HashTable";
import _ from "lodash";

describe("hashTable", function () {
  let hashTable;

  const people = [
    ["Ken", "Huh"],
    ["Wan", "Huh"],
    ["Won", "Bean"],
    ["Mr.", "Been"],
    ["John", "Resig"],
    ["Brendan", "Eich"],
    ["Douglas", "Crockford"],
  ];

  beforeEach(function () {
    hashTable = new HashTable();
  });

  it('should have methods named "insert", "remove", and "retrieve', function () {
    expect(hashTable.insert).to.be.a("function");
    expect(hashTable.remove).to.be.a("function");
    expect(hashTable.retrieve).to.be.a("function");
  });

  it("should store values that were inserted", function () {
    hashTable.insert("Leonardo", "DiCaprio");
    expect(hashTable.retrieve("Leonardo")).to.equal("DiCaprio");
  });

  it("should not contain values that were not inserted", function () {
    hashTable.insert("Leonardo", "DiCaprio");
    expect(hashTable.retrieve("Leonardo")).not.to.equal("Da vinci");
  });

  it("should overwrite values that have the same key", function () {
    hashTable.insert("Leonardo", "DiCaprio");
    hashTable.insert("Leonardo", "Da vinci");
    expect(hashTable.retrieve("Leonardo")).to.equal("Da vinci");
  });

  it("should not contain values that were removed", function () {
    hashTable.insert("Leonardo", "DiCaprio");
    hashTable.remove("Leonardo");
    expect(hashTable.retrieve("Leonardo")).to.equal(undefined);
  });

  it("should handle hash function collisions", function () {
    const v1 = "val1";
    const v2 = "val2";
    const oldHashFunction = global.getIndexBelowMaxForKey;

    global.getIndexBelowMaxForKey = () => 0;

    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);

    expect(hashTable.retrieve(v1)).to.equal(v1);
    expect(hashTable.retrieve(v2)).to.equal(v2);

    global.getIndexBelowMaxForKey = oldHashFunction;
  });

  it("should double in size when needed", function () {
    _.each(people, function (person) {
      const firstName = person[0];
      const lastName = person[1];
      hashTable.insert(firstName, lastName);
    });

    expect(hashTable._limit).to.equal(16);
  });

  it("should halve in size when needed", function () {
    _.each(people, function (person) {
      const firstName = person[0];
      const lastName = person[1];
      hashTable.insert(firstName, lastName);
    });

    expect(hashTable._limit).to.equal(16);

    hashTable.remove("Wan");
    hashTable.remove("Mr.");
    hashTable.remove("Ken");
    hashTable.remove("John");
    hashTable.remove("Won");

    expect(hashTable._limit).to.equal(8);
  });
});
