import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { ApiResp } from '../../../core/interfaces/api-responses.interface';
import { environment } from '../../../../environments/environment.dev';
import { AsistenciaSearchReq, AsistenciaSearchResp, RegistroAsistencia } from '../interfaces/panel-control.interfaces';


@Injectable({ providedIn: 'root' })
export class PanelControlService {
  private http = inject(HttpClient);

  private _filters = new BehaviorSubject<AsistenciaSearchReq>({});
  filters$ = this._filters.asObservable();

  private _pageData = new BehaviorSubject<AsistenciaSearchResp | null>(null);
  pageData$ = this._pageData.asObservable();

  setFilters(f: AsistenciaSearchReq) {
    this._filters.next({ ...f });
  }

  /** Trae una página para la tabla/preview */
  async fetchPage(f: AsistenciaSearchReq) {
    const body: AsistenciaSearchReq = { page: 1, limit: 20, ...f };
    const resp = await firstValueFrom(
      this.http.post<ApiResp<AsistenciaSearchResp>>(
        `${environment.baseUrl}/asistencia/search`, body
      ).pipe(map(r => {
        if (!r.ok) throw new Error(r as any);
        return r.data;
      }))
    );
    this._pageData.next(resp);
  }

  async fetchAll(f: AsistenciaSearchReq): Promise<RegistroAsistencia[]> {
    const base: AsistenciaSearchReq = { ...f };
    // 1) primera página para saber total
    const first = await firstValueFrom(
      this.http.post<ApiResp<AsistenciaSearchResp>>(
        `${environment.baseUrl}/asistencia/search`,
        { ...base, page: 1, limit: 100 }
      ).pipe(map(r => {
        if (!r.ok) throw new Error(r as any);
        return r.data;
      }))
    );

    const items: RegistroAsistencia[] = [...first.items];
    const totalPages = Math.ceil(first.total / 100);

    for (let p = 2; p <= totalPages; p++) {
      const page = await firstValueFrom(
        this.http.post<ApiResp<AsistenciaSearchResp>>(
          `${environment.baseUrl}/asistencia/search`,
          { ...base, page: p, limit: 100 }
        ).pipe(map(r => {
          if (!r.ok) throw new Error(r as any);
          return r.data;
        }))
      );
      items.push(...page.items);
    }
    return items;
  }

  /** Exporta CSV de toda la data filtrada */
  async exportCsv(currentFilters: AsistenciaSearchReq) {
    const rows = await this.fetchAll(currentFilters);
    const headers = [
      'identificacion','genero','carrera','edad','fechaIngreso','fechaSalida'
    ];
    const csv = [
      headers.join(','),
      ...rows.map(r => [
        r.identificacion,
        r.genero,
        r.carrera,
        r.edad,
        new Date(r.fechaIngreso).toISOString(),
        r.fechaSalida ? new Date(r.fechaSalida).toISOString() : ''
      ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const now = new Date();
    const ymd = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
    a.download = `panel_${ymd}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ---------- Agregadores para gráficas ----------

  /** Pie: conteo por carrera */
  buildPieByCarrera(items: RegistroAsistencia[]) {
    const counts = new Map<string, number>();
    for (const r of items) counts.set(r.carrera, (counts.get(r.carrera) ?? 0) + 1);
    const labels = Array.from(counts.keys()).sort();
    const data = labels.map(l => counts.get(l) ?? 0);
    return {
      labels,
      datasets: [{ data }]
    };
  }

  /** Donut: afluencia por hora 0-23 (fechaIngreso) */
  buildDonutByHour(items: RegistroAsistencia[]) {
    const buckets = Array.from({ length: 24 }, () => 0);
    for (const r of items) {
      const h = new Date(r.fechaIngreso).getHours();
      buckets[h] += 1;
    }
    const labels = Array.from({ length: 24 }, (_v,i) => `${i}:00`);
    return {
      labels,
      datasets: [{ data: buckets }]
    };
  }

  /** Barras: últimos 6 meses H vs M (usa fechaIngreso) */
  buildBarsLast6Months(items: RegistroAsistencia[]) {
    const toKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const now = new Date();
    const keys: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      keys.push(toKey(d));
    }
    const hombres = keys.map(() => 0);
    const mujeres = keys.map(() => 0);

    for (const r of items) {
      const k = toKey(new Date(r.fechaIngreso));
      const idx = keys.indexOf(k);
      if (idx >= 0) {
        if (r.genero === 'Masculino') hombres[idx]++; else mujeres[idx]++;
      }
    }

    const monthLabel = (k: string) => {
      const [y, m] = k.split('-').map(Number);
      return new Date(y, m - 1, 1).toLocaleString('es', { month: 'long' });
    };

    return {
      labels: keys.map(monthLabel),
      datasets: [
        { label: 'Hombres', data: hombres },
        { label: 'Mujeres', data: mujeres }
      ]
    };
  }
}
