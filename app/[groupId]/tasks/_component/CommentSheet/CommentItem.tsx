import EditDeleteDropdown from '@/components/dropdown-template/EditDeleteDropdown';
import { dateFormatter } from '@/lib/utils';
import { Comment } from '@ccc-types';
import Image from 'next/image';

function CommentItem({ content, user }: Comment) {
  return (
    <div className="flex flex-col gap-[16px] border-b pb-[16px]">
      <div className="flex w-full items-start justify-between">
        <p className="text-sm font-normal text-text-primary">{content}</p>
        <EditDeleteDropdown
          className="h-[16px] min-w-[16px] md:ml-[5px]"
          onClick={() => console.log('hi')}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-[32px]">
            <Image
              src="/images/basic_profile.png"
              alt="기본 프로필 이미지"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span className="text-sm font-medium">{user.nickname}</span>
        </div>
        <span className="text-sm font-medium">
          {dateFormatter.toTimeDifference(user.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default CommentItem;
