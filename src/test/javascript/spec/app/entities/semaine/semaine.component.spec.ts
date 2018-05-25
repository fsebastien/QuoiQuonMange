/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { SemaineComponent } from '../../../../../../main/webapp/app/entities/semaine/semaine.component';
import { SemaineService } from '../../../../../../main/webapp/app/entities/semaine/semaine.service';
import { Semaine } from '../../../../../../main/webapp/app/entities/semaine/semaine.model';

describe('Component Tests', () => {

    describe('Semaine Management Component', () => {
        let comp: SemaineComponent;
        let fixture: ComponentFixture<SemaineComponent>;
        let service: SemaineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [SemaineComponent],
                providers: [
                    SemaineService
                ]
            })
            .overrideTemplate(SemaineComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemaineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemaineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Semaine(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.semaines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
