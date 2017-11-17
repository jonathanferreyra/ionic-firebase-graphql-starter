import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class ContactsProvider {

  constructor(private apollo: Apollo) {
  }

  all(params: object={}){
    const allQuery = gql`
      query {
        contacts {
          id
          name
          address
          phone
        }
      }
    `;
    return this.apollo.query({
      query: allQuery,
      variables: params,
      fetchPolicy: 'network-only'
    })
  }

  findByName(name: string){
    const allQuery = gql`
      query findContacts($name: String!){
        contacts(name: $name) {
          id
          name
          address
          phone
        }
      }
    `;
    return this.apollo.query({
      query: allQuery,
      variables: {name},
    })
  }

  add({name, address, phone}){
    const addMutation = gql`
      mutation addContact($name:String!, $address:String, $phone:String){
        addContact(name: $name, address: $address, phone: $phone) {
          id
          name
          address
          phone
        }
      }
    `;
    return this.apollo.mutate({
      mutation: addMutation,
      variables: {name, address, phone}
    }).toPromise();
  }

  update({id, name, address, phone}){
    const updateMutation = gql`
      mutation updateContact($id:ID!, $name:String!, $address:String, $phone:String){
        updateContact(id: $id, name: $name, address: $address, phone: $phone) {
          id
          name
          address
          phone
        }
      }
    `;
    return this.apollo.mutate({
      mutation: updateMutation,
      variables: {id, name, address, phone}
    }).toPromise();
  }

  remove(id){
    const removeMutation = gql`
      mutation removeContact($id:ID!){
        removeContact(id: $id) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation: removeMutation,
      variables: {id}
    }).toPromise();
  }

}
