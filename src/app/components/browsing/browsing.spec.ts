import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Browsing } from './browsing';

describe('Browsing', () => {
  let component: Browsing;
  let fixture: ComponentFixture<Browsing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Browsing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Browsing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
