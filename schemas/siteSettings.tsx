import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon as any,
  groups: [
    {
      name: "seo",
      title: "SEO & metadata",
    },
  ],
  fields: [
    defineField({
      name: "landingVideoCloudinary",
      title: "Landing Video (Cloudinary)",
      description: "This video appears on the homepage",
      type: "cloudinary.asset",
    }),
  ],

  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare(selection) {
      const { title, description } = selection;
      return {
        title: title,
        description: description,
      };
    },
  },
});
