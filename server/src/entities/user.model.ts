'use strict';

import * as crypto from 'crypto';
import {Password} from '../utils/Password';
import {Vote} from './vote.model';
import {DomainDelegation} from './domainDelegation.model';

export class User {
  private _salt: string;
  private _hash: string;

  public constructor(private _userID: string,
                     password: string,
                     private _username: string,
                     private _address: string,
                     private _email: string,
                     private _phoneNumber: string,
                     private _expertiseDomains: string[],
                     private _domainDelegations: DomainDelegation[],
                     private _votes: Vote[]) {
    this._salt = crypto.randomBytes(16).toString('hex');
    this._hash = new Password(password, this.salt).toHash();
  }

  public get userID(): string {
    return this._userID;
  }

  public get salt(): string {
    return this._salt;
  }

  public get hash(): string {
    return this._hash;
  }

  public get username(): string {
    return this._username;
  }

  public get address(): string {
    return this._address;
  }

  public get email(): string {
    return this._email;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get expertiseDomains(): string[] {
    return this._expertiseDomains;
  }

  public get domainDelegations(): DomainDelegation[] {
    return this._domainDelegations;
  }

  public get votes(): Vote[] {
    return this._votes;
  }

  public toJSON(): any {
    return {
      'userID':            this.userID,
      'salt':              this.salt,
      'hash':              this.hash,
      'username':          this.username,
      'address':           this.address,
      'email':             this.email,
      'phoneNumber':       this.phoneNumber,
      'expertiseDomains':  this.expertiseDomains,
      'domainDelegations': this.domainDelegations,
      'votes':             this.votes
    };
  }
}
;