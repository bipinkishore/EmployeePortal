import { Route } from '@angular/router';

import { JhiLoginModalComponent } from './login.component';

export const loginRoute: Route = {
    path: 'login',
    component: JhiLoginModalComponent,
    data: {
        authorities: [],
        pageTitle: 'sign in'
    }
};
