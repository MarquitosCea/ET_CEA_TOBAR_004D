import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData('usuarios?username=usuario1').subscribe({
      next: (data) => {
        this.items = data;
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }
}