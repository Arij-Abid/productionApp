import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Role } from 'src/app/enum/role.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public users: User[];
  public user: User;
  public refreshing: boolean;
  private subscriptions: Subscription[] = [];


  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) {}

ngOnInit(): void {
this.user = this.authenticationService.getUserFromLocalCache();
this.getUsers(true);
}


public getUsers(showNotification: boolean): void {
  this.refreshing = true;
  this.subscriptions.push(
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.userService.addUsersToLocalCache(response);
        this.users = response;
        this.refreshing = false;
        if (showNotification) {
          this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      }
    )
  );

}


private sendNotification(notificationType: NotificationType, message: string): void {
  if (message) {
    this.notificationService.notify(notificationType, message);
  } else {
    this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
  }
}
  selectedButton: string = 'dashboard';

  selectButton(button: string) {
    this.selectedButton = button;
  }
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

}
