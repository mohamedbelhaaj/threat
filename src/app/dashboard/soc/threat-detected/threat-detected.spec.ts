import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatDetected } from './threat-detected';

describe('ThreatDetected', () => {
  let component: ThreatDetected;
  let fixture: ComponentFixture<ThreatDetected>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreatDetected]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatDetected);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
