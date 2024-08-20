'use client';

import uploadImage from '@/lib/api/common';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useImageFile = (currentImage?: any) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );

  // 이미지 프리뷰 설정
  useEffect(() => {
    const uploadData = async () => {
      if (!currentImage) return;

      if (typeof currentImage === 'string') {
        setImagePreview(currentImage);
      } else {
        const objectURL = URL.createObjectURL(currentImage);
        setImagePreview(objectURL);

        const { data, error } = await uploadImage(currentImage);
        if (error) {
          toast.error(error.message);
          return;
        }
        setUploadedImage(data);

        // Cleanup
        return () => URL.revokeObjectURL(objectURL);
      }
    };

    uploadData();
  }, [currentImage]);

  return { uploadedImage, imagePreview };
};

export default useImageFile;
