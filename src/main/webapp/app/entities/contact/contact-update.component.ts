import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from 'app/entities/group/group.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'jhi-contact-update',
    templateUrl: './contact-update.component.html'
})
export class ContactUpdateComponent implements OnInit {
    private _contact: IContact;
    isSaving: boolean;
    group: IGroup;
    routeData: any;

    groups: IGroup[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private contactService: ContactService,
        private groupService: GroupService,
        private activatedRoute: ActivatedRoute
    ) {
         this.routeData = this.activatedRoute.data.subscribe(data => {
            this.group = data.group;
         });
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contact }) => {
            this.contact = contact;
        });

        this.contact.group = this.group;
    }

    previousState() {
        window.history.back();
    }

   /* getGroup() {
      return this.service.find(this.gid).pipe(map((group: HttpResponse<Group>) => group.body));
 
    }*/

    save() {
        this.isSaving = true;
        if (this.contact.id !== undefined) {
            this.subscribeToSaveResponse(this.contactService.update(this.contact));
        } else {
            this.subscribeToSaveResponse(this.contactService.create(this.contact));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContact>>) {
        result.subscribe((res: HttpResponse<IContact>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGroupById(index: number, item: IGroup) {
        return item.id;
    }
    get contact() {
        return this._contact;
    }

    set contact(contact: IContact) {
        this._contact = contact;
    }
}
