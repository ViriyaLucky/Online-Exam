import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import { HttpClientModule } from  '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NilaiUjianService} from './nilai-ujian.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ResultComponent,

  ],
  imports: [
    NgbModule,
  	HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard,NilaiUjianService],
  bootstrap: [AppComponent]
})
export class AppModule { }
