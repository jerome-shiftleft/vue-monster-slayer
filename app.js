function getRandomValue(min, max) {
  let randomDecimal = Math.random();
  let value = randomDecimal * (max - min) + min;
  value = Math.round(value);
  return value;
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
      specialAtkMin: 20,
      specialAtkMax: 25,
      specialAtkExecuted: false,
      healExecuted: false,
      minHeal: 20,
      maxHeal: 25,
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
    mayNotUseSpecialAttack() {
      //return this.currentRound % 3 !== 0;
      return this.specialAtkExecuted;
    },
    mayNotHeal() {
      return (this.currentRound === 0 || this.healExecuted) ? true : false;
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
      let playerDmg = getRandomValue(this.playerMinDmg, this.playerMaxDmg)
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
      let playerDmg = getRandomValue(this.specialAtkMin, this.specialAtkMax)
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
      let monsterDmg = getRandomValue(this.monsterMinDmg, this.monsterMaxDmg)
      console.log(`monster's damage: ${monsterDmg}`);
      this.playerHealth -= monsterDmg;
      this.playerHealth = (this.playerHealth < 0) ? 0 : this.playerHealth;
      console.log(`player's health: ${this.playerHealth}`);
    },
    heal() {
      this.currentRound++;
      this.playerHealth += getRandomValue(this.minHeal, this.maxHeal);
      this.playerHealth = this.playerHealth > 100 ? 100 : this.playerHealth;
      this.healExecuted = true;
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
      this.healExecuted = false;
    }
  } // end of methods
});

app.mount('#game');