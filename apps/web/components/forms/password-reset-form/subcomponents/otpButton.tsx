import getOTP from '../../../../logic/auth/getOTP';
import Button from '../../../base/button';
import { useTimer } from 'react-timer-hook';
import { useState } from 'react';
import classNames from '../../../utils/classnames';
import getPasswordResetOTP from '../../../../logic/auth/getPasswordResetOTP';

function getOneMinuteTime() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);

    return time;
}

export default function OTPButton(props: { email: string }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { restart, seconds } = useTimer({
        expiryTimestamp: getOneMinuteTime(),
        onExpire: () => setIsButtonDisabled(false),
    });

    return (
        <>
            <Button
                type="button"
                disabled={isButtonDisabled}
                onClick={() => {
                    getPasswordResetOTP(props.email);
                    setIsButtonDisabled(true);
                    restart(getOneMinuteTime());
                }}
                className="ripple-bg-blue-700 mt-2 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed"
            >
                Resend OTP
            </Button>
            <span
                className={classNames(
                    'p-4',
                    seconds !== 0 ? 'text-red-600' : 'text-green-600'
                )}
            >
                {seconds}
            </span>
        </>
    );
}
