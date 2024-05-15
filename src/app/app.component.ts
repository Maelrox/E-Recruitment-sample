import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink,  RouterOutlet } from '@angular/router';
import { NavigationMenuComponent } from "./components/navigation-menu/navigation-menu.component";
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterLink, RouterOutlet, NavigationMenuComponent, MatToolbar]
})
export class AppComponent {
  title = 'e-recruitment';
}
