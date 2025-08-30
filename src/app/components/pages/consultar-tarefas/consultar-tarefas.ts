import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consultar-tarefas.html',
  styleUrl: './consultar-tarefas.css'
})
export class ConsultarTarefas {
  tarefas = signal<any[]>([]);

  private http = inject(HttpClient);

  formConsulta = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required])
  });

  consultarTarefas() {
    const dataMin = this.formConsulta.value.dataMin;
    const dataMax = this.formConsulta.value.dataMax;
    this.http.get(environment.apiTasks + "/" + dataMin + "/" + dataMax).subscribe({
      next: (response) => {
        console.table(response);
        this.tarefas.set(response as any[]);
      },
      error: (e) => {
        console.log(e.error);
      }
    });
  }

  excluirTarefa(id: string) {
    if (confirm("Deseja realmente excluir a tarefa?")) {
      this.http.delete(environment.apiTasks + "/" + id, { responseType: 'text' }).subscribe({
        next: (response) => {
          alert(response);
          this.consultarTarefas();
        },
        error: (e) => {
          console.log(e.error);
        }
      });
    }
  }
}
