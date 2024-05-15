import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JobListComponent } from './components/job-list/job-list.component';

export const routes: Routes = [
      {
        path: '', title: 'Home Page', component: HomeComponent,
      },
      {
        path: 'job-list', title: 'Jobs List', component: JobListComponent,
      },
];