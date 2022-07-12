import { fileInfo } from "./fileType";
import { butirFull } from "./permen";

export interface act {
    id: number;
    butirId:number;
    Butir: butirFull;
    butirVolume: number;
    actMain: boolean;
    actNote: string;
    userId:number;
    actDate:Date;
    isCalculated: boolean;
    calculatedDate: Date;
    isProposed: boolean;
    proposeDate:Date;
    createdAt: Date;
    updatedAt: Date;
    AssignLetterId: number;
    hasFile: boolean;
}

export interface assignLetter {
    id: number;
    ltNumber: string;
    ltDate: Date;
    ltDateStart: Date;
    ltDateEnd: Date;
    ltNote: string;
    ltActive: boolean;
    AssignFileId: number;
    assignFile: fileInfo;
    hasFile: boolean;
}