import { SVGAttributes } from "react";
import AWSDark from "./AWSDark";
import AWSRedshift from "./AWSRedshift";
import AWSS3 from "./AWSS3";
import AWSAthena from "./AWSAthena";
import Azure from "./Azure";
import BigQuery from "./BigQuery";
import Chash from "./Chash";
import Clickhouse from "./ClickhouseDark";
import Confluent from "./Confluent";
import DataGrip from "./DataGrip";
import Dbt from "./Dbt";
import Decodeable from "./Decodeable";
import DeepNote from "./DeepNote";
import DeltaLake from "./DeltaLake";
import Fivetran from "./Fivetran";
import Gcp from "./Gcp";
import Github from "./GithubDark";
import GoLang from "./GoLang";
import Google from "./Google";
import Grafana from "./Grafana";
import Hudi from "./Hudi";
import Iceberg from "./Iceberg";
import Jdbc from "./Jdbc";
import Kafka from "./KafkaDark";
import Kubenetes from "./Kubenetes";
import Metabase from "./Metabase";
import MongoDb from "./MongoDb";
import MySQL from "./MySQL";
import NodeJs from "./NodeJs";
import Postgres from "./Postgres";
import Python from "./Python";
import Rust from "./RustDark";
import Snowflake from "./Snowflake";
import Superset from "./Superset";
import Tableau from "./TableauDark";
import Vector from "./Vector";
import { LogoName } from "./types";
import AWSMsk from "./AWSMsk";

const LogosDark: Record<LogoName, (props: SVGAttributes<SVGElement>) => JSX.Element> = {
  clickhouse: Clickhouse,
  "aws-athena": AWSAthena,
  "aws-s3": AWSS3,
  "aws-redshift": AWSRedshift,
  "aws-msk": AWSMsk,
  kafka: Kafka,
  fivetran: Fivetran,
  confluent: Confluent,
  tableau: Tableau,
  graphana: Grafana,
  superset: Superset,
  metabase: Metabase,
  aws: AWSDark,
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

export default LogosDark;
