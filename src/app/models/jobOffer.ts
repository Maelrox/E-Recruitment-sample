export interface JobOffer {
    id?: number;
    name: string;
    occupationName: string;
    salary: number;
    remote?: boolean;
    creationDate?: Date;
  }