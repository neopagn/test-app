import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteRoundButton } from './white-round-button';

describe('WhiteRoundButton', () => {
  let component: WhiteRoundButton;
  let fixture: ComponentFixture<WhiteRoundButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteRoundButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteRoundButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
