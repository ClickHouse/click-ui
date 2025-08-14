import { SVGAttributes } from "react";
import Airbyte from "./Airbyte";
import AWSDark from "./AWSDark";
import AWSKinesis from "./AWSKinesis";
import AWSRedshift from "./AWSRedshift";
import AWSS3 from "./AWS_S3";
import AWSAthena from "./AWSAthena";
import AWSMsk from "./AWSMsk";
import Azure from "./Azure";
import AzureBlobStorage from "./AzureBlobStorage";
import AzureEventHub from "./AzureEventHub";
import BigQuery from "./BigQuery";
import Chash from "./Chash";
import Clickhouse from "./ClickhouseDark";
import Confluent from "./Confluent";
import DataGrip from "./DataGrip";
import dBeaver from "./dBeaver";
import DigitalOcean from "./DigitalOcean";
import Dbt from "./Dbt";
import Decodeable from "./Decodeable";
import DeepNote from "./DeepNote";
import DeltaLake from "./DeltaLake";
import FeatureDatabaseDark from "./FeatureDatabaseDark";
import FeatureHexagonDark from "./FeatureHexagonDark";
import Fivetran from "./Fivetran";
import Gcp from "./Gcp";
import Gcs from "./GCS";
import Github from "./GithubDark";
import GoLang from "./GoLang";
import Google from "./Google";
import Grafana from "./Grafana";
import Hex from "./Hex";
import Hudi from "./Hudi";
import Iceberg from "./Iceberg";
import Jdbc from "./Jdbc";
import Kafka from "./KafkaDark";
import Kubenetes from "./Kubenetes";
import Metabase from "./Metabase";
import Microsoft from "./Microsoft";
import MongoDb from "./MongoDb";
import MySQL from "./MySQL";
import NodeJs from "./NodeJs";
import Postgres from "./Postgres";
import Prequel from "./Prequel";
import Python from "./Python";
import Redpanda from "./Redpanda";
import Rust from "./RustDark";
import Snowflake from "./Snowflake";
import Superset from "./Superset";
import Tableau from "./TableauDark";
import Upstash from "./Upstash";
import Vector from "./Vector";
import WarpStream from "./WarpStream";
import Cloudflare from "./Cloudflare";
import { LogoName } from "./types";

const LogosDark: Record<LogoName, (props: SVGAttributes<SVGElement>) => JSX.Element> = {
  clickhouse: Clickhouse,
  airbyte: Airbyte,
  aws: AWSDark,
  "aws-athena": AWSAthena,
  "aws-kinesis": AWSKinesis,
  "aws-msk": AWSMsk,
  "aws-redshift": AWSRedshift,
  "aws-s3": AWSS3,
  azure: Azure,
  "azure-blob-storage": AzureBlobStorage,
  "azure-event-hub": AzureEventHub,
  bigquery: BigQuery,
  "c#": Chash,
  confluent: Confluent,
  datagrip: DataGrip,
  dbeaver: dBeaver,
  dbt: Dbt,
  decodeable: Decodeable,
  deepnote: DeepNote,
  deltalake: DeltaLake,
  digital_ocean: DigitalOcean,
  feature_database: FeatureDatabaseDark,
  feature_hexagon: FeatureHexagonDark,
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
  microsoft: Microsoft,
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
  vector: Vector,
  warpstream: WarpStream,
  cloudflare: Cloudflare,
};

export default LogosDark;
