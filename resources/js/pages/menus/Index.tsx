import { Link } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Menu {
  id: number;
  name: string;
  url?: string;
  icon?: string;
  status: string;
  sort_number: number;
  children: Menu[];
}
//— Sort: {menu.sort_number}


export default function Index({ menus }: { menus: Menu[] }) {

  const [down, setDown] = useState(false);
  const renderMenu = (menu: Menu) => (
    <li key={menu.id} className="border p-2 rounded mb-2">
      <div className="flex justify-between items-center">
        <span>
          {menu.icon && <i className={`mr-2 ${menu.icon}`}></i>}
          {menu.name} ({menu.status})
        </span>

        <Link href={`/create?parent=${menu.id}`} className="text-blue-500 hover:underline">
          Add Menu
        </Link>

        <Link href={`/menus/${menu.id}/edit`} className="text-blue-500 hover:underline " >
          Update
        </Link>

        <Link href={`/menus/${menu.id}`}
          method="delete"
          as="button"
          className="text-red-500 cursor-pointer 
          hover:bg-gray-200 "
          onClick={(e) => {
            if (!confirm("Delete this menu")) {
              e.preventDefault();
            }
          }}>
          <Trash2 />
        </Link>

      </div>
      {menu.children && menu.children.length > 0 && (
        <ul className="ml-5 mt-2">
          {menu.children.map((child) => renderMenu(child))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="p-5">
      <div className="flex gap-220" >
        <h1 className="text-xl font-bold mb-4">Menus</h1>
        {/* <Link href={'/dashboard'} className="text-blue-900 px-3 py-2 bg-purple-200 rounded" >
          Dashboard
        </Link> */}
        <Link href="/create" className="bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 rounded">
          Create Menu
        </Link>
      </div>

      <ul className="mt-4">{menus.map((menu) => renderMenu(menu))}</ul>
    </div>
  );
}