import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnResetComponent } from './admn-reset.component';

describe('AdmnResetComponent', () => {
  let component: AdmnResetComponent;
  let fixture: ComponentFixture<AdmnResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmnResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmnResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
