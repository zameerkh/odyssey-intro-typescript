# 🚀 Intro to GraphQL with TypeScript & Apollo Server

A comprehensive GraphQL API built with TypeScript and Apollo Server, following the [Apollo GraphQL TypeScript Tutorial](https://www.apollographql.com/tutorials/intro-typescript). This project demonstrates modern GraphQL development practices using schema-first design and type-safe resolver implementation.

## 📖 About

This project implements a **space travel booking platform** where users can browse and book intergalactic locations. It showcases:

- **Schema-First Design**: Define your API structure using GraphQL Schema Definition Language (SDL)
- **Type Safety**: Automatic TypeScript type generation from GraphQL schemas
- **Resolver Functions**: Clean, maintainable data fetching logic
- **REST API Integration**: Connect existing REST services to your GraphQL layer

## 🛠️ Tech Stack

- **[Apollo Server](https://www.apollographql.com/docs/apollo-server/)** - GraphQL server implementation
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[GraphQL Code Generator](https://the-guild.dev/graphql/codegen)** - Automatic type generation
- **[ts-node-dev](https://github.com/wclr/ts-node-dev)** - Development server with hot reload
- **Node.js** - Runtime environment

## 📁 Project Structure

```
src/
├── datasources/          # REST API data sources
├── graphql.d.ts         # GraphQL type declarations
├── helpers.ts           # Utility functions
├── index.ts             # Apollo Server setup
├── schema.graphql       # GraphQL schema definition
└── types.ts             # Generated TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/apollographql-education/intro-typescript.git
   cd intro-typescript
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Generate TypeScript types**

   ```bash
   npm run generate
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open Apollo Studio Sandbox**

   Navigate to [http://localhost:4000](http://localhost:4000) to explore your GraphQL API using Apollo Studio's built-in playground.

## 🎮 Running Queries

Once your server is running, you can test your GraphQL API using Apollo Studio Sandbox at `http://localhost:4000`. Here are the available queries:

### **Query: Get Featured Listings**

Get a curated list of intergalactic locations for the homepage:

```graphql
query GetFeaturedListings {
  featuredListings {
    id
    title
    description
    numOfBeds
    costPerNight
    closedForBookings
  }
}
```

### **Query: Get Single Listing**

Get details about a specific listing by ID:

```graphql
query GetListing {
  listing(id: "listing-1") {
    id
    title
    description
    numOfBeds
    costPerNight
    closedForBookings
  }
}
```

### **Example Queries with Variables**

You can also use variables in your queries:

```graphql
query GetListingById($listingId: ID!) {
  listing(id: $listingId) {
    id
    title
    description
    costPerNight
  }
}
```

**Query Variables:**

```json
{
  "listingId": "listing-1"
}
```

### **Using Apollo Studio Sandbox**

1. **Open the playground**: Visit `http://localhost:4000`
2. **Write your query**: Use the left panel to write GraphQL queries
3. **Explore the schema**: Use the Schema tab to browse available fields
4. **Auto-complete**: Press `Ctrl+Space` for intelligent suggestions
5. **Run queries**: Click the play button or press `Ctrl+Enter`

### **Available Fields**

Each `Listing` includes:

- `id` - Unique identifier
- `title` - Name of the location
- `description` - Detailed description
- `numOfBeds` - Number of available beds
- `costPerNight` - Price per night
- `closedForBookings` - Whether bookings are available

## 📝 Available Scripts

| Script             | Description                                   |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Start development server with hot reload      |
| `npm run generate` | Generate TypeScript types from GraphQL schema |
| `npm run compile`  | Compile TypeScript to JavaScript              |
| `npm start`        | Build and start production server             |
| `npm test`         | Run test suite                                |

## 🌌 Schema Overview

### Types

**Listing** - A bookable intergalactic location

```graphql
type Listing {
  id: ID!
  title: String!
  description: String!
  numOfBeds: Int
  costPerNight: Float
  closedForBookings: Boolean
}
```

### Available Queries

**featuredListings** - Get curated homepage listings

```graphql
query GetFeaturedListings {
  featuredListings {
    id
    title
    description
    costPerNight
    closedForBookings
  }
}
```

**listing** - Get a specific listing by ID

```graphql
query GetListing($id: ID!) {
  listing(id: $id) {
    id
    title
    description
    numOfBeds
    costPerNight
    closedForBookings
  }
}
```

## � Understanding Resolver Chains

Resolver chains are a powerful GraphQL concept that allows you to compose data from multiple sources efficiently. In this project, we demonstrate resolver chains with the `Listing` type and its `amenities` field.

### How Resolver Chains Work

1. **Parent Resolver**: The `listing` query fetches a `Listing` object from the REST API
2. **Field Resolver**: The `amenities` field resolver processes amenities for that specific listing
3. **Smart Data Fetching**: The resolver can choose to return existing data or fetch additional data

### Example: Amenities Resolver Chain

```typescript
Listing: {
  amenities: (parent, _, { dataSources }) => {
    return validateFullAmenities(parent.amenities)
      ? parent.amenities
      : dataSources.listingAPI.getAmenities(parent.id);
  },
}
```

### Benefits of Resolver Chains

- **Performance Optimization**: Only fetch additional data when needed
- **Data Composition**: Combine data from multiple sources seamlessly
- **Flexibility**: Different queries can request different levels of detail
- **Separation of Concerns**: Each resolver handles one specific piece of data

### Testing Resolver Chains

Try these queries to see resolver chains in action:

**Basic Listing (no amenities fetched):**

```graphql
query GetListing {
  listing(id: "listing-1") {
    id
    title
    description
  }
}
```

**Listing with Amenities (triggers amenities resolver):**

```graphql
query GetListingWithAmenities {
  listing(id: "listing-1") {
    id
    title
    amenities {
      id
      name
      category
    }
  }
}
```

The `amenities` field resolver only executes when the `amenities` field is explicitly requested in the query.

## 🔧 Development Workflow

1. **Modify Schema**: Update `src/schema.graphql`
2. **Generate Types**: Run `npm run generate`
3. **Implement Resolvers**: Add resolver logic in `src/datasources/resolver.ts`
4. **Test**: Use Apollo Studio Sandbox at `http://localhost:4000`

### Resolver Chain Development

When working with resolver chains:

1. **Define the Parent Type**: Add fields to your GraphQL schema
2. **Implement Parent Resolver**: Create the main query/mutation resolver
3. **Add Field Resolvers**: Implement resolvers for complex fields
4. **Optimize Data Fetching**: Use validation functions to avoid unnecessary API calls
5. **Test Different Query Patterns**: Verify both shallow and deep queries work correctly

## 📚 Learning Objectives

This project teaches you:

- ✅ **Schema Definition Language (SDL)** fundamentals
- ✅ **Schema-first design** approach and benefits
- ✅ Building GraphQL APIs with **TypeScript**
- ✅ Writing **resolver functions**
- ✅ Connecting **REST data sources**
- ✅ Using **query arguments**
- ✅ Implementing **resolver chains**
- ✅ Adding **mutations** to schemas
- ✅ **Best practices** for mutation responses

## 🎯 Tutorial Progress

Follow along with the [Apollo GraphQL TypeScript Tutorial](https://www.apollographql.com/tutorials/intro-typescript):

- [x] Course overview and setup
- [x] GraphQL basics
- [x] Schema definition language (SDL)
- [x] Building the schema
- [x] Apollo Server setup
- [x] Apollo Sandbox Explorer
- [ ] The listings REST API
- [ ] Resolvers
- [ ] Code generation
- [ ] Querying real data
- [ ] Query arguments
- [ ] Adding the Amenity type
- [ ] Resolver chains
- [ ] Mutations

## 🛡️ Type Safety

This project uses **GraphQL Code Generator** to automatically generate TypeScript types from your GraphQL schema, ensuring:

- **Compile-time safety** for resolver implementations
- **Intellisense support** in your IDE
- **Automatic type updates** when schema changes
- **Reduced runtime errors**

## 📖 Resources

- **[Apollo GraphQL Docs](https://www.apollographql.com/docs/)**
- **[GraphQL TypeScript Tutorial](https://www.apollographql.com/tutorials/intro-typescript)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
- **[GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs)**

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a tutorial project. For contributions, please refer to the [original repository](https://github.com/apollographql-education/intro-typescript).

---

**Happy coding! 🚀** Start your GraphQL journey with type-safe, scalable APIs.

For any issues or problems concerning the course content, please refer to the [Odyssey topic in our community forums](https://community.apollographql.com/tags/c/help/6/odyssey). You can also [join the Apollo Discord](https://discord.gg/graphos).

## Reference documentation

For further reference, please consider the following sections:

- [Official TypeScript documentation](https://www.typescriptlang.org/docs/)
