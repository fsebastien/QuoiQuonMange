/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { JourComponent } from '../../../../../../main/webapp/app/entities/jour/jour.component';
import { JourService } from '../../../../../../main/webapp/app/entities/jour/jour.service';
import { Jour } from '../../../../../../main/webapp/app/entities/jour/jour.model';

describe('Component Tests', () => {

    describe('Jour Management Component', () => {
        let comp: JourComponent;
        let fixture: ComponentFixture<JourComponent>;
        let service: JourService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [JourComponent],
                providers: [
                    JourService
                ]
            })
            .overrideTemplate(JourComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JourComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JourService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Jour(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jours[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
