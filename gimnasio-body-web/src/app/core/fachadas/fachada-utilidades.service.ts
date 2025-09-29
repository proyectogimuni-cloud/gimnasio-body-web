import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FachadaUtilidadesService {
  constructor(private router: Router, fb: FormBuilder) {}
}
