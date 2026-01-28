import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestSellerPage } from './best-seller.page';

describe('BestSellerPage', () => {
  let component: BestSellerPage;
  let fixture: ComponentFixture<BestSellerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
