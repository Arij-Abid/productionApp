import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEtapeProductionComponent } from './update-etape-production.component';

describe('UpdateEtapeProductionComponent', () => {
  let component: UpdateEtapeProductionComponent;
  let fixture: ComponentFixture<UpdateEtapeProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEtapeProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEtapeProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
