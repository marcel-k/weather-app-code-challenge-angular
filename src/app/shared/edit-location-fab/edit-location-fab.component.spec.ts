import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationFabComponent } from './edit-location-fab.component';

describe('EditLocationFabComponent', () => {
  let component: EditLocationFabComponent;
  let fixture: ComponentFixture<EditLocationFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLocationFabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLocationFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
