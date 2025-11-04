import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocDashboard } from './soc-dashboard';

describe('SocDashboard', () => {
  let component: SocDashboard;
  let fixture: ComponentFixture<SocDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
