import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JobService } from '../../services/job.service';
import { JobOffer } from '../../models/jobOffer';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MessageService } from '../../services/message.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'

import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { SPARQL_QUERY_GET_ESSENTIAL_QUALIFICATIONS_BY_OCCUPATION, SPARQL_QUERY_GET_ESSENTIAL_SKILLS_BY_OCCUPATION, SPARQL_QUERY_GET_ISCED_BY_OCCUPATION, SPARQL_QUERY_GET_NON_ESSENTIAL_QUALIFICATIONS_BY_OCCUPATION, SPARQL_QUERY_GET_NON_ESSENTIAL_SKILLS_BY_OCCUPATION, SPARQL_QUERY_GET_OCCUPATION_BY_ALTERNATIVE_LABEL, SPARQL_QUERY_GET_RELATED_OCCUPATIONS_BY_SKILL, SPARQL_QUERY_GET_RELATED_SKILLS_BY_SKILL, SPARQL_QUERY_GET_WORK_CONTEXT_BY_OCCUPATION } from '../../models/sparqsql';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-job-modal',
  standalone: true,
  imports: [FlexLayoutModule, MatDialogModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatOptionModule, CommonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './job-modal.component.html',
  styleUrl: './job-modal.component.scss'
})
export class JobModalComponent implements OnInit {

  public jobOffer: JobOffer = { id: undefined, occupationName: '', salary: 0, remote: false, name: "" };

  public escoOptions : any[] = [];
  public skills : any[] = [];
  public associatedSkills: any[] = [];
  public qualifications: any[] = [];
  public associatedQualifications: any[] = [];
  public workContexts: any[] = [];
  public iscedLevels: any[] = [];
  public relatedSkills : any [] = [];
  public relatedOccupations : any = [];
  public foundOccupation : any;
  public foundOccupationLabel : string = "";

  essentialSkillTags: string[] = [];
  educationTags: string[] = [];
  optionalSkillTags: string[] = [];

  private colors: string[] = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6', '#4fc3f7', '#4dd0e1'];

  constructor(
    private dialogRef: MatDialogRef<JobModalComponent>,
    private jobService: JobService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getOccupations();
  }

  getOccupations() {
    this.jobService.getRdfOccupationsList().subscribe({
      next: (v: any) => {
        this.escoOptions = v.map((item: any) => {
          return {
            value: item.occupation.split('#')[1],
            viewValue: item.occupation.split('#')[1].replace(/_/g, ' ')
          };
        });
      },
      error: (e: any) => this.handleError(e),
      complete: () => console.log("done")
    })
  }

