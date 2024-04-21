import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  public getAuthToken(): string | null {
    if (!this.isLocalStorageAvailable) {
      return null;
    }
    
    return localStorage.getItem("auth_token");
  }

  public setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  public hasRole(role: string): boolean {
    let token = this.getAuthToken();

    if (token === null) {
      return false;
    }

    const decodedToken = new JwtHelperService().decodeToken(token);

    return decodedToken.roles?.includes(role);
  }

  public hasAnyRole(): boolean {
    let token = this.getAuthToken();

    if (token === null) {
      return false;
    }

    const decodedToken = new JwtHelperService().decodeToken(token);

    return decodedToken.roles;
  }

}
