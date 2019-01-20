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

  getTotalRounds() {
    return this.totalRounds;
  }

  getOptions() {
    return this.options;
  }

  addPlayer(name: string) {
    if(!(name === "")) {
      this.players.push({
        id: this.id++,
        name: name,
        scores: [],
        guess: null,
        final: null,
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
    this.rounds.push(this.currentRound);
    this.options.push(this.currentRound);
  }

  initialize() {
    this.totalRounds = 60 / this.players.length;
    this.currentRound = 0;
  }

  reset() {
    this.players = [];
    this.currentRound = 0;
    this.totalRounds = 0;
    this.id = 0;
  }
}
