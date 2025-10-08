import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PanelControlService } from '../../servicios/panel-control.service';
import { MessageService } from 'primeng/api';
import {
  AsistenciaSearchReq,
  RegistroAsistencia,
} from '../../interfaces/panel-control.interfaces';
import {
  Carrera,
  CARRERA_LABELS,
  CARRERAS,
  Genero,
  GENEROS,
} from '../../../registro-asistencia/const/catalogo';

@Component({
  selector: 'app-panel-control-landing',
  templateUrl: './panel-control-landing.component.html',
  styleUrls: ['./panel-control-landing.component.scss'],
})
export class PanelControlLandingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private panel = inject(PanelControlService);
  private toast = inject(MessageService);

  // overlays
  showFilters = false;
  showGraphsToggle = false;

  // toggles de gráficas
  showGrafCarrera = true;
  showGrafHora = true;
  showGrafHM6 = true;

  // datos tabla + charts
  pageData$ = this.panel.pageData$;
  tableItems: RegistroAsistencia[] = [];
  total = 0;

  pieData: any;
  donutData: any;
  barData: any;

  loadingCharts = true;

  generosOpts = GENEROS.map((g) => ({ label: g, value: g as Genero }));
  carrerasOpts = CARRERAS.map((c) => ({
    label: CARRERA_LABELS[c],
    value: c as Carrera,
  }));
  // filtros
  filtrosForm = this.fb.group({
    desde: [this.isoDate(new Date(Date.now() - 30 * 24 * 3600 * 1000))], // -30d
    hasta: [this.isoDate(new Date())],
    genero: [[] as Genero[]],
    carrera: [[] as Carrera[]],
    estado: ['ambos' as 'ambos' | 'abierto' | 'cerrado'],
  });

  get filtrosActuales(): AsistenciaSearchReq {
    const v = this.filtrosForm.getRawValue();
    const req: AsistenciaSearchReq = {
      desde: v.desde || undefined,
      hasta: v.hasta || undefined,
      genero: v.genero && v.genero.length ? v.genero : undefined,
      carrera: v.carrera && v.carrera.length ? v.carrera : undefined,
    };
    if (v.estado === 'abierto') req.abierto = true;
    if (v.estado === 'cerrado') req.cerrado = true;
    return req;
  }

  async ngOnInit() {
    await this.aplicarFiltros();
    // suscribir página para tabla (para el futuro)
    this.pageData$.subscribe((d) => {
      if (!d) return;
      this.tableItems = d.items;
      this.total = d.total;
    });
  }

  // Helpers
  private isoDate(d: Date) {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19);
  }

  get graphsCount() {
    return [this.showGrafCarrera, this.showGrafHora, this.showGrafHM6].filter(
      Boolean
    ).length;
  }
  get filtrosCount() {
    const f = this.filtrosForm.getRawValue();
    let n = 0;
    if (f.genero?.length) n++;
    if (f.carrera?.length) n++;
    if (f.estado !== 'ambos') n++;
    // desde/hasta distintos al default
    return n + 0;
  }

  async aplicarFiltros() {
    try {
      this.loadingCharts = true;
      const req = this.filtrosActuales;
      this.panel.setFilters(req);
      await this.panel.fetchPage(req);

      // para gráficas usar TODA la data filtrada
      const all = await this.panel.fetchAll(req);
      this.loadingCharts = false;
      this.pieData = this.panel.buildPieByCarrera(all);
      this.donutData = this.panel.buildDonutByHour(all);
      this.barData = this.panel.buildBarsLast6Months(all);

      this.showFilters = false;
    } catch (e: any) {
      this.loadingCharts = false;
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: e?.message || 'Error aplicando filtros',
      });
    }
  }

  limpiarFiltros() {
    this.filtrosForm.reset({
      desde: this.isoDate(new Date(Date.now() - 30 * 24 * 3600 * 1000)),
      hasta: this.isoDate(new Date()),
      genero: [],
      carrera: [],
      estado: 'ambos',
    });
  }

  async descargarCsv() {
    try {
      await this.panel.exportCsv(this.filtrosActuales);
    } catch (e: any) {
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo generar el CSV',
      });
    }
  }

  hasChartData(data: any): boolean {
    const ds = data?.datasets;
    if (!ds || ds.length === 0) return false;
    return ds.some(
      (d: any) =>
        Array.isArray(d.data) && d.data.some((v: any) => v != null && v !== 0)
    );
  }
}
