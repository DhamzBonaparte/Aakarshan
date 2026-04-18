import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PrintIcon from "@mui/icons-material/Print";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import Swal from "sweetalert2";
import axios from "axios";
import "../Styles/Admin.scss";

const CATEGORIES = [
  "Spiritual",
  "Motivational",
  "Modern",
  "Office",
  "Abstract",
  "Nature",
  "Minimalist",
  "Colorful",
];
const SIZES = ["A4", "A3", "12x12", "18x24", "24x24", "24x36"];
const MATERIALS = ["Canvas", "Vinyl", "Photo Paper"];

// Mock designs data
const mockDesignsData = [
  {
    _id: "1",
    title: "Peaceful Waters",
    description: "Tranquil blue abstract representing calm waters",
    category: ["Abstract", "Nature"],
    availableSizes: ["A3", "24x36"],
    availableMaterials: ["Canvas"],
    price: 4999,
    popular: true,
    createdAt: "2024-01-15",
    imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
  },
  {
    _id: "2",
    title: "Minimalist Geometry",
    description: "Clean lines and shapes in neutral tones",
    category: ["Minimalist", "Modern"],
    availableSizes: ["A4", "A3", "18x24"],
    availableMaterials: ["Canvas", "Photo Paper"],
    price: 3999,
    popular: false,
    createdAt: "2024-02-01",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
  },
  {
    _id: "3",
    title: "Verdant Garden",
    description: "Fresh greens and yellows evoking spring meadows",
    category: ["Nature", "Colorful"],
    availableSizes: ["12x12", "A3", "24x24"],
    availableMaterials: ["Canvas", "Vinyl"],
    price: 4499,
    popular: true,
    createdAt: "2024-02-10",
    imageUrl: "https://images.unsplash.com/photo-1501472312651-726afe119ff1",
  },
  {
    _id: "4",
    title: "Abstract Horizons",
    description: "Warm abstract composition with flowing lines",
    category: ["Abstract", "Modern"],
    availableSizes: ["A4", "A3", "24x36"],
    availableMaterials: ["Canvas"],
    price: 4500,
    popular: false,
    createdAt: "2024-03-01",
    imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8",
  },
  {
    _id: "5",
    title: "Ember Flow",
    description: "Dynamic abstract with fiery warm tones",
    category: ["Abstract", "Colorful"],
    availableSizes: ["12x12", "18x24"],
    availableMaterials: ["Canvas", "Vinyl"],
    price: 5200,
    popular: false,
    createdAt: "2024-03-10",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
  },
];

// Mock orders data
const mockOrdersData = [
  {
    _id: "1",
    orderId: "ORD-001",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh@example.com",
    customerPhone: "+977 9812345678",
    deliveryAddress: {
      street: "Thamel Street 123",
      city: "Kathmandu",
      postalCode: "44600",
    },
    items: [
      { ...mockDesignsData[3], price: 4500 },
      { ...mockDesignsData[4], price: 5200 },
    ],
    total: 9700,
    paymentMethod: "eSewa",
    status: "delivered",
    createdAt: "2026-04-14T10:30:00",
  },
  {
    _id: "2",
    orderId: "ORD-002",
    customerName: "Sita Sharma",
    customerEmail: "sita@example.com",
    customerPhone: "+977 9823456789",
    deliveryAddress: {
      street: "Durbar Marg 45",
      city: "Kathmandu",
      postalCode: "44600",
    },
    items: [{ ...mockDesignsData[0], price: 4999 }],
    total: 4999,
    paymentMethod: "Khalti",
    status: "printing",
    createdAt: "2026-04-13T14:20:00",
  },
  {
    _id: "3",
    orderId: "ORD-003",
    customerName: "Amit Thapa",
    customerEmail: "amit@example.com",
    customerPhone: "+977 9834567890",
    deliveryAddress: {
      street: "Jhamsikhel Road",
      city: "Lalitpur",
      postalCode: "44700",
    },
    items: [
      { ...mockDesignsData[1], price: 3999 },
      { ...mockDesignsData[2], price: 4499 },
    ],
    total: 8498,
    paymentMethod: "COD",
    status: "shipped",
    createdAt: "2026-04-12T09:15:00",
  },
];

