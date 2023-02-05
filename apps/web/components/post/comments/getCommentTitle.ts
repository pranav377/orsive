import moment from 'moment';

export default function getCommentTitle(
    createdAt: string,
    name: string,
    type = 'Comment'
) {
    return `${moment(createdAt).format(
        'MMM DD, YYYY'
    )} - ${name} posted a ${type}`;
}
