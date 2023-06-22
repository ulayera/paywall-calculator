import { DataSource, DataSourceOptions } from "typeorm";
import dbConfig from "./db.config";

const datasource = new DataSource(dbConfig() as DataSourceOptions);
datasource.initialize();
export default datasource;