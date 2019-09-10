import { Routes } from '@angular/router';

import { loginRoute } from './';

const SHARED_ROUTES = [loginRoute];

export const sharedState: Routes = [
    {
        path: '',
        children: SHARED_ROUTES
    }
];
