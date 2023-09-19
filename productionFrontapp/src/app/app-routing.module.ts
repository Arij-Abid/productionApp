
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AjoutOrdreFabricationComponent } from './components/OrdreFabrication/ajout-ordre-fabrication/ajout-ordre-fabrication.component';
import { ListOrdreFabricationComponent } from './components/OrdreFabrication/list-ordre-fabrication/list-ordre-fabrication.component';
import { UpdateOrdreFabricationComponent } from './components/OrdreFabrication/update-ordre-fabrication/update-ordre-fabrication.component';
import { ListMachineComponent } from './components/machine/list-machine/list-machine.component';
import { AjoutMachineComponent } from './components/machine/ajout-machine/ajout-machine.component';
import { HomeComponent } from './components/home/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ListEtapeProductionComponent } from './components/etapeProduction/list-etape-production/list-etape-production.component';
import { ListClientComponent } from './components/client/list-client/list-client.component';
import { AjouteClientComponent } from './components/client/ajoute-client/ajoute-client.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ListProduitComponent } from './components/produit/list-produit/list-produit.component';
import { UpdateClientComponent } from './components/client/update-client/update-client.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { AddEtapeProductionComponent } from './components/etapeProduction/add-etape-production/add-etape-production.component';
import { UpdateEtapeProductionComponent } from './components/etapeProduction/update-etape-production/update-etape-production.component';
import { AjoutProduitComponent } from './components/produit/ajout-produit/ajout-produit.component';
import { DetailProduitComponent } from './components/produit/detail-produit/detail-produit.component';
import { UpdateProduitComponent } from './components/produit/update-produit/update-produit.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent},

  { path: 'produit', component: ListProduitComponent},
  { path: 'ajouter/produit', component: AjoutProduitComponent},
  { path: 'update/produit/:id', component: UpdateProduitComponent },
  //DetailProduitComponent
 // { path: 'produit', component: ProduitComponent}, 

  { path: 'etape/production', component: ListEtapeProductionComponent},
  { path: 'ajouter/etapeProduction', component: AddEtapeProductionComponent},
  { path: 'update/etapeProduction/:id', component: UpdateEtapeProductionComponent },
  

  { path: 'category', component: ListCategoryComponent },
  { path: 'ajouter/category', component: AddCategoryComponent },
{ path: 'update/category/:id', component: UpdateCategoryComponent },
 
  { path: 'clients', component: ListClientComponent },
{ path: 'ajouter/client', component: AjouteClientComponent },
{ path: 'update/client/:id', component: UpdateClientComponent },

  //  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: HomeComponent },
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
//clients
/*{ path: 'clients', component: ListComponent },
{ path: 'ajouter/client', component: AjouteClientComponent },
*/
{ path: 'ordreFabrications', component: ListOrdreFabricationComponent },
{ path: 'ajouter/ordreFabrications', component: AjoutOrdreFabricationComponent},
{ path: 'update/ordreFabrication/:id', component: UpdateOrdreFabricationComponent},
//machines
//{path:"update/machine/:id",component:UpdateMachineComponent},
{path:"ajouter/machine",component: AjoutMachineComponent},

{ path: 'machines', component: ListMachineComponent },
{ path: 'calendrier', component: CalendarComponent},


//calendrier

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
