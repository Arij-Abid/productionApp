import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOrdreFabricationComponent } from './ajout-ordre-fabrication.component';

describe('AjoutOrdreFabricationComponent', () => {
  let component: AjoutOrdreFabricationComponent;
  let fixture: ComponentFixture<AjoutOrdreFabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutOrdreFabricationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutOrdreFabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
