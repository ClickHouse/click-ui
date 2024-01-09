import { SVGAttributes } from "react";
import Airbyte from "./Airbyte";
import AWSLight from "./AWSLight";
import AWSAthena from "./AWSAthena";
import AWSKinesis from "./AWSKinesis";
import AWSRedshift from "./AWSRedshift";
import AWSMsk from "./AWSMsk";
import AWSS3 from "./AWS_S3";
import Azure from "./Azure";
import BigQuery from "./BigQuery";
import Chash from "./Chash";
import Clickhouse from "./ClickhouseLight";
import Confluent from "./Confluent";
import DataGrip from "./DataGrip";
import dBeaver from "./dBeaver";
import Dbt from "./Dbt";
import Decodeable from "./Decodeable";
import DeepNote from "./DeepNote";
import DeltaLake from "./DeltaLake";
import Fivetran from "./Fivetran";
import Gcp from "./Gcp";
import Gcs from "./GCS";
import Github from "./GithubLight";
import GoLang from "./GoLang";
import Google from "./Google";
import Grafana from "./Grafana";
import Hex from "./Hex";
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
import Prequel from "./Prequel";
import Python from "./Python";
import Redpanda from "./Redpanda";
import Rust from "./RustLight";
import Snowflake from "./Snowflake";
import Superset from "./Superset";
import Tableau from "./TableauLight";
import Upstash from "./Upstash";
import Vector from "./Vector";
import { LogoName } from "./types";

const LogosLight: Record<LogoName, (props: SVGAttributes<SVGElement>) => JSX.Element> = {
  clickhouse: Clickhouse,
  airbyte: Airbyte,
  aws: AWSLight,
  "aws-athena": AWSAthena,
  "aws-kinesis": AWSKinesis,
  "aws-msk": AWSMsk,
  "aws-redshift": AWSRedshift,
  "aws-s3": AWSS3,
  azure: Azure,
  bigquery: BigQuery,
  "c#": Chash,
  confluent: Confluent,
  datagrip: DataGrip,
  dbeaver: dBeaver,
  dbt: Dbt,
  decodeable: Decodeable,
  deepnote: DeepNote,
  deltalake: DeltaLake,
  fivetran: Fivetran,
  gcp: Gcp,
  gcs: Gcs,
  github: Github,
  golang: GoLang,
  google: Google,
  grafana: Grafana,
  hex: Hex,
  hudi: Hudi,
  iceberg: Iceberg,
  jdbc: Jdbc,
  kafka: Kafka,
  kubenetes: Kubenetes,
  metabase: Metabase,
  mongodb: MongoDb,
  mysql: MySQL,
  nodejs: NodeJs,
  postgres: Postgres,
  prequel: Prequel,
  python: Python,
  redpanda: Redpanda,
  rust: Rust,
  snowflake: Snowflake,
  superset: Superset,
  tableau: Tableau,
  upstash: Upstash,
  vector: Vector
};

export default LogosLight;
