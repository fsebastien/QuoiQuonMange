import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SemaineComponent } from './semaine.component';
import { SemaineDetailComponent } from './semaine-detail.component';
import { SemainePopupComponent } from './semaine-dialog.component';
import { SemaineDeletePopupComponent } from './semaine-delete-dialog.component';

export const semaineRoute: Routes = [
    {
        path: 'semaine',
        component: SemaineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Semaines'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'semaine/:id',
        component: SemaineDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Semaines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const semainePopupRoute: Routes = [
    {
        path: 'semaine-new',
        component: SemainePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Semaines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'semaine/:id/edit',
        component: SemainePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Semaines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'semaine/:id/delete',
        component: SemaineDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Semaines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
