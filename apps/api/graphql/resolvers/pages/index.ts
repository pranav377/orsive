import ORSIC_RESOLVERS from './orsic/orsic.resolver';
// import FORUM_RESOLVERS from "./forum/forum.resolver";
import IMAGE_RESOLVERS from './image/image.resolver';

const PAGE_RESOLVERS = [IMAGE_RESOLVERS, ORSIC_RESOLVERS];

export default PAGE_RESOLVERS;
