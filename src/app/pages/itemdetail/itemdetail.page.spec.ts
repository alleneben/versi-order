import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdetailPage } from './itemdetail.page';

describe('ItemdetailPage', () => {
  let component: ItemdetailPage;
  let fixture: ComponentFixture<ItemdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
