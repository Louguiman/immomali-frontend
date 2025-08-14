import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { useTranslations } from "next-intl";

interface ImageUrls {
  raw?: string;
  full?: string;
  regular?: string;
  small?: string;
  thumb?: string;
  small_s3?: string;
}

interface CityPropertyStat {
  city: string;
  count: number;
  imageUrl: string | ImageUrls;
}

interface ProgressiveImageProps extends Omit<ImageProps, 'src'> {
  src: string | ImageUrls;
  width: number;
  height: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  ...props
}: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(
    typeof src === 'string' ? src : (src.thumb || src.small || '')
  );

  useEffect(() => {
    if (typeof src !== 'string') {
      const img = new window.Image();
      const highResSrc = src.regular || src.full || src.raw || '';
      if (highResSrc) {
        img.src = highResSrc;
        img.onload = () => {
          setCurrentSrc(highResSrc);
          setIsLoaded(true);
        };
      }
    }
  }, [src]);

  const imageSrc = typeof src === 'string' ? src : currentSrc;
  const placeholderSrc = typeof src === 'string' ? src : (src.thumb || src.small || '');

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ width, height }}>
      <Image
        {...props}
        width={width}
        height={height}
        src={imageSrc}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit,
        }}
        priority={false}
      />
      {!isLoaded && (
        <Image
          width={width}
          height={height}
          src={placeholderSrc}
          alt={`${alt} (loading...)`}
          className={className}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
            filter: 'blur(10px)',
            transform: 'scale(1.05)',
          }}
          priority={false}
        />
      )}
    </div>
  );
};

interface Props {
  data: CityPropertyStat[];
}

const FindProperties = ({ data }: Props) => {
  const t = useTranslations("property");
  return (
    <>
      {data.map((item, index) => {
        const slug = slugify(item.city);

        return (
          <div
            className="col-sm-6 col-lg-4 col-xl-4 mb-4"
            style={{ height: "400px" }}
            key={index}
          >
            <Link
              href={`/properties?location=${slug}`}
              className="properti_city style2 d-flex flex-column w-100 h-100"
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div className="thumb" style={{ 
                position: 'relative',
                width: '100%',
                height: '70%',
                flexShrink: 0
              }}>
                <ProgressiveImage
                  width={342}
                  height={241}
                  src={
                    item.imageUrl 
                      ? {
                          thumb: typeof item.imageUrl === 'string' ? item.imageUrl : (item.imageUrl.thumb || item.imageUrl.small),
                          regular: typeof item.imageUrl === 'string' ? item.imageUrl : (item.imageUrl.regular || item.imageUrl.full || item.imageUrl.raw)
                        }
                      : "/assets/images/property/pc5.jpg"
                  }
                  alt={`Image of ${item.city}`}
                  className="img-fluid w100 h-100 cover"
                  objectFit="cover"
                />
              </div>
              <div className="details p-3" style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: '#fff',
                padding: '1rem'
              }}>
                <h4 className="m-0" style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>{item.city}</h4>
                <p className="m-0" style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {item.count} {t("Properties")}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default FindProperties;
