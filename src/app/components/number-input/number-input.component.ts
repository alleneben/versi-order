import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [CurrencyPipe]
})
export class NumberInputComponent implements OnInit {
  private static BACKSPACE_KEY = 'Backspace'
  private static BACKSPACE_INPUT_TYPE = 'deleteContentBackward';

  @ViewChild('amtn', {static: false}) private amtn: IonInput;
  @Input() precision: number;
  @Input() amount: string;
  @Output() amountEntered = new EventEmitter<number>()
  @Output() focus = new EventEmitter<boolean>()

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    if(this.amount && this.amount.trim() !== '') this.amountEntered.emit(+this.amount);
  }

  handleKeyUp(event: KeyboardEvent){
    if(event.key === NumberInputComponent.BACKSPACE_KEY) this.delDigit();
  }

  handleInput(event: CustomEvent) {
    this.clear()

    if(event.detail.data && !isNaN(event.detail.data)){
      this.addDigit(event.detail.data);
    } else if(event.detail.inputType === NumberInputComponent.BACKSPACE_INPUT_TYPE){
      this.delDigit()
    }
  }

  private addDigit(key: string){
    this.amount = this.amount + key;
    this.amountEntered.emit(+this.amount);
  }

  private delDigit(){
    this.amount = this.amount.substring(0, this.amount.length - 1);
    this.amountEntered.emit(+this.amount)
  }

  private clear(){
    this.amtn.value = '';

    this.amtn.getInputElement().then((native: HTMLInputElement) => {
      native.value = ''
    })
  }

  get formattedAmount(): string {
    return this.currencyPipe.transform(+this.amount / Math.pow(10, this.precision),'GHC ')
  }

  openInput(){
    this.amtn.setFocus()
    this.focus.emit(false)
  }
  blur(){
    this.focus.emit(true)
  }

}
