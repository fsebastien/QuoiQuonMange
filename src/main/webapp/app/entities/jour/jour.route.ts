import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JourComponent } from './jour.component';
import { JourDetailComponent } from './jour-detail.component';
import { JourPopupComponent } from './jour-dialog.component';
import { JourDeletePopupComponent } from './jour-delete-dialog.component';

export const jourRoute: Routes = [
    {
        path: 'jour',
        component: JourComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Jours'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jour/:id',
        component: JourDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Jours'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jourPopupRoute: Routes = [
    {
        path: 'jour-new',
        component: JourPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Jours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jour/:id/edit',
        component: JourPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Jours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jour/:id/delete',
        component: JourDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Jours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
