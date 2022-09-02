import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnListComponent } from './admn-list.component';

describe('AdmnListComponent', () => {
  let component: AdmnListComponent;
  let fixture: ComponentFixture<AdmnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmnListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
