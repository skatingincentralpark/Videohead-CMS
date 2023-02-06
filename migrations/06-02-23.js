/* eslint-disable no-console */
// Run using: node_modules/.bin/sanity exec --with-user-token migrations/add-won-values-for-video.js

// Update pagesToShowOn value
// Remove order field

import { getCliClient } from "sanity/cli";

const client = getCliClient().withConfig({ apiVersion: "2022-09-09" });

const fetchDocuments = () =>
  client.fetch(`*[_type == 'video'][0...100] {_id, _rev, _type}`);

const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: {
        pagesToShowOn: {
          raghav: false,
          videohead: true,
        },
      },
      ifRevisionID: doc._rev,
    },
  }));

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
