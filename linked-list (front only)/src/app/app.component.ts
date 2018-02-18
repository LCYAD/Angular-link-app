import { Component, OnInit } from '@angular/core';
import { Link } from './links.model';
import { Tag } from './tags.model';
import { LinkService } from './link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  searchStr:string = '';

  constructor(private linksService: LinkService){}

  ngOnInit() {
  }

  getSearch(ev){
    this.searchStr = ev;
  }
}
