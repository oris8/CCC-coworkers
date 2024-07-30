import { Button } from '@/components/ui/button';

export default {
  title: 'Test/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['default', 'danger', 'outlined', 'floating'],
      control: 'radio',
    },
    size: {
      options: ['x-small', 'default', 'icon'],
      control: 'radio',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export const Default = {
  args: {
    children: '기본 버튼',
    variant: 'default',
    size: 'default',
  },
};

export const Danger = {
  args: {
    children: '위험 버튼',
    variant: 'danger',
    size: 'default',
  },
};

export const Outlined = {
  args: {
    children: '아웃라인 버튼',
    variant: 'outlined',
    size: 'default',
  },
};

export const Floating = {
  args: {
    children: '플로팅 버튼',
    variant: 'floating',
    size: 'default',
  },
};

export const FloatingOutlined = {
  args: {
    children: '플로팅 아웃라인 버튼',
    variant: 'floating-outlined',
    size: 'default',
  },
};
