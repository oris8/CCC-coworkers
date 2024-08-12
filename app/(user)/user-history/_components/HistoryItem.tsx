import { dateFormatter } from '@/lib/utils';
import CheckIcon from '@/public/icons/user-history/check_icon.svg';
import { Task } from '@ccc-types';

function HistoryItem({ task }: { task: Task }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-customBackground-secondary px-[14px] py-[10px]">
      <div className="flex gap-1">
        <CheckIcon />
        <p className="mr-[10px]">
          <s>{task.name}</s>
        </p>
      </div>
      <p className="text-customBackground-teritiary">
        {dateFormatter.toTimeDifference(task.updatedAt)} 완료
      </p>
    </div>
  );
}

export default HistoryItem;
