import { useState, useMemo, use } from "react";
import { motion } from "framer-motion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../Styles/Catalog.scss";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import React, { useEffect } from "react";
import axios from "axios";

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

// Mock data with NPR prices
const mockDesigns = [
  {
    _id: "1",
    title: "Peaceful Waters",
    description: "Tranquil blue abstract representing calm waters",
    category: ["Abstract", "Nature"],
    availableSizes: ["A3", "24x36"],
    availableMaterials: ["Canvas"],
    price: 4999, // NPR
    popular: true,
    createdAt: "2024-01-15",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    orientation: "portrait",
  },
  {
    _id: "2",
    title: "Minimalist Geometry",
    description: "Clean lines and shapes in neutral tones",
    category: ["Minimalist", "Modern"],
    availableSizes: ["A4", "A3", "18x24"],
    availableMaterials: ["Canvas", "Photo Paper"],
    price: 3999, // NPR
    popular: false,
    createdAt: "2024-02-01",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    orientation: "landscape",
  },
  {
    _id: "3",
    title: "Verdant Garden",
    description: "Fresh greens and yellows evoking spring meadows",
    category: ["Nature", "Colorful"],
    availableSizes: ["12x12", "A3", "24x24"],
    availableMaterials: ["Canvas", "Vinyl"],
    price: 4499, // NPR
    popular: true,
    createdAt: "2024-02-10",
    image: "https://images.unsplash.com/photo-1501472312651-726afe119ff1",
    orientation: "portrait",
  },
  {
    _id: "4",
    title: "Mountain Mist",
    description: "Serene mountain landscape with morning fog",
    category: ["Nature", "Spiritual"],
    availableSizes: ["A4", "A3", "24x36"],
    availableMaterials: ["Canvas", "Vinyl"],
    price: 5499,
    popular: true,
    createdAt: "2024-02-15",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    orientation: "landscape",
  },
  {
    _id: "5",
    title: "Golden Abstract",
    description: "Warm golden tones with flowing organic shapes",
    category: ["Abstract", "Modern", "Colorful"],
    availableSizes: ["12x12", "18x24", "24x24"],
    availableMaterials: ["Canvas", "Photo Paper"],
    price: 4799,
    popular: false,
    createdAt: "2024-02-20",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8",
    orientation: "portrait",
  },
  {
    _id: "6",
    title: "Office Inspiration",
    description: "Motivational geometric design for workspace",
    category: ["Office", "Motivational", "Minimalist"],
    availableSizes: ["A4", "A3", "18x24"],
    availableMaterials: ["Canvas"],
    price: 4299,
    popular: true,
    createdAt: "2024-03-01",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    orientation: "landscape",
  },
];

