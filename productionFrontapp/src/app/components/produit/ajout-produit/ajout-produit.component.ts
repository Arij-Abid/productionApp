import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { Category } from 'src/app/model/category';
import { Client } from 'src/app/model/client';
import { OrdreFabrication } from 'src/app/model/ordre-fabrication';
import { Product } from 'src/app/model/product';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { OrdreFabricationService } from 'src/app/service/ordre-fabrication.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  product: Product = {
    id: 0,
    nom: '',
    prix: 0,
    description: '',
    dateCreation: new Date(),
    quantiteStock: 0,
    livraison: new Date(),
    category_id: { id: 0, name: '', description: '' },
    id_OF: { id: 0, name:'', date_sortie: new Date(), date_creation: new Date(),
       description: '', qte_produite: 0,progression:  0, status: '', 
       client_id: {  id: 0,
        adresse: '',
        email:  '',
        name:  '',
        tel: 0,
        ville:  ''} 
      }
  };
 
 // CategoryService: any;
  categorys: Category[]= [];
  ordreFabrications: OrdreFabrication[]= [];
  ngOnInit(): void {
    this.loadCategorys();
    this.loadOrdreFabrications();
  }


  loadCategorys(): void {
    this.productService.getAllCategorys().subscribe(
      (categorys: Category[]) => {
        this.categorys = categorys;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  loadOrdreFabrications(): void {
    this.productService.getAllOrdreFabrications().subscribe(
      (ordreFabrications: OrdreFabrication[]) => {
        this.ordreFabrications = ordreFabrications;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
public isAdminOrSuperAdmin: boolean;

  constructor(private authenticationService: AuthenticationService,private productService: ProductService, private router: Router) {
    this.isAdminOrSuperAdmin = this.isAdmin || this.isSuperAdmin;
  }

  private get isAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ADMIN;
  }

  private get isSuperAdmin(): boolean {
    const userRole = this.authenticationService.getUserRole();
    return userRole === Role.ROLE_SUPER_ADMIN;
  }



  
  addProduct(): void {
    this.productService.createProduct(this.product)
      .subscribe(
        () => {
          console.log('product added successfully.');
          Swal.fire('Success!', 'product created successfully.', 'success');
          this.router.navigate(['/produit']);
        },
        error => {
          console.log('Failed to add product:', error);
          // Handle error cases here
        }
      );
  }



}