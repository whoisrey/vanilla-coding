const MONSTER_TYPES = {
  DRAGON: "DRAGON",
  BEAST: "BEAST",
  GOBLIN: "GOBLIN",
  TROLL: "TROLL",
};

class Monster {
  constructor(type) {
    this.type = type;
  }
}

class Dragon extends Monster {
  constructor() {
    super(MONSTER_TYPES.DRAGON);
  }

  attack(way) {
    return `${this.type} attacked by ${way}.`;
  }
}

class Beast extends Monster {
  constructor() {
    super(MONSTER_TYPES.BEAST);
  }

  attack(weapon) {
    return `${this.type} attacked with ${weapon}.`;
  }
}

class Goblin extends Monster {
  constructor() {
    super(MONSTER_TYPES.GOBLIN);
  }

  attack(weapon) {
    return `${this.type} attacked with ${weapon}.`;
  }
}

class Troll extends Monster {
  constructor() {
    super(MONSTER_TYPES.TROLL);
  }

  attack(way) {
    return `${this.type} attacked with ${way}.`;
  }
}

const dragon = new Dragon();
const beast = new Beast();
const goblin = new Goblin();
const troll = new Troll();

dragon.attack("breathing fire");
beast.attack("sharping claws");
goblin.attack("a dagger");
troll.attack("stones");
