/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { SemaineDialogComponent } from '../../../../../../main/webapp/app/entities/semaine/semaine-dialog.component';
import { SemaineService } from '../../../../../../main/webapp/app/entities/semaine/semaine.service';
import { Semaine } from '../../../../../../main/webapp/app/entities/semaine/semaine.model';
import { JourService } from '../../../../../../main/webapp/app/entities/jour';

describe('Component Tests', () => {

    describe('Semaine Management Dialog Component', () => {
        let comp: SemaineDialogComponent;
        let fixture: ComponentFixture<SemaineDialogComponent>;
        let service: SemaineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [SemaineDialogComponent],
                providers: [
                    JourService,
                    SemaineService
                ]
            })
            .overrideTemplate(SemaineDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemaineDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemaineService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Semaine(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.semaine = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'semaineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Semaine();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.semaine = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'semaineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
