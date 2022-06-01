import { fileInfo } from "./fileType";
import { butirFull } from "./permen";

export interface act {
    id: number;
    butirId:number;
    butir: butirFull;
    butirVolume: number;
    actMain:boolean;
    actNote: string;
    userId:number;
    actDate:Date;
    isCalculated: boolean;
    calculatedDate: Date;
    proposeDate:Date;
    createdAt: Date;
    updatedAt: Date;
    AssignLetterId: number;
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