import fetchAPI from '@/lib/api/fetchAPI';

import TeamMember from './_components/TeamMember';
import TeamReport from './_components/TeamReport';
import TeamTitle from './_components/TeamTitle';
import TeamToDoList from './_components/TeamToDoList';

async function TeamPage({ params }: { params: { groupId: number } }) {
  const { data, error } = await fetchAPI.Group(params.groupId);

  // TODO: 에러 처리 추가
  if (error) {
    return <div>{error.info}</div>;
  }

  const { taskLists = [], members = [] } = data || {};

  return (
    <div>
      <TeamTitle groupData={data} />
      {/* REVIEW - groupId params vs useParams (프롭 드릴링 때문) */}
      <TeamToDoList taskLists={taskLists} groupId={params.groupId} />
      <TeamReport taskLists={taskLists} />
      <TeamMember members={members} groupId={params.groupId} />
    </div>
  );
}
export default TeamPage;
