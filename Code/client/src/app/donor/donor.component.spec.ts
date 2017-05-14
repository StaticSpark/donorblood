/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../app.module';

import { DonorComponent } from './donor.component';

describe('DonorComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers:[{provide: APP_BASE_HREF, useValue: '/'}]
    });
    TestBed.compileComponents();
  });

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(DonorComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it(`should have as model to null`, async(() => {
    const fixture = TestBed.createComponent(DonorComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component.model).toEqual(null);
  }));

  it('should has a donor h2 tag', async(() => {
    const fixture = TestBed.createComponent(DonorComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Donor');
  }));
});
