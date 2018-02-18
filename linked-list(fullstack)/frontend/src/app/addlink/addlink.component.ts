import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlink',
  templateUrl: './addlink.component.html',
  styleUrls: ['./addlink.component.css']
})

export class AddlinkComponent{
  constructor(private router: Router){}
}
