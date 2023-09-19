import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({providedIn: 'root'})
export class NotificationService {

  constructor(private notifier: NotifierService) {}

  public notify(type: NotificationType, message: string) {
    this.notifier.notify(type, message);
  }




  private notifications: string[] = [];



  addNotification(notification: string): void {
    this.notifications.push(notification);
    this.notify(NotificationType.SUCCESS, notification); // Change NotificationType.Success to your desired type
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }


}
