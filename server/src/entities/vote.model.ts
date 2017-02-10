'use strict';

export class Vote {
  private _voteID: string;
  private _pollID: string;
  private _delegatedTo: string[];
  private _voted: boolean;

  public constructor(voteID: string, pollID: string, delegatedTo: string[], voted: boolean) {
    this._voteID      = voteID;
    this._pollID      = pollID;
    this._delegatedTo = delegatedTo;
    this._voted       = voted;
  }

  public get voteID(): string {
    return this._voteID;
  }

  public get pollID(): string {
    return this._pollID;
  }

  public get delegatedTo(): string[] {
    return this._delegatedTo;
  }

  public get voted(): boolean {
    return this._voted;
  }

  public toJSON(): any {
    return {
      'voteID':      this.voteID,
      'pollID':      this.pollID,
      'delegatedTo': this.delegatedTo,
      'voted':       this.voted
    };
  }
}