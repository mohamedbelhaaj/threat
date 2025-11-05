import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification';
import { Notification } from '../models/notification.model';
@Component({
  selector: 'app-notifications',
    standalone: true,

  imports: [CommonModule,FormsModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  notifs$: Observable<Notification[]>;

  channels: Notification['channel'][] = ['PUSH', 'EMAIL', 'TELEGRAM', 'IN_APP'];
  types: Notification['type'][] = ['THREAT', 'TASK', 'SYSTEM'];

  newNotif: Omit<Notification, 'notificationId' | 'createdAt'> = {
    userId: '',
    channel: 'IN_APP',
    type: 'THREAT',
    title: '',
    content: '',
    isRead: false,
    metadata: {}
  };

  constructor(private notifService: NotificationService) {
    this.notifs$ = this.notifService.list();
  }

  ngOnInit(): void {
    this.newNotif.userId = 'admin_stub'; // ou this.auth.currentUser?.uid
  }

  async send(): Promise<void> {
    try {
      await this.notifService.send(this.newNotif);
      this.resetForm();
    } catch (e) {
      console.error(e);
    }
  }

  async markAsRead(id: string): Promise<void> {
    await this.notifService.markAsRead(id);
  }

  private resetForm(): void {
    this.newNotif = {
      userId: this.newNotif.userId,
      channel: 'IN_APP',
      type: 'THREAT',
      title: '',
      content: '',
      isRead: false,
      metadata: {}
    };
  }
} 


