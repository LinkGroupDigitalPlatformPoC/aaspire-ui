import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MemberCentralComponent } from './modules/views/MemberCentralComponent';
import { VerifyIdentityComponent } from './modules/views/VerifyIdentityComponent';
import { RefDataComponent } from './modules/views/RefDataComponent';
import { MemberComponent } from './modules/views/MemberComponent';
import { CallComponent } from './modules/views/CallComponent';

const appRoutes: Routes = [
    {path: '', component: MemberCentralComponent},
    {path: 'membercentral', component: MemberCentralComponent},
    {path:'verifyidentity/:id', component: VerifyIdentityComponent},
    {path:'refdata', component: RefDataComponent},
    {path:'member/:id', component: MemberComponent},
    {path:'member', component: MemberComponent},
    {path:'call/:id', component: CallComponent},
    {path:'call', component: CallComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);