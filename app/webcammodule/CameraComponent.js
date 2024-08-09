'use client';
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { storage } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { identifyObject } from '../AiModule/AiIdentification';
import { Box, Button, CircularProgress, Typography, Card, CardMedia, CardContent, Stack } from '@mui/material';

const CameraComponent = ({ updateInventory, addItem, onItemAdded }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const uploadImage = async () => {
    if (!imageSrc) return;

    setIsLoading(true);

    // Convert the base64 image to a Blob
    const response = await fetch(imageSrc);
    const blob = await response.blob();

    // Create a unique file name for the image
    const fileName = `images/${uuidv4()}.jpg`;
    const imageRef = ref(storage, fileName);

    // Upload the Blob to Firebase Storage
    await uploadBytes(imageRef, blob);

    // Get the download URL of the uploaded image
    const downloadUrl = await getDownloadURL(imageRef);
    setUploadedImageUrl(downloadUrl);

    const objectName = await identifyObject(downloadUrl);
    if (objectName) {
      // Add the identified object to the inventory
      await addItem(objectName);
      // Update the inventory to reflect changes
      if (onItemAdded) {
        onItemAdded();
      }
      await updateInventory();
    }

    setIsLoading(false);
  };

  const recapture = () => {
    setImageSrc(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2 }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {imageSrc ? 'Captured Image' : 'Capture and Upload Image'}
          </Typography>
          {!imageSrc ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={350}
              height={250}
              videoConstraints={{ width: 350, height: 250 }}
            />
          ) : (
            <CardMedia component="img" height="250" image={imageSrc} alt="Captured Image" />
          )}
        </CardContent>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            {!imageSrc && (
              <Button variant="contained" onClick={capture}>
                Capture Photo
              </Button>
            )}
            {imageSrc && (
              <>
                <Button variant="outlined" onClick={uploadImage} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Add Item'}
                </Button>
                <Button variant="text" color="secondary" onClick={recapture}>
                  Recapture
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
      </Card>

      {imageSrc && (
        <Card sx={{ maxWidth: 400, mt: 2 }}>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              This is your captured image.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CameraComponent;
