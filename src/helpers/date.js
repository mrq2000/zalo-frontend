import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

dayjs.locale('vi');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const getRelativeTimeFromNow = (dateTime, withoutSuffix) => dayjs(dateTime).fromNow(withoutSuffix);

export const getLocalizedFormat = (dateTime) => dayjs(dateTime).format('ll');
export const getLocalizedFormatDateTime = (dateTime) => dayjs(dateTime).format('lll');
export const formatDate = (dateTime) => dayjs(dateTime).format('YYYY-MM-DD');
export const formatDateTime = (dateTime) => dayjs(dateTime).format('HH:mm DD/MM/YYYY');

export const CURRENT_DATE = dayjs().format('YYYY-MM-DD');
