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
  private currentRound: number;
  private totalRounds: number;
  private id = 0;

  constructor(public http: HttpClient) {
    this.players = [];
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(index: number) {
    return this.players[index];
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

  initialize() {
    this.totalRounds = 60 / this.players.length;
    this.currentRound = 1;
  }

  reset() {
    this.players = [];
    this.currentRound = 0;
    this.totalRounds = 0;
    this.id = 0;
  }
}
