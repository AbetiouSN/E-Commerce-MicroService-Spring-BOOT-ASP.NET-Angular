import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieProductComponent } from './modifie-product.component';

describe('ModifieProductComponent', () => {
  let component: ModifieProductComponent;
  let fixture: ComponentFixture<ModifieProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifieProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifieProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
