import { User } from "./user";

export interface aktivitas { 
    id: number;
    kodeAkt: string;
    namaAkt: string;
}

export interface subUnsur { 
    id: number;
    kodeSub: string;
    namaSubUnsur: string;
}


export interface butir { 
    id: number;
    namaButir: string;
    tkButir: string;
    hasilKerja: string;
    jmlPoin: number;
    levelReq: number;
    subUnsur: subUnsur;
    aktivitas: aktivitas;
}

