import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateTaskList } from '@/lib/api/taskList';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  taskName: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(20, { message: '최대로 입력할 수 있는 글자수는 20개입니다.' }),
});

function EditTodoListModal({
  groupId,
  taskListId,
  className = '',
}: {
  groupId: number;
  taskListId: number;
  className?: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateTaskList(groupId, taskListId, { name: values.taskName });
    router.refresh();

    form.reset();
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  // REVIEW - input에서 띄어쓰기를 하면 닫히는 경우가 있어 키다운으로 막았는데 좋은 방법 있으면 말씀해주시면 감사하겠습니다.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === ' ') {
      e.stopPropagation();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={className} asChild>
        <button type="button" onClick={handleClick}>
          수정하기
        </button>
      </DialogTrigger>
      <DialogContent
        hasCloseIcon
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <DialogTitle>할 일 목록</DialogTitle>
        <DialogDescription />
        <div className="flex w-full max-w-[280px] flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="taskName"
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="할 일 목록을 입력해주세요" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">수정하기</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditTodoListModal;
