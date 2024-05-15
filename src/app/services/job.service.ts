import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOffer } from '../models/jobOffer';
import { SPARQL_QUERY_GET_OCCUPATIONS } from '../models/sparqsql';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseApiUrl = 'http://140.82.29.226:8080/';

  constructor(private http: HttpClient) { }
  
  getJobList(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.baseApiUrl + "job-offer");
  }

  addJobOffer(jobOffer: any): Observable<JobOffer> {
    return this.http.post<any>(this.baseApiUrl + "job-offer", jobOffer);
  }


  getRdfOccupationsList(): Observable<any[]> {
    return this.http.post<any[]>(this.baseApiUrl + "query", SPARQL_QUERY_GET_OCCUPATIONS);
  }

  getRdfDataByQuery(query: string) {
    return this.http.post<any[]>(this.baseApiUrl + "query", query);
  }

}
