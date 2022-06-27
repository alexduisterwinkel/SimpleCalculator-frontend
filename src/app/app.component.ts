import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Calculation } from './calculation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple calculator';

  calculation: Calculation = new Calculation();
  calculationList: Calculation[] = [];
  constructor( private api: ApiService) { }

  input:string = '';
  result:string = '';


  pressNum(num: string) {
    //Check for double dots
    if (num==".") {
      if (this.input !="" && !this.input.includes(this.calculation.divider.toString())) {
        if (this.input.lastIndexOf(".") >= 0) return;
      }
    }
    this.input = this.input + num;
    console.log('input value num = ' + this.input);
  }

  pressOperator(op: string) {
    //Check for double operators
    const lastKey = this.input[this.input.length-1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
    this.input = this.input + op;
    console.log('input value =' + this.input.substr(0, this.input.length))
    this.calculation.value1 = this.input.substr(0, this.input.length-1)
    this.calculation.divider = op
    console.log('input value op =' + this.input);
  }

  del() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }

  clear() {
    this.result = '';
    this.input = '';
  }

  getAnswer() {
    let formula = this.input
    this.calculation.value2 = formula.substr(formula.indexOf(this.calculation.divider.toString()), formula.length);
    console.log('values to send: ' + this.calculation.value1 +' ' + this.calculation.divider.toString() + ' ' + this.calculation.value2)
    this.api.calculate(this.calculation)
      .subscribe((res:any) => {
       this.calculation.result = res.result.toString();
       this.result = this.calculation.result;
       console.log("Result=" + this.calculation.result);
    }, (err: any) => {
      console.log(err);
    });
  }

  getHistory() {
    this.api.getHistory()
      .subscribe((res:any) => {
      console.log(res)
       this.calculationList = res;
       console.log("List=" + this.calculation.result);
    }, (err: any) => {
      console.log(err);
    });
  }
}
