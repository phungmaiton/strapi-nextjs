import * as contentfulJobAPI from "./contentful/job";
import * as contentfulCompanyAPI from "./contentful/company";
import * as strapiJobAPI from "./strapi/job";
import * as strapiCompanyAPI from "./strapi/company";

let datasource = {};
if (process.env.DATALAYER_ENGINE === "strapi")
  datasource = { ...strapiCompanyAPI, ...strapiJobAPI };

export default datasource;
