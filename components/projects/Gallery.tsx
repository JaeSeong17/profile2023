import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface GalleryParams {
  label: string;
}

export default function Gallery({ label }: GalleryParams) {
  const [primaryIamgeIndex, setPrimaryImageIndex] = useState<number>(0);
  const [subImageIndexes, setSubImageIndexes] = useState<Array<number>>([
    1, 2, 3, 4,
  ]);

  function setAsPrimaryImage(clickedIndex: number) {
    const currPrimary = primaryIamgeIndex;
    const currSubs = [
      ...subImageIndexes.filter((x) => x !== clickedIndex),
      currPrimary,
    ];
    setSubImageIndexes(currSubs);
    setPrimaryImageIndex(clickedIndex);
  }

  return (
    <motion.div
      className='flex flex-col w-full max-w-[800px] p-4 gap-6'
      initial={{
        opacity: 0,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
      }}
      transition={{ duration: 1 }}
    >
      <div className='image-main'>
        <motion.div
          key={primaryIamgeIndex}
          className='relative
          rounded-xl
          overflow-hidden
          shadow-[0_0_24px_0px_white]
          w-full
          aspect-[16/9]'
          layoutId={`gallery-${primaryIamgeIndex}`}
        >
          <Image
            src={`/images/portfolioImages/${label}/${label}${primaryIamgeIndex}.png`}
            alt={`${label}${primaryIamgeIndex}`}
            priority={true}
            fill={true}
            style={{ objectFit: 'cover' }}
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </motion.div>
      </div>
      <div
        className='grid grid-cols-4 gap-4 
                w-full'
      >
        {subImageIndexes.map((subImageIndex) => {
          return (
            <motion.div
              key={subImageIndex}
              className='
                relative
                rounded-lg
                overflow-hidden
                aspect-[16/9]
                cursor-pointer
              '
              layoutId={`gallery-${subImageIndex}`}
              onClick={() => setAsPrimaryImage(subImageIndex)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={`/images/portfolioImages/${label}/${label}${subImageIndex}.png`}
                alt={`${label}${subImageIndex}`}
                priority={true}
                fill={true}
                style={{ objectFit: 'cover' }}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
