import { Injectable, Injector, inject } from '@angular/core';
import { iLoginRequest, iLoginResponse } from '../../interface/authentication/login.interface';
import { Observable } from 'rxjs';
import { CrudService } from '../common/crud/crud.service';
import { environment } from 'src/environment/environment';
import { AuthenticationEndpoints } from '../../endpoints/authentication/authentication.endpoint';
import { iToken } from '../../interface/authentication/token.interface';
import { Router } from '@angular/router';
import { iAddress } from '../../interface/customer/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private inject: Injector
  ) { }

  /**
   * @returns return the token from local storage 
  */
  public getToken(): string {
    const token: string | null = localStorage.getItem('token');
    return token ?? '';
  }

  /**
   * @returns return the decoded token from local storage 
   */
  public getDecodedToken(): iToken | null {
    const token: string = this.getToken();
    if (token) {
      return DecodeJWTToken(token);
    }
    return null;
  }

  public getUserAddress(): Observable<iAddress> {
    const crud = this.inject.get(CrudService);
    return crud.read(
      environment.api,
      AuthenticationEndpoints.getAddress,
      true
    );
  }

  public login(request: iLoginRequest): Observable<iLoginResponse> {
    const crud = this.inject.get(CrudService);
    return crud.create(
      environment.api,
      AuthenticationEndpoints.login,
      request,
      false
    );
  }

  public logout(): void {
    const router = this.inject.get(Router);
    localStorage.clear();
    sessionStorage.clear();
    router.navigate(['auth/login']);
  }
}

export function DecodeJWTToken(token: string): any {
  const jwtToken: string = token;
  const base64Url = jwtToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

