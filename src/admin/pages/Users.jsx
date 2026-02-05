import React, { useEffect, useState } from "react";
import api from "../../api/AxiosConfig";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const initialForm = {
    nom: "",
    email: "",
    mot_de_passe: "",
    role: "visiteur",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await api.get("/users");
    setUsers(res.data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function resetForm() {
    setFormData(initialForm);
    setEditingUser(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingUser) {
      await api.put(`/users/${editingUser._id}`, formData);
    } else {
      await api.post("/users", formData);
    }

    resetForm();
    fetchUsers();
  }

  function handleEdit(user) {
    setEditingUser(user);
    setFormData({
      nom: user.nom,
      email: user.email,
      role: user.role,
      mot_de_passe: "",
    });
  }

  function confirmDelete(user) {
    setUserToDelete(user);
    setShowModal(true);
  }

  async function handleDelete() {
    await api.delete(`/users/${userToDelete._id}`);
    setShowModal(false);
    setUserToDelete(null);
    fetchUsers();
  }

  return (
    <div style={styles.container}>
      <h2>Gestion des utilisateurs</h2>

      {/* FORMULAIRE */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {!editingUser && (
            <input
              style={styles.input}
              type="password"
              name="mot_de_passe"
              placeholder="Mot de passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              required
            />
          )}

          <select
            style={styles.input}
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="visiteur">Visiteur</option>
            <option value="personnel">Personnel</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" style={styles.primaryBtn}>
            {editingUser ? "Modifier" : "Créer"}
          </button>
        </form>
      </div>

      {/* TABLEAU */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={styles.row}>
                <td>{u.nom}</td>
                <td>{u.email}</td>
                <td>
                  <span style={styles.roleBadge(u.role)}>{u.role}</span>
                </td>
                <td>
                  <button onClick={() => handleEdit(u)} style={styles.editBtn}>
                    Modifier
                  </button>
                  <button onClick={() => confirmDelete(u)} style={styles.deleteBtn}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Confirmer la suppression</h3>
            <p>
              Voulez-vous vraiment supprimer{" "}
              <strong>{userToDelete.nom}</strong> ?
            </p>

            <div style={styles.modalButtons}>
              <button onClick={handleDelete} style={styles.deleteBtn}>
                Oui, supprimer
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={styles.cancelBtn}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "30px" },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  form: { display: "grid", gap: "10px" },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  primaryBtn: {
    background: "#0056b3",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  table: { width: "100%", borderCollapse: "collapse" },

  thead: {
    background: "#0056b3",
    color: "#fff",
    textAlign: "left",
  },

  row: { borderBottom: "1px solid #eee" },

  roleBadge: (role) => ({
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#fff",
    background:
      role === "admin"
        ? "#28a745"
        : role === "personnel"
        ? "#ffc107"
        : "#6c757d",
  }),

  editBtn: {
    background: "#17a2b8",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc3545",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#999",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "350px",
    textAlign: "center",
  },

  modalButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  },
};

export default Users;
