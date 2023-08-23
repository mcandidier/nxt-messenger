import Image from 'next/image';
import { Toaster } from 'react-hot-toast';

import { withAuthAndPermission } from '@/app/components/AuthWrapper';

function Home() {
    return (
      <div>
        Home
      </div>
    )
  }
  

export default withAuthAndPermission(Home, ['home']);