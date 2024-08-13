import TeamMember from './_component/TeamMember';
import TeamReport from './_component/TeamReport';
import TeamTitle from './_component/TeamTitle';
import TeamToDoList from './_component/TeamToDoList';

function TeamPage({ params }: { params: { groupId: string } }) {
  return (
    <div>
      <TeamTitle />
      <TeamToDoList />
      <TeamReport />
      <TeamMember />
      {/* TODO - param값 test */}
      <p>{params.groupId} 페이지입니다.</p>
    </div>
  );
}
export default TeamPage;
