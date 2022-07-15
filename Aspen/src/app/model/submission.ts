import { act, assignLetter } from "./acts";

export interface submission {
    id: number;
    OwnerId: number;
    subName: string;
    subDate: Date;
    dateApproved: Date;
    subScore:number;
    subNote: string;
    assignLetters: [assignLetter];
    acts : [act];
    isSubmitted: boolean;
    subScoreApproved: number;
}
export interface contract {
    id: number;
    contractName: string;
    contractDate: Date;
    contractYear: number;
    contractValue: number;
    contractNote: string;
    isActive: boolean;
    userid: number;
}