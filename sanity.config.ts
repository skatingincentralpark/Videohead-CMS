import { defineConfig } from "sanity";
import schemaTypes from "./schemas/schema";
import { deskTool } from "sanity/desk";
import { structure, getDefaultDocumentNode } from "./deskStructure";

import { cloudinarySchemaPlugin } from "sanity-plugin-cloudinary";
import { media } from "sanity-plugin-media";

export default defineConfig({
  name: "videohead",
  title: "Videohead",
  projectId: "78h2r0iy",
  dataset: "production",
  plugins: [
    deskTool({
      structure: structure,
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    cloudinarySchemaPlugin(),
    media(),
  ],
  schema: {
    types: schemaTypes as any,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => templateItem.templateId != "siteSettings"
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === "siteSettings") {
        return prev.filter(
          ({ action }) =>
            action && !["unpublish", "delete", "duplicate"].includes(action)
        );
      }
      return prev;
    },
  },
});
