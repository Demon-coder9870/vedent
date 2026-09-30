import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeImg, setActiveImg] = useState(images[0]);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      
      {/* Main Image */}
      <div style={{ 
        width: '100%',
        height: '450px',
        borderRadius: '24px', 
        overflow: 'hidden', 
        backgroundColor: '#f8f9fa',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img 
          src={activeImg} 
          alt="Active Product" 
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease'
          }} 
        />
      </div>

      {/* Thumbnails (Horizontal below) */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => setActiveImg(img)}
            style={{ 
              width: '80px', 
              height: '80px', 
              border: activeImg === img ? '2px solid var(--lime)' : '1px solid #e1e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeImg === img ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
