import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistroAsistenciaService } from '../../servicios/registro-asistencia.service';
import { RutasCore } from '../../../../core/enums/rutas-core.enum';
import { MainRoutes } from '../../../main/enums/main-routes.enum';
import { RegistroAsistenciaRoutes } from '../../enums/rutas-registro-asistencia.enum';

/**
 * Este componente/pantalla, permite registrar la salida o la entrada de un usuario al gimnasio
 */
@Component({
  selector: 'app-registro-asistencia-landing',
  templateUrl: './registro-asistencia-landing.component.html',
  styleUrls: ['./registro-asistencia-landing.component.scss'],
})
export class RegistroAsistenciaLandingComponent {
  // Inyecciones de dependencias necesarias
  private fb = inject(FormBuilder);
  private api = inject(RegistroAsistenciaService);
  private toast = inject(MessageService);
  private router = inject(Router);

  /** Ruta al crud de registrar/crear cliente usuario*/
  private rutaCrudCliente = [
    `${RutasCore.MAIN}`,
    `${MainRoutes.REGISTRO_ASISTENCIA}`,
    `${RegistroAsistenciaRoutes.CREAR_CLIENTE}`,
  ];

  /** Loader para los request */
  loading = false;
  /** Flag para mostrar el modal de que el usuario ingresado no está registrado en el aplicativo */
  showNoClienteDialog = false;
  /** Parámetro que almacena el último documento intentado */
  ultimoDocumentoIntentado = '';


  /** Formulario para el registro, por defecto se marca entrada, por lo que marcar salida estará en false */
  registroForm = this.fb.group({
    documento: ['', [Validators.required, Validators.minLength(6)]],
    marcarSalida: [false],
  });

  /** Helper para decisiones en la vista de si es salida o entrada */
  get isSalida(): boolean {
    return !!this.registroForm.get('marcarSalida')?.value;
  }

  /**
   * 
   * Método para "marcar" la entrada o la salida al gimnasio por parte de los usuarios clientes.
   * Si el formulario está en estado invalido, no se procesa la solicitud,
   * si se recibe un 404 (not found), se muestra el modal de que el cliente no existe.
   * Se usa el endpoint de salida o ingreso según sea el caso
   */
  marcar() {
    if (this.registroForm.invalid || this.loading) return;

    const documento = String(this.registroForm.get('documento')!.value).trim();
    if (!documento) return;

    this.loading = true;
    this.ultimoDocumentoIntentado = documento;

    const obs = this.isSalida
      ? this.api.salida({ identificacion: documento })
      : this.api.ingreso({ identificacion: documento });

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.toast.add({
          severity: 'success',
          summary: 'OK',
          detail: this.isSalida ? 'Salida registrada' : 'Ingreso registrado',
        });
        this.registroForm.reset();
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
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

  /**
   * Métdodo para redireccionar a la pantalla de registro de usuario cliente nuevo al aplicativo
   */
  irACrudCliente() {
  this.showNoClienteDialog = false;

  const doc = (String(this.registroForm.get('documento')?.value || '').trim())
            || this.ultimoDocumentoIntentado;

  this.router.navigate(this.rutaCrudCliente, {
    queryParams: doc ? { doc } : undefined
  });
}

}
