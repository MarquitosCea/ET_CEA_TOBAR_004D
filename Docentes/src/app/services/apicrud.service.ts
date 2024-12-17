import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clasesina,Clasesita } from 'src/interfaces/clasesina';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) {}

  postClase(newClase: Clasesina):Observable<Clasesina>{
    return this.httpclient.post<Clasesina>(`${environment.apiUrl}/clases`, newClase);
  }

  deleteClase(clasesilla:any):Observable<Clasesina>{
    return this.httpclient.delete<Clasesina>(`${environment.apiUrl}/clases/${clasesilla.id}`);
  }
}

