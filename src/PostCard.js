import React from 'react';
import ACFFieldsDisplay from './ACFFieldsDisplay';
import PostTitle from './WPComponents/PostTitle';
import PostCategories from './WPComponents/PostCategories';
import PostDate from './WPComponents/PostDate';
import PostModifiedDate from './PostCardComponents/DateModified';
import PostAuthor from './WPComponents/PostAuthor';
import CustomRating from './PostCardComponents/Rating';
import PostCategoryFilter from './PostCardComponents/PostCategoryFilter';
import PostFeaturedMedia from './WPComponents/PostFeaturedMedia';

const PostCard = ({ post }) => {

    // Obtener nombres de categorías
    let categoryNames = [];
    try {
        categoryNames = post.categories?.nodes?.map(term => term.name) || [];
    } catch (error) {
        console.error("Error obteniendo categorías del post:", error, post);
        categoryNames = [];
    }

    // Extraer el author ACF solo si es "Texture Packs"
    let author = null;
    try {
        if (categoryNames.includes("Texture Packs") && post.texturePacksData?.author) {
            author = post.texturePacksData.author;
        }
    } catch (error) {
        console.error("Error obteniendo author de texturePacksData:", error, post);
        author = null;
    }

    return (
        <PostCategoryFilter post={post} filterCategory="Texture Packs">
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card group relative block bg-gray-900 p-5 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900"
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
                    <PostAuthor author={author} />
                    <PostCategories categories={post.categories} />
                    <PostModifiedDate post={post} />
                    {post.date && <PostDate date={post.date} />}
                    {typeof post.texturePacksData?.rating !== "undefined" && post.texturePacksData.rating !== null && (
                        <CustomRating value={post.texturePacksData.rating} />
                    )}
                    <ACFFieldsDisplay acf={post.acf} />
                </div>
            </a>
        </PostCategoryFilter>
    );
};

export default PostCard;
