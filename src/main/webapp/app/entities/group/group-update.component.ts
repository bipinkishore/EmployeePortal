import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from './group.service';

@Component({
    selector: 'jhi-group-update',
    templateUrl: './group-update.component.html'
})
export class GroupUpdateComponent implements OnInit {
    private _group: IGroup;
    isSaving: boolean;

    constructor(private groupService: GroupService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ group }) => {
            this.group = group;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.group.id !== undefined) {
            this.subscribeToSaveResponse(this.groupService.update(this.group));
        } else {
            this.subscribeToSaveResponse(this.groupService.create(this.group));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGroup>>) {
        result.subscribe((res: HttpResponse<IGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get group() {
        return this._group;
    }

    set group(group: IGroup) {
        this._group = group;
    }
}
