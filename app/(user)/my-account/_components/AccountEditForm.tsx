import { User } from '@ccc-types';

import ProfileSettingsForm from './ProfileSettingsForm';
import SecuritySettingsForm from './SecuritySettingsForm';

interface AccountEditFormProps {
  currentUserAccountInfo: User;
}

const AccountEditForm = ({ currentUserAccountInfo }: AccountEditFormProps) => {
  const { image, nickname, email } = currentUserAccountInfo;

  return (
    <div className="relative w-full pb-12">
      {/* 인증이 필요한 Form과 아닌 Form을 분리 */}
      <ProfileSettingsForm image={image} nickname={nickname} />
      <SecuritySettingsForm email={email} />
    </div>
  );
};

export default AccountEditForm;
