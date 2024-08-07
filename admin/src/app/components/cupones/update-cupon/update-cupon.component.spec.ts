import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCuponComponent } from './update-cupon.component';

describe('UpdateCuponComponent', () => {
  let component: UpdateCuponComponent;
  let fixture: ComponentFixture<UpdateCuponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCuponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
