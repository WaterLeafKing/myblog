import { FC } from 'react';
import CategoryCard from './CategoryCard';

type CategoryCardSectionProps = {};

const CategoryCardSection: FC<CategoryCardSectionProps> = () => {
  return (
    <div className="flex gap-4">
      <CategoryCard
        title="Tesla"
        icon={
          'https://cdn.iconscout.com/icon/free/png-256/free-tesla-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-7-pack-logos-icons-2945257.png?f=webp&w=256'
        }
      />
      <CategoryCard
        title="Nvdia"
        icon={
          'https://cdn.iconscout.com/icon/free/png-512/free-nvidia-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-5-pack-logos-icons-3030185.png?f=webp&w=512'
        }
      />
      <CategoryCard
        title="Palantir"
        icon={'https://www.svgrepo.com/show/306533/palantir.svg'}
      />
      <CategoryCard
        title="IonQ"
        icon={
          'https://companieslogo.com/img/orig/IONQ-f072dd64.png?t=1720244492'
        }
      />
      {/*<CategoryCard title="Apple" />
      <CategoryCard title="Bitcoin" /> */}
    </div>
  );
};

export default CategoryCardSection;
