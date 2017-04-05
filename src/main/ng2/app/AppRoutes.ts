import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { MemberCentralComponent } from './modules/views/MemberCentralComponent';

const appRoutes: Routes = [
    {path: '', component: MemberCentralComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);