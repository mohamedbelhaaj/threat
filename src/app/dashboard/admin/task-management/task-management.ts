import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.model'
import { TaskService } from '../../../services/task';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { FilterByStatusPipe } from '../task-management/filter-by-status-pipe'
@Component({
  selector: 'app-task-management',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FilterByStatusPipe],
    standalone: true,

  templateUrl: './task-management.html',
  styleUrl: './task-management.css',
})
export class TaskManagement implements OnInit {

tasks$: Observable<Task[]>;

  // Kanban columns
  columns: { title: string; status: TaskStatus }[] = [
    { title: 'Pending', status: TaskStatus.PENDING },
    { title: 'In Progress', status: TaskStatus.IN_PROGRESS },
    { title: 'Completed', status: TaskStatus.COMPLETED }
  ];

  // Quick-add form
  newTask: Omit<Task, 'taskId' | 'createdAt'> = {
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.PENDING,
    assignee: '', // will be filled with current admin UID
    deadline: undefined,
    actionType: 'BLOCK_IP'
  };

  priorities = Object.values(TaskPriority);
  statuses  = Object.values(TaskStatus);

constructor(private taskService: TaskService) {
  this.tasks$ = this.taskService.list();
this.tasks$ = this.taskService.list().pipe(startWith([]));
  }

  ngOnInit(): void {
    // auto-assign to current admin (you can change to a selector later)
    this.newTask.assignee = 'admin_' + Math.random().toString(36).slice(2); // stub
  }

  async addTask(): Promise<void> {
    if (!this.newTask.title.trim()) return;
    await this.taskService.create(this.newTask);
    this.resetForm();
  }

  async dropTask(id: string, newStatus: TaskStatus): Promise<void> {
    await this.taskService.updateStatus(id, newStatus);
  }

  async removeTask(id: string): Promise<void> {
    await this.taskService.delete(id);
  }

  private resetForm(): void {
    this.newTask = {
      title: '',
      description: '',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.PENDING,
      assignee: this.newTask.assignee,
      deadline: undefined,
      actionType: 'BLOCK_IP'
    };
  }
}
