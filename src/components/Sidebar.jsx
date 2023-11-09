import React from "react";
import { AiFillHome,AiTwotoneLike } from 'react-icons/ai'

import { BiPlayCircle,  BiHistory} from 'react-icons/bi'
import { BsCollectionPlay } from 'react-icons/bs'
import { MdLibraryAddCheck } from 'react-icons/md'
import { LiaStopwatchSolid } from 'react-icons/lia'


const Sidebar = () => {
     const mainLinks=[
          {
               icon:<AiFillHome className="text-xl"/>,
               name:'Home'
          },
          {
               icon:<BiPlayCircle className="text-xl"/>,
               name:'Shorts'
          },
          {
               icon:<BsCollectionPlay className="text-xl"/>,
               name:'Subscriptions'
          },
         
     ]
     const secondaryLink=[
          {
               icon:<MdLibraryAddCheck className="text-xl"/>,
               name:'Library'
          },
          {
               icon:<BiHistory className="text-xl"/>,
               name:'History'
          },
          {
               icon:<LiaStopwatchSolid className="text-xl"/>,
               name:'Watch Later'
          },
          {
               icon:<AiTwotoneLike className="text-xl"/>,
               name:'Liked Videos'
          },
     ]
  return (
     <div className="w-2/12 bg-black p-2  pr-5 pb-8 overflow-hidden">
          <ul className="flex flex-col border-b-2 border-gray-500 ">
               {
                    mainLinks.map(({icon,name})=>{
                         return(
                              <li className={`pl-6 py-3  hover:bg-zinc-600 rounded-xl ${name ==="Home" ? "bg-slate-600":" "}`} key={name}>
                                   <a href="#" className="flex items-center gap-5">{icon}
                                   <span className="text-sm tracking-wider">{name}</span>
                                   </a>
                              </li>
                         )
                    })
               }
          </ul>
          <ul className="flex flex-col  ">
               {
                    secondaryLink.map(({icon,name})=>{
                         return(
                              <li className={`pl-6 py-3 rounded-xl  hover:bg-zinc-600 ${name ==="Home" ? "bg-zinc-600":" "}`} key={name}>
                                   <a href="#" className="flex items-center gap-5">{icon}
                                   <span className="text-sm tracking-wider">{name}</span>
                                   </a>
                              </li>
                         )
                    })
               }
          </ul>
     </div>
  )
};

export default Sidebar;
