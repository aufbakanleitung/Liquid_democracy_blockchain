'use strict';
import {Option} from './option.model';

export class Poll {
  private _pollID: string;
  private _title: string;
  private _description: string;
  private _creationDate: number;
  private _dueDate: number;
  private _domain: string;
  private _options: Option[];

  public constructor(pollID: string, title: string, description: string, creationDate: number, dueDate: number, domain: string, options: Option[]) {
    this._pollID       = pollID;
    this._title        = title;
    this._description  = description;
    this._creationDate = creationDate;
    this._dueDate      = dueDate;
    this._domain       = domain;
    this._options      = options;
  }

  public get pollID(): string {
    return this._pollID;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get creationDate(): number {
    return this._creationDate;
  }

  public get dueDate(): number {
    return this._dueDate;
  }

  public get domain(): string {
    return this._domain;
  }

  public get options(): Option[] {
    return this._options;
  }

  public toJSON(): any {
    return {
      'pollID':       this.pollID,
      'title':        this.title,
      'description':  this.description,
      'creationDate': this.creationDate,
      'dueDate':      this.dueDate,
      'domain':       this.domain,
      'options':      this.options
    };
  }
}