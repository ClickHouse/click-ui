import { SVGAttributes } from "react";
import AWSLight from "./AWSLight";
import AWSRedshiftLight from "./AWSRedshiftLight";
import AWSS3Light from "./AWSS3Light";
import AzureLight from "./AzureLight";
import BigQueryLight from "./BigQueryLight";
import ChashLight from "./ChashLight";
import ClickhouseLight from "./ClickhouseLight";
import ConfluentLight from "./ConfluentLight";
import DataGripLight from "./DataGripLight";
import DbtLight from "./DbtLight";
import DecodeableLight from "./DecodeableLight";
import DeepNoteLight from "./DeepNoteLight";
import DeltaLakeLight from "./DeltaLakeLight";
import FivetranLight from "./FivetranLight";
import GCPLight from "./GCPLight";
import GithubLight from "./GithubLight";
import GoLangLight from "./GoLangLight";
import GoogleLight from "./GoogleLight";
import GrafanaLight from "./GrafanaLight";
import HudiLight from "./HudiLight";
import IcebergLight from "./IcebergLight";
import JdbcLight from "./JdbcLight";
import KafkaLight from "./KafkaLight";
import KubenetesLight from "./KubenetesLight";
import MetabaseLight from "./MetabaseLight";
import MongoDbLight from "./MongoDbLight";
import MySQLLight from "./MySQLLight";
import NodeJsLight from "./NodeJsLight";
import PostgresLight from "./PostgresLight";
import PythonLight from "./PythonLight";
import RustLight from "./RustLight";
import SnowflakeLight from "./SnowflakeLight";
import SupersetLight from "./SupersetLight";
import TableauLight from "./TableauLight";
import VectorLight from "./VectorLight";
import { LogoName } from "./types";

const LogosLight: Record<LogoName, (props: SVGAttributes<SVGElement>) => JSX.Element> = {
  clickhouse: ClickhouseLight,
  "aws-s3": AWSS3Light,
  "aws-redshift": AWSRedshiftLight,
  kakfa: KafkaLight,
  fivetran: FivetranLight,
  confluent: ConfluentLight,
  tableau: TableauLight,
  graphana: GrafanaLight,
  superset: SupersetLight,
  metabase: MetabaseLight,
  aws: AWSLight,
  gcp: GCPLight,
  azure: AzureLight,
  dbt: DbtLight,
  jdbc: JdbcLight,
  mysql: MySQLLight,
  postgres: PostgresLight,
  google: GoogleLight,
  github: GithubLight,
  decodeable: DecodeableLight,
  golang: GoLangLight,
  python: PythonLight,
  deepnote: DeepNoteLight,
  nodejs: NodeJsLight,
  datagrip: DataGripLight,
  vector: VectorLight,
  kubenetes: KubenetesLight,
  "c#": ChashLight,
  rust: RustLight,
  hudi: HudiLight,
  deltalake: DeltaLakeLight,
  snowflake: SnowflakeLight,
  mongodb: MongoDbLight,
  bigquery: BigQueryLight,
  iceberg: IcebergLight,
};

export default LogosLight;
