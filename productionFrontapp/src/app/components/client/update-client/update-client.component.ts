import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  //client: Client;
  client: any = {}; // Initialize the 'client' object


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    this.clientService.getClientById(Number(clientId)).subscribe((client) => {
      this.client = client;
    });
  }

  updateClient(): void {
    this.clientService.updateClient(this.client.id, this.client).subscribe(() => {
      console.log('Client updated successfully.');
      this.router.navigate(['/clients']);
    }, error => {
      console.log('Failed to update client:', error);
      // Handle error cases here
    });
  }
}