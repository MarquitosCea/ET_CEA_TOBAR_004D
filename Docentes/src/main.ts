import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';


defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
