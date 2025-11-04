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

  /* ── 1. Liste des tâches ── */
  list(): Observable<Task[]> {
    const ref = collection(this.fs, 'tasks');
    return collectionData(ref, { idField: 'taskId' }) as Observable<Task[]>;
  }

  /* ── 2. Créer une tâche ── */
  async create(t: Omit<Task, 'taskId' | 'createdAt'>): Promise<Task> {
    const now: Task = { ...t, createdAt: new Date() };
    const docRef = await addDoc(collection(this.fs, 'tasks'), now);
    return { ...now, taskId: docRef.id };
  }

  /* ── 3. Changer le statut ── */
  updateStatus(id: string, status: TaskStatus): Promise<void> {
    return updateDoc(doc(this.fs, 'tasks', id), { status });
  }

  /* ── 4. Supprimer une tâche ── */
  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.fs, 'tasks', id));
  }
}