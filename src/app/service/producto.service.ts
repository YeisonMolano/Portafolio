import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../modells/Producto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  rutaGlobal = environment.rutaGlobal + '/producto/'

  constructor(private http: HttpClient) {}

  getAll(){
    console.log(this.rutaGlobal + 'all');
    return this.http.get<Producto[]>(this.rutaGlobal + 'all')
  }

  newProducto(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(this.rutaGlobal + 'new', producto);
  }

  findById(idProducto: number){
    this.http.get<Producto>(this.rutaGlobal + idProducto);
  }

  update(producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(this.rutaGlobal + producto.idPropucto, producto);
  }

  deleteById(idProducto: number){
    return this.http.post(this.rutaGlobal + idProducto, null);
  }
}
