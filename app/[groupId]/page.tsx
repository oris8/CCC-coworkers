import fetchAPI from '@/lib/api/fetchAPI';
import { isUserAdminOfGroup } from '@/lib/utils';

import TeamMember from './_components/TeamMember';
import TeamReport from './_components/TeamReport';
import TeamTitle from './_components/TeamTitle';
import TeamToDoList from './_components/TeamToDoList';

async function TeamPage({ params }: { params: { groupId: number } }) {
  const { data, error } = await fetchAPI.Group(params.groupId);
  // TEST - 헤더에 있으므로 또 다시 불러와도 괜찮은가?
  const { data: userData } = await fetchAPI.User();

  // TODO: 에러 처리 추가
  if (error || !data) {
    return <div>{error.info}</div>;
  }

  const { taskLists = [], members = [] } = data || {};

  const isAdmin = isUserAdminOfGroup(userData!, params.groupId);

  return (
    <div>
      <TeamTitle groupData={data} />
      <TeamToDoList taskLists={taskLists} groupId={params.groupId} />
      {isAdmin ? (
        <TeamReport taskLists={taskLists} />
      ) : (
        <div className="xl:mt-15 mt-12" />
      )}
      <TeamMember members={members} groupId={params.groupId} />
    </div>
  );
}
export default TeamPage;
