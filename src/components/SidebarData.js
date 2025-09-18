import React from 'react';
import { FaHome } from 'react-icons/fa';
import { TbTournament } from 'react-icons/tb';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome />,
    cName: 'nav-text',
  },
  {
    title: 'Tournament',
    path: '/brackets',
    icon: <TbTournament />,
    cName: 'nav-text',
  },
];
