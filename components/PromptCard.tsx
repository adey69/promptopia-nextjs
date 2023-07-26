'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

interface IPromptCardProps {
  post: IPost;
  handleTagClick?: (e: ChangeEvent<HTMLInputElement> | string) => void;
  handleEdit?: (p: IPost) => void;
  handleDelete?: (p: IPost) => Promise<void>;
}

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }: IPromptCardProps) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link href={`/profile/${post?.creator?._id}?name=${post?.creator?.username}`}>
          <Image
            src={post.creator?.image ?? ''}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator?.username ?? ''}
          </h3>
          <p className="font-intern text-sm text-gray-500">{post.creator?.email ?? ''}</p>
        </Link>
        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt="copied"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user?.id === post.creator?._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
