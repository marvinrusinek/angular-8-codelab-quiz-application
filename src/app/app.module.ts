import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './containers/question/question.component';
import * as QuestionComponent2 from './components/question/question.component';
import { ResultsComponent } from './containers/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionComponent2.QuestionComponent,
    ResultsComponent
  ],
  entryComponents: [QuestionComponent],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    NgbModule
    ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
