import datasource from "../../datalayer";

export default async function handler(req, res) {
  //   const data = await datasource.getCompanyBySlug({
  //     slug: "strapi-inc",
  //   });

  //   const data = await datasource.getJobsSlugs();

  //   const data = await datasource.getJobBySlug({
  //     slug: "frontend-expert-tailwind-css-guru",
  //   });

  // const data = await datasource.getJobsByCompanyId({ id: 1 });

  // const data = await datasource.getJobs({ page: 1, pageSize: 2 });
  // const data = await datasource.searchJobs({ remoteOkOnly: true });

  // const data = await datasource.searchJobs({
  //   minBaseSalary: 90000,
  //   maxBaseSalary: 120000,
  // });

  // const data = await datasource.searchJobs({
  //   jobTypes: ["Internship", "Contract"],
  // });

  // const data = await datasource.searchJobs({
  //   experienceLevels: ["Senior", "Tech-Lead"],
  // });

  // const data = await datasource.searchJobs({
  //   selectedTags: ["html5"],
  // });

  const data = await datasource.searchJobs({
    searchBarText: "London",
  });
  res.status(200).json(data);
}
