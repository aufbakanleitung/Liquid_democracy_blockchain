'use strict';

export class Option {
  private _option: string;
  private _votes: string[];

  public constructor(option: string, votes: string[]) {
    this._option      = option;
    this._votes      = votes;
  }

  public get option(): string {
    return this._option;
  }

  public get votes(): string[] {
    return this._votes;
  }

  public toJSON(): any {
    return {
      'option':      this.option,
      'votes':      this.votes
    };
  }
}