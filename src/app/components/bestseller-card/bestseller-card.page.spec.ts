import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestsellerCardPage } from './bestseller-card.page';

describe('BestsellerCardPage', () => {
  let component: BestsellerCardPage;
  let fixture: ComponentFixture<BestsellerCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BestsellerCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
