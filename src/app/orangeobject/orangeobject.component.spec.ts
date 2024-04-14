import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangeobjectComponent } from './orangeobject.component';

describe('OrangeobjectComponent', () => {
  let component: OrangeobjectComponent;
  let fixture: ComponentFixture<OrangeobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrangeobjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrangeobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
