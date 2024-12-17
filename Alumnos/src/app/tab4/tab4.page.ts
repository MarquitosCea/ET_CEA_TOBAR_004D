import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  profileImage: string = 'assets/icon/default-profile.png'; // Imagen predeterminada
  username: string = '';
  email: string = '';

  constructor() {}

  ngOnInit() {
    const savedImage = sessionStorage.getItem('profileImage');
    const savedUsername = sessionStorage.getItem('username');
    const savedEmail = sessionStorage.getItem('email');

    if (savedImage) {
      this.profileImage = savedImage;
    }
    if (savedUsername) {
      this.username = savedUsername;
    }
    if (savedEmail) {
      this.email = savedEmail;
    }
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result; // Muestra la imagen seleccionada
      };
      reader.readAsDataURL(fileInput.files[0]); // Convierte la imagen a base64
    }
  }

  guardarCambios() {
    // Guarda la imagen y los datos en sessionStorage
    sessionStorage.setItem('profileImage', this.profileImage);
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('email', this.email);
    alert('Perfil actualizado correctamente.');
  }
}
