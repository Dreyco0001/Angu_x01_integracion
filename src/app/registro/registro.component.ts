import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatch });
  }

  passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get passwordMismatchError(): boolean {
    return !!(this.form.errors && this.form.errors['passwordMismatch']);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Registro enviado:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
