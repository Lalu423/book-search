import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
}`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                bookId
                title
                description
                image
                link
            }
        }
    }
}`;

export const SAVE_BOOK = gql`
mutation saveBook($bookToSave: BookInput) {
    saveBook(BookToSave: $bookToSave) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}`; 