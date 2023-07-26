'use client';

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchedPosts, setSearchedPosts] = useState<IPost[]>([]);

  const searchPrompts = (searchValue: string) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.prompt.includes(searchValue) ||
        post.tag.includes(searchValue) ||
        post.creator?.username.includes(searchValue),
    );
    setSearchedPosts(filteredPosts);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    let searchValue = e;
    if (typeof e !== 'string') {
      searchValue = e.target.value;
    } else {
      searchValue = e;
    }
    setSearchText(searchValue);
    searchPrompts(searchValue);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data: IPost[] = await response.json();
      setPosts(data);
      setSearchedPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchedPosts} handleTagClick={handleSearchChange} />
    </section>
  );
};

export default Feed;
