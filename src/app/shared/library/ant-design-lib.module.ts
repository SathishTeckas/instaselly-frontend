import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { IconsProviderModule } from './icons-provider.module';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzResultModule } from 'ng-zorro-antd/result';

const AntModules = [
    NzDrawerModule,
    NzListModule,
    NzImageModule,
    NzResultModule,
    NzTabsModule
]

@NgModule({
  imports: [
    ...AntModules
  ],
  exports: [
    ...AntModules
  ]
})
export class AntDesignLibraryModule { }
