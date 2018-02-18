import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksearchComponent } from './linksearch.component';

describe('LinksearchComponent', () => {
  let component: LinksearchComponent;
  let fixture: ComponentFixture<LinksearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
