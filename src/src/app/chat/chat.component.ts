import { makeBindingParser } from '@angular/compiler';
import { Component, ComponentRef, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef, ɵisObservable } from '@angular/core';
import { UntypedFormControl, FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ChatTagComponent } from '../chat-tag/chat-tag.component';
import { TypeChatEnum } from '../model/enum/TypeChatEnum';
import { MessageModel } from '../model/MessageModel';
import { PathParser } from '../model/parser/PathParser';
import { ChatTagService } from '../services/chatTagService';
import { HttpClient } from '@angular/common/http';
import { PathTree } from '../model/parser/PathTree';
import { OptionMessageModel } from '../model/OptionMessageModel';
import { Observable } from 'rxjs';
import { faComment, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { throws } from 'assert';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  faIconClose = faWindowClose;
  faIconComments = faComment;

  @ViewChild('idOption') idOption! :ElementRef;
  @ViewChild('textOption') textOption! :ElementRef;


  @ViewChild('chatOn') chatOn! : ElementRef;
  @ViewChild('closeIcon') closeIcon! : ElementRef;
  @ViewChild('Layout') Layout! : ElementRef;

  @ViewChild('chatContainer', { read: ViewContainerRef, static: true })


 
  private chatViewContainer!: ViewContainerRef;
  public componentRefs: ComponentRef<ChatTagComponent>[] = []

  private service! : ChatTagService;

  messages: MessageModel[] = [];
  msgControl = new UntypedFormControl();
  destroyed$ = new Subject();

  path! : PathParser;


  input = new Subject<OptionMessageModel>();
  
  option! : OptionMessageModel;
  
  

  constructor(private http: HttpClient) {

  }

  ngAfterViewInit(): void {


    let toggleElement = (ev: Event) => {
      this.toggle(this.Layout.nativeElement);
      this.toggle(this.chatOn.nativeElement);
    }

    this.chatOn.nativeElement.onclick = toggleElement;
    this.closeIcon.nativeElement.onclick = toggleElement;
  }


  changed(){
    alert("mudei");
  }

  ngOnInit(): void {
    this.service = new ChatTagService(this.chatViewContainer);

    this.input.subscribe(value => {
       
      let model = new MessageModel;

      model.messages = [value.text];
      model.options = [];

      this.service.buildComponent(TypeChatEnum.Person,model);

      this.createMessage(value.idPath);
      

    });


    this.http.get('/assets/pathtree.json').subscribe(data => {
      this.mountMessages(data);
    });

  }

  toggle(element : any){
    if(element.style.display == '')
      element.style.display = 'block';
    else if (element.style.display == 'none')
      element.style.display = 'block';
    else
      element.style.display = 'none';
  }



  mountMessages(data: any){
    this.path = <PathParser>data;
    this.createMessage(1);
  }



  createMessage(id : Number){
    let tree = <PathTree>this.path.content.find(e => e.id == id);

    let model = new MessageModel;

    model.messages = tree.messages;
    model.options = [];

    tree.options.forEach(e => {
      let op = new OptionMessageModel();
      op.text = e.optionText;
      op.onClick = this.sendMessage;
      op.idPath = e.pathId;

      model.options.push(op);

    });

    this.service.buildComponent(TypeChatEnum.Bot,model);
  }



  sendMessage(option : OptionMessageModel): void {

    let idPath = <HTMLInputElement>document.getElementById('idOption');
    idPath.value = option.idPath.toString();

    let txtMessage = <HTMLInputElement>document.getElementById('textOption');
    txtMessage.value = option.text;

    idPath.click();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(0);
  }

  buildFromMessageWebSocket(messages : MessageModel[]){
      // messages.forEach(m => {
      //   var person = m.username == this.chatService.uuidApplication ? TypeChatEnum.Person : TypeChatEnum.Bot;
      //   this.service.buildComponent(person,m.messages);
      // });
  }


  onChangedValue(){


    let MessageModel = new OptionMessageModel();
    MessageModel.idPath = this.idOption.nativeElement.value;
    MessageModel.text = this.textOption.nativeElement.value;


    this.input.next(MessageModel);
  }

}


