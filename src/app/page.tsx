import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Greeting from '@/components/homepage/Greeting';
import ImageAccordion from '@/components/homepage/ProductSection';

const Home: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center">
      <Greeting session={session} />
      <ImageAccordion />
    </div>
  );
};

export default Home;
