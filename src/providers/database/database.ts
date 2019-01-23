import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reorderArray } from 'ionic-angular';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private players: any;
  private leaderboard: any;
  private rounds: any;
  private options: any;
  private currentRound: number;
  private totalRounds: number;
  private id = 0;

  constructor(public http: HttpClient) {
    this.players = [];
    this.rounds = [];
    this.options = [0];
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(index: number) {
    return this.players[index];
  }

  getRound() {
    return this.currentRound;
  }

  getRounds() {
    return this.rounds;
  }

  getTotalRounds() {
    return this.totalRounds;
  }

  getOptions() {
    return this.options;
  }

  getLeaderboard() {
    return this.leaderboard;
  }

  calculateScores() {
    this.players.forEach((p) => {
      let score: number = 0;
      if(p.guess === p.final) {
        score = 20 + p.guess * 10;
      }
      else {
        score = Math.abs(p.guess-p.final) * -10;
      }
      p.scores.unshift(score);
      p.total += score;

      this.updateLeaderboard();

      p.guess = undefined;
      p.final = 0;
    });
  }

  addPlayer(name: string) {
    if(!(name === "")) {
      this.players.push({
        id: this.id++,
        name: name,
        scores: [],
        guess: undefined,
        final: 0,
        total: 0,
      });
    }
  }

  removePlayer(player: any) {
    this.players.splice(this.players.indexOf(player), 1);
  }

  reorderPlayers(indexes) {
    indexes.from++;
    indexes.to++;
    this.players = reorderArray(this.players, indexes);
  }

  setLeader(player: any) {
    const i = this.players.indexOf(player);
    if (i > 0) {
        this.players.splice(i, 1);
        this.players.unshift(player);
    }
  }

  nextRound() {
    this.currentRound++;
    this.rounds.unshift(this.currentRound);
    this.options.push(this.currentRound);
    this.players.push(this.players.shift());
  }

  initialize() {
    this.totalRounds = 60 / this.players.length;
    this.currentRound = 0;
    this.resetPlayerInput();
    this.rounds = [];
    this.options = [0];
    this.leaderboard = this.players.slice();
  }

  screwDealer(index: number, value: number): boolean {
    if(index === this.players.length - 1) {
      let guessTotal = 0;
      this.players.forEach((p)=> {
        if (this.players.indexOf(p) !== this.players.length - 1) {
          guessTotal += p.guess;
        }
      });
      if(guessTotal + value === this.currentRound) {
        return true;
      }
    }
    return false;
  }

  updateLeaderboard() {
    this.leaderboard.sort((a, b)=>{return b.total - a.total});
  }

  resetPlayerInput() {
      this.players.forEach(p => {
        p.guess = undefined;
        p.final = 0;
      });
  }

  reset() {
    this.players = [];
    this.currentRound = 0;
    this.totalRounds = 0;
    this.id = 0;
    this.rounds = [];
    this.options = [0];
  }
}
