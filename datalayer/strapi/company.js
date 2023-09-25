import axios from "./client";
import qs from "qs";

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getCompanies = async () => {
  const res = await axios.get(`${apiUrl}/comapnies`);
  const rawCompanies = res.data.data;
  return rawCompanies;
};

export const getCompaniesSlugs = async () => {
  const query = qs.stringify(
    {
      fields: ["slug"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axios.get(`${apiUrl}/comapnies?${query}`);
  const rawSlugs = res.data.data;
  const slugs = rawSlugs.map((rawSlug) => rawSlug.attributes.slug);
  return slugs;
};

export const getCompanyBySlug = async ({ slug }) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["logo", "coverImage"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axios.get(`${apiUrl}/comapnies?${query}`);
  const rawCompany = res.data.data[0];
  return rawCompany;
};
