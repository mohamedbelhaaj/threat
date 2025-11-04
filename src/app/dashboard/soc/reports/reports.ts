import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportService } from '../../../services/report';
import { ReportFilters,Report } from '../../../models/report.model';
@Component({
  selector: 'app-reports',
  standalone:true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  providers: [Storage], 
})
export class Reports implements OnInit  {

onDownload(_t45: Report) {
throw new Error('Method not implemented.');
}
isLoading: any;


reports: Report[] = [];
filters: any;
format: any;

  constructor(private reportservice: ReportService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


async onGenerate(): Promise<void> {
  this.isLoading = true;

  try {
    /* 1. Crée un fichier CSV factice */
    const blob = new Blob(['dummy,csv,content'], { type: 'text/csv' });

    /* 2. Appelle le service */
    const report = await this.reportservice.generateReport(blob, this.filters, 'CSV');

    /* 3. Ajoute dans la liste locale */
    this.reports.unshift(report);

    console.log('✅ Rapport généré & uploadé', report);
  } catch (err) {
    console.error('❌ Erreur génération', err);
  } finally {
    this.isLoading = false;
  }
}

  async delete(report:any) {
    await this.reportservice.deleteReport(report);
    this.reports = this.reports.filter(r => r.reportId !== report.reportId);
  }
}
