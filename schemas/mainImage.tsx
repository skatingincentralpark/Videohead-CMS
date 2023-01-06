import { ImageIcon } from "@sanity/icons";

export default {
  name: "mainImage",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
      description: "Important for SEO and accessiblity.",
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
};

// There are some different things going on here. First you'll notice
// the options: { hotspot: true } configuration. This adds an inteface
// for setting a crop and hotspot on the image. The crop/hotspot-selection
// will be saved to the document with a reference to the image asset.
// This lets you reuse the same image with different crops and hotspots
// across your dataset. With the asset pipeline you can get any dimension
// and crop of your image on demand, so you'll never need to upload more
// than one version.
