import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

// function RecursiveMenuItem({ item, level = 0 }: { item: NavItem; level?: number }) {
//   const hasChildren = item.items && item.items.length > 0;

//   return (
//     <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
//       <SidebarMenuItem>
//         <CollapsibleTrigger asChild>
//           <SidebarMenuButton
//             tooltip={item.title}
//             className={`flex items-center justify-between w-full cursor-pointer 
//               pl-${level * 4} 
//               ${level > 0 ? "text-sm text-muted-foreground hover:text-foreground" : ""}`}
//           >
//             <div className="flex items-center gap-2">
//               {item.icon && <item.icon />}
//               <span>{item.title}</span>
//             </div>
//             {hasChildren && (
//               <ChevronRight
//                 className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
//               />
//             )}
//           </SidebarMenuButton>
//         </CollapsibleTrigger>

//         {hasChildren && (
//           <CollapsibleContent>
//             <div className="ml-4 border-l border-muted pl-2 space-y-1">
//               {item.items.map((subItem) => (
//                 <RecursiveMenuItem key={subItem.title} item={subItem} level={level + 1} />
//               ))}
//             </div>
//           </CollapsibleContent>
//         )}
//       </SidebarMenuItem>
//     </Collapsible>
//   );
// }


// function RecursiveMenuItem({ item, level = 0 }: { item: NavItem; level?: number }) {
//   const hasChildren = item.items && item.items.length > 0;

//   return (
//     <SidebarMenuItem>
//       {hasChildren ? (
//         <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
//           <>
//             <div
//               className={`flex items-center justify-between w-full cursor-pointer pl-${level * 4}`}
//             >
//               <div className="flex items-center gap-2">
//                 {item.icon && <item.icon />}
//                 <span>{item.title}</span>
//               </div>
//               <CollapsibleTrigger asChild>
//                 <button>
//                   <ChevronRight className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </button>
//               </CollapsibleTrigger>
//             </div>

//             <CollapsibleContent>
//               <div className="ml-4 border-l border-muted pl-2 space-y-1">
//                 {item.items.map((subItem) => (
//                   <RecursiveMenuItem key={subItem.title} item={subItem} level={level + 1} />
//                 ))}
//               </div>
//             </CollapsibleContent>
//           </>
//         </Collapsible>
//       ) : (
//         <Link
//           href={item.href || "#"}
//           className={`flex items-center gap-2 w-full pl-${level * 4} py-1 cursor-pointer hover:bg-accent rounded-md`}
//         >
//           {item.icon && <item.icon />}
//           <span>{item.title}</span>
//         </Link>
//       )}
//     </SidebarMenuItem>
//   );
// }


// function RecursiveMenuItem({ item }: { item: NavItem }) {
//   const hasChildren = item.items && item.items.length > 0;

//   return (
//     <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
//       <SidebarMenuItem>
//         <CollapsibleTrigger asChild>
//           <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
//             {item.icon && <item.icon />}
//             <span>{item.title}</span>
//             {hasChildren && (
//               <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//             )}
//           </SidebarMenuButton>
//         </CollapsibleTrigger>

//         {hasChildren && (
//           <CollapsibleContent>
//             <SidebarMenuSub>
//               {item.items.map((subItem) => (
//                 <SidebarMenuSubItem key={subItem.title}>
//                   {subItem.items && subItem.items.length > 0 ? (
//                     <RecursiveMenuItem item={subItem} />
//                   ) : (
//                     <SidebarMenuSubButton asChild>
//                       <a
//                         href={subItem.href}
//                         className="flex items-center gap-2 hover:underline cursor-pointer"
//                       >
//                         {subItem.icon && <subItem.icon className="w-4 h-4" />}
//                         <span>{subItem.title}</span>
//                       </a>
//                     </SidebarMenuSubButton>
//                   )}
//                 </SidebarMenuSubItem>
//               ))}
//             </SidebarMenuSub>
//           </CollapsibleContent>
//         )}
//       </SidebarMenuItem>
//     </Collapsible>
//   );
// }


function SortableMenuItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function RecursiveMenuItem({ item, level = 0 }: { item: NavItem; level?: number }) {
  const hasChildren = item.items && item.items.length > 0;

  if (hasChildren) {
    // Parent menu → expandable
    return (
      <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              className={`flex items-center justify-between w-full cursor-pointer 
                pl-${level * 4} 
                ${level > 0 ? "text-sm text-muted-foreground hover:text-foreground" : ""}`}
            >
              <div className="flex items-center gap-2">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </div>
              <ChevronRight
                className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="ml-4 border-l border-muted pl-2 space-y-1">
              {item.items.map((subItem) => (
                <RecursiveMenuItem key={subItem.title} item={subItem} level={level + 1} />
              ))}
            </div>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // Leaf menu → clickable link
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a
          href={item.href}
          className={`flex items-center gap-2 w-full cursor-pointer 
            pl-${level * 4} 
            ${level > 0 ? "text-sm text-muted-foreground hover:text-foreground" : ""}`}
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}


export function NavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();
  const [menuItems, setMenuItems] = useState(items);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((i) => i.title === active.id);
        const newIndex = items.findIndex((i) => i.title === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>

      {/* <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}> */}
      <SortableContext items={menuItems.map((i) => i.title)} strategy={verticalListSortingStrategy}>
        {/* <SidebarMenu>
            {menuItems.map((item) => (
              <SortableMenuItem key={item.title} id={item.title}>
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.href}
                                className="flex items-center gap-2 hover:underline cursor-pointer"
                              >
                                {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SortableMenuItem>
            ))}
          </SidebarMenu> */}
        <SidebarMenu>
          {menuItems.map((item) => (
            <SortableMenuItem key={item.title} id={item.title}>
              <RecursiveMenuItem item={item} />
            </SortableMenuItem>
          ))}
        </SidebarMenu>

      </SortableContext>
      {/* </DndContext> */}
    </SidebarGroup>
  );
}


// import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
// import { type NavItem } from '@/types';
// import { Link, usePage } from '@inertiajs/react';
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
// import { ChevronRight, Trash2 } from 'lucide-react';

// export function NavMain({ items = [] }: { items: NavItem[] }) {
//     const page = usePage();
//     return (
//         <SidebarGroup className="px-2 py-0">
//             <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
//             <SidebarMenu>
//                 {items.map((item) => (
//                     <Collapsible
//                         key={item.title}
//                         asChild
//                         defaultOpen={item.isActive}
//                         className="group/collapsible"
//                     >
//                         <SidebarMenuItem>
//                             <CollapsibleTrigger asChild>
//                                 <SidebarMenuButton tooltip={item.title} className='cursor-pointer'>
//                                     {item.icon && <item.icon />} {/*Icon render*/}
//                                     {/* <span>{item.title}</span>   */}

//                                     <span>{item.title}</span>

//                                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                                 </SidebarMenuButton>
//                             </CollapsibleTrigger>
//                             <CollapsibleContent>
//                                 <SidebarMenuSub>
//                                     {item.items?.map((subItem) => (
//                                         <SidebarMenuSubItem key={subItem.title}>
//                                             <SidebarMenuSubButton asChild>
//                                                 {/* <Link href={subItem.href} className="flex items-center gap-2 hover:underline">
//                                                     {subItem.icon && <subItem.icon className="w-4 h-4" />}
//                                                     <span>{subItem.title}</span>
//                                                 </Link> */}
//                                                 {/* Error i encountered differences between Link and Anchor tag */}
//                                                 <a href={subItem.href} className='flex items-center gap-2 hover:underline cusor-pointer' >
//                                                     {subItem.icon && <subItem.icon className="w-4 h-4" />}
//                                                     <span>{subItem.title}</span>
//                                                 </a>
//                                             </SidebarMenuSubButton>
//                                         </SidebarMenuSubItem>
//                                     ))}
//                                 </SidebarMenuSub>
//                             </CollapsibleContent>
//                         </SidebarMenuItem>
//                     </Collapsible>
//                 ))}
//             </SidebarMenu>
//         </SidebarGroup>
//     );
// }


// after collapsible ends
// <SidebarMenuItem key={item.title}>
//     <SidebarMenuButton
//         asChild
//         isActive={page.url.startsWith(typeof item.href === 'string' ? item.href : item.href.url)}
//         tooltip={{ children: item.title }}
//     >
//         <Link href={item.href} prefetch>
//             {item.icon && <item.icon />}
//             <span>{item.title}</span>
//         </Link>
//     </SidebarMenuButton>
//</SidebarMenuItem>