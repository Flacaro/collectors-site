import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiskComponent } from './new-disk.component';

describe('NewDiskComponent', () => {
  let component: NewDiskComponent;
  let fixture: ComponentFixture<NewDiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
