import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MemberCentralComponent } from './modules/views/MemberCentralComponent';
import { VerifyIdentityComponent } from './modules/views/VerifyIdentityComponent';
import { RefDataComponent } from './modules/views/RefDataComponent';
import { MemberComponent } from './modules/views/MemberComponent';
import { CallComponent } from './modules/views/CallComponent';

const appRoutes: Routes = [
    {path: '', component: MemberCentralComponent},
    {path:'verifyidentity/:id', component: VerifyIdentityComponent},
    {path:'refdata', component: RefDataComponent},
    {path:'member', component: MemberComponent},
    {path:'member/{id}', component: MemberComponent},
    {path:'call', component: CallComponent},
    {path:'call/{id}', component: CallComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);