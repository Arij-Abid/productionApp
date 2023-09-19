import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Client } from 'src/app/model/client';
import { OrdreFabrication } from 'src/app/model/ordre-fabrication';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {

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


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    
  ) { }




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Extract the id parameter from the route
      this.loadProduct(id);// Appel à loadProduct pour récupérer les détails du produit
      this.loadCategorys();
      this.loadOrdreFabrications();
    });
  }
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error: any) => {
        console.error(error);
      }
    );
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
  


  updateProduct(): void {
    const id = this.product.id; // Get the id value from the ordreFabrication object
    this.productService.updateProduct(id, this.product).subscribe(
      () => { // Update the callback function to match the expected type
        console.log('Product updated successfully');
        this.router.navigate(['/produit']);
        // Do something after successfully updating the product
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
/*
  updateProduct(): void {
    const id = this.product.id; // Get the id value from the ordreFabrication object
    this.productService.updateProduct(id, this.product).subscribe(
      (product: Product) => {
        console.log(product);
        this.router.navigate(['/produit']);
        // Do something after successfully updating the ordreFabrication
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  */
  
/*
  updateOrdreFabrication(): void {
    this.ordreFabricationService.updateOrdreFabrication(this.ordreFabrication.id_of, this.ordreFabrication).subscribe(
      (ordreFabrication: OrdreFabrication) => {
        console.log(ordreFabrication);
        this.router.navigate(['/ordreFabrications']);
        // Do something after successfully updating the ordreFabrication
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  */
}