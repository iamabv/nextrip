import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from 'node_modules/@angular/common/http';

import { MetroInfoComponent } from './metro-info.component';

describe('MetroInfoComponent', () => {
  let component: MetroInfoComponent;
  let fixture: ComponentFixture<MetroInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetroInfoComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetroInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
