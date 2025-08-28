import { Link } from "@inertiajs/react";

interface Menu {
  id: number;
  name: string;
  url?: string;
  icon?: string;
  status: string;
  sort_number: number;
  children: Menu[];
}

export default function Index({ menus }: { menus: Menu[] }) {
  const renderMenu = (menu: Menu) => (
    <li key={menu.id} className="border p-2 rounded mb-2">
      <div className="flex justify-between items-center">
        <span>
          {menu.icon && <i className={`mr-2 ${menu.icon}`}></i>}
          {menu.name} ({menu.status}) — Sort: {menu.sort_number}
        </span>
        <Link href={`/create?parent=${menu.id}`} className="text-blue-500">
          Add Submenu
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
        <Link href="/create" className="bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 rounded">
          Create Menu
        </Link>
      </div>

      <ul className="mt-4">{menus.map((menu) => renderMenu(menu))}</ul>
    </div>
  );
}
