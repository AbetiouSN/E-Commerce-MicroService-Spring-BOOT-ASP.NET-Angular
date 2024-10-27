import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterImageComponent } from './ajouter-image.component';

describe('AjouterImageComponent', () => {
  let component: AjouterImageComponent;
  let fixture: ComponentFixture<AjouterImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
