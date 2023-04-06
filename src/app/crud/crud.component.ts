import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { Producto } from '../modells/Producto';
import { ProductoService } from '../service/producto.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit{
  productos : Array<Producto>
  formProducto: FormGroup
  activeForm: boolean
  crear: boolean
  id: number

  constructor(private pService: ProductoService, private fb: FormBuilder, private message: MessageService){
    this.productos = new Array<Producto>()
    this.activeForm = false
    this.crear = false
    this.id = 0
    this.formProducto = fb.group({
      nombreProducto : new FormControl('', [Validators.required]),
      precio : new FormControl('', [Validators.required]),
      stock : new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    Aos.init()
    this.getAllAutobuses()
  }

  getAllAutobuses(){
    this.pService.getAll().subscribe(res =>{
      this.productos = res
    },
    err=>{
      console.log('Ha habido un error en el servidor' + err);
    })
  }

  newProducto(){
    if(this.formProducto.valid){
      let nuevoProducto = new Producto()
      nuevoProducto.nombreProducto = this.formProducto.get('nombreProducto')?.value
      nuevoProducto.precio = this.formProducto.get('precio')?.value
      nuevoProducto.stock = this.formProducto.get('stock')?.value
      this.pService.newProducto(nuevoProducto).subscribe(res =>{
        this.formProducto.reset()
        this.active()
        this.message.add({ severity: 'success', summary: 'Completado', detail: 'Se ha creado un nuevo producto' });
        this.getAllAutobuses()
      },
      err =>{
        console.log('Ha habido un error en el servidor');
      })
    }else{
      this.message.add({ severity: 'warn', summary: 'Datos invalidos', detail: 'Por favor ingrese todos los campos' });
    }
  }

  cargarUpdate(producto: Producto){
    this.id = producto.idPropucto!
    console.log(producto);
    this.formProducto.get('nombreProducto')?.setValue(producto.nombreProducto)
    this.formProducto.get('precio')?.setValue(producto.precio)
    this.formProducto.get('stock')?.setValue(producto.stock)
    this.active()
  }

  update(){
    if(this.formProducto.value){
      let nuevoProducto = new Producto()
      nuevoProducto.idPropucto = this.id
      nuevoProducto.nombreProducto = this.formProducto.get('nombreProducto')?.value
      nuevoProducto.precio = this.formProducto.get('precio')?.value
      nuevoProducto.stock = this.formProducto.get('stock')?.value
      this.pService.update(nuevoProducto).subscribe(res =>{
        this.active()
        this.formProducto.reset()
        this.getAllAutobuses()
      },
      err =>{
        console.log('Ha habido un error en el servidor');
      })
    }
  }

  active(){
    this.activeForm = !this.activeForm
  }
  
  eliminar(idProducto: number){
    this.pService.deleteById(idProducto).subscribe(res => {
      this.getAllAutobuses()
    },
    err =>{
      console.log('Ha habido un error en el servidor');
    })
  }
}
