class HashTable {
  constructor() {
    this._limit = 8;
    this._storage = LimitedArray(this._limit);
    this._count = 0;
  }

  insert(key, value) {
    const index = global.getIndexBelowMaxForKey(key, this._limit);
    let bucket = this._storage.get(index);
    const LOAD_FACTOR = 0.75;

    if (!bucket) {
      bucket = [[key, value]];
      this._storage.set(index, bucket);
    } else {
      for (const slot of bucket) {
        if (slot[0] === key) {
          slot[1] = value;
        }
      }

      bucket.push([key, value]);
    }

    this._count++;

    if (this._count > this._limit * LOAD_FACTOR) {
      const doubledSize = this._limit * 2;
      this._resize(doubledSize);
    }
  }

  retrieve(key) {
    const index = global.getIndexBelowMaxForKey(key, this._limit);
    const bucket = this._storage.get(index);

    if (bucket) {
      for (const slot of bucket) {
        if (slot[0] === key) {
          return slot[1];
        }
      }
    }
  }

  remove(key) {
    const index = global.getIndexBelowMaxForKey(key, this._limit);
    const bucket = this._storage.get(index);
    const LOAD_FACTOR = 0.25;

    if (bucket) {
      bucket.forEach((slot, index) => {
        if (slot[0] === key) {
          bucket.splice(index, 1);
          this._count--;
        }

        if (this._count < this._limit * LOAD_FACTOR) {
          const halvedSize = this._limit / 2;
          this._resize(halvedSize);
        }

        return;
      });
    }
  }

  _resize(newLimit) {
    const previousStorage = this._storage;
    this._limit = newLimit;
    this._storage = new LimitedArray(this._limit);
    this._count = 0;

    previousStorage.each((bucket) => {
      if (bucket) {
        for (const slot of bucket) {
          this.insert(slot[0], slot[1]);
        }
      }
    });
  }
}
