'use client';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { UrlType } from '@ccc-types';

/**
 * 이미지 파일, 최대 용량은 10MB입니다.
 * @param imageFile
 *
 * @returns imageString($binary)
 */

async function uploadImage(imageFile: any) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data, error } = await client<{ url: UrlType }>(
    ENDPOINTS.IMAGE.POST_IMAGE_UPLOAD,
    {
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  if (error) {
    return {
      error: {
        info: '이미지 업로드에 실패했습니다',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: data.url };
}

export default uploadImage;
