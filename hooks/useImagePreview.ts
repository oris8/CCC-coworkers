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
  const [isUploading, setIsUploading] = useState(true);

  useEffect(() => {
    setIsUploading(false);
  }, []);

  // 이미지 프리뷰 설정
  useEffect(() => {
    const uploadData = async () => {
      if (!currentImage) return;
      setIsUploading(true);

      if (typeof currentImage === 'string') {
        setImagePreview(currentImage);
        setIsUploading(false);
      } else {
        const { data, error } = await uploadImage(currentImage);
        if (error || !data) {
          toast.error(error.message);
          return;
        }
        setUploadedImage(data);
        const objectURL = URL.createObjectURL(currentImage);
        setImagePreview(objectURL);
        setIsUploading(false);

        // Cleanup
        return () => URL.revokeObjectURL(objectURL);
      }
    };

    uploadData();
  }, [currentImage]);

  return { uploadedImage, imagePreview, isUploading };
};

export default useImageFile;
