import { NgModule } from '@angular/core';

import { EmpPortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EmpPortalSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EmpPortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EmpPortalSharedCommonModule {}
