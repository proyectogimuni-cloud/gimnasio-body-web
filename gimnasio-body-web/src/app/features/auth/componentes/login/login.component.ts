import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAuthService } from '../../servicios/servicio-auth.service';
import { MessageService } from 'primeng/api';
import { ApiErr } from '../../../../core/interfaces/api-responses.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { RutasCore } from '../../../../core/enums/rutas-core.enum';

/**
 * Componente para el manejo del login 
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  
  /**
   * Inyección de dependencias
   */
  private fb = inject(FormBuilder);
  private auth = inject(ServicioAuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);


  /**
   * Loading para request
   */
  loading = false;

  /**
   * Formulario para los campos del login
   */
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  /**
   * Método para enviar el request de autenticación a la API.
   * Si el formulario es inválido, no permite realizar la petición.
   * Mientras se está ejecutando la petición, loading pasa a true.
   * Se utiliza  el método login del servicio AuthService para realizar la autenticación.
   * En caso de que sean validas las credenciales redirecciona a main
   */
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
    this.router.navigate([RutasCore.MAIN]);
  },
  error: (e: HttpErrorResponse) => {
    const msg = e.error?.message || 'Usuario o contraseña incorrecta';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
    this.loading = false;
  },
});
  }
}
