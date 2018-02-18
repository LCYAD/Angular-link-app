import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkdisplayComponent } from './linkdisplay.component';

describe('LinkdisplayComponent', () => {
  let component: LinkdisplayComponent;
  let fixture: ComponentFixture<LinkdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
