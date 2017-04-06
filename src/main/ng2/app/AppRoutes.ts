import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MemberCentralComponent } from './modules/views/MemberCentralComponent';
import { VerifyIdentityComponent } from './modules/views/VerifyIdentityComponent';

const appRoutes: Routes = [
    {path: '', component: MemberCentralComponent},
    {path:'verifyidentity/:id', component: VerifyIdentityComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);