const DesignCard = ({ design, onAddToCart }) => {
  const formatNPR = (price) => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      className="design-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
    >
      <div className={`design-card__image-container ${design.orientation}`}>
        <img
          src={design.imageUrl}
          alt={design.title}
          className="design-card__image"
        />
        {design.popular && <span className="design-card__badge">Popular</span>}
      </div>
      <div className="design-card__content">
        <div className="design-card__header">
          <h3 className="design-card__title">{design.title}</h3>
          <span className="design-card__price">{formatNPR(design.price)}</span>
        </div>
        <p className="design-card__description">{design.description}</p>
        <p className="design-card__sizes">
          Sizes: {design.availableSizes.join(", ")}
        </p>
        <button
          className="design-card__add-to-cart"
          onClick={() => onAddToCart(design)}
        >
          <ShoppingCartIcon className="design-card__cart-icon" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export function Catalog() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
  };

  const handleAddToCart = (design) => {
    const visitorId = localStorage.getItem("visitorId");

    setCart((prev) => {
      const updatedCart = [
        ...prev,
        { ...design, quantity: 1, visitorId, cartId: Date.now().toString() },
      ];

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });

    setLastAddedItem(design.title);
    setShowCartNotification(true);

    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const filteredAndSortedDesigns = useMemo(() => {
    let filtered = mockDesigns.filter((design) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => design.category.includes(cat));

      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => design.availableSizes.includes(size));

      return categoryMatch && sizeMatch;
    });

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "popular":
        return [...filtered].sort(
          (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0),
        );
      case "newest":
      default:
        return [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  }, [selectedCategories, selectedSizes, sortBy]);

  const activeFilterCount = selectedCategories.length + selectedSizes.length;

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatNPR = (price) => {
    return new Intl.NumberFormat("ne-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const navigate = useNavigate();

  const [allDesigns, setAllDesigns] = useState([]);

  const getAllDesigns = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/admin/getDesigns`,
      );
      setAllDesigns(data?.data?.data);
    } catch (error) {
      console.error("Error fetching designs:", error);
    }
  };
  // State
  const [selectedCat, setSelectedCategory] = useState([]);
  const [selectedSiz, setSelectedSize] = useState([]);

  // Handlers
  const toggleCat = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleSiz = (size) => {
    setSelectedSize((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };
  const handleFilter = async () => {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/filterDesigns`,
        { categories: selectedCat, sizes: selectedSiz, sortBy },
      );
      console.log(data?.data?.data);
      setAllDesigns(data?.data?.data);
    } catch (error) {
      console.error("Error fetching filtered designs:", error);
    }
  };
  const [selectedItems, setSelectedItems] = useState([]);

  const setOrders = async (order) => {
    try {
      const id = localStorage.getItem("visitorId");

      // Get existing orders from localStorage
      let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // Add the new order (object only, no extra array)
      const newOrder = { ...order, visitorId: id };
      savedOrders.push(newOrder);

      // Save back to localStorage
      localStorage.setItem("orders", JSON.stringify(savedOrders));

      // Update React state so UI reflects changes immediately
      setSelectedItems(savedOrders);

      console.log("Visitor:", id, "Order:", newOrder);
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  // Hydrate state from localStorage when component mounts
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setSelectedItems(savedOrders);
  }, []);

  useEffect(() => {
    getAllDesigns();
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0 || selectedSizes.length > 0) {
      handleFilter();
    }
  }, [selectedCategories, selectedSizes]);

  return (
    <>
      <Navbar></Navbar>
      <div className="browse-designs">
        {/* Cart Notification */}
        {showCartNotification && (
          <motion.div
            className="cart-notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <ShoppingCartIcon className="cart-notification__icon" />
            <span>{lastAddedItem} added to cart</span>
          </motion.div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="cart-summary">
            <div className="cart-summary__content">
              <div className="cart-summary__info">
                <ShoppingCartIcon className="cart-summary__icon" />
                <span className="cart-summary__count">
                  {totalCartItems} item{totalCartItems !== 1 ? "s" : ""}
                </span>
                <span className="cart-summary__total">
                  {formatNPR(cartTotal)}
                </span>
              </div>
              <button
                className="cart-summary__checkout"
                onClick={() => {
                  navigate("/checkout");
                  setOrders(cart);
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        <div className="browse-designs__container">
          {/* Header */}
          <div className="browse-designs__header">
            <h1 className="browse-designs__title">Browse Designs</h1>
            <p className="browse-designs__subtitle">
              Explore our complete collection of {mockDesigns.length} canvas art
              designs
            </p>
          </div>

          <div className="browse-designs__content">
            {/* Filters Sidebar */}
            <aside
              className={`browse-designs__sidebar ${showFilters ? "is-visible" : ""}`}
            >
              <div className="filters">
                <div className="filters__header">
                  <h3 className="filters__title">
                    <FilterAltIcon className="filters__icon" />
                    Filters
                  </h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="filters__clear"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Categories */}
                {/* Categories */}
                <div className="filters__section">
                  <h4 className="filters__section-title">Categories</h4>
                  <div className="filters__list">
                    {CATEGORIES.map((category) => (
                      <label key={category} className="filters__item">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => {
                            toggleCategory(category);
                            toggleCat(category);
                          }}
                          className="filters__checkbox"
                        />
                        <span className="filters__label">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="filters__section">
                  <h4 className="filters__section-title">Sizes</h4>
                  <div className="filters__list">
                    {SIZES.map((size) => (
                      <label key={size} className="filters__item">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => {
                            toggleSize(size);
                            toggleSiz(size);
                          }}
                          className="filters__checkbox"
                        />
                        <span className="filters__label">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="browse-designs__main">
              {/* Controls */}
              <div className="controls">
                <div className="controls__left">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="controls__filter-btn"
                  >
                    {showFilters ? <CloseIcon /> : <FilterAltIcon />}
                    {showFilters ? "Hide" : "Show"} Filters
                  </button>
                  {/* here */}
                  <span className="controls__count">
                    {allDesigns.length}{" "}
                    {allDesigns.length === 1 ? "design" : "designs"}
                  </span>
                </div>

                <div className="controls__right">
                  <label htmlFor="sort" className="controls__sort-label">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      handleFilter();
                    }}
                    className="controls__sort-select"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="active-filters">
                  {selectedCategories.map((cat) => (
                    <span key={cat} className="active-filters__tag">
                      {cat}
                      <button
                        onClick={() => toggleCategory(cat)}
                        className="active-filters__remove"
                      >
                        <CloseIcon />
                      </button>
                    </span>
                  ))}
                  {selectedSizes.map((size) => (
                    <span key={size} className="active-filters__tag">
                      {size}
                      <button
                        onClick={() => toggleSize(size)}
                        className="active-filters__remove"
                      >
                        <CloseIcon />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Designs Grid */}
              {allDesigns.length > 0 ? (
                <div className="designs-grid">
                  {allDesigns.map((design) => (
                    <DesignCard
                      key={design._id}
                      design={design}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="no-results"
                >
                  <p className="no-results__text">
                    No designs match your filters
                  </p>
                  <button onClick={getAllDesigns} className="no-results__btn">
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
