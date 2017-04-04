import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './AppModule';
import './modules/common/RxJsOperators';

console.log('Running JIT compiled');
platformBrowserDynamic().bootstrapModule(AppModule);