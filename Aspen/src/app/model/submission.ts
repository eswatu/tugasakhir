import { act, assignLetter } from "./acts";

export interface submission {
    id: number;
    subName: string;
    subDate: Date;
    dateApproved: Date;
    subScore:number;
    subNote: string;
    assignLetters: [assignLetter];
    acts : [act];
}