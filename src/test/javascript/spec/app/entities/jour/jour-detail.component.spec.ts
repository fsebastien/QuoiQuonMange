/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { JourDetailComponent } from '../../../../../../main/webapp/app/entities/jour/jour-detail.component';
import { JourService } from '../../../../../../main/webapp/app/entities/jour/jour.service';
import { Jour } from '../../../../../../main/webapp/app/entities/jour/jour.model';

describe('Component Tests', () => {

    describe('Jour Management Detail Component', () => {
        let comp: JourDetailComponent;
        let fixture: ComponentFixture<JourDetailComponent>;
        let service: JourService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [JourDetailComponent],
                providers: [
                    JourService
                ]
            })
            .overrideTemplate(JourDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JourDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JourService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Jour(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jour).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
