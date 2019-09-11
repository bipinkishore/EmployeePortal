import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IGroup } from 'app/shared/model/group.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { GroupService } from './group.service';

@Component({
    selector: 'jhi-group',
    templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit, OnDestroy {
    currentAccount: any;
    groups: IGroup[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    newitemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    pagination: any;
    filtercriteria: any;
    searchlistbyname:any;
    searchlistbystatus:any;
    numbers: number[]=[];

    constructor(
        private groupService: GroupService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.pagination = true;
            this.filtercriteria = "NONE";
            for (let i = 1; i <= 50; i++) {
                this.numbers.push(i);
             }
        });
    }

    loadAll() {
        this.pagination = true;
        this.groupService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IGroup[]>) => this.paginateGroups(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    loadNewPage() {
        this.previousPage = this.page;
        this.page = 0;
        this.transition();
    }

    transition() {
        this.router.navigate(['/group'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/group',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGroup) {
        return item.id;
    }

    registerChangeInGroups() {
        this.eventSubscriber = this.eventManager.subscribe('groupListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    searchByName(name: string){
         this.groupService.searchByName(name).subscribe(
            (res: HttpResponse<IGroup[]>) => {
                this.groups = res.body;
                this.pagination = false;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );        
    }

    searchByStatus(status: string){
        this.groupService.searchByStatus(status).subscribe(
            (res: HttpResponse<IGroup[]>) => {
                this.groups = res.body;
                this.pagination = false;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    clearFilter(type: string){
        this.searchlistbyname=undefined;
        this.searchlistbystatus=undefined;
        if(type==='NONE'){
            this.loadAll();    
        }
    }
    private paginateGroups(data: IGroup[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.groups = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
