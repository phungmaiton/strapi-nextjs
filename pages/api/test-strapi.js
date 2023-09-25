import { data } from "autoprefixer";
import datasource from "../../datalayer";

export default async function handler(req, res) {
  //   const data = await datasource.getCompanyBySlug({
  //     slug: "strapi-inc",
  //   });

  //   const data = await datasource.getJobsSlugs();

  //   const data = await datasource.getJobBySlug({
  //     slug: "frontend-expert-tailwind-css-guru",
  //   });

  const data = await datasource.getJobsByCompanyId({ id: 1 });
  res.status(200).json(data);
}
