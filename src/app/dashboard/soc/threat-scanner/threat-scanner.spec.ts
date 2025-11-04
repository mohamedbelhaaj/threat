import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatScanner } from './threat-scanner';

describe('ThreatScanner', () => {
  let component: ThreatScanner;
  let fixture: ComponentFixture<ThreatScanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreatScanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatScanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
