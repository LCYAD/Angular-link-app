import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLinkFormComponent } from './addlinkform/addlinkform.component';
import { LinkdisplayComponent } from './linkdisplay/linkdisplay.component';

const routes: Routes = [
  {path: '', component: LinkdisplayComponent},
  {path: 'addlinkform', component: AddLinkFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [AddLinkFormComponent, LinkdisplayComponent];
