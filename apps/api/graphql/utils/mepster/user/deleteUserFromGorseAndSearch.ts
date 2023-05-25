import recommenderClient from '../client';
import { searchIndex } from '../searchClient';

export default function deleteUserFromGorseAndSearch(user_id: string) {
    searchIndex.deleteDocument(user_id);
    recommenderClient.delete(`/user/${user_id}/`);
}
