import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Report, ReportFilters } from '../models/report.model'
import { Observable, from } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ReportService  {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth
  ) {}

  /* ── 1. Récupérer tous les rapports de l’utilisateur connecté ── */
  getReports(): Observable<Report[]> {
    const reportsRef = collection(this.firestore, 'reports');
    return collectionData(reportsRef, { idField: 'reportId' }) as Observable<Report[]>;
  }

  /* ── 2. Générer + uploader un rapport (fichier + métadonnées) ── */
  async generateReport(
    file: Blob,
    filters: ReportFilters,
    format: 'PDF' | 'CSV'
  ): Promise<Report> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) throw new Error('Utilisateur non authentifié');

    const timestamp = new Date();
    const fileName = `report_${timestamp.getTime()}.${format.toLowerCase()}`;
    const storageRef = ref(this.storage, `reports/${uid}/${fileName}`);

    // 2-a. Upload du fichier
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    // 2-b. Construction de l’objet Report
    const report: Omit<Report, 'reportId'> = {
      title: `Threat Report ${timestamp.toLocaleDateString()}`,
      format,
      generatedAt: timestamp,
      sizeKB: Math.round(file.size / 1024),
      downloadUrl,
      filters,
      uid
    };

    // 2-c. Écriture dans Firestore
    const docRef = await addDoc(collection(this.firestore, 'reports'), report);
    console.log('📄 Document ajouté dans Firestore :', docRef.id);

    return { ...report, reportId: docRef.id };
  }

  /* ── 3. Supprimer un rapport (métadonnées + fichier) ── */
  async deleteReport(report: Report): Promise<void> {
    if (!report.reportId) return;

    // 3-a. Suppression du fichier Storage
    const fileRef = ref(this.storage, report.downloadUrl);
    await deleteObject(fileRef).catch(() => {
      console.warn('Fichier déjà supprimé ou introuvable');
    });

    // 3-b. Suppression du document Firestore
    const docRef = doc(this.firestore, 'reports', report.reportId);
    await deleteDoc(docRef);
    console.log('🗑️ Document supprimé de Firestore :', report.reportId);
  }
}