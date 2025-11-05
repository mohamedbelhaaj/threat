import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  serverTimestamp
} from '@angular/fire/firestore';
import { Notification } from '../models/notification.model';
import { Observable, from } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
 constructor(private fs: Firestore, private auth: Auth) {}

  /* --------- 1. Notifications de l’utilisateur connecté --------- */
  list(): Observable<Notification[]> {
  const uid = this.auth.currentUser?.uid;
  if (!uid) {
    console.warn('⚠️ User not logged in → returning empty stream');
    return of([]); // ← pas d’erreur, juste un tableau vide
  }
  const ref = collection(this.fs, 'notifications');
  const q = query(ref, where('userId', '==', uid));
  return collectionData(q, { idField: 'notificationId' }) as Observable<Notification[]>;
  }

  /* --------- 2. Marquer comme lu --------- */
  markAsRead(id: string): Promise<void> {
    return updateDoc(doc(this.fs, 'notifications', id), { isRead: true });
  }

  /* --------- 3. Envoyer une notification (multi-canal) --------- */
  async send(notif: Omit<Notification, 'notificationId' | 'createdAt'>): Promise<void> {
    const payload: Notification = {
      ...notif,
      createdAt: serverTimestamp() as unknown as Date
    };
    await addDoc(collection(this.fs, 'notifications'), payload);
    console.log('📬 Notification envoyée', notif);
  }
}