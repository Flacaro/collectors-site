import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisksFavouritesComponent } from './disks-favourites.component';

describe('DisksFavouritesComponent', () => {
  let component: DisksFavouritesComponent;
  let fixture: ComponentFixture<DisksFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisksFavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisksFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
