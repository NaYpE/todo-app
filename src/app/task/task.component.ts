import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  newTask: string = '';
  tasks: { name: string; completed: boolean }[] = [];

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(task: { name: string; completed: boolean }): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.saveTasks();
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  ngOnInit(): void {
    this.loadTasks();
  }
}
