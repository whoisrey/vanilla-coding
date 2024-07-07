class Vehicle {
  drive() {}

  stop() {}

  refuel() {}
}

class HelmetOperations {
  prepareHelmet() {}

  wearHelmet() {}
}

class DoorOperations {
  openDoor() {}
}

class MotorCycle extends Vehicle {
  constructor() {
    super();
    this.helmet = new HelmetOperations();
  }

  wearHelmet() {
    this.helmet.wearHelmet();
  }

  prepareHelmet() {
    this.helmet.prepareHelmet();
  }
}

class AutoMobile extends Vehicle {
  constructor() {
    super();
    this.door = new DoorOperations();
  }

  openDoor() {
    this.door.openDoor();
  }
}

const honda = new MotorCycle();
const kia = new AutoMobile();

honda.drive();
honda.stop();
honda.refuel();
honda.wearHelmet();
honda.prepareHelmet();

kia.drive();
kia.stop();
kia.refuel();
kia.openDoor();
