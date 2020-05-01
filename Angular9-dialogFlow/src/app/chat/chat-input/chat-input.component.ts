import {  Component, ElementRef, EventEmitter, Input,
  OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
  @Input() public buttonText = '↩︎';
  @Input() public disabled:boolean = false;

  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message') message: ElementRef;

  ngOnInit() {
    this.focus.subscribe(() => this.focusMessage())
  }

  public focusMessage() {
    this.message.nativeElement.focus()
  }

  public getMessage() {
    return this.message.nativeElement.value
  }

  public clearMessage() {
    this.message.nativeElement.value = ''
  }

  onSubmit() {
    const message = this.getMessage();
    if (message.trim() === '') {
      return
    }
    this.send.emit({ message });
    this.clearMessage();
    this.focusMessage()
  }

}
