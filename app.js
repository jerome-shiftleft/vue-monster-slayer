const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      playerMinDmg: 5,
      playerMaxDmg: 12
    }
  },  
  methods: {
    attackMonster() {
      console.log('attacking monster!');
      let randomDecimal = Math.random();
      let playerDmg = randomDecimal * (this.playerMaxDmg - this.playerMinDmg + 1) + this.playerMinDmg;
      playerDmg = Math.round(playerDmg);
      console.log('player damage: ', playerDmg);      
      this.monsterHealth -= playerDmg;
      this.monsterHealth = (this.monsterHealth < 0) ? 0 : this.monsterHealth;
      console.log(`monster's health: ${this.monsterHealth}`);
    }
  }
});

app.mount('#game');