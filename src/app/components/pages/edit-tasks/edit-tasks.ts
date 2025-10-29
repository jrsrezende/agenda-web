import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Navbar } from '../../shared/navbar/navbar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-tasks',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Navbar],
  templateUrl: './edit-tasks.html',
  styleUrl: './edit-tasks.css',
})
export class EditTasks {
  taskId = signal<string>('')
  taskName = signal<string>('');
  taskDate = signal<string>(''); 
  taskPriority = signal<string>(''); 
  taskCategory = signal<string>('');
  taskFinished = signal<boolean>(false);
  categories = signal<any[]>([]);
  message = signal<string>('');

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  formCadastro = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    date: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    finished: new FormControl<boolean>(false),
    categoryId: new FormControl('', [Validators.required]),
  });

  ngOnInit() {

    this.http.get(environment.apiCategories).subscribe((response) => {
      this.categories.set(response as any[]);
    });

    this.route.queryParams.subscribe((params) => {
      const passedTaskName = params['taskName'];
      const passedTaskDate = params['taskDate'];
      const passedTaskPriority = params['taskPriority'];
      const passedTaskCategory = params['taskCategory'];
      const passedTaskFinishedString = params['taskFinished'];
      const passedTaskFinishedBoolean = passedTaskFinishedString === 'true';

      this.taskName.set(passedTaskName);
      this.taskDate.set(passedTaskDate);
      this.taskPriority.set(passedTaskPriority);
      this.taskCategory.set(passedTaskCategory);
      this.taskFinished.set(passedTaskFinishedBoolean);

      this.formCadastro.patchValue({
        name: passedTaskName,
        date: passedTaskDate,
        priority: passedTaskPriority,
        categoryId: passedTaskCategory,
        finished: passedTaskFinishedBoolean,
      });
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.taskId.set(id);
    })

  }

  editTask() {
    this.http.put(environment.apiTasks + '/' + this.taskId(), this.formCadastro.value).subscribe({
      next: () => {
        this.message.set('Task successfully edited!');
      },
      error: (e) => {
        if (e.status === 0) {
          // Servidor não está respondendo
          this.message.set('Error connecting to the server');
        } else {
          this.message.set('An unexpected error occurred');
        }
      },
    });
  }
}
