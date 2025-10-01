import { Component } from '@angular/core';
import { FachadaUtilidadesService } from '../../../../core/fachadas/fachada-utilidades.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-asistencia-landing',
  templateUrl: './registro-asistencia-landing.component.html',
  styleUrl: './registro-asistencia-landing.component.scss',
})
export class RegistroAsistenciaLandingComponent {
  registroForm = this.fb.group({
    documento: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private fb: FormBuilder) {}

  marcar() {
    if (this.registroForm.invalid) return;
    console.log('Ingreso Marcado');
    
  }
}
