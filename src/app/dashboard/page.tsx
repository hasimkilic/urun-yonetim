"use client";
import React, { useEffect, useState } from 'react';
import Main from '@/components/Main';
import { fetchPosts, fetchCategories, Post } from '@/utils/api';

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  return (
    <div>
      <Main posts={posts} categories={categories} loading={loading} />
    </div>
  );
}
