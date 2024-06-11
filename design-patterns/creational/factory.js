class Vehicle {
  constructor() {}
}

class Car extends Vehicle {
  drive() {}
}

class MotorCycle extends Vehicle {
  drive() {}
}

class CreateVehicle {
  constructor(type) {
    switch (type) {
      case "car":
        return new Car();
      case "motorcycle":
        return new MotorCycle();
      default:
        throw new Error("Please check your type");
    }
  }
}
