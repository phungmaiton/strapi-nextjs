import axios from "./client";
import qs from "qs";

const apiUrl = process.env.STRAPI_API_BASE_URL;

export const getJobs = async ({ page = 0, pageSize = 25 } = {}) => {
  const query = qs.stringify(
    {
      populate: ["company", "company.logo", "skillTags"],
      pagination: {
        // start,
        // limit,
        page,
        pageSize,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await axios.get(`${apiUrl}/jobs?${query}`);
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
      populate: [
        "company",
        "company.logo",
        "relatedJobs",
        "relatedJobs.company",
        "relatedJobs.company.logo",
        "skillTags",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawJob = res.data.data[0];
  return rawJob;
};

export const getJobsByCompanyId = async ({ id }) => {
  const query = qs.stringify(
    {
      filters: {
        company: {
          id: {
            $eq: id,
          },
        },
      },
      populate: ["company", "company.logo", "skillTags"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await axios.get(`${apiUrl}/jobs?${query}`);
  const rawJobs = res.data.data;
  return rawJobs;
};

export const searchJobs = async (query) => {
  const strapiQuery = {
    populate: ["company", "company.logo", "skillTags"],
    filters: {},
  };

  // Add Boolean Query Filters
  if (query.remoteOkOnly) strapiQuery["filters"]["remoteOK"] = { $eq: true };
  if (query.featuredJobsOnly)
    strapiQuery["filters"]["featuredJob"] = { $eq: true };

  // Add Range Query Filters
  strapiQuery["filters"]["baseAnnualSalary"] = {
    $gte: query.minBaseSalary,
    $lte: query.maxBaseSalary,
  };

  // Add Inclusion Query Filters
  if (query.jobTypes && query.jobTypes.length) {
    strapiQuery["filters"]["jobType"] = { $in: query.jobTypes };
  }

  if (query.experienceLevels && query.experienceLevels.length) {
    strapiQuery["filters"]["experienceLevel"] = { $in: query.experienceLevels };
  }

  // Add Nested Inclusion Query Filters
  if (query.selectedTags && query.selectedTags.length) {
    strapiQuery["filters"]["skillTags"] = {
      name: { $in: query.selectedTags },
    };
  }

  // Add Full Text Search
  if (query.searchBarText) {
    const searchFields = [
      "title",
      "jobCategory",
      "jobType",
      "jobDescription",
      "aboutYou",
      "jobResponsibilities",
      "remunerationPackage",
      // deep nested search fields
      "skillTags.name",
      "company.name",
      "company.city",
    ];

    strapiQuery["filters"]["$or"] = searchFields.map((field) => {
      const searchField = {};

      if (!field.includes(".")) {
        searchField[field] = { $containsi: query.searchBarText };
      } else {
        const [level1, level2] = field.split(".");
        const nestedSearchField = {};
        nestedSearchField[level2] = { $containsi: query.searchBarText };
        searchField[level1] = nestedSearchField;
      }
      return searchField;
    });
  }

  const strapiQueryStr = qs.stringify(strapiQuery, { encodeValuesOnly: true });
  const res = await axios.get(`${apiUrl}/jobs?${strapiQueryStr}`);
  const rawJobs = res.data.data;
  return rawJobs;
};
