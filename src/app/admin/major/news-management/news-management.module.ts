import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../../../@theme/theme.module';

import {NewsManagementRoutingModule} from './news-management-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../shares/shared.module';
import {NewsManagementComponent} from './news-management.component';
import {NewsUpdateComponent} from './news-update/news-update.component';
import {DropdownTreeviewSelectModule} from '../../../shares/directives/tree-picker/ngx-treeview/dropdown-treeview-select';
import {MapPopupComponent} from './map-popup/map-popup.component';
import { MapImageProductComponent } from './map-image-product/map-image-product.component';


@NgModule({
  imports: [
    ThemeModule,
    NewsManagementRoutingModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule,
    NbFormFieldModule,
    TranslateModule,
    NgSelectModule, SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NbSpinnerModule, NbToggleModule, DropdownTreeviewSelectModule,
  ],
  declarations: [NewsManagementComponent, NewsUpdateComponent, MapPopupComponent, MapImageProductComponent],
})
export class NewsManagementModule {
}
