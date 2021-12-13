import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
@Input() isCorrect: boolean = false;
  constructor(private ref:ElementRef, private render: Renderer2) {
   }
   @HostListener('click') 
   answer(){
     if(this.isCorrect){
       this.render.setStyle(this.ref.nativeElement, 'background','green');
       this.render.setStyle(this.ref.nativeElement, 'color','white');
       this.render.setStyle(this.ref.nativeElement, 'border','2px solid grey');

     }
     else{
       this.render.setStyle(this.ref.nativeElement, 'background','red');
       this.render.setStyle(this.ref.nativeElement, 'color','white');
       this.render.setStyle(this.ref.nativeElement, 'border','2px solid grey');
     }
   }
}
