import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistroAsistenciaService } from '../../servicios/registro-asistencia.service';

@Component({
  selector: 'app-registro-asistencia-landing',
  templateUrl: './registro-asistencia-landing.component.html',
  styleUrls: ['./registro-asistencia-landing.component.scss'],
})
export class RegistroAsistenciaLandingComponent {
  private fb = inject(FormBuilder);
  private api = inject(RegistroAsistenciaService);
  private toast = inject(MessageService);
  private router = inject(Router);

  // TODO: Crear ruta al crud
  private rutaCrudCliente = ['/main', 'registro-asistencia', 'crear-cliente'];

  loading = false;
  showNoClienteDialog = false;
  ultimoDocumentoIntentado = '';

  registroForm = this.fb.group({
    documento: ['', [Validators.required, Validators.minLength(6)]],
    marcarSalida: [false],
  });

  get isSalida(): boolean {
    return !!this.registroForm.get('marcarSalida')?.value;
  }

  marcar() {
    if (this.registroForm.invalid || this.loading) return;

    const documento = String(this.registroForm.get('documento')!.value).trim();
    if (!documento) return;

    this.loading = true;
    this.ultimoDocumentoIntentado = documento;

    const obs = this.isSalida
      ? this.api.salida(documento)
      : this.api.ingreso(documento);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.toast.add({
          severity: 'success',
          summary: 'OK',
          detail: this.isSalida ? 'Salida registrada' : 'Ingreso registrado',
        });
        // opcional: limpiar campo
        this.registroForm.reset();
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;

        // Si el usuario no existe (404)
        if (e.status === 404) {
          this.showNoClienteDialog = true;
          return;
        }

        // otros errores
        const msg = e.error?.message || 'Error procesando la solicitud';
        this.toast.add({ severity: 'error', summary: 'Error', detail: msg });
      },
    });
  }

  irACrudCliente() {
    this.showNoClienteDialog = false;
    this.router.navigate(this.rutaCrudCliente);
  }
}
