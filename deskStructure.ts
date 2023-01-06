import { JsonView } from "./components/views/JsonView";
import { CogIcon, EditIcon, EyeOpenIcon, DocumentIcon } from "@sanity/icons";
import { SocialMediaView } from "./components/views/SocialMediaView";
import type { StructureBuilder, StructureResolverContext } from "sanity/desk";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const excludedDocumentTypes = ["video", "siteSettings", "media.tag", "link"];

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Work")
        .schemaType("video")
        .child(S.documentTypeList("video").title("Work")),
      orderableDocumentListDeskItem({
        type: "video",
        title: "Work Order",
        S,
        context,
      }),

      S.divider(),
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon as any)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .views([
              S.view
                .form()
                .title("Edit")
                .icon(EditIcon as any),
              S.view
                .component(SocialMediaView)
                .title("Preview")
                .icon(EyeOpenIcon as any),
              S.view
                .component(JsonView)
                .title("JSON")
                .icon(DocumentIcon as any),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !excludedDocumentTypes.includes(listItem.getId() || "")
      ),
    ]);

export const getDefaultDocumentNode = (S: StructureBuilder) => {
  return S.document().views([
    S.view.form().icon(CogIcon as any),
    S.view
      .component(JsonView)
      .title("JSON")
      .icon(DocumentIcon as any),
  ]);
};
