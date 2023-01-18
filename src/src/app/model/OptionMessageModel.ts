import { MessageModel } from "./MessageModel";

export class OptionMessageModel {
    text!: string;
    onClick!: (op : this) => void;
    idPath!: number;
}