import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './AppModule';
import './modules/common/RxJsOperators';

// services
// import { SharedService } from './modules/services/Shared.service';

console.log('Running JIT compiled');
platformBrowserDynamic().bootstrapModule(AppModule);