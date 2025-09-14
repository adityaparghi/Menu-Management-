import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuList() {
  const [menus, setMenus] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/menus?page=${page}`)
      .then(res => {
        setMenus(res.data.data);
        setMeta(res.data);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Menus</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {menus.map(menu => (
            <li key={menu.id}>
              {menu.name}
              {menu.children?.length > 0 && (
                <ul className="ml-4 list-disc">
                  {menu.children.map(child => (
                    <li key={child.id}>{child.name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page {meta.current_page} of {meta.last_page}</span>

        <button
          onClick={() => setPage(prev => (meta.last_page ? Math.min(prev + 1, meta.last_page) : prev))}
          disabled={page === meta.last_page}
        >
          Next
        </button>
      </div>
    </div>
  );
}
