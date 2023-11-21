function randomAtkDmg(min, max) {
  let randomDecimal = Math.random();
  let damage = randomDecimal * (max - min) + min;
  damage = Math.round(damage);
  return damage;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      playerMinDmg: 5,
      playerMaxDmg: 12,
      monsterMinDmg: 8,
      monsterMaxDmg: 15,
      specialAtkMin: 10,
      specialAtkMax: 25,
      specialAtkExecuted: false,
      healExecuted: 0,
      healRestore: 25,
      winner: null,
      currentRound: 0
    }
  },
  computed: {
    playerHealthBarStyle() {
      return {
        width: `${this.playerHealth}%`
      }
    },
    monsterHealthBarStyle() {
      return {
        width: `${this.monsterHealth}%`
      }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.winner = 'player';
      }
    },
    winner(value) {
      this.battleResult(value);
    }
  },
  methods: {
    attackMonster() {
      console.log('attacking monster!');
      this.currentRound++;
      let playerDmg = randomAtkDmg(this.playerMinDmg, this.playerMaxDmg)
      console.log(`player's damage: ${playerDmg}`);
      this.monsterHealth -= playerDmg;
      this.monsterHealth = (this.monsterHealth < 0) ? 0 : this.monsterHealth;
      console.log(`monster's health: ${this.monsterHealth}`);
      if (this.monsterHealth > 0) {
        this.attackPlayer();
      }
    },
    specialAtk() {
      console.log('special attack!');
      this.currentRound++;
      let playerDmg = randomAtkDmg(this.specialAtkMin, this.specialAtkMax)
      console.log(`player's damage: ${playerDmg}`);
      this.monsterHealth -= playerDmg;
      this.monsterHealth = (this.monsterHealth < 0) ? 0 : this.monsterHealth;
      console.log(`monster's health: ${this.monsterHealth}`);
      this.specialAtkExecuted = true;
      if (this.monsterHealth > 0) {
        this.attackPlayer();
      }
    },
    attackPlayer() {
      console.log('attacking player!');
      let monsterDmg = randomAtkDmg(this.monsterMinDmg, this.monsterMaxDmg)
      console.log(`monster's damage: ${monsterDmg}`);
      this.playerHealth -= monsterDmg;
      this.playerHealth = (this.playerHealth < 0) ? 0 : this.playerHealth;
      console.log(`player's health: ${this.playerHealth}`);
    },
    heal() {
      this.playerHealth += this.healRestore;
      this.playerHealth = this.playerHealth > 100 ? 100 : this.playerHealth;
      this.healExecuted += 1;
      this.attackPlayer();
    },
    battleResult(winner) {
      console.log(`winner: ${winner}`);
      //alert(`winner: ${winner}`);
    },
    surrender() {
      this.winner = 'monster';
      this.reset();
    },
    reset() {
      this.winner = null;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.specialAtkExecuted = false;
      this.healExecuted = 0;
    }
  } // end of methods
});

app.mount('#game');