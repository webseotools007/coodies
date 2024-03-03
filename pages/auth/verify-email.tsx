import { useCallback, useEffect, useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import OtpInput from 'react-otp-input';
import Image from 'next/image';
import Button, { ButtonType } from '../../components/common/Button';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';
import { useRouter } from 'next/router';
import { PostData } from '../../Utils/fetchData';
import { UseAppDispatch, UseAppSelector } from '../../store';
import { getUserState, setMyInfo, setUserInfo } from '../../store/user/basicInfo';
import { getAnalytics, logEvent } from 'firebase/analytics';
import LoadingAnimation from '../../components/common/loadingAnimation';

const FlexContainer = Styled.div`
    display: flex;
    min-height: 100vh;
`;

const FlexItemLeft = Styled.div`
    width: 821px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FlexItemRight = Styled.div`
    background: #F3F3F4;
    width: calc(100% - 821px);
    display: flex;
    align-items: center;
    position: relative;
`;

const BackgroundImg = Styled.div`
    width: 626px;
    position: absolute;
    left: -59px;
`;

const OtpInputClass = css`
    width: 50px !important;
    height: 54px;
    padding: 11px 19px;
    color: #2255f7;
    border-radius: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    background: #e9ebff;
    border: 1px solid transparent;
    &:focus {
        background: white;
        border: 1px solid #2255f7;
        outline: none;
    }
    &:not([value='']) {
        background: white;
        border: 1px solid #2255f7;
    }
`;

const OtpContainerClass = css`
    display: flex;
    gap: 8px;
    margin: 40px 0;
    justify-content: center;
`;

const OtpErrorClass = css`
    border: 1px solid red;
`;

const VerifyEmailPage: React.FC = () => {
    const router = useRouter()
    const { email } = router.query
    const dispatch = UseAppDispatch();
    const { _id } = UseAppSelector(getUserState);
    const [otp, setOpt] = useState<string>();
    const [loading, setLoading] = useState(false)


    const handleOtpChange = (e: string) => {

        setOpt(e);
    };

    const sendOtp = useCallback(async () => {
        setOpt('')

        try {
            const res: any = await PostData('/api/users/otp/generate', JSON.stringify({ email }))
            if (res.status == 302) {
                alert("user is already verified. Please login")
                return router.push(`/auth/signin`)
            }
            if (res?.error) throw res?.error
        } catch (e) {
            console.error(e)
        }

    }, [email])

    const veryOtp = useCallback(async () => {
        setLoading(true)
        try {
            const analytics = getAnalytics();


            const res: any = await PostData('/api/users/otp/verify', JSON.stringify({ email, otp }))
            if (res?.status != 200) {
                throw res?.message
            }
            alert("user is verified");
            delete res.status
            dispatch(setMyInfo(res))
            logEvent(analytics, `email signup complete`);
            router.push(`/${res.userName}`)
        } catch (e) {
            alert(JSON.stringify(e))
            console.error(e)
        }
        setLoading(false)


    }, [email, otp])
    useEffect(() => {
        if (_id) {
            router.back()
        }
    }, [])

    return (
        <FlexContainer>
            <LoadingAnimation open={loading} />
            {!loading && <FlexItemLeft>

                <div>
                    <SectionMetaInfo
                        label='Enter Code'
                        description='We sent OTP code to your email address'
                    />
                    <OtpInput
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={4}
                        hasErrored={false}
                        errorStyle={cx(OtpErrorClass)}
                        inputStyle={cx(OtpInputClass)}
                        containerStyle={cx(OtpContainerClass)}
                        isInputNum={true}
                    />
                    <Button type={ButtonType.PRIMARY} label='Verify Email' onClick={e => {
                        veryOtp()
                    }} />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={sendOtp}
                            type={ButtonType.TERTIARY}
                            label="Didn't get the code?"
                            labelWithLink='Resend'
                        />
                    </div>
                </div>
            </FlexItemLeft>}
            <FlexItemRight>
                <BackgroundImg>
                    <Image
                        alt='avata-icon'
                        width={625}
                        height={611}
                        src='/images/auth/otp-avatar.png'
                        layout='responsive'
                    />
                </BackgroundImg>
            </FlexItemRight>
        </FlexContainer>
    );
};

export default VerifyEmailPage;


