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

import {NewsApprovalManagementRoutingModule} from './news-approval-management-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../shares/shared.module';
import {NewsApprovalManagementComponent} from './news-approval-management.component';
import {NewsApprovalUpdateComponent} from './news-approval-update/news-approval-update.component';
import {DropdownTreeviewSelectModule} from '../../../shares/directives/tree-picker/ngx-treeview/dropdown-treeview-select';
import {MapPopupComponent} from './map-popup/map-popup.component';
import { MapImageProductComponent } from './map-image-product/map-image-product.component';


@NgModule({
  imports: [
    ThemeModule,
    NewsApprovalManagementRoutingModule,
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
  declarations: [NewsApprovalManagementComponent, NewsApprovalUpdateComponent, MapPopupComponent, MapImageProductComponent],
})
export class NewsApprovalManagementModule {
}
