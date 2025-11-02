import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environment/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getDataConnect, provideDataConnect } from '@angular/fire/data-connect';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config'
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // 🔥 initialise Firebase
    provideFirestore(() => getFirestore()), 
  ],
}).catch((err) => console.error(err));
