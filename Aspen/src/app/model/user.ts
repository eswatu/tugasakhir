
export interface User { 
    id: number;
    username:string;
    name: string;
    role: string;
    level: string;
    password: string;
    AvatarId: number;
    token?: string;
}

export interface avatar {
    id: number;
    name: string;
    type: string;
    data: filetype;
}

export interface filetype {
    typename: string;
    data: string;
    height: number;
    width: number;
}

export interface chpwd {
    id: number;
    oldpwd: string;
    newpwd: string;
}
