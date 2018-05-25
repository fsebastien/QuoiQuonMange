/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { SemaineDetailComponent } from '../../../../../../main/webapp/app/entities/semaine/semaine-detail.component';
import { SemaineService } from '../../../../../../main/webapp/app/entities/semaine/semaine.service';
import { Semaine } from '../../../../../../main/webapp/app/entities/semaine/semaine.model';

describe('Component Tests', () => {

    describe('Semaine Management Detail Component', () => {
        let comp: SemaineDetailComponent;
        let fixture: ComponentFixture<SemaineDetailComponent>;
        let service: SemaineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [SemaineDetailComponent],
                providers: [
                    SemaineService
                ]
            })
            .overrideTemplate(SemaineDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemaineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemaineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Semaine(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.semaine).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
