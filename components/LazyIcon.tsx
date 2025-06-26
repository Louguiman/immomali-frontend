import dynamic from "next/dynamic";
import Image from "next/image";

const LazyIcon = ({ iconName, alt }) => {
  const imagePath = `/assets/images/icons/${iconName}.png`;

  return (
    <Image src={imagePath} alt={alt} loading="lazy" width={40} height={40} />
  );
};

export default LazyIcon;
