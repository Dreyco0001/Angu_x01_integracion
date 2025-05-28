import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-noticias-lista',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="noticias-container">
      <h2>🎮 Quiz de Juegos (Preguntas en Español)</h2>

      <div *ngIf="loading">Cargando preguntas...</div>

      <div *ngIf="!loading && !finished">
        <p><b>Pregunta {{ currentIndex + 1 }} de {{ questions.length }}:</b></p>
        <p [innerHTML]="questions[currentIndex].question"></p>

        <div *ngFor="let ans of questions[currentIndex].allAnswers">
          <button 
            (click)="answer(ans)" 
            class="answer-button" 
            [disabled]="answered"
            [class.correct]="answered && ans === questions[currentIndex].correctAnswer"
            [class.wrong]="answered && ans !== questions[currentIndex].correctAnswer && ans === selectedAnswer"
          >
            <span [innerHTML]="ans"></span>
          </button>
        </div>
      </div>

      <div *ngIf="finished">
        <h3>Resultado: {{ score }} / {{ questions.length }}</h3>
        <button (click)="restart()">Volver a jugar</button>
      </div>
    </div>
  `,
  styleUrls: ['./noticias-lista.component.css']
})
export class NoticiasListaComponent {
  private http = inject(HttpClient);

  questions: any[] = [];
  currentIndex = 0;
  score = 0;
  answered = false;
  finished = false;
  loading = true;
  selectedAnswer: string | null = null;

  constructor() {
    this.loadQuestions();
  }

  loadQuestions() {
    const url = 'https://opentdb.com/api.php?amount=10&category=15&lang=es&type=multiple';

    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (data.results && data.results.length) {
          this.questions = data.results.map((q: any) => {
            const allAnswers = [...q.incorrect_answers, q.correct_answer];
            this.shuffleArray(allAnswers);
            return {
              question: q.question,
              correctAnswer: q.correct_answer,
              allAnswers,
            };
          });
          this.loading = false;
          this.resetState();
        } else {
          this.loading = false;
          alert('No se encontraron preguntas.');
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Error al cargar preguntas.');
        console.error(err);
      }
    });
  }

  answer(selected: string) {
    if (this.answered) return;

    this.answered = true;
    this.selectedAnswer = selected;

    if (selected === this.questions[this.currentIndex].correctAnswer) {
      this.score++;
    }

    setTimeout(() => {
      this.currentIndex++;
      this.answered = false;
      this.selectedAnswer = null;

      if (this.currentIndex >= this.questions.length) {
        this.finished = true;
      }
    }, 1500);
  }

  restart() {
    this.currentIndex = 0;
    this.score = 0;
    this.finished = false;
    this.loadQuestions();
  }

  resetState() {
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
    this.finished = false;
    this.selectedAnswer = null;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
