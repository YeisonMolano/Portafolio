import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '../modells/mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private rutaGlobal = 'http://localhost:8080/email/'

  constructor(private http: HttpClient) { }

  sendMail(email: Mail){
    return this.http.post<Mail>(this.rutaGlobal + 'send', email,{
      observe: 'response'
    });
  }
}
