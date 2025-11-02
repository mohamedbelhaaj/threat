export type UserRole = 'SOC_ANALYST' | 'SYSTEM_ADMIN';

export interface User {
  userId: string;
  email: string;
  password?: string;
  role: UserRole;
  telegramId?: string;
  createdAt: Date;
  lastLogin?: Date;
  active: boolean;
}