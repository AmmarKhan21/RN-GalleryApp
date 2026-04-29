import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query GetImages($page: Int, $limit: Int) {
    images(page: $page, limit: $limit) {
      images {
        id
        title
        author
        imageUrl
        thumbnailUrl
        likes
      }
      totalCount
      hasNextPage
      page
    }
  }
`;

export const GET_IMAGE = gql`
  query GetImage($id: ID!) {
    image(id: $id) {
      id
      title
      author
      description
      imageUrl
      thumbnailUrl
      likes
    }
  }
`;
