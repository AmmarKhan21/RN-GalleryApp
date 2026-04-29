const typeDefs = `
  type Image {
    id: ID!
    title: String!
    author: String!
    description: String!
    imageUrl: String!
    thumbnailUrl: String!
    likes: Int!
  }

  type ImagePage {
    images: [Image!]!
    totalCount: Int!
    hasNextPage: Boolean!
    page: Int!
  }

  type Query {
    images(page: Int, limit: Int): ImagePage!
    image(id: ID!): Image
  }
`;

module.exports = { typeDefs };
