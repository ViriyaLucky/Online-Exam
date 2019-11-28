import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';
import { AuthService } from '../core/auth.service';
import { Location, getLocaleDateFormat } from '@angular/common';

import { NilaiUjianService } from '../nilai-ujian.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnDestroy, OnInit {
    message: any;
    data: Array<any>;
    jawaban: Array<any>;
    subscription: Subscription;
    user: FirebaseUserModel = new FirebaseUserModel();
    hasil:string[]=[];
    soals: string[] = [];
    jawab1: string[] = [];
    jawab2: string[] = [];
    jawab3: string[] = [];
    jawab4: string[] = [];
    score : number = 0;
    constructor(private nilaiService: NilaiUjianService,    private route: ActivatedRoute,
                public authService: AuthService,    private location: Location  ) {
                  this.getData();
        // subscribe to home component messages



    }
    getData(){
      this.data = this.nilaiService.getMessage();
        this.jawaban = this.nilaiService.getMessage2();
        this.soals = this.nilaiService.getMessage3();
        this.jawab1 = this.nilaiService.getMessage4();
        this.jawab2 = this.nilaiService.getMessage5();
        this.jawab3 = this.nilaiService.getMessage6();
        this.jawab4 = this.nilaiService.getMessage7();
        console.warn(this.data);
        this.cekJawaban();
    }
    ngOnInit() {

      //optional
      this.route.data.subscribe(routeData => {
        let data = routeData['data'];
        if (data) {
          this.user = data;
        }
      });
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.nilaiService.clearMessage();
    }

    cekJawaban(){
      for(let i = 0; i<15; i++){
       // console.warn("this.data" + this.data[i]);
//console.warn("this.jawaban" + this.jawaban[i]);

        if (this.data[i] == this.jawaban[i]){
          this.hasil[i] = this.data[i] + ' ' + '('+ this.jawaban[i] + ')';
          this.score = this.score + 6.666;
        }
        else{
          this.hasil[i] = '('+ this.jawaban[i] + ')';
          }
        }
        console.log("Hasil ke " + " " + this.hasil[0]);

    }
    logout() {
      this.authService.doLogout()
        .then((res) => {
          this.location.back();
        }, (error) => {
          console.log('Logout error', error);
        });
    }
}
