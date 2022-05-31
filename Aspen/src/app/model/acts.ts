import { fileInfo } from "./fileType";
import { butirFull } from "./permen";

export interface act {
    id: number;
    ButirId:number;
    butir: butirFull;
    butirVolume: number;
    actNote: string;
    userId:number;
    actDate:Date;
    isCalculated: boolean;
    calculatedDate: Date;
    createdAt: Date;
    updatedAt: Date;
    AssignLetterId: number;
    assignLetter: assignLetter;
}

export interface assignLetter {
    id: number;
    ltNumber: string;
    ltDate: Date;
    ltShare: boolean;
    ltDateStart: Date;
    ltDateEnd: Date;
    ltNote: string;
    ltActive: boolean;
    AssignFileId: number;
    assignFile: fileInfo;
}