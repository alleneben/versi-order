import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PosItemPage } from './pos-item.page';

describe('PosItemPage', () => {
  let component: PosItemPage;
  let fixture: ComponentFixture<PosItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PosItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
