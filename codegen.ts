import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  documents: "interface/graphql/**/*.ts",
  generates: {
    // https://www.apollographql.com/docs/apollo-server/workflow/generate-types
    "interface/__generated__/node.ts": {
      schema: "interface/schema.graphql",
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "types#ApolloContext",
        enumsAsConst: true,
        avoidOptionals: {
          field: true,
          inputValue: true,
          object: true,
          defaultValue: false,
        },
      },
    },
    "interface/__generated__/react.ts": {
      schema: "interface/schema.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        enumsAsConst: true,
        avoidOptionals: {
          field: true,
          inputValue: true,
          object: true,
          defaultValue: false,
        },
      },
    },
  },
}

export default config
