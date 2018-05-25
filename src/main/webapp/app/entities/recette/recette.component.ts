import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Recette } from './recette.model';
import { RecetteService } from './recette.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-recette',
    templateUrl: './recette.component.html'
})
export class RecetteComponent implements OnInit, OnDestroy {
recettes: Recette[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private recetteService: RecetteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.recetteService.query().subscribe(
            (res: HttpResponse<Recette[]>) => {
                this.recettes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRecettes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Recette) {
        return item.id;
    }
    registerChangeInRecettes() {
        this.eventSubscriber = this.eventManager.subscribe('recetteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
