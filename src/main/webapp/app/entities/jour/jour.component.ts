import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Jour } from './jour.model';
import { JourService } from './jour.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-jour',
    templateUrl: './jour.component.html'
})
export class JourComponent implements OnInit, OnDestroy {
jours: Jour[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jourService: JourService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jourService.query().subscribe(
            (res: HttpResponse<Jour[]>) => {
                this.jours = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJours();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Jour) {
        return item.id;
    }
    registerChangeInJours() {
        this.eventSubscriber = this.eventManager.subscribe('jourListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
