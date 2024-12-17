import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://apidata-hiuf.onrender.com';

  constructor(private http: HttpClient) {}

  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  getJustificativos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/justificativos`);
  }

  deleteJustificativo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/justificativos/${id}`);
  }

  getUsuarioByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/?username=${username}`);
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  updateUsuario(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, data);
  }

  // Nuevo método para recuperar contraseña por nombre de usuario
  recoverPassword(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/?username=${username}`);
  }
}








  
