export interface Notification {
  notificationId?: string;
  userId: string;
  channel: 'PUSH' | 'EMAIL' | 'TELEGRAM' | 'IN_APP';
  type: 'THREAT' | 'TASK' | 'SYSTEM';
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
}