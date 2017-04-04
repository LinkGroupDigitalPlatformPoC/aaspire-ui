import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { DashboardComponent } from './modules/views/DashboardComponent';

const appRoutes: Routes = [
    {path: '', component: DashboardComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);