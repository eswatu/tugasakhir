import { NumberValueAccessor } from "@angular/forms";

export interface user { 
    id: number;
    username:string;
    name: string;
    role: string;
    level: string;
    password: string;
    avatar: avatar;
}

export interface avatar {
    id: number;
    name: string;
    type: string;
    data: Blob;
}