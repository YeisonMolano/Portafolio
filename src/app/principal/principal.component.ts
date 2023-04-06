import { Component, OnInit } from '@angular/core';
import { Skill } from '../modells/skill';
import * as AOS from 'aos';
import { MailService } from '../service/mail.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mail } from '../modells/mail';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  front : Array<Skill>
  back : Array<Skill>
  name : string
  formContactMe: FormGroup

  constructor(private mService: MailService, private fb : FormBuilder, private message: MessageService) {
    this.front = new Array<Skill>()
    this.back = new Array<Skill>()
    this.name = ''
    this.formContactMe = fb.group({
      tema: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl(''),
      contacto: new FormControl
    })
   }

  ngOnInit(): void {
    AOS.init()
    window.addEventListener('load', AOS.refresh)
    this.front.push(
      {nombreSkil:"Angular",tipo : "FrontEnd",experiencia: 1, logo: "./assets/imagenes/Angular_logo.png"},
      {nombreSkil:"HTML",tipo : "FrontEnd",experiencia: 1, logo: "./assets/imagenes/HTML_logo.png"},
      {nombreSkil:"CSS",tipo : "FrontEnd",experiencia: 1, logo: "./assets/imagenes/CSS_logo.png"},
      {nombreSkil:"Wordpress",tipo : "FrontEnd",experiencia: 0, logo: "./assets/imagenes/word.png"}
      )
    this.back.push(
      {nombreSkil:"Java",tipo : "Backend",experiencia: 2, logo: "./assets/imagenes/Java_logo.png"},
      {nombreSkil:"SpringBoot",tipo : "Backend",experiencia: 1, logo: "./assets/imagenes/SpringBoot_logo.png"},
      {nombreSkil:"MySql",tipo : "Backend",experiencia: 1, logo: "./assets/imagenes/Mysql_logo.png"}
    )
  }

  sendMail(){
    if(this.formContactMe.valid){
      let mail = new Mail()
      mail.from = ''
      mail.to = ''
      mail.subject = this.formContactMe.get('tema')?.value 
      mail.body = this.formContactMe.get('mensaje')?.value + '\nSoy ' + this.formContactMe.get('nombre')?.value + ' ' + this.formContactMe.get('apellido')?.value + '\nMi contacto es: ' + this.formContactMe.get('contacto')
      this.mService.sendMail(mail).subscribe(res =>{
        console.log('Se ha enviado el mensaje');
        this.formContactMe.reset()
      })
      
    }else{
      this.message.add({ severity: 'warn', summary: 'Datos invalidos', detail: 'Por favor digite ingrese al menos los datos que estas referenciados con *' });
    }
  }
}
