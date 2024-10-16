import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateInformationComponent } from './admin-update-information.component';

describe('AdminUpdateInformationComponent', () => {
  let component: AdminUpdateInformationComponent;
  let fixture: ComponentFixture<AdminUpdateInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
