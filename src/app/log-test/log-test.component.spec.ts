import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTestComponent } from './log-test.component';

describe('LogTestComponent', () => {
  let component: LogTestComponent;
  let fixture: ComponentFixture<LogTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogTestComponent]
    });
    fixture = TestBed.createComponent(LogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
