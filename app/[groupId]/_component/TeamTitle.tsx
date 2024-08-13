'use client';

import Gear from '@/public/icons/gear.svg';
import TitleThumbnail from '@/public/icons/thumbnail_team.svg';

function TeamTitle() {
  return (
    // NOTE - bg color가 border랑 같아서 일단 적용하였습니다.
    <div className="relative my-6 flex h-[64px] items-center justify-between rounded-xl bg-border px-6 py-5 text-xl font-bold">
      <p>Team</p>
      <Gear />
      <TitleThumbnail className="md: absolute bottom-0 right-1/2 translate-x-1/2 md:right-20 md:translate-x-0" />
    </div>
  );
}
export default TeamTitle;
