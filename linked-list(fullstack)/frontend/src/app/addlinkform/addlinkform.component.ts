import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinkService } from '../link.service';
import { Router } from '@angular/router';

import { Link } from '../links.model';

@Component({
  selector: 'app-addlinkform',
  templateUrl: './addlinkform.component.html',
  styleUrls: ['./addlinkform.component.css']
})


export class AddLinkFormComponent implements OnInit {
  
  userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private linksService: LinkService, private router: Router) { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      title: ['Link Title', [Validators.required, Validators.maxLength(20)]],
      url: ['http://',Validators.required],
      tags: ['#',[Validators.required, Validators.pattern(/#{1}\w{1,}\d{0,}/)]]
    })
  }

  onSubmit(e:any){
    e.preventDefault();
    if (this.userForm.valid && this.userForm.dirty){
      //console.log(this.userForm.value);
      let tags:string[] = [];
      let tempStr = this.userForm.value.tags.replace(/[^\w\d#]/g, "")
      tempStr.split("#").map((item:string, index:number)=>{
        if (index != 0){
          tags.push(item);
        }
      });

      this.linksService.addLink(this.userForm.value.title, this.userForm.value.url, tags, false);
      //Clear the form back to it's initial state
      this.userForm.reset({title: 'Link Title', url: 'http://', tags: '#'});
      this.router.navigate(['/']);
    }
  }
}
