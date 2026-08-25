import cloudinary from '../config/cloudinary.js';

export const uploadMediaBuffer = async (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'lumiere/portfolio',
        resource_type: options.resource_type || 'auto',
        transformation: options.transformation || [
          { quality: 'auto:best' },
          { fetch_format: 'auto' },
        ],
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          thumbnail_url: cloudinary.url(result.public_id, {
            width: 400,
            crop: 'scale',
            quality: 'auto',
            fetch_format: 'auto',
          }),
        });
      }
    );
    uploadStream.end(buffer);
  });
};

export const deleteCloudinaryMedia = async (public_id, resource_type = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(public_id, { resource_type });
    return result;
  } catch (error) {
    console.error('[Cloudinary Delete Error]', error);
    throw error;
  }
};

export const getWatermarkedUrl = (publicId, watermarkText = 'LUMIÈRE STUDIOS') => {
  return cloudinary.url(publicId, {
    transformation: [
      { quality: 'auto' },
      {
        overlay: {
          font_family: 'Playfair Display',
          font_size: 45,
          font_weight: 'bold',
          text: watermarkText,
          letter_spacing: 8,
        },
        color: '#D4AF37',
        opacity: 45,
        gravity: 'center',
      },
    ],
  });
};
