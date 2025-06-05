import { toast } from '@/hooks/use-toast';

export function handleError(error: unknown, context = '') {
  const message =
    typeof error === 'string'
      ? error
      : error instanceof Error
      ? error.message
      : '알 수 없는 오류가 발생했습니다.';

  console.error(`[${context}]`, message);

  toast({
    title: context || '에러 발생',
    description: message,
    variant: 'destructive',
  });
}
