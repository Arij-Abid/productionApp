import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtapeProductionComponent } from './list-etape-production.component';

describe('ListEtapeProductionComponent', () => {
  let component: ListEtapeProductionComponent;
  let fixture: ComponentFixture<ListEtapeProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEtapeProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEtapeProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
