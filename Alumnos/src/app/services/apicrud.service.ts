import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { justificar, justificatos } from 'src/interfaces/justificación';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) {}

  postJustificativo(newJustificativo: justificar):Observable<justificatos>{
    return this.httpclient.post<justificatos>(`${environment.apiUrl}/justificativos`, newJustificativo);
  }
}
