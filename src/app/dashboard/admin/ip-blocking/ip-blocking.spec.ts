import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpBlocking } from './ip-blocking';

describe('IpBlocking', () => {
  let component: IpBlocking;
  let fixture: ComponentFixture<IpBlocking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpBlocking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpBlocking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
