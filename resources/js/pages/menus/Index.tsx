// import React, { useState } from "react";
// import { Link } from "@inertiajs/react";
// import * as LucideIcons from "lucide-react";
// import { Plus, Trash2, Edit, ChevronRight } from "lucide-react";

// interface Menu {
//   id: number;
//   name: string;
//   url?: string;
//   icon?: string | null;
//   status?: string;
//   sort_number?: number;
//   children_recursive?: Menu[];
// }

// export default function Index({ menus }: { menus: Menu[] }) {
//   // Helper to detect absolute/external URLs
//   const isExternal = (u?: string) => !!u && /^https?:\/\//i.test(u || "");

//   // Render a single menu row + recursively render children when expanded
//   function RecursiveMenuRow({ menu, level = 0 }: { menu: Menu; level?: number }) {
//     const [open, setOpen] = useState(false);
//     const children = menu.children_recursive || [];
//     const hasChildren = children.length > 0;


//     const IconComponent: any = menu.icon ? (LucideIcons as any)[menu.icon] : null;

//     return (
//       <li>
//         <div
//           className={`flex items-center justify-between border rounded p-3 mb-2 bg-white`}
//           role="group"
//         >
//           {/* Left: icon + title */}
//           <div className="flex items-center gap-3 min-w-0">
//             {/* indentation by level using padding-left */}
//             <div style={{ paddingLeft: level * 14 }}>
//               {/* Icon */}
//               {IconComponent ? (
//                 <IconComponent className="inline-block w-5 h-5 mr-3 text-black/80" />
//               ) : (
//                 <span className="inline-block w-5 h-5 mr-3" />
//               )}
//             </div>

//             <div className="min-w-0">
//               {menu.url ? (
//                 isExternal(menu.url) ? (
//                   <a
//                     href={menu.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block font-medium truncate hover:underline"
//                     title={menu.url}
//                   >
//                     {menu.name}
//                   </a>
//                 ) : (
//                   <Link
//                     href={menu.url}
//                     className="block font-medium truncate hover:underline"
//                     title={menu.url}
//                   >
//                     {menu.name}
//                   </Link>
//                 )
//               ) : (
//                 <div className="block font-medium truncate">{menu.name}</div>
//               )}

//               {typeof menu.sort_number !== "undefined" && (
//                 <div className="text-xs text-gray-500 mt-0.5">Sort: {menu.sort_number}</div>
//               )}
//             </div>
//           </div>

//           {/* Right: Action column (fixed width so all rows align) */}
//           <div className="flex items-center gap-2 ml-4 w-56 justify-end">
//             <Link
//               href={`/create?parent=${menu.id}`}
//               className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
//             >
//               <Plus size={14} />
//               <span>Add</span>
//             </Link>

//             <Link
//               href={`/menus/${menu.id}/edit`}
//               className="inline-flex items-center gap-2 px-3 py-1 text-sm border rounded hover:bg-gray-50"
//             >
//               <Edit size={14} />
//               <span>Edit</span>
//             </Link>

//             <Link
//               href={`/menus/${menu.id}`}
//               method="delete"
//               as="button"
//               onClick={(e: React.MouseEvent) => {
//                 if (!confirm("Delete this menu?")) {
//                   e.preventDefault();
//                 }
//               }}
//               className="inline-flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
//             >
//               <Trash2 size={14} />
//               <span>Delete</span>
//             </Link>

//             {/* Chevron (only if it has children). Clicking toggles the subtree */}
//             {hasChildren && (
//               <button
//                 type="button"
//                 aria-expanded={open}
//                 onClick={() => setOpen((s) => !s)}
//                 className="p-1 rounded hover:bg-gray-100"
//                 title={open ? "Collapse" : "Expand"}
//               >
//                 <ChevronRight
//                   size={18}
//                   className={`transition-transform ${open ? "rotate-90" : ""} text-gray-600`}
//                 />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* children (recursive) */}
//         {hasChildren && open && (
//           <ul className="ml-6 mt-1">
//             {children.map((c) => (
//               <RecursiveMenuRow key={c.id} menu={c} level={(level || 0) + 1} />
//             ))}
//           </ul>
//         )}
//       </li>
//     );
//   }

//   return (
//     <div className="p-5">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Menus</h1>
//         <Link href="/create" className="px-4 py-2 bg-black text-white rounded">
//           Create Menu
//         </Link>
//       </div>

