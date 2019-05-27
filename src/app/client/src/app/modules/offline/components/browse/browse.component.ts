import { Component, OnInit } from '@angular/core';
import { ConnectionService } from './../../services/connection-service/connection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  isConnected = navigator.onLine;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }

}
