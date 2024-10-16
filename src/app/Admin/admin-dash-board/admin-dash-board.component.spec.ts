import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashBoardComponent } from './admin-dash-board.component';

describe('AdminDashBoardComponent', () => {
  let component: AdminDashBoardComponent;
  let fixture: ComponentFixture<AdminDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
