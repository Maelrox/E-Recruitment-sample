import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobModalComponent } from '../job-modal/job-modal.component';
import { MatTableModule } from '@angular/material/table';
import { JobService } from '../../services/job.service';
import { JobOffer } from '../../models/jobOffer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, FlexLayoutModule, DatePipe, CurrencyPipe],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobs: JobOffer[] = [];
  displayedColumns: string[] = ['id', 'name', 'occupationName', 'salary', 'remote', 'creationDate'];

  constructor(public dialog: MatDialog, private jobService: JobService) { }

  ngOnInit(): void {
    this.getJobList();
  }

  openJobModal(): void {
    //  job modal
    const dialogRef = this.dialog.open(JobModalComponent, {
      width: '1360px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getJobList();
      }
    });
  }

  getJobList() {
    this.jobService.getJobList().subscribe(
      {
        next: (v) => {
          this.jobs = v;
        },
        error: (e) => console.error(e),
        complete: () => console.log("test")
      }
    );
  }

}
