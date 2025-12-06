import React, { useState, useEffect } from "react";
import api from "../../api/AxiosConfig";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "visiteur",
    password: ""
  });

  // --- TEMP DATA (en attendant le backend) ---
  useEffect(() => {
    setUsers([
      { id: 1, name: "Admin", email: "admin@mail.com", role: "admin" },
      { id: 2, name: "Dr. Paul", email: "paul@mail.com", role: "personnel" },
      { id: 3, name: "Claire", email: "claire@mail.com", role: "visiteur" }
    ]);
  }, []);

  // --- Gestion formulaire ---
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function openCreateModal() {
    setIsEditing(false);
    setFormData({ name: "", email: "", role: "visiteur", password: "" });
    setShowModal(true);
  }

  function openEditModal(user) {
    setIsEditing(true);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: ""
    });
    setShowModal(true);
  }

  function handleDelete(id) {
    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isEditing) {
      alert("Modification faite (mock front-end)");
    } else {
      alert("Utilisateur créé (mock front-end)");
    }

    setShowModal(false);
  }

  // --- Recherche ---
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      <h2>Gestion des utilisateurs</h2>

      {/* Bar d'actions */}
      <div style={styles.actions}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <button style={styles.addBtn} onClick={openCreateModal}>
          <FaUserPlus style={{ marginRight: "6px" }} />
          Ajouter
        </button>
      </div>

      {/* TABLEAU */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button style={styles.editBtn} onClick={() => openEditModal(u)}>
                  <FaEdit />
                </button>

                <button style={styles.deleteBtn} onClick={() => handleDelete(u.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>

            <h3>{isEditing ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="visiteur">Visiteur</option>
                <option value="personnel">Personnel</option>
              </select>

              {!isEditing && (
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              )}

              <button style={styles.saveBtn} type="submit">
                {isEditing ? "Mettre à jour" : "Créer"}
              </button>

              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>
                Annuler
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  search: {
    padding: "10px",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  addBtn: {
    background: "#052c65",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  table: {
    width: "100%",
    background: "white",
    borderRadius: "8px",
    padding: "10px",
    borderCollapse: "collapse",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  editBtn: {
    background: "#0b5ed7",
    border: "none",
    color: "white",
    padding: "6px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "#dc3545",
    border: "none",
    color: "white",
    padding: "6px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  modal: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    background: "white",
    padding: "20px",
    width: "350px",
    borderRadius: "8px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  saveBtn: {
    width: "100%",
    padding: "10px",
    background: "#052c65",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  cancelBtn: {
    width: "100%",
    padding: "10px",
    background: "gray",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
    cursor: "pointer"
  }
};

export default Users;
