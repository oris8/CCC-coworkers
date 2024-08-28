'use client';

import TitleThumbnail from '@/public/icons/thumbnail_team.svg';
import { Group } from '@ccc-types';

import GroupEditDropdown from './GroupEditDropdown';

function TeamTitle({ groupData }: { groupData: Group }) {
  const { name, id } = groupData;
  return (
    // NOTE - bg color가 border랑 같아서 일단 적용하였습니다.
    <div className="relative my-6 flex h-[64px] items-center justify-between rounded-xl bg-border px-6 py-5 text-xl font-bold">
      <p>{name}</p>
      <GroupEditDropdown groupId={id} title={name} />
      <TitleThumbnail className="md: absolute bottom-0 right-1/2 translate-x-1/2 md:right-20 md:translate-x-0" />
    </div>
  );
}
export default TeamTitle;
