import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { GLOBAL } from './GLOBAL';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: string;

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.url = GLOBAL.url;
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId) && window.localStorage) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }
  getUserFromToken(): any {
    const token = this.getToken();
    if (token) {
      const helper = new JwtHelperService();
      return helper.decodeToken(token);
    }
    return null;
  }
  public isAuthenticated(allowRoles: string[]): boolean {
    if (isPlatformBrowser(this.platformId) && window.localStorage) {
      const token = localStorage.getItem('token') || '';

      if (!token) {
        return false;
      }
    try{
          const helper = new JwtHelperService();
          var decodedToken =helper.decodeToken(token);
          if (!decodedToken){
            console.log('No Acceso');
            localStorage.removeItem('token');
            return false;
          }
        }catch (error){
          localStorage.removeItem('token');
          return false;
        }
          return allowRoles.includes(decodedToken['role']);
        }
        return false;
      }

      obtener_config_admin( token:any): Observable<any> {
        let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
        return this._http.get(this.url + 'obtener_config_admin',{ headers: headers });
      }

      actualizar_config_admin( id:any, data:any,token:any): Observable<any> {
        if (data.logo){
          let headers = new HttpHeaders({'Authorization':token });
          const fd = new FormData();
          fd.append('titulo', data.titulo);
          fd.append('serie', data.serie);
          fd.append('correlativo', data.correlativo);
          fd.append('categoria', data.categoria);
          fd.append('contenido', data.contenido);
          fd.append('categorias', JSON.stringify(data.categorias));
          fd.append('logo', data.logo);
          return this._http.put(this.url + 'actualizar_config_admin/'+id,fd,{ headers: headers });
        }else{
          let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
          return this._http.put(this.url + 'actualizar_config_admin/'+id,data,{ headers: headers });
        }
     
      }


      
  obtener_config_publico(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_config_publico', { headers: headers });
  }

      
}
