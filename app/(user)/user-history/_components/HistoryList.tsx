import { dateFormatter } from '@/lib/utils';
import { Task } from '@ccc-types';

import HistoryItem from './HistoryItem';

interface SortedHistoryList {
  [formattedDate: string]: Task[];
}

const HistoryList = ({ tasksDone }: { tasksDone: Task[] }) => {
  // NOTE - tasksDone 배열 하나에 모든 완료한 일이 합쳐져서 오므로, 날짜에 따라 요소를 분리하고 재배열함
  const sortedHistoryList: SortedHistoryList = tasksDone.reduce(
    (newArr, task) => {
      if (task.doneAt) {
        // NOTE - 배열의 키로서 날짜 지정
        const formattedDate = dateFormatter.toConvertDate(
          new Date(task.doneAt).toISOString().split('T')[0],
          'dotFormat'
        );
        // NOTE - 만약 날짜가 같으면 같은 배열에 넣고, 아니라면 해당 날짜를 기준으로 새로운 배열을 생성
        return {
          ...newArr,
          [formattedDate]: newArr[formattedDate]
            ? [...newArr[formattedDate], task]
            : [task],
        };
      }
      // NOTE - 최종적으로 합쳐진 배열들을 newArr로 리턴
      return newArr;
    },
    {} as SortedHistoryList
  );

  return (
    <div className="flex w-full flex-col gap-4">
      {Object.keys(sortedHistoryList).map((date) => (
        <>
          <h2>{date}</h2>
          {sortedHistoryList[date].map((task) => (
            <HistoryItem key={task.id} task={task} />
          ))}
        </>
      ))}
    </div>
  );
};

export default HistoryList;
