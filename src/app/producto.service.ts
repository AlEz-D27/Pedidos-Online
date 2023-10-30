import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //private urlBase = 'http://localhost:8080/media/producto';
  constructor(
    private http: HttpClient
  ) { }
  public upleadFile(formData: FormData ): Observable<any>{
    console.log("Me ejecute en upleadfile");
    return this.http.post("http://localhost:8080/media/producto", formData);
  }
  public mostrarProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>("http://localhost:8080/media/producto");
  }
}
