import axios from "./client";
import qs from "qs";

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getJobs = async () => {
  const res = await axios.get(`${apiUrl}/jobs`);
  const rawJobs = res.data.data;
  return rawJobs;
};

export const getJobsSlugs = async () => {
  const query = qs.stringify(
    {
      fields: ["slug"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawSlugs = res.data.data;
  const slugs = rawSlugs.map((rawSlug) => rawSlug.attributes.slug);
  return slugs;
};

export const getJobBySlug = async ({ slug }) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawJob = res.data.data[0];
  return rawJob;
};
