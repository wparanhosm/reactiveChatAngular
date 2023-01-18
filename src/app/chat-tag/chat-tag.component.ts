import { Component, EventEmitter,Input,Output,OnInit, ViewEncapsulation } from '@angular/core';
import { MessageModel } from '../model/MessageModel';
import { OptionMessageModel } from '../model/OptionMessageModel';

@Component({
  selector: 'app-chat-tag',
  templateUrl: './chat-tag.component.html',
  styleUrls: ['./chat-tag.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ChatTagComponent implements OnInit {

  @Input() label: string | undefined;
  @Input() labels!: any[];

  @Input() type!: string;

  @Input() options!: OptionMessageModel[];

  botMessage: boolean | undefined;

  constructor() {}

  ngOnInit(): void {
    this.botMessage = this.type == "bot";
  }

  callMethod(identifier : number){

    if(this.options != undefined){
      var callback = this.options[identifier].onClick;



      this.options.forEach(e => {
        e.onClick = (m) => {};
      });


      callback(this.options[identifier]);
    }

  }

}
