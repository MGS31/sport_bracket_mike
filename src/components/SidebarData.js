import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { RiFilePaperLine } from 'react-icons/ri';
import { FaPeopleGroup } from 'react-icons/fa6';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Brackets',
    path: '/brackets',
    icon: <RiFilePaperLine />,
    cName: 'nav-text',
  },
  {
    title: 'Team',
    path: '/team',
    icon: <FaPeopleGroup />,
    cName: 'nav-text',
  },
];
