import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';

@Injectable()
export class GraphqlProvider {

  constructor(private apollo: Apollo) {

  }

  query(query:DocumentNode, variables: object={}){
     return this.apollo.query({query:query, variables:variables});
  }

  watchQuery(query:DocumentNode, variables: object={}){
     return this.apollo.watchQuery({query, variables});
  }

  mutate(mutation:DocumentNode, variables: object={}){
    return this.apollo.mutate({mutation, variables}).toPromise();
  }

}