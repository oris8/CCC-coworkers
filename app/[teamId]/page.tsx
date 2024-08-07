import TeamMember from './_components/TeamMember';
import TeamReport from './_components/TeamReport';
import TeamTitle from './_components/TeamTitle';
import TeamToDoList from './_components/TeamToDoList';

function TeamPage({ params }: { params: { teamId: string } }) {
  return (
    <div>
      <TeamTitle />
      <TeamToDoList />
      <TeamReport />
      <TeamMember />
      {/* TODO - param값 test */}
      <p>{params.teamId} 페이지입니다.</p>
    </div>
  );
}
export default TeamPage;
