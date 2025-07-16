import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'spnn8fj7',   // 🔁 replace with your actual project ID
  dataset: 'production',        // or your dataset name
  apiVersion: '2023-07-01',     // use any recent date in YYYY-MM-DD
  useCdn: false,                // `false` to get fresh data and allow writes
  token: 'skc7ykYuyKunowt8UzPvb6ekPIPAMmwLUK03lbR0LRn3rV6jeMFf5DwMhwDJbFqMhFX29OugvznSs2TRQ3p7Uw2P3K3x1V40YRRCkYbgqZqVfRnRZ4PjJ6B8GjJwyRqYDlVlVgvLKMPOF1TTiSrff2LeCFXIyqUoERzj9PIlPXs35z0JD2H0',  // 🔒 REQUIRED for write access
});

export default client;
