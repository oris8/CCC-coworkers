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
      {Object.keys(sortedHistoryList)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((date) => (
          <div key={date} className="flex flex-col gap-4">
            <h2>{date}</h2>
            {sortedHistoryList[date]
              .sort(
                (a, b) =>
                  new Date(b.doneAt!).getTime() - new Date(a.doneAt!).getTime()
              ) // 각 날짜의 task를 최신순으로 정렬
              .map((task) => (
                <HistoryItem key={task.id} task={task} />
              ))}
          </div>
        ))}
    </div>
  );
};

export default HistoryList;
