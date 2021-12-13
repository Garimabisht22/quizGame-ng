import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

public name:string = 'Username';
public questionList: any = [];
public currentQuestion : number = 0;
public points : number = 0;
counter = 60;
correctAnswers : number = 0;
incorrectAnswers : number = 0;
interval$ : any;
progress:string = '0';
isQuizCompleted:boolean = false;
  constructor(private questionService : QuestionService) {

   }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();

  }
  getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res=>{
      this.questionList = res.questions;
    })
  }
  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
this.currentQuestion--;
  }
  answer(currentQno : number , option  : any){
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option.correct){
      this.points+=10;
      this.correctAnswers++;
    }
    else{
      this.points-=10;
      this.incorrectAnswers++;

    }
    setTimeout(()=>{
      this.currentQuestion++;
      this.getProgressPercentage();
    },1000)
   

  }
startCounter(){
  this.interval$ = interval(1000)
.subscribe(val=>{
  this.counter--;
  if(this.counter==0){
    this.currentQuestion++;
    this.incorrectAnswers++;
    this.counter=60;
    this.points-=10;
  }
});
setTimeout(()=>{ this.interval$.unsubscribe()},600000)
}

stopCounter(){
this.interval$.unsubscribe();
this.counter=0;
}
resetCounter(){
  this.stopCounter();
this.startCounter();
}

resetQuiz(){
  this.resetCounter();
  this.progress='0';
  this.getAllQuestions();
  this.currentQuestion=0;
this.points=0;
this.counter=60;
this.incorrectAnswers=0;
this.correctAnswers=0;
}

getProgressPercentage(){
  this.progress = (((this.currentQuestion)/this.questionList.length)*100 ).toString();
return this.progress;
}
}
