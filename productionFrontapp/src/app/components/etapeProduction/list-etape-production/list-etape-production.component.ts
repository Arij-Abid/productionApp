import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role.enum';
import { EtapeProduction } from 'src/app/model/etape-production';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EtapeProductionService } from 'src/app/service/etape-production.service';
import { NotificationService } from 'src/app/service/notification.service';
import Swal from 'sweetalert2';

//declare var myApp: any;

@Component({
  selector: 'app-list-etape-production',
  templateUrl: './list-etape-production.component.html',
  styleUrls: ['./list-etape-production.component.css']
})
export class ListEtapeProductionComponent implements OnInit {

 
  public isAdminOrSuperAdmin: boolean;
  public etapeProductions:EtapeProduction[];

  constructor(
    private etapeProductionService: EtapeProductionService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

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

 
  ngOnInit() {
    this.getAllEtapeProductions();
    this.notifications = this.notificationService.getNotifications(); 
   }
    
public notifications: string[];



getAllEtapeProductions(): void {
  const currentUser = this.authenticationService.getUserFromLocalCache();

  this.etapeProductionService.getAllEtapeProductions().subscribe(
    etapeProductions => {

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

     // this.etapeProductions = etapeProductions.filter(etape => etape.employee_id.userId === currentUser.userId);

      // Clear existing notifications
      this.notifications = [];

      // Add notifications for each assigned production step
      this.etapeProductions.forEach(etape => {
        const notification = `You have a new task: ${etape.name}`;
        this.notifications.push(notification);
      });

      console.log('etape Productions retrieved successfully:', this.etapeProductions);
    },
    error => {
      console.log('Failed to retrieve etape Productions:', error);
      // Handle error cases here
    }
  );
}


getNotificationsCount(): number {
  return this.notificationService.getNotifications().length;
}



  

  deleteEtapeProduction(etapeProductions: EtapeProduction): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this etape Productions?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.etapeProductionService.deleteEtapeProduction(etapeProductions.id).subscribe(
          () => {
            console.log('etape Productions deleted successfully.');
            this.getAllEtapeProductions();
            Swal.fire('Success', 'etape Productions deleted successfully.', 'success');
          },
          (error) => {
            console.log('Failed to delete etape Productions:', error);
            Swal.fire('Error', 'Failed to delete etape Productions.', 'error');
          }
        );
      }
    });
  }

}