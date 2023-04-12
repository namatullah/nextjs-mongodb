import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import CropIcon from '@mui/icons-material/Crop';
import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop = ({ output, assignPhoto, setOpenCrop }) => {
    const [cropped, setCropped] = useState(null)
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({
        aspect: 16 / 16,
        unit: '%', // Can be 'px' or '%'
        x: 15,
        y: 15,
        width: 70,
        height: 70
    });
    const [image, setImage] = useState(null);

    const selectImage = (file) => {
        setSrc(URL.createObjectURL(file));
    };

    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        setCropped(base64Image);
    };
    const submitPhoto = () => {
        assignPhoto(cropped)
        setOpenCrop(false)
    }
    return (
        <Dialog open={true} fullWidth >
            <DialogTitle>Choice a photo and crop</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                selectImage(e.target.files[0]);
                            }}
                            fullWidth
                        />
                    </Grid>
                    {src && (
                        <>
                            <Grid item xs={6}>
                                <ReactCrop src={src} onImageLoaded={setImage}
                                    crop={crop} onChange={setCrop} style={{ border: '1px solid #222' }} />
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                {cropped && <img src={cropped} style={{ border: '1px solid #222' }} />}
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" fullWidth startIcon={<CropIcon />} onClick={cropImageNow}>Crop</Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                <Button variant="contained" size="small" onClick={submitPhoto}>Done</Button>
                <Button variant="contained" size="small" color="error" onClick={() => setOpenCrop(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ImageCrop;
