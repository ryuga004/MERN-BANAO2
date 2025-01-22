import { useEffect, useState } from "react";
import Card from "../components/card";
import CreatePost from "../components/createpost";
import Sidebar from "../components/sidebar";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Post } from "../utilis/types";
import { fetchPosts } from "../utilis/api";
import Loader from "../components/loader";

function Home() {
    const posts = useAppSelector<Post[]>(state => state.posts.posts);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchPosts(dispatch);
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

                <aside className="lg:col-span-1 hidden lg:block">
                    <Sidebar />
                </aside>


                <main className="lg:col-span-2 col-span-1">
                    <div>
                        {loading ? (
                            <div className="flex justify-center items-center min-h-[40vh]">
                                <Loader />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 min-h-[40vh] gap-2">
                                {posts.map((post: Post) => (
                                    <Card key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </div>
                </main>


                <aside className="lg:col-span-1 col-span-1">
                    <CreatePost />
                </aside>
            </div>
        </div>
    );
}

export default Home;
