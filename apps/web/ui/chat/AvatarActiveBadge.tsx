import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const AvatarActiveBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    },
}));

export default AvatarActiveBadge;
