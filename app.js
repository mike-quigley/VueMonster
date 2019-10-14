new Vue({
  el: '#app',
  data: {
    player: {
      name: 'Mike',
      health: 100,
      specialAttack: 1
    },
    monster: {
      name: 'Sasquatch',
      health: 100,
      specialAttack: 1
    },
    history: [],
    playerTurn: true,
  },
  methods: {

    attack(special = false) {
      let attackNum = Math.floor(Math.random() * 10) + 1;
      const hurtyNum = Math.floor(Math.random() * attackNum);

      if (special === true && this.playerTurn === true && this.player.specialAttack > 0) {
        attackNum *= 2;
        this.specialAttackTrack();
      } else if (special === true && this.playerTurn === false && this.monster.specialAttack > 0) {
        attackNum *= 2;
        this.specialAttackTrack();
      }

      this.playerTurn === true ? this.monster.health -= attackNum : this.player.health -= attackNum;
      this.playerTurn === true ? this.player.health -= hurtyNum : this.monster.health -= hurtyNum;

      this.createHistory(attackNum, hurtyNum)
      this.checkScore();
      this.playerTurn = !this.playerTurn;
    },
    specialAttackTrack() {
      if (this.playerTurn === true && this.player.specialAttack > 0) {
        this.player.specialAttack -= 1;
      } else if (this.playerTurn === false && this.monster.specialAttack > 0) {
        this.monster.specialAttack -= 1;
      }
    },
    heal() {
      let healNum = Math.floor(Math.random() * 10) + 1;

      this.playerTurn === true ? this.player.health += healNum : this.monster.health += healNum;

      const healedPlayer = this.playerTurn ? this.player.name : this.monster.name

      this.history.unshift(
        `${healedPlayer} healed ${healNum}% damage`,
        ''
      )
      this.playerTurn = !this.playerTurn;
    },
    giveUp() {
      const giveUpConfirm = confirm("Reset Game?")
      if (giveUpConfirm) {
        this.player.health = 100;
        this.monster.health = 100;
        this.player.specialAttack = 1;
        this.monster.specialAttack = 1;
        this.history = [];
      }
    },
    createHistory(attackNum, hurtyNum) {

      const attacker = this.playerTurn ? this.player.name : this.monster.name;
      const atackee = this.playerTurn ? this.monster.name : this.player.name;

      this.history.unshift(
        `${atackee} took ${attackNum}% damage`,
        `${attacker} took ${hurtyNum}% damage`
      )
    },
    checkScore() {
      if (this.player.health <= 0) {
        alert("Monster Won, you dead!")
      } else if (this.monster.health <= 0) {
        alert(`You killed ${this.monster.name}!`)
        this.player.health = 100;
        this.monster.health = 100;
        this.player.specialAttack = 1;
        this.monster.specialAttack = 1;
        this.history = [];
      } else {
        return;
      }
    }
  }
})