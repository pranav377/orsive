import prisma from "../../utils/data/dbClient";

const FEATURE_RESOLVERS = {
  Query: {
    features() {
      return prisma.feature.findMany();
    },
  },
};

export default FEATURE_RESOLVERS;
