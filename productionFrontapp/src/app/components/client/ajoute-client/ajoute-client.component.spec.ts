import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteClientComponent } from './ajoute-client.component';

describe('AjouteClientComponent', () => {
  let component: AjouteClientComponent;
  let fixture: ComponentFixture<AjouteClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
