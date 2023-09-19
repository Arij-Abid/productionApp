import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './service/authentication.service';
import { NotificationService } from './service/notification.service';
import { UserService } from './service/user.service';
import { UserComponent } from './user/user.component';
import { NotificationModule } from './notification.module';
import { CommonModule } from '@angular/common';
import { AjoutOrdreFabricationComponent } from './components/OrdreFabrication/ajout-ordre-fabrication/ajout-ordre-fabrication.component';
import { OrdreFabricationService } from './service/ordre-fabrication.service';
import { HeaderComponent } from './components/header/header/header.component';
import { ListOrdreFabricationComponent } from './components/OrdreFabrication/list-ordre-fabrication/list-ordre-fabrication.component';
import { UpdateOrdreFabricationComponent } from './components/OrdreFabrication/update-ordre-fabrication/update-ordre-fabrication.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { AjoutMachineComponent } from './components/machine/ajout-machine/ajout-machine.component';
import { ListMachineComponent } from './components/machine/list-machine/list-machine.component';
import { HomeComponent } from './components/home/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ListEtapeProductionComponent } from './components/etapeProduction/list-etape-production/list-etape-production.component';
import { ListClientComponent } from './components/client/list-client/list-client.component';
import { AjouteClientComponent } from './components/client/ajoute-client/ajoute-client.component';
import { ListProduitComponent } from './components/produit/list-produit/list-produit.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UpdateClientComponent } from './components/client/update-client/update-client.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { AddEtapeProductionComponent } from './components/etapeProduction/add-etape-production/add-etape-production.component';
import { UpdateEtapeProductionComponent } from './components/etapeProduction/update-etape-production/update-etape-production.component';
import { AjoutProduitComponent } from './components/produit/ajout-produit/ajout-produit.component';
import { UpdateProduitComponent } from './components/produit/update-produit/update-produit.component';
import { DetailProduitComponent } from './components/produit/detail-produit/detail-produit.component';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ListClientComponent,
    AjouteClientComponent,
    ListCategoryComponent,
    UpdateCategoryComponent,
    AddCategoryComponent,
    ListProduitComponent,
    AjoutProduitComponent,
    UpdateProduitComponent,
    DetailProduitComponent,
    ListEtapeProductionComponent,
    AddEtapeProductionComponent,
    UpdateEtapeProductionComponent,
    HomeComponent,
    ContentComponent,
    AdminDashboardComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ListMachineComponent,
    CalendarComponent,
    ListEtapeProductionComponent,
    AjoutMachineComponent,
    UpdateOrdreFabricationComponent,
    UpdateClientComponent,
    ListOrdreFabricationComponent,
    AjoutOrdreFabricationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule, // Add FormsModule to the imports array
    HttpClientModule,
    SliderModule,
    CommonModule,
    NotificationModule,
    ChartModule
    

  ],
  providers: [
    NotificationService,
    AuthenticationGuard, 
    OrdreFabricationService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }