import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Jour } from './jour.model';
import { JourService } from './jour.service';

@Component({
    selector: 'jhi-jour-detail',
    templateUrl: './jour-detail.component.html'
})
export class JourDetailComponent implements OnInit, OnDestroy {

    jour: Jour;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jourService: JourService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJours();
    }

    load(id) {
        this.jourService.find(id)
            .subscribe((jourResponse: HttpResponse<Jour>) => {
                this.jour = jourResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJours() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jourListModification',
            (response) => this.load(this.jour.id)
        );
    }
}
