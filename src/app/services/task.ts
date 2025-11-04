import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

   constructor(private fs: Firestore, private auth: Auth) {}

  /* ---------- 1. Liste des tâches ---------- */
  list(): Observable<Task[]> {
    const ref = collection(this.fs, 'tasks');
    return collectionData(ref, { idField: 'taskId' }) as Observable<Task[]>;
  }

  /* ---------- 2. Créer une tâche ---------- */
  async create(t: Omit<Task, 'taskId' | 'createdAt'>): Promise<Task> {
    /* on retire les clés undefined (deadline ici) */
    const raw: any = { ...t, createdAt: new Date() };
    if (raw.deadline === undefined) delete raw.deadline;

    const docRef = await addDoc(collection(this.fs, 'tasks'), raw);
    return { ...raw, taskId: docRef.id } as Task;
  }

  /* ---------- 3. Mettre à jour le statut ---------- */
  updateStatus(id: string, status: TaskStatus): Promise<void> {
    return updateDoc(doc(this.fs, 'tasks', id), { status });
  }

  /* ---------- 4. Supprimer une tâche ---------- */
  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.fs, 'tasks', id));
  }
}