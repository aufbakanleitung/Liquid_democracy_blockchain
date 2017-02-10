'use strict';

export class DomainDelegation {
  private _domain: string;
  private _user: string;

  public constructor(domain: string, user: string) {
    this._domain      = domain;
    this._user      = user;
  }

  public get domain(): string {
    return this._domain;
  }

  public get user(): string {
    return this._user;
  }

  public toJSON(): any {
    return {
      'domain':      this.domain,
      'user':      this.user
    };
  }
}
