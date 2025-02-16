"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Main.module.scss";
import stylesT from "@/styles/Table.module.scss";
import Link from "next/link";
import upArrow from "../../public/upArrow.svg";
import downArrow from "../../public/downArrow.svg";
import { Post } from "@/types/Posts";
import { MainProps } from "@/types/MainProps";

const Main: React.FC<MainProps> = ({ posts, categories, loading }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newImage, setNewImage] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [sortOrderPrice, setSortOrderPrice] = useState<"asc" | "desc">("desc");
  const [sortOrderRating, setSortOrderRating] = useState<"asc" | "desc">(
    "desc"
  );

  useEffect(() => {
    if (selectedCategory) {
      const filtered = posts.filter(
        (post) => post.category === selectedCategory
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, posts]);

  const handleSortByPrice = () => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (sortOrderPrice === "asc") {
        return Number(a.price) - Number(b.price);
      } else {
        return Number(b.price) - Number(a.price);
      }
    });
    setFilteredPosts(sortedPosts);
    setSortOrderPrice(sortOrderPrice === "asc" ? "desc" : "asc");
  };
  const handleSortByRating = () => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      // Check if `rating` exists and has a `rate` property
      const rateA = Number(a.rating?.rate) || 0;
      const rateB = Number(b.rating?.rate) || 0;

      if (sortOrderRating === "asc") {
        return rateA - rateB;
      } else {
        return rateB - rateA;
      }
    });

    setFilteredPosts(sortedPosts);
    setSortOrderRating(sortOrderRating === "asc" ? "desc" : "asc");
  };

  const handleAddPost = async () => {
    const newPost: Omit<Post, "id"> = {
      title: newTitle,
      price: newPrice,
      category: newCategory,
      description: newDescription,
      rating: {
        rate: newRating ,
        count: Number(newRating) ,
      },
      image: newImage,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Ürün eklenirken bir hata oluştu");
      }

      const createdPost: Post = await response.json();
      setFilteredPosts([...filteredPosts, createdPost]);
      setShowAddModal(false);
      setNewTitle("");
      setNewPrice("");
      setNewCategory("");
      setNewDescription("");
      setNewRating("");
      setNewImage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewTitle("");
    setNewPrice("");
    setNewCategory("");
    setNewDescription("");
    setNewRating("");
    setNewImage("");
  };

  const handleUpdatePost = (id: number) => {
    setSelectedPostId(id);
    const postToUpdate = posts.find((post) => post.id === id);
    if (postToUpdate) {
      setNewTitle(postToUpdate.title);
      setNewPrice(postToUpdate.price);
      setNewCategory(postToUpdate.category);
      setNewDescription(postToUpdate.description);
      setNewImage(postToUpdate.image);
      setNewRating(postToUpdate.rating.rate);
      setShowUpdateModal(true);
    }
  };
  const handleSaveUpdate = async () => {
    if (selectedPostId !== null) {
      const updatedPost: Post = {
        id: selectedPostId,
        title: newTitle,
        price: newPrice,
        category: newCategory,
        description: newDescription,
        rating: {
          rate: newRating,
          count: Number(newRating) || 0,
        },
        image: newImage,
      };

      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${selectedPostId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
          }
        );

        if (!response.ok) {
          throw new Error("Ürün güncellenirken bir hata oluştu");
        }

        const updatedPostFromAPI: Post = await response.json();
        const updatedPosts = filteredPosts.map((post) =>
          post.id === selectedPostId ? updatedPostFromAPI : post
        );
        setFilteredPosts(updatedPosts);
        setShowUpdateModal(false);
        setNewTitle("");
        setNewPrice("");
        setNewCategory("");
        setNewDescription("");
        setNewRating("");
        setNewImage("");
        setSelectedPostId(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ürün silinirken bir hata oluştu");
      }

      const filtered = filteredPosts.filter((post) => post.id !== id);
      setFilteredPosts(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <div className={styles.title}>Ürün Yönetim Paneli</div>
      <div className={styles.controls}>
        <select
          className={styles.selectBox}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className={styles.addProductBtn} onClick={handleOpenAddModal}>
          <span className={styles.icon}>+</span>
          <span>Yeni Ürün Ekle</span>
        </button>
      </div>
      {loading && <p className={styles.loading}>Veriler yükleniyor...</p>}
      <div className={stylesT.container}>
        <div className={stylesT.table}>
          <div className={stylesT.row}>
            <div className={stylesT.cell}>
              <Link id="name" className={styles.filter__link} href="#">
                Id
              </Link>
            </div>
            <div className={stylesT.cell}>
              <Link id="wins" className={styles.filter__link} href="#">
                Image
              </Link>
            </div>
            <div className={stylesT.cell}>
              <Link id="draws" className={styles.filter__link} href="#">
                Title
              </Link>
            </div>
            <div className={stylesT.cell}>
              <Link
                id="losses"
                onClick={handleSortByPrice}
                className={styles.filter__link}
                href="#"
              >
                <span>Price</span>
                {sortOrderPrice === "asc" ? (
                  <Image
                    src={upArrow}
                    width={16}
                    height={16}
                    alt="upArrow"
                    className={styles.sortArrow}
                  />
                ) : (
                  <Image
                    src={downArrow}
                    width={16}
                    height={16}
                    alt="downArrow"
                    className={styles.sortArrow}
                  />
                )}
              </Link>
            </div>
            <div className={stylesT.cell}>
              <Link id="total" className={styles.filter__link} href="#">
                Category
              </Link>
            </div>
            <div className={stylesT.cell}>
              <Link id="total" className={styles.filter__link} href="#">
                Desc
              </Link>
            </div>
            <div className={stylesT.cell}>
              <Link
                id="total"
                className={`${styles.filter__link} ${styles.tableLink}`}
                onClick={handleSortByRating}
                href="#"
              >
                Rating
                {sortOrderRating === "asc" ? (
                  <Image
                    src={upArrow}
                    width={16}
                    height={16}
                    alt="upArrow"
                    className={styles.sortArrow}
                  />
                ) : (
                  <Image
                    src={downArrow}
                    width={16}
                    height={16}
                    alt="downArrow"
                    className={styles.sortArrow}
                  />
                )}
              </Link>
            </div>
            <div className={stylesT.cell}>
              <Link id="total" className={styles.filter__link} href="#">
                Actions
              </Link>
            </div>
          </div>
          {filteredPosts.map((post) => (
            <div key={post.id} className={stylesT.row}>
              <div className={stylesT.cell}>{post.id}</div>
              <div className={stylesT.cell}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={80}
                  height={80}
                  className={stylesT.photo}
                />
              </div>
              <div className={stylesT.cell && stylesT.title}>{post.title}</div>
              <div className={stylesT.cell}>$ {post.price}</div>
              <div className={stylesT.cell}>{post.category}</div>
              <div className={stylesT.cell}>
                {post.description.length > 100
                  ? `${post.description.slice(0, 100)}...`
                  : post.description}
              </div>
              <div className={stylesT.cell}>
                {" "}
                {post.rating ? post.rating.rate : "No Rating"}
              </div>
              <div className={stylesT.cell}>
                {" "}
                <button
                  className={styles.newProductBtn}
                  onClick={() => handleUpdatePost(post.id)}
                >
                  Güncelle
                </button>
                <button
                  className={styles.deleteProductBtn}
                  onClick={() => handleDeletePost(post.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Yeni Ürün Ekle</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="newTitle">Başlık:</label>
              <input
                type="text"
                id="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Başlık"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newPrice">Fiyat:</label>
              <input
                type="number"
                id="newPrice"
                value={newPrice ?? ""}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Fiyat"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newCategory">Kategori:</label>
              <select
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="">Kategori Seç</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newDescription">Açıklama:</label>
              <textarea
                id="newDescription"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Açıklama"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newRating">Rating:</label>
              <input
                type="number"
                id="newRating"
                value={newRating ?? ""}
                onChange={(e) => setNewRating(e.target.value)}
                placeholder="Rating"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newImage">Görsel URL:</label>
              <input
                type="text"
                id="newImage"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Görsel URL"
              />
            </div>
            <button onClick={handleAddPost}>Ekle</button>
            <button onClick={handleCloseAddModal}>İptal</button>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Ürün'ü Güncelle</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="title">Başlık:</label>
              <input
                type="text"
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Başlık"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="price">Fiyat:</label>
              <input
                type="number"
                id="price"
                value={newPrice ?? ""}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Fiyat"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="category">Kategori:</label>
              <select
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="">Kategori Seç</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="description">Açıklama:</label>
              <textarea
                id="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Açıklama"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newRating">Rating:</label>
              <input
                type="number"
                id="newRating"
                value={newRating ?? 0}
                onChange={(e) => setNewRating(e.target.value)}
                placeholder="Rating"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="image">Görsel URL:</label>
              <input
                type="text"
                id="image"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Görsel URL"
              />
            </div>
            <button onClick={handleSaveUpdate}>Kaydet</button>
            <button onClick={() => setShowUpdateModal(false)}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;