import { formatDistance } from 'date-fns';

export default function relativeDate(date: Date) {
    return formatDistance(date, new Date(), { addSuffix: true });
}
