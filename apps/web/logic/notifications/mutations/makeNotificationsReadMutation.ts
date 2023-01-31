import { gql } from '@apollo/client';

const MAKE_NOTIFICATIONS_READ = gql`
    mutation makeNotificationsRead {
        makeNotificationsRead
    }
`;

export default MAKE_NOTIFICATIONS_READ;
