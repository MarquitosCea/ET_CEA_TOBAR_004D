import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Uso de environment.apiUrl para mantener consistencia en la base de URL
  private apiUrl: string = `${environment.apiUrl}/usuarios`;

  constructor(private httpclient: HttpClient) {}

  // Obtener todos los usuarios
  GetAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(this.apiUrl);
  }

  // Obtener usuario por username
  GetUserByUsername(usuario: any): Observable<Users> {
    return this.httpclient.get<Users>(`${this.apiUrl}/?username=${usuario}`);
  }

  // Validar si hay una sesión activa
  IsLoggedIn(): boolean {
    return sessionStorage.getItem('username') != null;
  }

  // Crear un nuevo usuario
  PostUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<UserNuevo>(this.apiUrl, newUsuario);
  }

  // Obtener usuario por ID
  GetUsuarioId(id: number): Observable<Users> {
    return this.httpclient.get<Users>(`${this.apiUrl}/?id=${id}`);
  }

  // Obtener usuario por ID para edición
  GetUserById(id: string): Observable<Users> {
    return this.httpclient.get<Users>(`${this.apiUrl}/${id}`);
  }

  // Actualizar usuario
  UpdateUsuario(usuario: any): Observable<any> {
    return this.httpclient.put(`${this.apiUrl}/${usuario.id}`, usuario);
  }
}

