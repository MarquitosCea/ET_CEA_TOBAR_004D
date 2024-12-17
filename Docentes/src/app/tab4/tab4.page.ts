import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  username: string = '';
  email: string = '';
  profileImage: string = './assets/avatar.png';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const storedUser = sessionStorage.getItem('usuario');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.username = userData.username;
      this.email = userData.email;
      this.profileImage = userData.profilePicture || './assets/avatar.png';
    }
  }

  guardarCambios() {
    const storedUser = sessionStorage.getItem('usuario');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const id = userData.id;

      const updatedUser = {
        username: this.username,
        email: this.email,
        profilePicture: this.profileImage
      };

      this.apiService.updateUsuario(id, updatedUser).subscribe({
        next: (response) => {
          console.log('Perfil actualizado', response);
          sessionStorage.setItem('usuario', JSON.stringify(updatedUser));
          this.router.navigate(['/tabs/tab3']);
        },
        error: (error) => console.error('Error al guardar cambios', error)
      });
    }
  }
}
