import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerManagement } from './server-management';

describe('ServerManagement', () => {
  let component: ServerManagement;
  let fixture: ComponentFixture<ServerManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
