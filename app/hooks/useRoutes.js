import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { useConversation } from "./useConversations";


const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  console.log(conversationId, 'test')

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/messages', 
      icon: HiChat,
      active: pathname === '/messages' || conversationId 
    },
    { 
      label: 'Users', 
      href: '/contacts', 
      icon: HiUsers, 
      active: pathname === '/contacts'
    },
    {
      label: 'Logout', 
      onClick: () => {},
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname]);

  return routes;
};

export default useRoutes;