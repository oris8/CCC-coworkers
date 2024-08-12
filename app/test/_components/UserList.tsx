import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

import UserItem from './UserItem';

type User = {
  id: number;
  name: string;
  email: string;
};

const dummyData: User[] = [
  { id: 1, name: 'jm', email: 'jm@example.com' },
  { id: 2, name: 'hs', email: 'hs@example.com' },
  { id: 3, name: 'uk', email: 'uk@example.com' },
];

function UserList() {
  const [userData, setUserData] = useState<User[]>(dummyData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setUserData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <div>
      UserList
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={userData}>
          {userData.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
export default UserList;
