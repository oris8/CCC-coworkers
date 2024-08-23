import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import * as React from 'react';

import DeleteTodoModal from '../modal-template/DeleteTodoModal';

function CommentEditDeleteDropdown({
  title = '',
  handleEdit,
  handleDelete,
}: {
  title?: string;
  handleEdit: (value: boolean) => void;
  handleDelete: () => void;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="수정 및 삭제 기능 제공 드롭다운"
            className="outline-none"
          >
            <KebabIcon className="h-[16px] w-[16px] hover:fill-text-tertiary md:ml-[5px]" />
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
            onClick={() => handleEdit(true)}
          >
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer flex-col justify-center"
            onClick={() => {
              setIsDeleteDialogOpen(true);
              setOpen(false);
            }}
          >
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDeleteDialogOpen && (
        <DeleteTodoModal
          type="comment"
          title={title}
          onClick={handleDelete}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </>
  );
}

export default CommentEditDeleteDropdown;
