import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWellcomComponent } from './admin-wellcom.component';

describe('AdminWellcomComponent', () => {
  let component: AdminWellcomComponent;
  let fixture: ComponentFixture<AdminWellcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWellcomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWellcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
