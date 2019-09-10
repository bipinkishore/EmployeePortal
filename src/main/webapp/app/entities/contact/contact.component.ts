import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IContact } from 'app/shared/model/contact.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ContactService } from './contact.service';

@Component({
    selector: 'jhi-contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit, OnDestroy {
    currentAccount: any;
    contacts: IContact[];
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
    gid: any;
    pagination: any;
    filtercriteria: any;
    searchlistbyname:any;
    searchlistbystatus:any;
    searchlistbyemail:any;

    constructor(
        private contactService: ContactService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.newitemsPerPage = this.itemsPerPage;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.gid = data.gid;
            this.pagination = true;
            /*this.numbers = new Array(50).fill().map((x,i)=>i);*/ // [0,1,2,3,4,...,100]
        });
    }

    loadAll() {
        this.pagination = true;
        this.contactService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                gid: this.gid
            })
            .subscribe(
                (res: HttpResponse<IContact[]>) => this.paginateContacts(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    loadNewPage(page: number) {
        if (this.newitemsPerPage !== this.itemsPerPage) {
            this.previousPage = page;
            this.page = 1;
            this.itemsPerPage = this.newitemsPerPage;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/group/'+ this.gid+'/contact'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate,
                gid: this.gid + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/contact',
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
        this.registerChangeInContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContact) {
        return item.id;
    }

    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe('contactListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    searchByName(name: string){
         this.contactService.searchByName(this.gid, name).subscribe(
            (res: HttpResponse<IContact[]>) => {
                this.contacts = res.body;
                this.pagination = false;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );        
    }

    searchByStatus(status: string){
        this.contactService.searchByStatus(this.gid, status).subscribe(
            (res: HttpResponse<IContact[]>) => {
                this.contacts = res.body;
                this.pagination = false;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    searchByEmail(email: string){
        this.contactService.searchByEmail(this.gid, email).subscribe(
            (res: HttpResponse<IContact[]>) => {
                this.contacts = res.body;
                this.pagination = false;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    clearFilter(type: string){
        this.searchlistbyname=undefined;
        this.searchlistbystatus=undefined;
        this.searchlistbyemail=undefined;
        if(type==='ALL'){
            this.loadAll();    
        }
    }

    private paginateContacts(data: IContact[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.contacts = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
