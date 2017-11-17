import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PAGES } from './app.pages';
import { ContactsProvider } from '../providers/contacts';
import { GraphqlProvider } from '../providers/graphql';
import { UtilsProvider } from '../providers/utils';

// GraphQL stuff
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_URL } from './app.configs';


@NgModule({
  declarations: [
    MyApp,
    PAGES
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {mode: 'md'}),
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PAGES
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactsProvider,
    GraphqlProvider,
    UtilsProvider
  ]
})
export class AppModule {

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
      this.createApolloClient()
  }

  createApolloClient(){
      this.apollo.create({
        link: this.httpLink.create({ uri: GRAPHQL_URL }),
        cache: new InMemoryCache()
      });
  }

}
