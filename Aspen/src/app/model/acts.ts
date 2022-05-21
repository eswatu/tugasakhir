import { butirFull } from "./permen";

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

export interface assignLetter {
    id: number;
    ltNumber: string;
    ltDate: Date;
    ltShare: boolean;
    ltDateStart: Date;
    ltDateEnd: Date;
    ltNote: string;
}