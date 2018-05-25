/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { RecetteDetailComponent } from '../../../../../../main/webapp/app/entities/recette/recette-detail.component';
import { RecetteService } from '../../../../../../main/webapp/app/entities/recette/recette.service';
import { Recette } from '../../../../../../main/webapp/app/entities/recette/recette.model';

describe('Component Tests', () => {

    describe('Recette Management Detail Component', () => {
        let comp: RecetteDetailComponent;
        let fixture: ComponentFixture<RecetteDetailComponent>;
        let service: RecetteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [RecetteDetailComponent],
                providers: [
                    RecetteService
                ]
            })
            .overrideTemplate(RecetteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecetteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecetteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Recette(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.recette).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
