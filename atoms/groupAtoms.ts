import { atomWithStorage } from 'jotai/utils';

const selectedGroupIdAtom = atomWithStorage<number | null>(
  'selectedGroupId',
  null
);

export default selectedGroupIdAtom;
