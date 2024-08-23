'use client';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
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

  const res = await client<{ url: UrlType }>(
    ENDPOINTS.IMAGE.POST_IMAGE_UPLOAD,
    {
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  if (res.error) {
    return handleApiResponse(res, '이미지 업로드에 실패했습니다');
  }

  return { data: res.data.url, error: null };
}

export default uploadImage;
