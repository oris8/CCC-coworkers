import { z } from 'zod';

// NOTE - 폼 스키마 정의, frequencyType이 "ONCE", "DAILY" 일 경우 weekDays, monthDay를 스키마 키로 포함시키지 않음, "WEEKLY"일 경우 weekDays 배열을 포함, "MONTHLY"일 경우 monthDay를 포함시킴
const baseSchema = z.object({
  name: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(10, { message: '최대로 입력할 수 있는 글자수는 10개입니다.' }),
  description: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(30, { message: '최대로 입력할 수 있는 글자수는 30개입니다.' }),
  startDate: z
    .string()
    .default(new Date(new Date().setHours(0, 0, 0, 0)).toString()),
});

// frequencyType에 따른 조건부 필드 정의
export const weeklySchema = z.object({
  frequencyType: z.literal('WEEKLY').default('WEEKLY'),
  weekDays: z.array(z.number().min(0).max(6)),
});

export const monthlySchema = z.object({
  frequencyType: z.literal('MONTHLY').default('MONTHLY'),
  monthDay: z.number().min(1).max(31),
});

export const onceOrDailySchema = z.object({
  frequencyType: z.enum(['ONCE', 'DAILY']).default('ONCE'),
});

// discriminatedUnion을 사용한 최종 스키마
export const todoModalFormSchema = z.discriminatedUnion('frequencyType', [
  baseSchema.extend(weeklySchema.shape),
  baseSchema.extend(monthlySchema.shape),
  baseSchema.extend(onceOrDailySchema.shape),
]);
