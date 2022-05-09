import { butirFull } from "./permen";
import { user } from "./user";

export interface act {
    id: number;
    butirId:number;
    butir: butirFull;
    butirVolume: number;
    actNote: string;
    userId:number;
    actDate:Date;
    isCalculated: boolean;
    calculatedDate: Date;
    createdAt: Date;
    updatedAt: Date;
}