import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-linksearch',
  templateUrl: './linksearch.component.html',
  styleUrls: ['./linksearch.component.css']
})
export class LinksearchComponent implements OnInit {


  constructor(private linkservice: LinkService) {}

  ngOnInit() {
    this.linkservice.changeSearch("");
  }

  SearchLink(ev){
    this.linkservice.changeSearch(ev.target.value);
  }
}
