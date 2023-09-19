import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin
import { Role } from 'src/app/enum/role.enum';
import { EtapeProduction } from 'src/app/model/etape-production';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EtapeProductionService } from 'src/app/service/etape-production.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions;
  etapeProductions: EtapeProduction[];

  constructor(private etapeProductionService: EtapeProductionService,
    private authenticationService: AuthenticationService
    ) {}

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: []
    };

    this.getAllEtapeProductions();
  }
  public isAdminOrSuperAdmin: boolean;
  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.ROLE_SUPER_ADMIN;
  }

  public get isResponsable(): boolean {
    return this.isAdmin || this.getUserRole() === Role.RESPONSABLE;
  }

  public get isAdminOrResponsable(): boolean {
    return this.isAdmin || this.isResponsable;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  getAllEtapeProductions(): void {
    const currentUser = this.authenticationService.getUserFromLocalCache();

    this.etapeProductionService.getAllEtapeProductions().subscribe(
      etapeProductions => {

      //  this.etapeProductions = etapeProductions.filter(etape => etape.employee_id.userId === currentUser.userId);
       
       
      if (this.isAdmin) {
        // If user is admin or super admin, show all etape productions
        this.etapeProductions = etapeProductions;
      } else  if (this.isResponsable) {
        // If user is admin or super admin, show all etape productions
        this.etapeProductions = etapeProductions;
      }
      
      else
      {
        // If user is responsible, filter etape productions based on their employee ID
        this.etapeProductions = etapeProductions.filter(etape => etape.employee_id.userId === currentUser.userId);
      }   
       
        this.populateCalendarEvents();
        console.log('Etape Productions retrieved successfully:', this.etapeProductions);
      },
      error => {
        console.log('Failed to retrieve Etape Productions:', error);
        // Handle error cases here
      }
    );
  }

 /* populateCalendarEvents(): void {
    this.calendarOptions.events = this.etapeProductions.map(etape => ({
      title: etape.name,
      start: etape.datedebut, // Utilisez "start" pour la date de début
      end: etape.datefin, // Utilisez "end" pour la date de fin
      //date: etape.datefin
    }));
  }
*/
populateCalendarEvents(): void {
  this.calendarOptions.events = this.etapeProductions.map(etape => ({
    title: etape.name,
    start: etape.datedebut,
    end: etape.datefin
  }));
}
}

