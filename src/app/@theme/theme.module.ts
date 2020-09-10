import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {DialogModule} from '../@core/modules/dialog';
import {PickerModule} from '../@core/modules/picker';
import {ToastModule} from '../@core/modules/toast';

import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {PortalModule} from '@angular/cdk/portal';
import {ObserversModule} from '@angular/cdk/observers';


import {COMPONENTS, ENTRY_COMPONENTS, PIPES, DIRECTIVES} from './index';

const MATERIAL_PART = [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatAutocompleteModule,
    PortalModule,
    ObserversModule,
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        IonicModule,
        MATERIAL_PART,
        DialogModule,
        PickerModule,
        ToastModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MATERIAL_PART,
        RouterModule,
        DialogModule,
        PickerModule,
        ToastModule,
        ...COMPONENTS,
        ...PIPES
    ],
    declarations: [...COMPONENTS, ...ENTRY_COMPONENTS, ...PIPES, ...DIRECTIVES],
    entryComponents: [ENTRY_COMPONENTS],
    providers: []
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders<ThemeModule> {
        return {
            ngModule: ThemeModule,
            providers: []
        } as ModuleWithProviders<ThemeModule>;
    }
}
