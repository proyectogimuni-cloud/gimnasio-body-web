import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegistroAsistenciaService } from '../../servicios/registro-asistencia.service';
import { Carrera, CARRERAS, Genero, GENEROS } from '../../const/catalogo';

/** Pantalla de registro de usuarios clientes nuevos */
@Component({
  selector: 'app-registro-asistencia-crud',
  templateUrl: './registro-asistencia-crud.component.html',
  styleUrls: ['./registro-asistencia-crud.component.scss'],
})
export class RegistroAsistenciaCrudComponent {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(MessageService);
  private api = inject(RegistroAsistenciaService);

  /** Generos disponibles según el catálogo */
  generos: Genero[] = [...GENEROS];
  /**
   * Carreras disponibles según catálogo
   */
  carreras: Carrera[] = [...CARRERAS];

  /** Formulario de registro tipado */
  form = this.fb.group({
    identificacion: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(6)],
    ],
    genero: [this.generos[0] as Genero, [Validators.required]],
    edad: [null as number | null, [Validators.min(1)]],
    carrera: [this.carreras[0] as Carrera, [Validators.required]],
  });

  ngOnInit() {
    /** Captura el queryparam doc de la ruta  */
    const doc = this.route.snapshot.queryParamMap.get('doc');
    if (doc) this.form.get('identificacion')?.setValue(doc);
  }

  /**
   * Permite registrar un usuario cliente nuevo en el aplicativo.
   * Una vez registrado, redirecciona de nuevo al landing de registrar ingreso/salida.   * 
   */
  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { identificacion, genero, carrera, edad } = this.form.getRawValue();
    this.api
      .registrarCliente({
        identificacion: String(identificacion!),
        genero: genero as Genero,
        carrera: carrera as Carrera,
        edad: Number(edad!),
      })
      .subscribe({
        next: () => {
          this.toast.add({
            severity: 'success',
            summary: 'OK',
            detail: 'Usuario registrado',
          });
          this.router.navigate(['/main/registro-asistencia']);
        },
        error: (e) => {
          const msg = e?.error?.message || 'Error registrando usuario';
          this.toast.add({ severity: 'error', summary: 'Error', detail: msg });
        },
      });
  }
}
