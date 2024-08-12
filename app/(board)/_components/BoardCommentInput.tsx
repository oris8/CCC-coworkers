import { Button } from '@/components/ui/button';

function BoardCommentInput() {
  return (
    <div className="mt-20 flex flex-col gap-4">
      <p className="font-medium md:text-xl md:font-bold">댓글달기</p>
      {/* TODO - react query 혹은 shadCN 폼 형식으로 변경할 것 */}
      <textarea
        className="min-h-[104px] w-full resize-none rounded-xl border bg-background-secondary px-4 py-2 md:px-6 md:py-4"
        placeholder="댓글을 입력해주세요."
      />
      <Button className="ml-auto h-[32px] w-[74px] text-sm md:h-12 md:w-[184px] md:text-base">
        등록
      </Button>
    </div>
  );
}
export default BoardCommentInput;
