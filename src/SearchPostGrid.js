import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import PostCardTops from './PostCardTops';
import PostCardMods from './PostCardMods';
import PostCardContent from './PostCardContent';
import PaginationControls from './PaginationControls';
import NoResultsImage from "./icons/image.png";
import LoadingBackdrop from './LoadingBackdrop';

const API_GRAPHQL = "http://localhost:10004/graphql";

async function fetchGraphQL(query, variables = {}) {
    const response = await fetch(API_GRAPHQL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });
    const { data, errors } = await response.json();
    if (errors) throw new Error(errors.map(e => e.message).join(", "));
    return data;
}

const SearchPostGrid = ({ searchQuery }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 6;
    const [inputPage, setInputPage] = useState(currentPage);
    const [pageError, setPageError] = useState('');

    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
            setInputPage(1); 
        }
    }, [searchQuery]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPosts = async () => {
            setLoading(true);
            setError(null);

            try {
                const words = [...new Set(searchQuery.toLowerCase().match(/\b\w{3,}\b/g) || [])];
                const cleanedQuery = words.join(' ');

                // 1. Buscar posts por texto
                const POSTS_BY_SEARCH_QUERY = `
                    query SearchPosts($search: String, $size: Int) {
                        posts(where: { search: $search }, first: $size) {
                            nodes {
                                id
                                title
                                date
                                slug
                                contentData { dateModified type articleType resourceType tutorialType }
                                modsData { category dateModified author authorAcf versiones versionMod typeClassic typeGeode platforms rating paid }
                                texturePacksData { dateModified author authorAcf versiones color1 color2 color3 type platforms graphics style geode level rating}
                                topsData { type versiones numtop authorAcf }
                                categories { nodes { name } }
                                tags { nodes { name id } }
                                featuredImage {
                                    node {
                                        sourceUrl
                                        altText
                                    }
                                }
                            }
                        }
                    }
                `;

                // 2. Buscar tags
                const TAGS_QUERY = `
                  query SearchTags($size: Int) {
                    tags(first: $size) {
                      nodes {
                        id
                        name
                      }
                    }
                  }
                `;

                // 3. Buscar posts por tags
                const POSTS_BY_TAGS_QUERY = `
                  query PostsByTags($tagIds: [ID], $size: Int) {
                    posts(where: { tagIn: $tagIds }, first: $size) {
                      nodes {
                        id
                        title
                        date
                        slug
                        contentData { dateModified }
                        categories { nodes { name } }
                        tags { nodes { name id } }
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                      }
                    }
                  }
                `;

                // Ejecutar ambas queries en paralelo
                const [postsResult, tagsResult] = await Promise.all([
                    fetchGraphQL(POSTS_BY_SEARCH_QUERY, { search: cleanedQuery, size: 100 }),
                    fetchGraphQL(TAGS_QUERY, { size: 50 })
                ]);

                if (signal.aborted) return;

                let postsData = postsResult.posts.nodes || [];
                let tagPostsData = [];

                // Filtrar tags que coincidan con las palabras de búsqueda
                const tagsData = tagsResult.tags.nodes || [];
                const matchedTags = tagsData.filter(tag =>
                    words.some(word => tag.name.toLowerCase().includes(word))
                );
                const tagIds = matchedTags.map(tag => tag.id);

                // Si hay tags coincidentes, buscar posts por esos tags
                if (tagIds.length > 0) {
                    const postsByTagsResult = await fetchGraphQL(POSTS_BY_TAGS_QUERY, { tagIds, size: 100 });
                    tagPostsData = postsByTagsResult.posts.nodes || [];
                }

                // Combinar y filtrar duplicados
                let combinedPosts = [...postsData, ...tagPostsData].filter(
                    (post, index, self) => self.findIndex(p => p.id === post.id) === index
                );

                // Ordenar posts por dateModified y luego por fecha de publicación
                combinedPosts.sort((a, b) => {
                    const dateModifiedA = a.contentData?.dateModified;
                    const dateModifiedB = b.contentData?.dateModified;
                    const dateA = a.date;
                    const dateB = b.date;

                    const dateAParsed = new Date(dateA);
                    const dateBParsed = new Date(dateB);
                    const dateModifiedAParsed = dateModifiedA ? new Date(dateModifiedA) : null;
                    const dateModifiedBParsed = dateModifiedB ? new Date(dateModifiedB) : null;

                    const dateAFinal = dateModifiedAParsed && dateModifiedAParsed > dateAParsed ? dateModifiedAParsed : dateAParsed;
                    const dateBFinal = dateModifiedBParsed && dateModifiedBParsed > dateBParsed ? dateModifiedBParsed : dateBParsed;

                    return dateBFinal - dateAFinal;
                });

                const startIndex = (currentPage - 1) * postsPerPage;
                const paginatedPosts = combinedPosts.slice(startIndex, startIndex + postsPerPage);

                setTotalPosts(combinedPosts.length);
                setPosts(paginatedPosts);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || 'Error fetching posts');
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchPosts();

        return () => controller.abort();
    }, [searchQuery, currentPage, postsPerPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setInputPage(value);
    };

    const handleInputChange = (event) => {
        setInputPage(event.target.value);
    };

    const handleInputSubmit = (event) => {
        if (event.key === 'Enter') {
            let page = parseInt(inputPage, 10);
            if (!isNaN(page) && page >= 1 && page <= Math.ceil(totalPosts / postsPerPage)) {
                setCurrentPage(page);
                setPageError('');
            } else {
                setInputPage(currentPage);
                setPageError('Page out of limit');
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow relative">
                <LoadingBackdrop open={loading} />

                <div className="space-y-6 mt-6 w-full mx-auto transition-all duration-500 ease-in-out">
                    {loading ? (
                        <div className="w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(postsPerPage)].map((_, index) => (
                                <div key={index} className="w-full flex w-52 flex-col gap-4">
                                    <div className="skeleton h-64 w-full"></div>
                                    <div className="skeleton h-4 w-48"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="w-full flex gap-2">
                                        <div className="skeleton h-6 w-12 rounded"></div>
                                        <div className="skeleton h-6 w-16 rounded"></div>
                                        <div className="skeleton h-6 w-10 rounded"></div>
                                        <div className="skeleton h-6 w-10 rounded"></div>
                                        <div className="skeleton h-6 w-10 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => {
                            const categoryNames = post.categories?.nodes?.map(term => term.name);

                            if (categoryNames?.includes("Tops")) {
                                return <PostCardTops key={post.id} post={post} />;
                            } else if (categoryNames?.includes("Mods")) {
                                return <PostCardMods key={post.id} post={post} />;
                            } else if (categoryNames?.includes("Content")) {
                                return <PostCardContent key={post.id} post={post} />;
                            } else {
                                return <PostCard key={post.id} post={post} />;
                            }
                        })}
                        </div>
                    ) : (
                        searchQuery && (
                            <div className="flex justify-center items-center w-full h-full absolute inset-0">
                                <div className="no-results-container flex flex-col items-center p-6 text-center">
                                    <img src={NoResultsImage} alt="No Results" className="w-24 h-24 mb-4" />
                                    <p className="text-gray-500">No results found</p>
                                    <div className="mt-4">
                                        <button className="btn hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]" onClick={() => window.location.reload()}>
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="container-pag relative z-10">
                <PaginationControls
                    currentPage={currentPage}
                    totalPosts={totalPosts}
                    postsPerPage={postsPerPage}
                    onPageChange={handlePageChange}
                    onInputChange={handleInputChange}
                    onInputSubmit={handleInputSubmit}
                    inputPage={inputPage}
                    pageError={pageError}
                />
            </div>
        </div>
    );
};

export default SearchPostGrid;


