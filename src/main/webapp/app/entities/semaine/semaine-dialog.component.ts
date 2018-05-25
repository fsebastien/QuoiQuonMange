import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Semaine } from './semaine.model';
import { SemainePopupService } from './semaine-popup.service';
import { SemaineService } from './semaine.service';
import { Jour, JourService } from '../jour';

@Component({
    selector: 'jhi-semaine-dialog',
    templateUrl: './semaine-dialog.component.html'
})
export class SemaineDialogComponent implements OnInit {

    semaine: Semaine;
    isSaving: boolean;

    lundis: Jour[];

    mardis: Jour[];

    mercredis: Jour[];

    jeudis: Jour[];

    vendredis: Jour[];

    samedis: Jour[];

    dimanches: Jour[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private semaineService: SemaineService,
        private jourService: JourService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jourService
            .query({filter: 'semaine-is-null'})
            .subscribe((res: HttpResponse<Jour[]>) => {
                if (!this.semaine.lundi || !this.semaine.lundi.id) {
                    this.lundis = res.body;
                } else {
                    this.jourService
                        .find(this.semaine.lundi.id)
                        .subscribe((subRes: HttpResponse<Jour>) => {
                            this.lundis = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jourService
            .query({filter: 'semaine-is-null'})
            .subscribe((res: HttpResponse<Jour[]>) => {
                if (!this.semaine.mardi || !this.semaine.mardi.id) {
                    this.mardis = res.body;
                } else {
                    this.jourService
                        .find(this.semaine.mardi.id)
                        .subscribe((subRes: HttpResponse<Jour>) => {
                            this.mardis = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jourService
            .query({filter: 'semaine-is-null'})
            .subscribe((res: HttpResponse<Jour[]>) => {
                if (!this.semaine.mercredi || !this.semaine.mercredi.id) {
                    this.mercredis = res.body;
                } else {
                    this.jourService
                        .find(this.semaine.mercredi.id)
                        .subscribe((subRes: HttpResponse<Jour>) => {
                            this.mercredis = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jourService
            .query({filter: 'semaine-is-null'})
            .subscribe((res: HttpResponse<Jour[]>) => {
                if (!this.semaine.jeudi || !this.semaine.jeudi.id) {
                    this.jeudis = res.body;
                } else {
                    this.jourService
                        .find(this.semaine.jeudi.id)
                        .subscribe((subRes: HttpResponse<Jour>) => {
                            this.jeudis = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jourService
            .query({filter: 'semaine-is-null'})
            .subscribe((res: HttpResponse<Jour[]>) => {
                if (!this.semaine.vendredi || !this.semaine.vendredi.id) {
                    this.vendredis = res.body;
                } else {
                    this.jourService
                        .find(this.semaine.vendredi.id)
                        .subscribe((subRes: HttpResponse<Jour>) => {
                            this.vendredis = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jourService
            .query({filter: 'semaine-is-null'})
            .subscribe((res: HttpResponse<Jour[]>) => {
                if (!this.semaine.samedi || !this.semaine.samedi.id) {
                    this.samedis = res.body;
                } else {
                    this.jourService
                        .find(this.semaine.samedi.id)
                        .subscribe((subRes: HttpResponse<Jour>) => {
                            this.samedis = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.jourService
            .query({filter: 'semaine-is-null'})
            .subscribe((res: HttpResponse<Jour[]>) => {
                if (!this.semaine.dimanche || !this.semaine.dimanche.id) {
                    this.dimanches = res.body;
                } else {
                    this.jourService
                        .find(this.semaine.dimanche.id)
                        .subscribe((subRes: HttpResponse<Jour>) => {
                            this.dimanches = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.semaine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.semaineService.update(this.semaine));
        } else {
            this.subscribeToSaveResponse(
                this.semaineService.create(this.semaine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Semaine>>) {
        result.subscribe((res: HttpResponse<Semaine>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Semaine) {
        this.eventManager.broadcast({ name: 'semaineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJourById(index: number, item: Jour) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-semaine-popup',
    template: ''
})
export class SemainePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private semainePopupService: SemainePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.semainePopupService
                    .open(SemaineDialogComponent as Component, params['id']);
            } else {
                this.semainePopupService
                    .open(SemaineDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
