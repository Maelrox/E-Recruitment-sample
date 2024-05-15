import { Qualification } from './qualification';
import { Skill } from './skill';

export interface Candidate {
    id: number;
    name: string;
    qualifications: Qualification[];
    skills: Skill[];
}