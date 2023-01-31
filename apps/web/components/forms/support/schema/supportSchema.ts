import * as yup from 'yup';

export const SUPPORT_SCHEMA = yup.object({
    type: yup
        .string()
        .required('Type is required')
        .oneOf(['bug_report', 'feature_request', 'business_inquiry', 'others']),
    content: yup
        .string()
        .required('Content is required')
        .max(1000, "You can't have more than 1000 characters"),
});
