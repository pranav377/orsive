import recommenderClient from './client';

export default function removeFeedback(UserId: string, ItemId: string) {
    return recommenderClient.delete(`/feedback/${UserId}/${ItemId}/`);
}
