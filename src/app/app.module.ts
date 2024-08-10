import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { KanbanDashboardComponent} from './kanbandashboard/kanbandashboard.component';
import { KanbanCardComponent } from './kanban-card/kanban-card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({ declarations: [
        AppComponent,
        KanbanDashboardComponent,
        KanbanCardComponent,
        LoginComponent,
        RegisterComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        DragDropModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'kanbandashboard', component: KanbanDashboardComponent },
            { path: '', redirectTo: '/login', pathMatch: 'full' },
        ])], providers: [provideAnimationsAsync('noop'), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
