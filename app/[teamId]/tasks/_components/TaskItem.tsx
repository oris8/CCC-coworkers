import EditDeleteDropdown from '@/components/dropdown-template/EditDeleteDropdown';
import { dateFormatter } from '@/lib/utils';
import CalenderNoBtnIcon from '@/public/icons/list/calender_no_btn.svg';
import ClockIcon from '@/public/icons/list/clock_icon.svg';
import CommentIcon from '@/public/icons/list/comment_icon.svg';
import DailyIcon from '@/public/icons/list/daily_task_icon.svg';
import { Task } from '@ccc-types';

import CheckboxReactHookFormSingle from './Checkbox';
import CommentSheet from './CommentSheet';

const frequencyTypeObj = {
  DAILY: '매일 반복',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
  ONCE: '한번',
};

const textClass = `text-xs font-normal text-text-default`;

function TaskItem({ name, updatedAt, frequency, doneAt }: Task) {
  // NOTE - 따로 task를 완료했는지에 대한 값이 오지 않아 doneAt이 있는지를 기준으로 임시로 작성했습니다!
  const done = !!doneAt;
  const taskType = frequencyTypeObj[frequency];

  return (
    <CommentSheet done={done}>
      <div className="flex w-full cursor-pointer flex-col gap-3 rounded-[10px] bg-background-secondary px-[14px] py-[12px]">
        <div className="flex w-full justify-between">
          <CheckboxReactHookFormSingle task={name} done={done} />
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              <CommentIcon />
              <p className={textClass}>3</p>
            </div>
            <EditDeleteDropdown title={name} />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <CalenderNoBtnIcon />
            <p className={textClass}>
              {dateFormatter.toConvertDate(updatedAt, 'koreanFullDate')}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon />
            <p className={textClass}>{dateFormatter.toTime(updatedAt)}</p>
          </div>
          <div className="flex items-center gap-1">
            <DailyIcon />
            <p className={textClass}>{taskType}</p>
          </div>
        </div>
      </div>
    </CommentSheet>
  );
}

export default TaskItem;
