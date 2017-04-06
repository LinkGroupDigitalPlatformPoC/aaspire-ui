import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MemberCentralComponent } from './modules/views/MemberCentralComponent';
import { VerifyIdentityComponent } from './modules/views/VerifyIdentityComponent';
import { RefDataComponent } from './modules/views/RefDataComponent';

const appRoutes: Routes = [
    {path: '', component: MemberCentralComponent},
    {path:'verifyidentity/:id', component: VerifyIdentityComponent},
    {path:'refdata', component: RefDataComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);