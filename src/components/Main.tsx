"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Main.module.scss";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface MainProps {
  posts: Post[];
  categories: string[];
  loading: boolean;
}

const Main: React.FC<MainProps> = ({ posts, categories, loading }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = posts.filter((post) => post.category === selectedCategory);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, posts]);

  const handleAddPost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      title: newTitle,
      price: newPrice,
      category: newCategory,
      description: newDescription,
      image: newImage,
    };
    setFilteredPosts([...filteredPosts, newPost]);
    setShowAddModal(false);
    setNewTitle("");
    setNewPrice("");
    setNewCategory("");
    setNewDescription("");
    setNewImage("");
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
      setShowUpdateModal(true);
    }
  };

  const handleSaveUpdate = () => {
    if (selectedPostId !== null) {
      const updatedPosts = filteredPosts.map((post) =>
        post.id === selectedPostId
          ? {
              ...post,
              title: newTitle,
              price: newPrice,
              category: newCategory,
              description: newDescription,
              image: newImage,
            }
          : post
      );
      setFilteredPosts(updatedPosts);
      setShowUpdateModal(false);
      setNewTitle("");
      setNewPrice("");
      setNewCategory("");
      setNewDescription("");
      setNewImage("");
      setSelectedPostId(null);
    }
  };

  const handleDeletePost = (id: number) => {
    const filtered = filteredPosts.filter((post) => post.id !== id);
    setFilteredPosts(filtered);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      <div className={styles.containerTable}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.header__item}>
              <Link id="name" className={styles.filter__link} href="#">
                Id
              </Link>
            </div>
            <div className={styles.header__item}>
              <Link id="wins" className={styles.filter__link} href="#">
                Image
              </Link>
            </div>
            <div className={styles.header__item}>
              <Link id="draws" className={styles.filter__link} href="#">
                Title
              </Link>
            </div>
            <div className={styles.header__item}>
              <Link id="losses" className={styles.filter__link} href="#">
                Price
              </Link>
            </div>
            <div className={styles.header__item}>
              <Link id="total" className={styles.filter__link} href="#">
                Category
              </Link>
            </div>
            <div className={styles.header__item}>
              <Link id="total" className={styles.filter__link} href="#">
                Desc
              </Link>
            </div>
            <div className={styles.header__item}>
              <Link id="total" className={styles.filter__link} href="#">
                Actions
              </Link>
            </div>
          </div>
          <div className={styles.tableContent}>
            {filteredPosts.map((post) => (
              <div key={post.id} className={styles.tableRow}>
                <div className={styles.tableData}>{post.id}</div>
                <div className={styles.tableData}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className={styles.tableData}>{post.title}</div>
                <div className={styles.tableData}>{post.price}</div>
                <div className={styles.tableData}>{post.category}</div>
                <div className={styles.tableData}>
                  {post.description.length > 100
                    ? `${post.description.slice(0, 100)}...`
                    : post.description}
                </div>
                <div className={styles.tableData}>
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
                type="text"
                id="newPrice"
                value={newPrice}
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
                type="text"
                id="price"
                value={newPrice}
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
