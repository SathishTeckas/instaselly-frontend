import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private httpClient: HttpClient,
    private auth: AuthenticationService
  ) { }

  /**
   * @returns Generate the http header with token
   */
  private tokenHeader(): HttpHeaders {
    const token = this.auth.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    } 

    this.auth.logout();
    return new HttpHeaders();
  }

  /**
   *  This method will be used for calling the post method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isAuthenticated Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
  public create(api: string, endPoint: string, body: any, isAuthenticated: boolean): Observable<any> {
    return this.httpClient.post(api + endPoint, body, {
      headers: isAuthenticated ? this.tokenHeader() : new HttpHeaders(),
      reportProgress: true,
      observe: 'body',
      withCredentials: false
    });
  }

  /**
   * This method will be used for calling the get method
   * @param api API String
   * @param endPoint Endpoint String
   * @param isAuthenticated Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
   public read(api: string, endPoint: string, isAuthenticated: boolean): Observable<any> {
    return this.httpClient.get(api + endPoint, {
      headers: isAuthenticated ? this.tokenHeader() : new HttpHeaders(),
      reportProgress: true,
      observe: 'body',
      withCredentials: false
    });
  }

  /**
   * This method will be used for calling the put method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isAuthenticated Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
  public update(api: string, endPoint: string, body: any, isAuthenticated: boolean): Observable<any> {
    return this.httpClient.put(api + endPoint, body, {
      headers: isAuthenticated ? this.tokenHeader() : new HttpHeaders(),
      reportProgress: true,
      observe: 'body'
    })
  }

  /**
   * This method will be used for calling the delete method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isAuthenticated Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
  public delete(api: string, endPoint: string, body: any, isAuthenticated: boolean): Observable<any> {
    return this.httpClient.delete(api + endPoint, {
      headers: isAuthenticated ? this.tokenHeader() : new HttpHeaders(),
      reportProgress: true,
      observe: 'body',
      body: body
    });
  }

   /**
   * This method will be used for calling the put method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isAuthenticated Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
   public patch(api: string, endPoint: string, body: any, isAuthenticated: boolean): Observable<any> {
    return this.httpClient.patch(api + endPoint, body, {
      headers: isAuthenticated ? this.tokenHeader() : new HttpHeaders(),
      reportProgress: true,
      observe: 'body'
    })
  }

}
