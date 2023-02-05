import { AddContact, AddContactArgs } from './controllers/support.controller';

const SUPPORT_RESOLVERS = {
    Mutation: {
        addContact(_: void, args: AddContactArgs, context: any) {
            return AddContact(args, context.getUser());
        },
    },
};

export default SUPPORT_RESOLVERS;
