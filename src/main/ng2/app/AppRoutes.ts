import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MemberCentralComponent } from './modules/views/MemberCentralComponent';
import { VerifyIdentityComponent } from './modules/views/VerifyIdentityComponent';
import { ReferenceDataComponent } from './modules/views/ReferenceDataComponent';
import { MemberTabsComponent } from './modules/views/MemberTabsComponent';
import { CallComponent } from './modules/views/CallComponent';

const appRoutes: Routes = [
    {path: '', component: MemberCentralComponent},
    {path: 'membercentral', component: MemberCentralComponent},
    {path:'verifyidentity/:id', component: VerifyIdentityComponent},
    {path:'refdata', component: ReferenceDataComponent},
    {path:'member/:id', component: MemberTabsComponent},
    {path:'member', component: MemberTabsComponent},
    {path:'call/:id', component: CallComponent},
    {path:'call', component: CallComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);