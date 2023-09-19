import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtapeProductionComponent } from './add-etape-production.component';

describe('AddEtapeProductionComponent', () => {
  let component: AddEtapeProductionComponent;
  let fixture: ComponentFixture<AddEtapeProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEtapeProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtapeProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
