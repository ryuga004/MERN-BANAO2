const sample = {
    "users": [
        {
            "id": "user1",
            "username": "john_doe",
            "email": "john.doe@example.com",
            "password": "hashed_password_123",
            "createdAt": "2025-01-01T10:00:00Z",
            "updatedAt": "2025-01-10T12:00:00Z"
        },
        {
            "id": "user2",
            "username": "jane_smith",
            "email": "jane.smith@example.com",
            "password": "hashed_password_456",
            "createdAt": "2025-01-05T14:30:00Z",
            "updatedAt": "2025-01-08T09:45:00Z"
        }
    ],
    "posts": [
        {
            "id": "post1",
            "userId": "user1",
            "content": "Just had an amazing day at the beach!",
            "image": "https://example.com/images/beach.jpg",
            "likes": [
                "user2"
            ],
            "comments": [
                {
                    "id": "comment1",
                    "userId": "user2",
                    "text": "That sounds amazing!",
                    "createdAt": "2025-01-01T11:00:00Z"
                }
            ],
            "createdAt": "2025-01-01T10:05:00Z",
            "updatedAt": "2025-01-01T10:15:00Z"
        },
        {
            "id": "post2",
            "userId": "user2",
            "content": "Excited to share my new painting!",
            "image": "https://example.com/images/painting.jpg",
            "likes": [
                "user1"
            ],
            "comments": [],
            "createdAt": "2025-01-06T16:00:00Z",
            "updatedAt": "2025-01-06T16:30:00Z"
        }
    ],
    "passwordResetTokens": [
        {
            "id": "token1",
            "userId": "user1",
            "token": "random_token_123",
            "expiresAt": "2025-01-02T10:00:00Z"
        },
        {
            "id": "token2",
            "userId": "user2",
            "token": "random_token_456",
            "expiresAt": "2025-01-06T12:00:00Z"
        }
    ]
}


export default sample;