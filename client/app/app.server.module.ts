import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import { HttpModule } from '@angular/http';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import { TaskService } from './services/task.service';
import { AppRoutingModule } from './app.routing';


@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    HttpModule,
    AppRoutingModule,
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
  ],
  providers: [ TaskService ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent]
})
export class AppServerModule {}