//       <ul>
//         {menus && menus.length > 0 ? (
//           menus.map((m) => <RecursiveMenuRow key={m.id} menu={m} />)
//         ) : (
//           <div className="text-gray-500">No menus found.</div>
//         )}
//       </ul>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { Link, router } from "@inertiajs/react";
// import * as LucideIcons from "lucide-react";
// import { Plus, Trash2, Edit, ChevronRight } from "lucide-react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";

// interface Menu {
//   id: number;
//   name: string;
//   url?: string;
//   icon?: string | null;
//   status?: string;
//   sort_number?: number;
//   parent_id?: number | null;
//   children_recursive?: Menu[];
// }

// export default function Index({ menus }: { menus: Menu[] }) {
//   const [menuTree, setMenuTree] = useState<Menu[]>(menus);

//   // Check if URL is external
//   const isExternal = (u?: string) => !!u && /^https?:\/\//i.test(u);

//   // === Handle Drag End ===
//   const handleDragEnd = (result: DropResult) => {
//     const { source, destination, draggableId } = result;
//     if (!destination) return;

//     // If nothing changed
//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) {
//       return;
//     }

//     const movedId = parseInt(draggableId, 10);
//     const newParentId =
//       destination.droppableId === "root"
//         ? null
//         : parseInt(destination.droppableId, 10);
//     const newSort = destination.index;

//     // Send to backend
//     router.post(
//       "/menus/reorder",
//       {
//         id: movedId,
//         new_parent_id: newParentId,
//         new_sort_number: newSort,
//       },
//       { preserveScroll: true, preserveState: true }
//     );
//   };

//   // === Recursive Renderer ===
//   function RecursiveMenuRow({
//     menu,
//     level = 0,
//     index,
//   }: {
//     menu: Menu;
//     level?: number;
//     index: number;
//   }) {
//     const [open, setOpen] = useState(false);
//     const children = menu.children_recursive || [];
//     const hasChildren = children.length > 0;
//     const IconComponent: any = menu.icon
//       ? (LucideIcons as any)[menu.icon]
//       : null;

//     return (
//       <Draggable draggableId={menu.id.toString()} index={index}>
//         {(provided) => (
//           <li
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//           >
//             <div
//               className={`flex items-center justify-between border rounded p-3 mb-2 bg-white`}
//               role="group"
//             >
//               {/* Left side */}
//               <div className="flex items-center gap-3 min-w-0">
//                 <div style={{ paddingLeft: level * 14 }}>
//                   {IconComponent ? (
//                     <IconComponent className="inline-block w-5 h-5 mr-3 text-black/80" />
//                   ) : (
//                     <span className="inline-block w-5 h-5 mr-3" />
//                   )}
//                 </div>

//                 <div className="min-w-0">
//                   {menu.url ? (
//                     isExternal(menu.url) ? (
//                       <a
//                         href={menu.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block font-medium truncate hover:underline"
//                         title={menu.url}
//                       >
//                         {menu.name}
//                       </a>
//                     ) : (
//                       <Link
//                         href={menu.url}
//                         className="block font-medium truncate hover:underline"
//                         title={menu.url}
//                       >
//                         {menu.name}
//                       </Link>
//                     )
//                   ) : (
//                     <div className="block font-medium truncate">
//                       {menu.name}
//                     </div>
//                   )}

//                   {typeof menu.sort_number !== "undefined" && (
//                     <div className="text-xs text-gray-500 mt-0.5">
//                       Sort: {menu.sort_number}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right buttons */}
//               <div className="flex items-center gap-2 ml-4 w-56 justify-end">
//                 <Link
//                   href={`/create?parent=${menu.id}`}
//                   className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
//                 >
//                   <Plus size={14} />
//                   <span>Add</span>
//                 </Link>

//                 <Link
//                   href={`/menus/${menu.id}/edit`}
//                   className="inline-flex items-center gap-2 px-3 py-1 text-sm border rounded hover:bg-gray-50"
//                 >
//                   <Edit size={14} />
//                   <span>Edit</span>
//                 </Link>

//                 <Link
//                   href={`/menus/${menu.id}`}
//                   method="delete"
//                   as="button"
//                   onClick={(e: React.MouseEvent) => {
//                     if (!confirm("Delete this menu?")) {
//                       e.preventDefault();
//                     }
//                   }}
//                   className="inline-flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
//                 >
//                   <Trash2 size={14} />
//                   <span>Delete</span>
//                 </Link>

