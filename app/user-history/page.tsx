import mockHistory from '@/public/mockData/myHistory.json';

import HistoryList from './_components/HistoryList';

function HistoryPage() {
  return (
    <section
      className={`center mx-auto w-full ${mockHistory.length === 0 && 'h-screen'} max-w-[1232px] flex-col gap-6 px-4`}
    >
      <h1 className="mr-auto mt-5 text-[20px] font-bold">마이 히스토리</h1>
      {mockHistory.length !== 0 ? (
        mockHistory.map((task) => <HistoryList tasks={task.tasksDone} />)
      ) : (
        <div className="flex h-full items-center">
          <p className="text-[14.8px] font-medium text-text-default">
            아직 히스토리가 없습니다.
          </p>
        </div>
      )}
    </section>
  );
}

export default HistoryPage;
