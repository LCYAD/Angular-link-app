import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '../links.model';
import { LinkService } from '../link.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-linkdisplay',
  templateUrl: './linkdisplay.component.html',
  styleUrls: ['./linkdisplay.component.css']
})
export class LinkdisplayComponent implements OnInit {

  links: Link[];
  searchStr: string = "";

  constructor(private linksService: LinkService) {}

  ngOnInit() {
    
    this.linksService.getLinksObs().subscribe( 
      (data) => {console.log(data), this.links = data},
      (err) => console.log(err)
    );
    this.linksService.getLinks();
    this.linksService.getSearchStrObs().subscribe(str => {
      this.searchStr = str;
    });
    this.linksService.refreshSearch();
  }

  removeLink(ev:any){
    this.linksService.removeLink(ev.target.value);
  }

  toggleShare(ev:any){
    this.linksService.toggleShare(ev);
  }
}
