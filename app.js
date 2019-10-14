new Vue({
  el: '#app',
  data: {
    player: {
      name: 'Mike',
      health: 100,
    },
    monster: {
      name: 'Sasquatch',
      health: 100,
    },
    history: [],
    turn: true,
    monsterSpecial: 1,
    playerSpecial: 1
  },
  methods: {
    attack(special = false) {
      let attackNum = Math.floor(Math.random() * 10) + 1;
      const hurtyNum = Math.floor(Math.random() * attackNum);
      console.log(special, attackNum)
      // need a method to check if there is a special attack ready
      // create github repo for this and commit and pr 5 times for hacktober
      if (special === true) { attackNum *= 2 }
      console.log("double:: ", special, attackNum)
      this.turn === true ? this.monster.health -= attackNum : this.player.health -= attackNum;
      this.turn === true ? this.player.health -= hurtyNum : this.monster.health -= hurtyNum;

      this.createHistory(attackNum, hurtyNum)
      this.turn = !this.turn;
    },
    giveUp() {
      const giveUpConfirm = confirm("Reset Game?")
      if (giveUpConfirm) {
        this.player.health = 100;
        this.monster.health = 100;
        this.history = [];
      }
    },
    createHistory(attackNum, hurtyNum) {

      const attacker = this.turn ? this.player.name : this.monster.name;
      const atackee = this.turn ? this.monster.name : this.player.name;

      this.history.push(
        `${atackee} took ${attackNum}% damage`,
        `${attacker} took ${hurtyNum}% damage in return`
      )
    }
  }
})