import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ordenes } from './ordenes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  //Aqui poner el url el backend
  private urlBase = "http://localhost:8080/ordenes"
  constructor(private clienteHttp: HttpClient) { }
  guardarOrdenes(ordenes: Ordenes):Observable<Object>{
    return this.clienteHttp.post(this.urlBase, ordenes);
  }
  mostrarOrdenes(): Observable<Ordenes[]>{
    return this.clienteHttp.get<Ordenes[]>(this.urlBase);
  }
}