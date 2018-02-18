import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '../links.model';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-linkdisplay',
  templateUrl: './linkdisplay.component.html',
  styleUrls: ['./linkdisplay.component.css']
})
export class LinkdisplayComponent implements OnInit {

  links: Link[];
  @Input() searchStr: string;

  constructor(private linksService: LinkService) {}

  ngOnInit() {
    this.linksService.getLinks().subscribe(data =>{
      this.links = data;
      //console.log(this.links);
    });
  }

  removeLink(ev){
    this.linksService.removeLink(ev.target.value);
  }

  toggleShare(ev){
    this.linksService.toggleShare(ev);
  }



}
