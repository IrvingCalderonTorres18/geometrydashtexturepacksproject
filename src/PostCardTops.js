import React from 'react';
import PostTitle from './WPComponents/PostTitle';
import PostCategories from './WPComponents/PostCategories';
import PostDate from './WPComponents/PostDate';
import ACFFieldsDisplayTops from './ACFFieldsDisplayTops';
import PostCategoryFilter from './PostCardComponents/PostCategoryFilter';
import PostFeaturedMedia from './WPComponents/PostFeaturedMedia';
import PostAuthor from './WPComponents/PostAuthor';
import PostModifiedDate from './PostCardComponents/DateModified';

const PostCardTops = ({ post }) => {
    return (
        <PostCategoryFilter post={post} filterCategory="Tops">
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card block bg-gray-900 p-5 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900"
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
                    <PostAuthor author={post.acf?.author} />
                    <PostCategories categories={post.categories} />
                    <PostModifiedDate post={post} />
                    {post.date && <PostDate date={post.date} />}
                    {post.acf && <ACFFieldsDisplayTops acf={post.acf} />}
                </div>
            </a>
        </PostCategoryFilter>
    );
};

export default PostCardTops;
