import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinkService } from '../link.service';
declare var $:any

import { Link } from '../links.model';
import { Tag } from '../tags.model';

@Component({
  selector: 'app-addlink',
  templateUrl: './addlink.component.html',
  styleUrls: ['./addlink.component.css']
})


export class AddlinkComponent implements OnInit {
  
  userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private linksService: LinkService) { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      title: ['Link Title', [Validators.required, Validators.maxLength(20)]],
      url: ['http://',Validators.required],
      //tags: ['#', Validators.required]
      tags: ['#',[Validators.required, Validators.pattern(/#{1}\w{1,}\d{0,}/)]]
    })
  }

  onSubmit(){
    if (this.userForm.valid && this.userForm.dirty){
      //console.log(this.userForm.value);
      let tags = [];
      let tempStr = this.userForm.value.tags.replace(/[^\w\d#]/g, "")
      tempStr.split("#").map((item, index)=>{
        if (index != 0){
          tags.push(item);
        }
      });

      this.linksService.addLink(this.userForm.value.title, this.userForm.value.url, new Tag(tags), false);
      $('#addLinkForm').modal('hide');
      //Clear the form back to it's initial state
      this.userForm.reset({title: 'Link Title', url: 'http://', tags: '#'});
    }
  }
}
