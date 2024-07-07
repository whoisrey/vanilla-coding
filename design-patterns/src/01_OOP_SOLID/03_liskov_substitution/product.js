class Product {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Food extends Product {
  constructor(name) {
    super();
    this.name = name;
    this.expiredAt = new Date();
  }

  getExpiredDate() {
    return this.expiredAt;
  }

  getProductInfo() {
    return {
      name: this.name,
      expiredAt: this.expiredAt,
    };
  }
}

class Device extends Product {
  getProductInfo() {
    return {
      name: this.name,
    };
  }
}

class Meat extends Food {}

class Smartphone extends Device {}

const carne = new Meat("Beef");
const movil = new Smartphone("iPhone");

carne.getName();
carne.getExpiredDate();
carne.getProductInfo();

movil.getName();
movil.getProductInfo();
