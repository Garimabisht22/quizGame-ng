import { QuestionsComponent } from './questions/questions.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"welcome",pathMatch:"full"},
 {path:"welcome", component:WelcomeComponent},
 {path:"questions",component: QuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
