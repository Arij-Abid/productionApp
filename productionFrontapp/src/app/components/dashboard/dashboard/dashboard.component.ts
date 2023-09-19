import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Role } from 'src/app/enum/role.enum';
import { Category } from 'src/app/model/category';
import { Client } from 'src/app/model/client';
import { EtapeProduction } from 'src/app/model/etape-production';
import { FileUploadStatus } from 'src/app/model/file-upload.status';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CategoryService } from 'src/app/service/category.service';
import { ClientService } from 'src/app/service/client.service';
import { EtapeProductionService } from 'src/app/service/etape-production.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OrdreFabricationService } from 'src/app/service/ordre-fabrication.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[];
  public user: User;
  public refreshing: boolean;
  public selectedUser: User;
  public fileName: string;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  private currentUsername: string;
  public fileStatus = new FileUploadStatus();

  public numberOfUsers: number;
  public numberOfClients: number;
  public  numberOfProducts: number;
  public  numberOfcategorys: number;
  public  numberOfEtapes: number;

chartPercentOrderFabrication : any
options : any
  

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private etapeProductionService: EtapeProductionService,
    private userService: UserService,
    private clientService: ClientService,
    private productService: ProductService,
    private categoryService:CategoryService,
    private notificationService: NotificationService,
    private ordreFabricationService: OrdreFabricationService,

  ) {}



  
  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers(true);
    this.clientService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.numberOfClients = clients.length;
      },
      (errorResponse: HttpErrorResponse) => {
        // Handle error here if needed.
      }
    );

    this.etapeProductionService.getAllEtapeProductions().subscribe(
      (etapeProduction: EtapeProduction[]) => {
        this.numberOfEtapes = etapeProduction.length;
      },
      (errorResponse: HttpErrorResponse) => {
        // Handle error here if needed.
      }
    );

    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.numberOfProducts = products.length;
      },
      (errorResponse: HttpErrorResponse) => {
        // Handle error here if needed.
      }
    );

    
    this.categoryService.getAllCategorys().subscribe(
      (category: Category[]) => {
        this.numberOfcategorys = category.length;
      },
      (errorResponse: HttpErrorResponse) => {
        // Handle error here if needed.
      }
    );


   // this.getAllEtapeProductions();
   this.ordreFabricationService.chartPercentOrderFabrication().subscribe((data: any) => {
    console.log(data);

    const labels = Object.keys(data);
    const values = Object.values(data);
    const documentStyle = getComputedStyle(document.documentElement);
    const backgroundColors = [
      documentStyle.getPropertyValue('--blue-500'),
      documentStyle.getPropertyValue('--yellow-500'),
      documentStyle.getPropertyValue('--green-500'),
      documentStyle.getPropertyValue('--pink-500'),
      documentStyle.getPropertyValue('--orange-900'),
      documentStyle.getPropertyValue('--green-900'),
      documentStyle.getPropertyValue('--bluegray-500'),

      documentStyle.getPropertyValue('--red-500')

    ];
    const hoverBackgroundColors = [
      documentStyle.getPropertyValue('--blue-400'),
      documentStyle.getPropertyValue('--yellow-400'),
      documentStyle.getPropertyValue('--green-400'),
      documentStyle.getPropertyValue('--pink-400'),
      documentStyle.getPropertyValue('--orange-800'),
      documentStyle.getPropertyValue('--green-800'),
      documentStyle.getPropertyValue('--bluegray-400'),

      documentStyle.getPropertyValue('--red-400'),

    ];

    this.chartPercentOrderFabrication = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors.slice(0, values.length),
          hoverBackgroundColor: hoverBackgroundColors.slice(0, values.length)
        }
      ]
    };
  });

  const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
  this.options = {
    cutout: '60%',
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    }
  };
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.numberOfUsers = response.length;
         // this.numberOfClients = response.filter(user => user.role !== Role.Client).length;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(
              NotificationType.SUCCESS,
              `${response.length} user(s) loaded successfully.`
            );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.refreshing = false;
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'An error occurred. Please try again.'
      );
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  public get isAdmin(): boolean {
    return (
      this.getUserRole() === Role.ADMIN ||
      this.getUserRole() === Role.ROLE_SUPER_ADMIN
    );
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
