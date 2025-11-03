import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Report, ReportFilters } from '../models/report.models'
import { Observable, from } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class reportService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth
  ) {
    
  }

  /* 1. Récupérer les rapports de l’utilisateur connecté */
  getReports(): Observable<Report[]> {
    const reportsRef = collection(this.firestore, 'reports');
    return collectionData(reportsRef, { idField: 'reportId' }) as Observable<Report[]>;
  }

  /* 2. Générer + uploader un rapport (fichier + métadonnées) */
  async generateReport(
    file: Blob,
    filters: ReportFilters,
    format: 'PDF' | 'CSV'
  ): Promise<Report> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) throw new Error('User not authenticated');

    const timestamp = new Date();
    const fileName = `report_${timestamp.getTime()}.${format.toLowerCase()}`;
    const storageRef = ref(this.storage, `reports/${uid}/${fileName}`);

    // Upload fichier
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    // Créer objet Report
    const report: Omit<Report, 'reportId'> = {
      title: `Threat Report ${timestamp.toLocaleDateString()}`,
      format,
      generatedAt: timestamp,
      sizeKB: Math.round(file.size / 1024),
      downloadUrl,
      filters,
      uid
    };

    // Sauvegarder dans Firestore
    const docRef = await addDoc(collection(this.firestore, 'reports'), report);
    return { ...report, reportId: docRef.id };
  }

  /* 3. Supprimer un rapport (metadata + fichier) */
  async deleteReport(report: Report): Promise<void> {
    if (!report.reportId) return;

    // Supprimer fichier Storage
    const fileRef = ref(this.storage, report.downloadUrl);
    await deleteObject(fileRef).catch(() => {}); // ignore si déjà supprimé

    // Supprimer document Firestore
    const docRef = doc(this.firestore, 'reports', report.reportId);
    return deleteDoc(docRef);
  }
}