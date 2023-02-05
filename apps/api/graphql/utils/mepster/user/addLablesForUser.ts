import recommenderClient from '../client';

export default async function addLabelsForUser(
    Labels: Array<string>,
    userId: string
) {
    return recommenderClient.patch(`/user/${userId}`, {
        Labels,
    });
}
