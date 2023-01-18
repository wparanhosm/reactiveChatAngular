import { ComponentRef, ViewContainerRef } from "@angular/core";
import { ChatTagComponent } from "../chat-tag/chat-tag.component";
import { TypeChatEnum } from "../model/enum/TypeChatEnum";
import { MessageModel } from "../model/MessageModel";
import { OptionMessageModel } from "../model/OptionMessageModel";

export class ChatTagService {


    private componentRef! :ComponentRef<ChatTagComponent>;


    constructor(private chatViewContainer: ViewContainerRef){
    }


    buildComponent(type : TypeChatEnum, model : MessageModel): ComponentRef<ChatTagComponent>{
        
        const componentRef = this.chatViewContainer.createComponent(ChatTagComponent);

        if(model != undefined){
            componentRef.instance.options = model.options;
            
            if(typeof(model.messages) == "string"){
                componentRef.instance.label = model.messages;
            } else {
                componentRef.instance.labels = model.messages;
            }
            componentRef.instance.type = type.toString();
        }

        return componentRef;
    }   





    

    
}
