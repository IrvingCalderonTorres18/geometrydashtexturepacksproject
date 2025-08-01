import React from 'react';
import PostTitle from './WPComponents/PostTitle';
import PostCategoryFilter from './PostCardComponents/PostCategoryFilter';
import PostFeaturedMedia from './WPComponents/PostFeaturedMedia';
import PostAuthor from './WPComponents/PostAuthor';
import PostCategories from './WPComponents/PostCategories';
import PostDate from './WPComponents/PostDate';
import PostModifiedDate from './PostCardComponents/DateModified';
import ACFFieldsDisplayContent from './ACFFieldsDisplayContent';

const PostCardContent = ({ post }) => {
    return (
        <PostCategoryFilter post={post} filterCategory="Content">
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card group block bg-gray-900 p-5 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900"
            >
                <div className="content">
                    <PostFeaturedMedia
                        image={post.featuredImage?.node?.sourceUrl}
                        title={typeof post.title === "string" ? post.title : ""}
                        alt={post.featuredImage?.node?.altText}
                        postDate={post.date}
                        dateModified={post.contentData?.dateModified}
                    />
                    <PostTitle title={post.title} />
                    <PostCategories categories={post.categories} />
                    <PostModifiedDate post={post} />
                    {post.date && <PostDate date={post.date} />}
                    {post.acf && <ACFFieldsDisplayContent acf={post.acf} />}
                </div>
            </a>
        </PostCategoryFilter>
    );
};

export default PostCardContent;
