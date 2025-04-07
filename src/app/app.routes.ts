import { Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { CheckComponent } from './check/check.component';
import { checkGuard } from './guards/check.guard';

export const routes: Routes = [
    { path: 'input', component: InputComponent },
    { path: 'check', component: CheckComponent, canActivate: [checkGuard] },
    { path: '', redirectTo: 'input', pathMatch: 'full' },
];
