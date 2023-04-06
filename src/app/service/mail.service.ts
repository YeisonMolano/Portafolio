import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '../modells/mail';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private rutaGlobal = environment.rutaGlobal + '/email/'

  constructor(private http: HttpClient) { }

  sendMail(email: Mail){
    console.log(this.rutaGlobal);
    
    return this.http.post<Mail>(this.rutaGlobal + 'send', email,{
      observe: 'response'
    });
  }
}
