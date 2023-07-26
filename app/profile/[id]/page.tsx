'use client';
import { Profile } from '@components/Profile';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const params = useParams();
  const { id } = params;
  const username = useSearchParams().get('name');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (id) {
      fetchPosts();
    }
  }, []);

  return <Profile name={username} desc="Welcome to your personalized profile page" data={posts} />;
};

export default MyProfile;
