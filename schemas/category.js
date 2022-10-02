import { LinkIcon } from "@sanity/icons";

export default {
  title: "Category",
  name: "category",
  type: "document",
  icon: LinkIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Please generate a slug so I can handle this category in the code 🤝",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
