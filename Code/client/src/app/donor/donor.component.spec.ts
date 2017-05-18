/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../app.module';

// HTTP mocking imports
import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { DonorComponent } from './donor.component';

describe('DonorComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers:[
        {provide: APP_BASE_HREF, useValue: '/'},
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (pBackend: MockBackend, pOptions: BaseRequestOptions) => {
            return new Http(pBackend, pOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
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

  //TODO: mock backend data, reference:https://github.com/danday74/angular2-coverage
});
