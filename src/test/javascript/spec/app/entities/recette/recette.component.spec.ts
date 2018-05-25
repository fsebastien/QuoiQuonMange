/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { RecetteComponent } from '../../../../../../main/webapp/app/entities/recette/recette.component';
import { RecetteService } from '../../../../../../main/webapp/app/entities/recette/recette.service';
import { Recette } from '../../../../../../main/webapp/app/entities/recette/recette.model';

describe('Component Tests', () => {

    describe('Recette Management Component', () => {
        let comp: RecetteComponent;
        let fixture: ComponentFixture<RecetteComponent>;
        let service: RecetteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [RecetteComponent],
                providers: [
                    RecetteService
                ]
            })
            .overrideTemplate(RecetteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecetteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecetteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Recette(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.recettes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
