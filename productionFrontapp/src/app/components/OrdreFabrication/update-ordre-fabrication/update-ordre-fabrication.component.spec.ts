import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrdreFabricationComponent } from './update-ordre-fabrication.component';

describe('UpdateOrdreFabricationComponent', () => {
  let component: UpdateOrdreFabricationComponent;
  let fixture: ComponentFixture<UpdateOrdreFabricationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrdreFabricationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrdreFabricationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
