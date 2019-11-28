import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class NilaiUjianService {
  myMethod$: Observable<any>;
  data: Array<any>;
  jawaban: Array<any>;
  soals: string[] = [];
  jawab1: string[] = [];
  jawab2: string[] = [];
  jawab3: string[] = [];
  jawab4: string[] = [];
  sendMessage(message: any, message2:any, message3:any, message4:any, message5:any, message6:any, message7:any) {
    this.data = message;
    this.jawaban = message2;
    this.soals = message3;
    this.jawab1 = message4;
    this.jawab2 = message5;
    this.jawab3 = message6;
    this.jawab4 = message7;
  }

  clearMessage() {
    this.data = [];
  }

  getMessage(): Array<any> {
    return this.data;
  }
  getMessage2(): Array<any> {
    return this.jawaban;
  }
  getMessage3(): Array<any> {
    return this.soals;
  }
  getMessage4(): Array<any> {
    return this.jawab1;
  }
  getMessage5(): Array<any> {
    return this.jawab2;
  }
  getMessage6(): Array<any> {
    return this.jawab3;
  }
  getMessage7(): Array<any> {
    return this.jawab4;
  }
}
