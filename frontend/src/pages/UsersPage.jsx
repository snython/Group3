import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./UsersPage.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error loading users", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filtered = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="users-page">
      <div className="users-card">
        {/* Search bar */}
        <div className="users-search-bar">
          <span className="users-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="users-clear-btn"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        {loading ? (
          <p className="users-loading">Loading users...</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={2} className="users-empty">
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user._id}>
                    <td className="users-name-cell">
                      <div className="users-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>

                      {/* CLICKABLE USER PROFILE /users/:id */}
                      <Link
                        to={`/users/${user._id}`}
                        className="users-name-link"
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td className="users-email">{user.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}