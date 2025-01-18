import { useEffect } from "react";
import Card from "../components/card";
import CreatePost from "../components/createpost";
import Sidebar from "../components/sidebar";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Post } from "../utilis/types";
import { fetchPosts } from "../utilis/api";



function Home() {
    const posts = useAppSelector<Post[]>(state => state.posts.posts)
    const dispatch = useAppDispatch();
    useEffect(() => {
        fetchPosts(dispatch);
    }, [])
    return (
        <div className="min-h-screen bg-gray-50">
            <div className=" mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Sidebar */}
                <aside className="lg:col-span-1 hidden lg:block">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-2 col-span-1">
                    <div >

                        <div className="grid grid-cols-1 min-h-[40vh] gap-2">
                            {posts.map((post: Post) => (
                                <Card post={post} />
                            ))}
                        </div>

                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="lg:col-span-1 col-span-1">

                    <CreatePost />

                </aside>
            </div>
        </div>
    );
}

export default Home;
