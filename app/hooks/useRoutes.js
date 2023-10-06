import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { useConversation } from "./useConversations";

import { destroyCookie } from 'nookies'
import { useRouter } from "next/navigation";


const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const router = useRouter();


  const handleLogout = () => {
    destroyCookie(undefined, 'token');
    location.replace('/login');
  }

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/messages', 
      icon: HiChat,
      active: pathname === '/messages' || conversationId 
    },
    {
      label: 'Logout', 
      onClick: handleLogout,
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;