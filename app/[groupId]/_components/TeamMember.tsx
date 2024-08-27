import InviteMemberModal from '@/components/modal-template/InviteMemberModal';
import { Member } from '@ccc-types';

import MemberCard from './MemberCard';

function TeamMember({
  members,
  groupId,
}: {
  members: Member[];
  groupId: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">멤버</p>
          <p className="text-text-default">({members.length}개)</p>
        </div>
        <InviteMemberModal groupId={groupId} />
      </div>
      <div className="my-6 grid grid-cols-2 grid-rows-2 gap-6 md:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.userId} member={member} groupId={groupId} />
        ))}
      </div>
    </div>
  );
}
export default TeamMember;
