export interface Task {
  taskId?: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string; // UID Firebase
  createdAt: Date;
deadline?: Date | null; 
  actionType: string;
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum TaskStatus{
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}