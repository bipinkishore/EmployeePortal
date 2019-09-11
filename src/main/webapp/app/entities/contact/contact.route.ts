import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactUpdateComponent } from './contact-update.component';
import { ContactDeletePopupComponent } from './contact-delete-dialog.component';
import { IContact } from 'app/shared/model/contact.model';
import { GroupService } from 'app/entities/group/group.service';
import { Group } from 'app/shared/model/group.model';
import { IGroup } from 'app/shared/model/group.model';

@Injectable({ providedIn: 'root' })
export class ContactResolve implements Resolve<IContact> {
    constructor(private service: ContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((contact: HttpResponse<Contact>) => contact.body));
        }
        return of(new Contact());
    }
}

@Injectable({ providedIn: 'root' })
export class GroupResolve implements Resolve<IGroup> {
    constructor(private service: GroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['gid'] ? route.params['gid'] : null;
        if (id) {
            return this.service.find(id).pipe(map((group: HttpResponse<Group>) => group.body));
        }
        return of(new Group());
    }
}

export const contactRoute: Routes = [
    {
        path: 'contact',
        component: ContactComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams,
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'group/:gid/contact/:id/view',
        component: ContactDetailComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'group/:gid/contact/new',
        component: ContactUpdateComponent,
        resolve: {
            contact: ContactResolve,
            group: GroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'group/:gid/contact/:id/edit',
        component: ContactUpdateComponent,
        resolve: {
            contact: ContactResolve,
            group: GroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'group/:gid/contact',
        component: ContactComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams,
            group: GroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPopupRoute: Routes = [
    {
        path: 'group/:gid/contact/:id/delete',
        component: ContactDeletePopupComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
