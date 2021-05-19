import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeComponent} from './homes/home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./sys_config/users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'roles',
      loadChildren: () => import('./sys_config/roles/roles.module')
        .then(m => m.RolesModule),
      data: {
        breadcrumb: 'Quản lý nhóm quyền'
      }
    },
    {
      path: 'action',
      loadChildren: () => import('./sys_config/actions/actions.module')
        .then(m => m.ActionsModule),
    },
    {
      path: 'color',
      loadChildren: () => import('./sys_config/colors/colors.module')
        .then(m => m.ColorsModule),
    },
    {
      path: 'size',
      loadChildren: () => import('./sys_config/sizes/sizes.module')
        .then(m => m.SizesModule),
    },
    {
      path: 'objects',
      loadChildren: () => import('./sys_config/objects/objects.module')
        .then(m => m.ObjectsModule),
    },
    {
      path: 'image-management',
      loadChildren: () => import('./major/image-management/image-management.module')
        .then(m => m.ImageManagementModule),
    },
    {
      path: 'category',
      loadChildren: () => import('./major/category/category.module')
        .then(m => m.CategoryModule),
    },
    {
      path: 'type-disease',
      loadChildren: () => import('./major/type-disease/type-disease.module')
        .then(m => m.TypeDiseaseModule),
    }, {
      path: 'general-signs',
      loadChildren: () => import('./major/general-signs/general-signs.module')
        .then(m => m.GeneralSignsModule),
    }, {
      path: 'test-disease',
      loadChildren: () => import('./major/test-disease/test-disease.module')
        .then(m => m.TestDiseaseModule),
    }, {
      path: 'symptom',
      loadChildren: () => import('./major/type-symptom/type-symptom.module')
        .then(m => m.TypeSymptomModule),
    },
    {
      path: 'products-selling',
      loadChildren: () => import('./major/products-selling/products-selling.module')
        .then(m => m.ProductsSellingModule),
    },
    {
      path: 'customer-selling',
      loadChildren: () => import('./major/customer-selling/customer-selling.module')
        .then(m => m.CustomerSellingModule),
    },
    {
      path: 'statistical',
      loadChildren: () => import('./major/statistical/statistical.module')
        .then(m => m.StatisticalModule),
    },
    {
      path: 'news-management',
      loadChildren: () => import('./major/news-management/news-management.module')
        .then(m => m.NewsManagementModule),
    },
    {
      path: 'news-approval-management',
      loadChildren: () => import('./major/news-approval-management/news-approval-management.module')
        .then(m => m.NewsApprovalManagementModule),
    },
    {
      path: 'export-goods-management',
      loadChildren: () => import('./major/export-goods-management/export-goods-management.module')
        .then(m => m.ExportGoodsManagementModule),
    },
    {
      path: 'import-goods-management',
      loadChildren: () => import('./major/import-goods-management/import-goods-management.module')
        .then(m => m.ImportGoodsManagementModule),
    },
    {
      path: 'logs',
      loadChildren: () => import('./sys_config/logs/logs.module')
        .then(m => m.LogsModule),
    },
    {
      path: 'layout',
      loadChildren: () => import('./demo/layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./demo/ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./demo/modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./demo/charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./demo/editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./homes/tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