  getEssentialSkillsByOccupation(event: any) {

    this.foundOccupationLabel = (event.value ?? event.name).replace(/_/g, ' ');
    const query = SPARQL_QUERY_GET_ESSENTIAL_SKILLS_BY_OCCUPATION.replaceAll("{{occupation}}", event.value ?? event.name);
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        this.skills = v.map((item: any) => {
          return {
            name: item.skill.split('#')[1].replace(/_/g, ' ')
          };
        });
      },
      error: (e: any) => this.handleError(e),
      complete: () => {
          this.getOptionalSkillsByOccupation(event.value ?? event.name);
        },
    })
  }

  getOptionalSkillsByOccupation(occupation: string) {
    const query = SPARQL_QUERY_GET_NON_ESSENTIAL_SKILLS_BY_OCCUPATION.replaceAll("{{occupation}}", occupation)
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        this.associatedSkills = v.map((item: any) => {
          return {
            name: item.optionalSkill.split('#')[1].replace(/_/g, ' ')
          };
        });
      },
      error: (e: any) => this.handleError(e),
      complete: () => {
        console.log(this.associatedSkills);
        this.getEssentialQualificationsByOccupation(occupation);
      }
    })
  }

  getEssentialQualificationsByOccupation(occupation: string) {
    const query = SPARQL_QUERY_GET_ESSENTIAL_QUALIFICATIONS_BY_OCCUPATION.replaceAll("{{occupation}}", occupation)
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        this.qualifications = v.map((item: any) => {
          return {
            name: item.requiresQualification.split('#')[1].replace(/_/g, ' ')
          };
        });
      },
      error: (e: any) => this.handleError(e),
      complete: () => {
        console.log(this.qualifications);
        this.getNonEssentialQualificationsByOccupation(occupation);
      }
    })
  }

  getNonEssentialQualificationsByOccupation(occupation: string) {
    const query = SPARQL_QUERY_GET_NON_ESSENTIAL_QUALIFICATIONS_BY_OCCUPATION.replaceAll("{{occupation}}", occupation)
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        this.associatedQualifications = v.map((item: any) => {
          return {
            name: item.optionalQualification.split('#')[1].replace(/_/g, ' ')
          };
        });
      },
      error: (e: any) => this.handleError(e),
      complete: () => {
        console.log(this.associatedQualifications);
        this.getWorkContextByOccupation(occupation);
      }
    })
  }

  getWorkContextByOccupation(occupation: string) {
    const query = SPARQL_QUERY_GET_WORK_CONTEXT_BY_OCCUPATION.replaceAll("{{occupation}}", occupation)
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        this.workContexts = v.map((item: any) => {
          return {
            name: item.hasWorkContext.split('#')[1].replace(/_/g, ' ')
          };
        });
      },
      error: (e: any) => this.handleError(e),
      complete: () => {
        console.log(this.workContexts);
        this.getISCEDLevelByOccupation(occupation);

      }
    })
  }
  
  getISCEDLevelByOccupation(occupation: string) {
    const query = SPARQL_QUERY_GET_ISCED_BY_OCCUPATION.replaceAll("{{occupation}}", occupation)
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        this.iscedLevels = v.map((item: any) => {
          return {
            name: item.iscdLabel.replace(/_/g, ' ')
          };
        });
      },
      error: (e: any) => this.handleError(e),
      complete: () => {

      }
    })
  }

  getOccupationByAlternativeLabel(alternativeLabel: string) {
    const query = SPARQL_QUERY_GET_OCCUPATION_BY_ALTERNATIVE_LABEL.replaceAll("{{alternativeLabel}}", alternativeLabel);
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        if (v.length > 0) {
          this.foundOccupation = {
            name: v[0].individual.split('#')[1]
          };
          this.foundOccupationLabel = v[0].individual.split('#')[1];
          this.getEssentialSkillsByOccupation(this.foundOccupation);
        } else {
          this.messageService.showMessage('No se encuentra el termino');
        }
      },
      error: (e: any) => this.handleError(e),
      complete: () => {
        console.log(this.workContexts);
      }
    });
  }

  getRelatedSkillsBySkill(skill: string) {
    const query = SPARQL_QUERY_GET_RELATED_SKILLS_BY_SKILL.replaceAll("{{skill}}", skill)
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        if (v.length > 0) {
        this.relatedSkills = v.map((item: any) => {
          return {
            name: item.essentialSkillFor.split('#')[1].replace(/_/g, ' ')
          };
        });
        } else {
          this.messageService.showMessage('No se encuentra el termino');
        }
      },
      error: (e: any) => this.handleError(e),
      complete: () => {

      }
    })
  }
  getRelatedOccupationsBySkill(skill: string) {
    const query = SPARQL_QUERY_GET_RELATED_OCCUPATIONS_BY_SKILL.replaceAll("{{skill}}", skill)
    this.jobService.getRdfDataByQuery(query).subscribe({
      next: (v: any) => {
        if (v.length>0) {
          this.relatedOccupations = v.map((item: any) => {
            return {
              name: item.occupation.split('#')[1].replace(/_/g, ' ')
            };
          });
        } else {
          this.messageService.showMessage("No se encuentra el termino");
        }

      },
      error: (e: any) => this.handleError(e),
      complete: () => {

      }
    })
  }

  onSubmit(): void {
    this.jobService.addJobOffer(this.jobOffer).subscribe({
      next: (response: JobOffer) => {
        this.messageService.showMessage('Se ha agregado la oferta correctamente');
        this.dialogRef.close(true);
      },
      error: (e) => {
        this.handleError(e);
      },
      complete: () => {
        //No action required
      }
    });
  }

  handleError(e: any) {
    if (e.error) {
      e.error.forEach((element: Error) => {
        this.messageService.showMessage(element.message);
      });
    } else {
      this.messageService.showMessage("Ocurrió un error inesperado");
    }
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length]; // Cycle through colors array
  }

  removeEssentialSkill(index: number): void {
    this.essentialSkillTags.splice(index, 1);
  }

  removeEducation(index: number): void {
    this.educationTags.splice(index, 1);
  }

  removeOptionalSkill(index: number): void {
    this.optionalSkillTags.splice(index, 1);
  }

  addEducation(level: string): void {
    this.educationTags.push(level); 
  }

  addEssentialSkill(level: string): void {
    this.essentialSkillTags.push(level); 
  }

  addOptionalSkill(level: string): void {
    this.optionalSkillTags.push(level); 
  }

}

