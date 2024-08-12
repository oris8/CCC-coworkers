import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type User = {
  id: number;
  name: string;
  email: string;
};

function UserItem(props: { user: User }) {
  const { user } = props;
  const { id, name, email } = user;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      transition: { duration: 350, easing: 'ease-in-out' },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="mx-auto mt-2 flex w-[1000px] justify-between gap-2 rounded bg-pink-300 p-4 shadow-md"
    >
      <div>{id}</div>
      <div>{name}</div>
      <div>{email}</div>
    </div>
  );
}
export default UserItem;
