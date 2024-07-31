'use client';

import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/client';
import { UrlType } from '@ccc-types';

/**
 * 이미지 파일, 최대 용량은 10MB입니다.
 * @param imageFile
 *
 * @returns imageString($binary)
 */

async function uploadImage(imageFile: any): Promise<UrlType> {
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
    throw new Error('이미지 업로드에 실패했습니다', { cause: error });
  }
  return data.url;
}

export default uploadImage;
