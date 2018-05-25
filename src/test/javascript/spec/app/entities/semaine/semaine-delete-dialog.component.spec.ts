/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { QuoiQuonMangeTestModule } from '../../../test.module';
import { SemaineDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/semaine/semaine-delete-dialog.component';
import { SemaineService } from '../../../../../../main/webapp/app/entities/semaine/semaine.service';

describe('Component Tests', () => {

    describe('Semaine Management Delete Component', () => {
        let comp: SemaineDeleteDialogComponent;
        let fixture: ComponentFixture<SemaineDeleteDialogComponent>;
        let service: SemaineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QuoiQuonMangeTestModule],
                declarations: [SemaineDeleteDialogComponent],
                providers: [
                    SemaineService
                ]
            })
            .overrideTemplate(SemaineDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SemaineDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemaineService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
