import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Semaine } from './semaine.model';
import { SemaineService } from './semaine.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-semaine',
    templateUrl: './semaine.component.html'
})
export class SemaineComponent implements OnInit, OnDestroy {
semaines: Semaine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private semaineService: SemaineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.semaineService.query().subscribe(
            (res: HttpResponse<Semaine[]>) => {
                this.semaines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSemaines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Semaine) {
        return item.id;
    }
    registerChangeInSemaines() {
        this.eventSubscriber = this.eventManager.subscribe('semaineListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
