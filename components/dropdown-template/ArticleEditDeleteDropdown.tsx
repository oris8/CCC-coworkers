import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import { ArticleDetail } from '@ccc-types';
import * as React from 'react';

import BoardModifyModal from '../modal-template/BoardModifyModal';
import DeleteTodoModal from '../modal-template/DeleteTodoModal';

function ArticleEditDeleteDropdown({
  title = '',
  className = 'w-[16px] h-[16px]',
  handleDelete,
  article,
}: {
  title?: string;
  className?: string;
  handleDelete: () => void;
  article: ArticleDetail;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isModifyDialogOpen, setIsModifyDialogOpen] =
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
            <KebabIcon className={`${className} hover:fill-text-tertiary`} />
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
            onClick={() => {
              setIsModifyDialogOpen(true);
              setOpen(false);
            }}
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
          type="article"
          title={title}
          onClick={handleDelete}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
      {isModifyDialogOpen && (
        <BoardModifyModal
          onClose={() => setIsModifyDialogOpen(false)}
          article={article}
        />
      )}
    </>
  );
}

export default ArticleEditDeleteDropdown;
