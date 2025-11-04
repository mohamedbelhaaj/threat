export interface Report {
  reportId?: string; // Firestore génère l'ID
  title: string;
  format: 'PDF' | 'CSV';
  generatedAt: Date;
  sizeKB: number;
  downloadUrl: string;
  filters: ReportFilters;
  uid: string; // userId Firebase Auth
}

export interface ReportFilters {
  startDate: Date;
  endDate: Date;
  status?: string[];
  priority?: string[];
}