//                 {hasChildren && (
//                   <button
//                     type="button"
//                     aria-expanded={open}
//                     onClick={() => setOpen((s) => !s)}
//                     className="p-1 rounded hover:bg-gray-100"
//                     title={open ? "Collapse" : "Expand"}
//                   >
//                     <ChevronRight
//                       size={18}
//                       className={`transition-transform ${
//                         open ? "rotate-90" : ""
//                       } text-gray-600`}
//                     />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Children (nested droppable) */}
//             {hasChildren && open && (
//               <Droppable droppableId={menu.id.toString()} type="MENU">
//                 {(dropProvided) => (
//                   <ul
//                     ref={dropProvided.innerRef}
//                     {...dropProvided.droppableProps}
//                     className="ml-6 mt-1"
//                   >
//                     {children.map((c, i) => (
//                       <RecursiveMenuRow
//                         key={c.id}
//                         menu={c}
//                         level={level + 1}
//                         index={i}
//                       />
//                     ))}
//                     {dropProvided.placeholder}
//                   </ul>
//                 )}
//               </Droppable>
//             )}
//           </li>
//         )}
//       </Draggable>
//     );
//   }

//   return (
//     <div className="p-5">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Menus</h1>
//         <Link
//           href="/create"
//           className="px-4 py-2 bg-black text-white rounded"
//         >
//           Create Menu
//         </Link>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="root" type="MENU">
//           {(provided) => (
//             <ul ref={provided.innerRef} {...provided.droppableProps}>
//               {menuTree.map((m, i) => (
//                 <RecursiveMenuRow key={m.id} menu={m} index={i} />
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// }



// resources/js/Pages/Menus/Index.jsx
import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import * as LucideIcons from "lucide-react";
import { Plus, Trash2, Edit, ChevronRight } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

/**
 * 🔎 Helper to find menu by id
 */
const findMenuById = (menus, id) => {
  for (let menu of menus) {
    if (menu.id === id) return menu;
    if (menu.children_recursive?.length) {
      const found = findMenuById(menu.children_recursive, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Prevent moving a menu inside itself or one of its children
 */
const isDescendant = (menus, menuId, targetId) => {
  const menu = findMenuById(menus, menuId);
  if (!menu || !menu.children_recursive) return false;

  for (let child of menu.children_recursive) {
    if (child.id === targetId) return true;
    if (isDescendant([child], menuId, targetId)) return true;
  }
  return false;
};

export default function Index() {
  const { menus } = usePage().props;

  /**
   * 🔄 Handle Drag End
   */
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const draggedId = parseInt(draggableId.replace("menu-", ""));
    const targetId = destination.droppableId.startsWith("menu-")
      ? parseInt(destination.droppableId.replace("menu-", ""))
      : null;

    if (draggedId === targetId || isDescendant(menus, draggedId, targetId)) {
      alert("Invalid move: can't move into itself or its children");
      return;
    }

    // ✅ Update backend
    router.post(
      "/menus/reorder",
      {
        id: draggedId,
        new_parent_id: targetId, // null if dropped on root
        new_sort_number: destination.index,
      },
      { preserveScroll: true }
    );
  };

  /**
   * 🔁 Recursive Renderer
   */
  const renderMenu = (menu, index) => (
    <Draggable draggableId={`menu-${menu.id}`} index={index} key={menu.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-2"
        >
          <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
            {/* Drag Handle + Title */}
            <div className="flex items-center gap-2">
              <span {...provided.dragHandleProps} className="cursor-grab text-gray-600">
                ⠿
              </span>
              <span className="font-medium">{menu.name}</span>
            </div>

            {/* Actions (row, not column) */}
            <div className="flex items-center gap-2">
              <Link
                href={`/create?parent=${menu.id}`}
                className="bg-black text-white px-3 py-1 text-sm rounded hover:bg-gray-800 transition"
              >
                Add
              </Link>
              <Link
                href={`/menus/${menu.id}/edit`}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition"
              >
                Update
              </Link>
              <Link
                href={`/menus/${menu.id}`}
                method="delete"
                as="button"
                onClick={(e) => {
                  if (!confirm("Delete this menu?")) e.preventDefault();
                }}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition"
              >
                Delete
              </Link>
            </div>
          </div>


          {/* Children Recursive */}
          <Droppable droppableId={`menu-${menu.id}`} type="MENU">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="ml-6">
                {menu.children_recursive?.map((child, idx) =>
                  renderMenu(child, idx)
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Menu Management</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="root" type="MENU">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {menus.map((menu, index) => renderMenu(menu, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
















































































