import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import * as React from 'react';

import DeleteTodoListModal from './DeleteTodoListModal';
import EditTodoListModal from './EditTodoListModal';

function TodoListEditDropdown({
  title = '',
  groupId,
  taskListId,
}: {
  title?: string;
  groupId: number;
  taskListId: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="수정 및 삭제 기능 제공 드롭다운"
          className="outline-none"
        >
          <KebabIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem
          className="flex cursor-pointer flex-col justify-center"
          asChild
        >
          <EditTodoListModal
            title={title}
            groupId={groupId}
            taskListId={taskListId}
            className="w-full cursor-pointer"
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col justify-center" asChild>
          <DeleteTodoListModal
            title={title}
            groupId={groupId}
            taskListId={taskListId}
            className="w-full cursor-pointer"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TodoListEditDropdown;
