'use client';

import WithDrawalModal from '@/components/modal-template/WithDrawalModal';
import { deleteUser } from '@/lib/api/user';
import { toast } from 'sonner';

const WithdrawalModal = () => {
  const withdrawalUser = async () => {
    const res = await deleteUser();
    if (res?.error) {
      toast.error(res.error.info);
    }
  };

  return <WithDrawalModal onClick={withdrawalUser} />;
};

export default WithdrawalModal;
