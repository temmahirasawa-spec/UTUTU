import Image, { type StaticImageData } from 'next/image';

// next/image の薄いラッパ。
//  - ローカル静的import（StaticImageData）→ placeholder="blur"（blurDataURL 自動）
//  - リモートURL（picsum プレースホルダ）→ placeholder="empty"（暗い親背景でジャンク無し）
// これで data 側が string / StaticImageData を混在させても呼び出し側は気にしなくてよい。
type Props = {
  src: string | StaticImageData;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function SmartImage({ src, alt, ...rest }: Props) {
  const isStatic = typeof src !== 'string';
  return (
    <Image
      src={src}
      alt={alt}
      placeholder={isStatic ? 'blur' : 'empty'}
      {...rest}
    />
  );
}
