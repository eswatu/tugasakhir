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