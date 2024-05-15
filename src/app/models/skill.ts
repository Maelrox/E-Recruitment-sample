import { Candidate } from "./occupation";

export interface Skill {
    id: number;
    skillName: string;
    candidate: Candidate;
}