import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveOwnersComponent } from './retrieve-owners.component';

describe('RetrieveOwnersComponent', () => {
  let component: RetrieveOwnersComponent;
  let fixture: ComponentFixture<RetrieveOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrieveOwnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrieveOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
