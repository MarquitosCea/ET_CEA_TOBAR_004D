import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';

register();

interface Menu{
  icon:string;
  name:string;
  redirecTo:string;
  action?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[
    {
      icon:'book-outline',
      name:'Registro de Clases',
      redirecTo:'/tabs/tab1'
    },
    {
      icon:'file-tray-full-outline',
      name:'Justificativos',
      redirecTo:'/tabs/tab2'
    },
    {
      icon:'person-outline',
      name:'Mi Cuenta',
      redirecTo:'/tabs/tab3'
    },
    {
      icon: 'log-out-outline',
      name: 'Cerrar Sesión',
      redirecTo: '',  
      action: 'logout', 
    },
  ]
  constructor( private router: Router ) {}  

    logout() {
      console.log('Cerrando sesión...');
      
      
      localStorage.removeItem('userToken');  
      sessionStorage.clear();
      document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
      
     
      this.router.navigate(['/inicio']);
    }
  
    
    handleMenuItem(menuItem: Menu) {
      if (menuItem.action === 'logout') {
        this.logout();  
      } else {
        this.router.navigate([menuItem.redirecTo]); 
      }
    
  }
}




