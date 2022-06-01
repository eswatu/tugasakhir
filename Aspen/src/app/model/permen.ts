export interface aktivita { 
    id: number;
    kodeAkt: string;
    namaAkt: string;
}

export interface subUnsur { 
    id: number;
    kodeUnsur: number;
    namaUnsur: string;
    kodeSub: string;
    namaSubUnsur: string;
}


export interface butirFull { 
    id: number;
    namaButir: string;
    tkButir: string;
    hasilKerja: string;
    jmlPoin: string;
    levelReq: number;
    SubUnsur: subUnsur;
    Aktivita: aktivita;
}

export interface treeNode {
    name: string;
    children?: treeNode[];
    id?: number;
}


