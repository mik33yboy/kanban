import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbandashboardComponent } from './kanbandashboard.component';

describe('KanbandashboardComponent', () => {
  let component: KanbandashboardComponent;
  let fixture: ComponentFixture<KanbandashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbandashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbandashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
