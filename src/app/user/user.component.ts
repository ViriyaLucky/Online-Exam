import {timer, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../core/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormControl, FormGroup} from '@angular/forms';
import {PaginationService} from '../pagination.service';
import {NilaiUjianService} from '../nilai-ujian.service';

@Component({
  selector: 'page-soal',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})

export class UserComponent implements OnInit {
  data: Array<any>;
  page = 10;
  public items: Observable<any[]>;
  user: FirebaseUserModel = new FirebaseUserModel();
  soals: string[] = [];
  jawab1: string[] = [];
  jawab2: string[] = [];
  jawab3: string[] = [];
  jawab4: string[] = [];
  jawaban: string[] = [];
  timeLeft: number = 900;
  menit:number=0;
  interval;
	temp : string[] = [];

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  profileForm = new FormGroup({
    0: new FormControl(''),
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl(''),
    4: new FormControl(''),
    5: new FormControl(''),
    6: new FormControl(''),
    7: new FormControl(''),
    8: new FormControl(''),
    9: new FormControl(''),
    10: new FormControl(''),
    11: new FormControl(''),
    12: new FormControl(''),
    13: new FormControl(''),
    14: new FormControl(''),
  });



  constructor(public nilaiService:NilaiUjianService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private db: AngularFirestore,
    private pagerService: PaginationService,) {
    this.items = db.collection('/soal').valueChanges();

	//dapetin data
    for (let i = 1; i < 16; i++) {
      var cityRef = db.collection('/soal').doc(i.toString());
      var getDoc = cityRef.get().toPromise()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            if(i == 15){
              this.soals.push(doc.data().soal);
              this.jawab1.push(doc.data().jawab1);
              this.jawab2.push(doc.data().jawab2);
              this.jawab3.push(doc.data().jawab3);
              this.jawab4.push(doc.data().jawab4);
              this.jawaban.push(doc.data().jawaban);
              let max = 13;
              let min = 0;
            for(let i = 0; i < 10 ; i++){
                 let rand =  Math.floor(Math.random() * (max - min + 1)) + min;
                 let rand2 =  Math.floor(Math.random() * (max - min + 1)) + min;

               this.temp[0]= this.soals[rand];
               this.soals[rand]= this.soals[rand2];
               this.soals[rand2] = this.temp[0];


               this.temp[0] = this.jawab1[rand];
               this.jawab1[rand] = this.jawab1[rand2];
               this.jawab1[rand2] = this.temp[0];

               this.temp[0] = this.jawab2[rand];
               this.jawab2[rand] = this.jawab2[rand2];
               this.jawab2[rand2] = this.temp[0];

              this.temp[0] = this.jawab3[rand];
              this.jawab3[rand] = this.jawab3[rand2];
              this.jawab3[rand2] = this.temp[0];

             this.temp[0] = this.jawab4[rand];
             this.jawab4[rand] = this.jawab4[rand2];
             this.jawab4[rand2] = this.temp[0];

             this.temp[0] = this.jawaban[rand];
             this.jawaban[rand] = this.jawaban[rand2];
             this.jawaban[rand2] = this.temp[0];
            }
            console.log("soal 1" + this.soals[0]);

            }
            else{
            this.soals.push(doc.data().soal);
            this.jawab1.push(doc.data().jawab1);
            this.jawab2.push(doc.data().jawab2);
            this.jawab3.push(doc.data().jawab3);
            this.jawab4.push(doc.data().jawab4);
			      this.jawaban.push(doc.data().jawaban);
            console.log(this.jawaban[i-1]);
            }
          }
          this.setPage(1);

        })
        .catch(err => {
          console.log('Error getting document', err);
          this.router.navigate(['/soal']);
        });
    }


  }



  // ini tolong di bikin random generator, di swap sebanyak 10 kali pake for

  ngOnInit() {

    //optional
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.menit = Math.floor(this.timeLeft/60);
      } else {
        this.timeLeft = 900;
        this.onSubmit();
      }
    },1000)


  }

  randoms(){

  }
  sendMessage(data:Array<any>): void {
    // send message to subscribers via observable subject
    this.nilaiService.sendMessage(data, this.jawaban, this.soals, this.jawab1, this.jawab2, this.jawab3, this.jawab4);
  }

  clearMessage(): void {
    // clear message
    this.nilaiService.clearMessage();
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(15, page);

    // get current page of items
    this.pagedItems = this.soals.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  onSubmit() {
  // TODO: Use EventEmitter with form value
  this.data = this.profileForm.value;
  this.sendMessage(this.data);
  this.timeLeft = 0;
  this.router.navigate(['/result']);
}

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }
}
