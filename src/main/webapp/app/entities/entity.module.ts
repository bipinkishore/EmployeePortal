import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EmpPortalGroupModule } from './group/group.module';
import { EmpPortalContactModule } from './contact/contact.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EmpPortalGroupModule,
        EmpPortalContactModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmpPortalEntityModule {}
