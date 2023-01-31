import { useProfileButton } from '../../hooks/pages/profile/buttons/useProfileButton';
import { ContentStateActions } from '../../store/slices/contentSlice';
import Button from '../base/button';

export function EditProfileButton(props: { onClick: () => void }) {
    return (
        <Button
            onClick={props.onClick}
            className={'ripple-bg-slate-700 mt-1 rounded-full p-3'}
        >
            Edit Profile
        </Button>
    );
}

export function FollowButton(props: { username: string }) {
    const { user, dispatch, amIFollowing, followProfile } = useProfileButton(
        props.username
    );
    return (
        <Button
            className={`${
                amIFollowing ? 'ripple-bg-slate-700' : 'ripple-bg-blue-700'
            } mt-1 rounded-full`}
            onClick={() => {
                if (!user.is) {
                    dispatch(ContentStateActions.setShowLoginDialog(true));
                } else {
                    followProfile();
                }
            }}
        >
            {amIFollowing ? 'Following' : 'Follow'}
        </Button>
    );
}
