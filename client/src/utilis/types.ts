
export interface User {
    id: string;
    username: string;
    email: string;
}


export interface Comment {
    id: string;
    createdby: string;
    body: string;

}


export interface Post {
    id: string;
    author: User;
    title: string;
    image?: string;
    description: string;
    likes: string[];
    comments: Array<Comment>;
}

