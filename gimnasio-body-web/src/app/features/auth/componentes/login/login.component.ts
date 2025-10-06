import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAuthService } from '../../servicios/servicio-auth.service';
import { MessageService } from 'primeng/api';
import { ApiErr } from '../../../../core/interfaces/api-responses.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(ServicioAuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  loading = false;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const { username, password } = this.form.getRawValue();

    this.auth.login({ username: username!, password: password! }).subscribe({
  next: () => {
    this.loading = false;
    this.router.navigate(['/main']);
  },
  error: (e: HttpErrorResponse) => {
    const msg = e.error?.message || 'Usuario o contraseña incorrecta';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
    this.loading = false;
  },
});
  }
}
