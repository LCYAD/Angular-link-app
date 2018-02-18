import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlinkformComponent } from './addlinkform.component';

describe('AddlinkformComponent', () => {
  let component: AddlinkformComponent;
  let fixture: ComponentFixture<AddlinkformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlinkformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlinkformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
