import models from '../../../models';


export const resolvers = {
  Query: {
    contacts(root, args, context) {
      let args_with_like = {}
      Object.keys(args).map(key => {
        args_with_like[key] = {'like': '%' + args[key] + '%'}
      })
      return models.Contact.findAll({where: args_with_like})
    },
    contact(obj, { id }, context) {
      return models.Contact.findById(id);
    }
  },
  Mutation: {
    addContact(_, {name, address, phone}){
      return models.Contact.create({name, address, phone});
    },
    updateContact(_, {id, name, address, phone}){
      return new Promise((resolve, reject) => {
        models.Contact.findOne({where:{id}})
          .then(contact => {
            contact.update({name, address, phone})
            resolve(contact)
          })
          .catch(reject)
      })
    },
    removeContact(_, {id}){
      return new Promise((resolve, reject) => {
        models.Contact.findOne({where:{id}})
          .then(contact => {
            contact.destroy()
            resolve(contact)
          })
          .catch(reject)
      })
    }
  }
}