export function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [designs, setDesigns] = useState(mockDesignsData);
  const [orders, setOrders] = useState(mockOrdersData);
  const [showAddDesign, setShowAddDesign] = useState(false);
  const [editingDesign, setEditingDesign] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [newDesign, setNewDesign] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    availableSizes: [],
    availableMaterials: [],
    category: [],
    popular: false,
  });

  useEffect(() => {
    const savedDesigns = localStorage.getItem("adminDesigns");
    const savedOrders = localStorage.getItem("adminOrders");
    if (savedDesigns) setDesigns(JSON.parse(savedDesigns));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    getInfo();
  }, []);

  useEffect(() => {
    localStorage.setItem("adminDesigns", JSON.stringify(designs));
  }, [designs]);

  useEffect(() => {
    localStorage.setItem("adminOrders", JSON.stringify(orders));
  }, [orders]);

  const handleAddDesign = () => {
    if (!newDesign.title || !newDesign.imageUrl || newDesign.price <= 0) {
      alert("Please fill all required fields");
      return;
    }

    const design = {
      _id: Date.now().toString(),
      ...newDesign,
      createdAt: new Date().toISOString(),
    };

    setDesigns([...designs, design]);
    setNewDesign({
      title: "",
      description: "",
      imageUrl: "",
      price: 0,
      availableSizes: [],
      availableMaterials: [],
      category: [],
      popular: false,
    });
    setShowAddDesign(false);
  };

  const handleUpdateDesign = () => {
    if (!editingDesign) return;
    setDesigns(
      designs.map((d) => (d._id === editingDesign._id ? editingDesign : d)),
    );
    setEditingDesign(null);
  };

  const handleDeleteDesign = (id) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      setDesigns(designs.filter((d) => d._id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    setOrders(orders.map((o) => (o._id === orderId ? { ...o, status } : o)));
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalDesigns: designs.length,
  };

  const toggleCategory = (cat, isEditing = false) => {
    if (isEditing && editingDesign) {
      const categories = editingDesign.category.includes(cat)
        ? editingDesign.category.filter((c) => c !== cat)
        : [...editingDesign.category, cat];
      setEditingDesign({ ...editingDesign, category: categories });
    } else {
      const categories = newDesign.category.includes(cat)
        ? newDesign.category.filter((c) => c !== cat)
        : [...newDesign.category, cat];
      setNewDesign({ ...newDesign, category: categories });
    }
  };

  const toggleSize = (size, isEditing = false) => {
    if (isEditing && editingDesign) {
      const sizes = editingDesign.availableSizes.includes(size)
        ? editingDesign.availableSizes.filter((s) => s !== size)
        : [...editingDesign.availableSizes, size];
      setEditingDesign({ ...editingDesign, availableSizes: sizes });
    } else {
      const sizes = newDesign.availableSizes.includes(size)
        ? newDesign.availableSizes.filter((s) => s !== size)
        : [...newDesign.availableSizes, size];
      setNewDesign({ ...newDesign, availableSizes: sizes });
    }
  };

  const toggleMaterial = (material, isEditing = false) => {
    if (isEditing && editingDesign) {
      const materials = editingDesign.availableMaterials.includes(material)
        ? editingDesign.availableMaterials.filter((m) => m !== material)
        : [...editingDesign.availableMaterials, material];
      setEditingDesign({ ...editingDesign, availableMaterials: materials });
    } else {
      const materials = newDesign.availableMaterials.includes(material)
        ? newDesign.availableMaterials.filter((m) => m !== material)
        : [...newDesign.availableMaterials, material];
      setNewDesign({ ...newDesign, availableMaterials: materials });
    }
  };

  const formatNPR = (price) => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircleIcon />;
      case "shipped":
        return <LocalShippingIcon />;
      case "printing":
        return <PrintIcon />;
      case "cancelled":
        return <CancelIcon />;
      default:
        return <PendingIcon />;
    }
  };

  const getInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.get(
        "http://localhost:3000/api/v1/admin/verify",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [popular, setPopular] = useState(false);
  const [err, setErr] = useState("");
  const [des, setDes] = useState([]);

  const uploadDesign = async () => {
    try {
      const data = await axios.post(
        "http://localhost:3000/api/v1/admin/uploadDesign",
        {
          title,
          price,
          description,
          imageUrl,
          category,
          availableSizes,
          availableMaterials,
          popular,
        },
      );
      await getDesigns();
      handleCancel();
    } catch (err) {
      setErr(err.response?.data?.error);
      setTimeout(() => setErr(""), 3000);
      console.log(err);
    }
  };

  const getDesigns = async () => {
    try {
      const data = await axios.get(
        "http://localhost:3000/api/v1/admin/getDesigns",
      );
      setDes(data?.data?.data);
    } catch (err) {
      console.error("Error fetching designs:", err);
      setErr(err.response?.data?.error);
      setTimeout(() => setErr(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the design.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:3000/api/v1/admin/deleteDesign/${id}`,
        );
        await getDesigns();

        Swal.fire("Deleted!", "The design has been removed.", "success");
      }
    } catch (err) {
      console.error("Error deleting design:", err);
      setErr(err.response?.data?.error);
      setTimeout(() => setErr(""), 3000);
    }
  };

  const updateDesign = async (id) => {
    try {
      const data = await axios.put(
        `http://localhost:3000/api/v1/admin/updateDesign/${id}`,
        {
          title,
          price,
          description,
          imageUrl,
          category,
          availableSizes,
          availableMaterials,
          popular,
        },
      );
      console.log(data);
      await getDesigns();

      // Reset form after successful update
      resetForm();
      setEditingDesign(null);

      // Show success message
      Swal.fire("Updated!", "The design has been updated.", "success");
    } catch (err) {
      console.error("Error updating design:", err);
      setErr(err.response?.data?.error);
      setTimeout(() => setErr(""), 3000);
    }
  };

  // Add a reset function
  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setCategory([]);
    setAvailableSizes([]);
    setAvailableMaterials([]);
    setPopular(false);
    setErr("");
  };

  // Update the cancel button handler
  const handleCancel = () => {
    setShowAddDesign(false);
    setEditingDesign(null);
    resetForm(); // Reset form when canceling
  };

  useEffect(() => {
    getDesigns();
  }, []);

  useEffect(() => {
    if (editingDesign) {
      setTitle(editingDesign.title || "");
      setPrice(editingDesign.price || 0);
      setDescription(editingDesign.description || "");
      setImageUrl(editingDesign.imageUrl || "");
      setPopular(editingDesign.popular || false);
      setCategory(editingDesign.category || []);
      setAvailableSizes(editingDesign.availableSizes || []);
      setAvailableMaterials(editingDesign.availableMaterials || []);
    }
  }, [editingDesign]);

  return (
    <>
      <div className="admin">
        <div className="admin__container">
          {/* Header */}
          <div className="admin__header">
            <h1 className="admin__title">Admin Dashboard</h1>
            <p className="admin__subtitle">
              Manage your Aakarshan canvas art business
            </p>
          </div>

          {/* Sidebar + Main Content Layout */}
          <div className="admin__layout">
            {/* Sidebar Navigation */}
            <div className="admin__sidebar">
              <nav className="admin-nav">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`admin-nav__item ${activeTab === "dashboard" ? "admin-nav__item--active" : ""}`}
                >
                  <DashboardIcon className="admin-nav__icon" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab("designs")}
                  className={`admin-nav__item ${activeTab === "designs" ? "admin-nav__item--active" : ""}`}
                >
                  <InventoryIcon className="admin-nav__icon" />
                  <span>Designs ({designs.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`admin-nav__item ${activeTab === "orders" ? "admin-nav__item--active" : ""}`}
                >
                  <ShoppingCartIcon className="admin-nav__icon" />
                  <span>Orders ({orders.length})</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="admin__main">
              {/* Dashboard Tab */}
              {activeTab === "dashboard" && (
                <div className="dashboard">
                  {/* Stats Cards */}
                  <div className="dashboard__stats">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="stat-card"
                    >
                      <div className="stat-card__header">
                        <div className="stat-card__icon stat-card__icon--primary">
                          <ShoppingCartIcon />
                        </div>
                        <TrendingUpIcon className="stat-card__trend" />
                      </div>
                      <h3 className="stat-card__value">{stats.totalOrders}</h3>
                      <p className="stat-card__label">Total Orders</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="stat-card"
                    >
                      <div className="stat-card__header">
                        <div className="stat-card__icon stat-card__icon--warning">
                          <AccessTimeIcon />
                        </div>
                      </div>
                      <h3 className="stat-card__value">
                        {stats.pendingOrders}
                      </h3>
                      <p className="stat-card__label">Pending Orders</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="stat-card"
                    >
                      <div className="stat-card__header">
                        <div className="stat-card__icon stat-card__icon--success">
                          <AttachMoneyIcon />
                        </div>
                      </div>
                      <h3 className="stat-card__value">
                        {formatNPR(stats.totalRevenue)}
                      </h3>
                      <p className="stat-card__label">Total Revenue</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="stat-card"
                    >
                      <div className="stat-card__header">
                        <div className="stat-card__icon stat-card__icon--info">
                          <InventoryIcon />
                        </div>
                      </div>
                      <h3 className="stat-card__value">{des?.length}</h3>
                      <p className="stat-card__label">Total Designs</p>
                    </motion.div>
                  </div>

                  {/* Recent Orders */}
                  <div className="recent-orders">
                    <h2 className="recent-orders__title">Recent Orders</h2>
                    <div className="recent-orders__list">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order._id} className="recent-order">
                          <div className="recent-order__info">
                            <p className="recent-order__id">
                              {order.orderId} - {order.customerName}
                            </p>
                            <p className="recent-order__details">
                              {order.items.length} items ·{" "}
                              {formatNPR(order.total)}
                            </p>
                          </div>
                          <div className="recent-order__status">
                            <span
                              className={`status-badge status-badge--${order.status}`}
                            >
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Designs Tab */}
              {activeTab === "designs" && (
                <div className="designs-tab">
                  <div className="designs-tab__header">
                    <h2 className="designs-tab__title">Manage Designs</h2>
                    <button
                      onClick={() => setShowAddDesign(true)}
                      className="designs-tab__add-btn"
                    >
                      <AddIcon />
                      Add New Design
                    </button>
                  </div>

                  {/* Add/Edit Design Form */}
                  {(showAddDesign || editingDesign) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="design-form"
                    >
                      <h3 className="design-form__title">
                        {editingDesign ? "Edit Design" : "Add New Design"}
                      </h3>
                      {/* //FOrm starts here */}
                      <div className="design-form__grid">
                        <div className="design-form__group">
                          <label>Title *</label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Abstract Horizons"
                          />
                        </div>

                        <div className="design-form__group">
                          <label>Price (NPR) *</label>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="4500"
                          />
                        </div>

                        <div className="design-form__group design-form__group--full">
                          <label>Description</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            placeholder="Warm abstract composition..."
                          />
                        </div>

                        <div className="design-form__group design-form__group--full">
                          <label>Image URL *</label>
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                          />
                        </div>

                        <div className="design-form__group">
                          <label>Categories</label>
                          <div className="design-form__tags">
                            {CATEGORIES.map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={(e) => {
                                  setCategory((prev) =>
                                    prev.includes(cat)
                                      ? prev.filter((c) => c !== cat)
                                      : [...prev, cat],
                                  );
                                  toggleCategory(cat, !!editingDesign);
                                }}
                                className={`design-form__tag ${
                                  (editingDesign
                                    ? editingDesign.category
                                    : newDesign.category
                                  ).includes(cat)
                                    ? "design-form__tag--active"
                                    : ""
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="design-form__group">
                          <label>Sizes</label>
                          <div className="design-form__tags">
                            {SIZES.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={(e) => {
                                  setAvailableSizes((prev) =>
                                    prev.includes(size)
                                      ? prev.filter((s) => s !== size)
                                      : [...prev, size],
                                  );
                                  toggleSize(size, !!editingDesign);
                                }}
                                className={`design-form__tag ${
                                  (editingDesign
                                    ? editingDesign.availableSizes
                                    : newDesign.availableSizes
                                  ).includes(size)
                                    ? "design-form__tag--active"
                                    : ""
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="design-form__group design-form__group--full">
                          <label>Materials</label>
                          <div className="design-form__tags">
                            {MATERIALS.map((mat) => (
                              <button
                                key={mat}
                                type="button"
                                onClick={(e) => {
                                  setAvailableMaterials((prev) =>
                                    prev.includes(mat)
                                      ? prev.filter((m) => m !== mat)
                                      : [...prev, mat],
                                  );
                                  toggleMaterial(mat, !!editingDesign);
                                }}
                                className={`design-form__tag ${
                                  (editingDesign
                                    ? editingDesign.availableMaterials
                                    : newDesign.availableMaterials
                                  ).includes(mat)
                                    ? "design-form__tag--active"
                                    : ""
                                }`}
                              >
                                {mat}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="design-form__group design-form__group--full">
                          <label className="design-form__checkbox-label">
                            <input
                              type="checkbox"
                              checked={popular}
                              onChange={(e) => setPopular(e.target.checked)}
                            />
                            <span>Mark as Popular (show on homepage)</span>
                          </label>
                        </div>
                      </div>

                      <div className="design-form__actions">
                        <button
                          onClick={() => {
                            if (editingDesign) {
                              updateDesign(editingDesign._id);
                            } else {
                              uploadDesign();
                            }
                          }}
                          className="design-form__submit"
                        >
                          {editingDesign ? "Update Design" : "Add Design"}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="design-form__cancel"
                        >
                          Cancel
                        </button>
                      </div>
                      <p
                        style={{
                          padding: "10px",
                          color: "red",
                          display: err ? "block" : "none",
                        }}
                      >
                        {err}
                      </p>
                    </motion.div>
                  )}

                  {/* Designs Grid */}
                  <div className="designs-grid">
                    {des.map((design) => (
                      <div key={design._id} className="design-card">
                        <div className="design-card__image">
                          <img src={design.imageUrl} alt={design.title} />
                        </div>
                        <div className="design-card__content">
                          <h3 className="design-card__title">{design.title}</h3>
                          <p className="design-card__description">
                            {design.description}
                          </p>
                          <div className="design-card__footer">
                            <span className="design-card__price">
                              {formatNPR(design.price)}
                            </span>
                            {/* {design.popular && (
                              <span className="design-card__badge">
                                Popular
                              </span>
                            )} */}
                          </div>
                          <div className="design-card__actions">
                            <button
                              onClick={() => setEditingDesign(design)}
                              className="design-card__edit"
                            >
                              <EditIcon />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(design._id)}
                              className="design-card__delete"
                            >
                              <DeleteOutlinedIcon />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="orders-tab">
                  <h2 className="orders-tab__title">Manage Orders</h2>

                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order._id} className="order-card">
                        <div className="order-card__header">
                          <div>
                            <h3 className="order-card__id">{order.orderId}</h3>
                            <p className="order-card__date">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </div>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(order._id, e.target.value)
                            }
                            className={`status-select status-select--${order.status}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="printing">Printing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="order-card__details">
                          <div className="order-card__customer">
                            <h4>Customer Details</h4>
                            <p>
                              <span>Name:</span> {order.customerName}
                            </p>
                            <p>
                              <span>Email:</span> {order.customerEmail}
                            </p>
                            <p>
                              <span>Phone:</span> {order.customerPhone}
                            </p>
                          </div>

                          <div className="order-card__address">
                            <h4>Delivery Address</h4>
                            <p>{order.deliveryAddress.street}</p>
                            <p>
                              {order.deliveryAddress.city},{" "}
                              {order.deliveryAddress.postalCode}
                            </p>
                          </div>
                        </div>

                        <div className="order-card__items">
                          <h4>Order Items ({order.items.length})</h4>
                          <div className="order-items">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="order-item">
                                <div className="order-item__image">
                                  <img src={item.imageUrl} alt={item.title} />
                                </div>
                                <div className="order-item__info">
                                  <p className="order-item__title">
                                    {item.title}
                                  </p>
                                  <p className="order-item__category">
                                    {item.category?.slice(0, 2).join(", ")}
                                  </p>
                                </div>
                                <div className="order-item__price">
                                  {formatNPR(item.price)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="order-card__footer">
                          <div className="order-card__payment">
                            <span>Payment Method:</span> {order.paymentMethod}
                          </div>
                          <div className="order-card__total">
                            <span>Total:</span>
                            <strong>{formatNPR(order.total)}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
