import { Candidate } from "./occupation";

export interface Qualification {
    id: number;
    qualificationName: string;
    candidate: Candidate;
}