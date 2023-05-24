/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/

import prisma from './graphql/utils/data/dbClient';

(async () => {
    await prisma.role.create({
        data: {
            name: 'Mod',
            weight: 0.7,
            user: {
                connect: {
                    email: 'orsiveofficial@gmail.com',
                },
            },
        },
    });
})();
