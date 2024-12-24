import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Импорт Firebase SDK
import { initializeApp } from 'firebase/app';

// Инициализация Firebase (единожды)
const firebaseApp = initializeApp(environment.firebase);
console.log('Firebase initialized:', firebaseApp);

// Запуск Angular приложения
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
}).catch(err => console.error(err));
