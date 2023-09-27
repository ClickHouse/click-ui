import { SVGAttributes } from "react";
import AWSLight from "./AWSLight";
import AWSRedshift from "./AWSRedshift";
import AwsS3 from "./AwsS3";
import Azure from "./Azure";
import BigQuery from "./BigQuery";
import Chash from "./Chash";
import Clickhouse from "./ClickhouseLight";
import Confluent from "./Confluent";
import DataGrip from "./DataGrip";
import Dbt from "./Dbt";
import Decodeable from "./Decodeable";
import DeepNote from "./DeepNote";
import DeltaLake from "./DeltaLake";
import Fivetran from "./Fivetran";
import Gcp from "./Gcp";
import Github from "./GithubLight";
import GoLang from "./GoLang";
import Google from "./Google";
import Grafana from "./Grafana";
import Hudi from "./Hudi";
import Iceberg from "./Iceberg";
import Jdbc from "./Jdbc";
import Kafka from "./KafkaLight";
import Kubenetes from "./Kubenetes";
import Metabase from "./Metabase";
import MongoDb from "./MongoDb";
import MySQL from "./MySQL";
import NodeJs from "./NodeJs";
import Postgres from "./Postgres";
import Python from "./Python";
import Rust from "./RustLight";
import Snowflake from "./Snowflake";
import Superset from "./Superset";
import Tableau from "./TableauLight";
import Vector from "./Vector";
import { LogoName } from "./types";
import AWSMsk from "./AWSMsk";

const LogosLight: Record<LogoName, (props: SVGAttributes<SVGElement>) => JSX.Element> = {
  clickhouse: Clickhouse,
  "aws-s3": AwsS3,
  "aws-redshift": AWSRedshift,
  "aws-msk": AWSMsk,
  kakfa: Kafka,
  fivetran: Fivetran,
  confluent: Confluent,
  tableau: Tableau,
  graphana: Grafana,
  superset: Superset,
  metabase: Metabase,
  aws: AWSLight,
  gcp: Gcp,
  azure: Azure,
  dbt: Dbt,
  jdbc: Jdbc,
  mysql: MySQL,
  postgres: Postgres,
  google: Google,
  github: Github,
  decodeable: Decodeable,
  golang: GoLang,
  python: Python,
  deepnote: DeepNote,
  nodejs: NodeJs,
  datagrip: DataGrip,
  vector: Vector,
  kubenetes: Kubenetes,
  "c#": Chash,
  rust: Rust,
  hudi: Hudi,
  deltalake: DeltaLake,
  snowflake: Snowflake,
  mongodb: MongoDb,
  bigquery: BigQuery,
  iceberg: Iceberg,
};

export default LogosLight;
