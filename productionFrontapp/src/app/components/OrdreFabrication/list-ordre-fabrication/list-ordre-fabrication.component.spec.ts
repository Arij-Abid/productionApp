import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdreFabricationComponent } from './list-ordre-fabrication.component';

describe('ListOrdreFabricationComponent', () => {
  let component: ListOrdreFabricationComponent;
  let fixture: ComponentFixture<ListOrdreFabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdreFabricationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdreFabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
