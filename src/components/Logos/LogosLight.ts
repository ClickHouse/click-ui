import { SVGAttributes } from 'react';
import AlloyDB from './AlloyDB';
import Airbyte from './Airbyte';
import AWSLight from './AWSLight';
import AWSAthena from './AWSAthena';
import AWSGlue from './AWSGlue';
import AWSKinesis from './AWSKinesis';
import AWSRedshift from './AWSRedshift';
import AWSMsk from './AWSMsk';
import AWSAurora from './AWSAurora';
import AWSRds from './AWSRds';
import AWSS3 from './AWS_S3';
import Azure from './Azure';
import AzureBlobStorage from './AzureBlobStorage';
import AzureEventHub from './AzureEventHub';
import BigQuery from './BigQuery';
import Chash from './Chash';
import Clickhouse from './ClickhouseLight';
import Cloudflare from './Cloudflare';
import Confluent from './Confluent';
import CrunchyBridge from './CrunchyBridge';
import DataGrip from './DataGrip';
import Databricks from './Databricks';
import dBeaver from './dBeaver';
import Dbt from './Dbt';
import Decodeable from './Decodeable';
import DeepNote from './DeepNote';
import DeltaLake from './DeltaLake';
import DigitalOcean from './DigitalOcean';
import FeatureDatabaseLight from './FeatureDatabaseLight';
import FeatureHexagonLight from './FeatureHexagonLight';
import Fivetran from './Fivetran';
import Gcp from './Gcp';
import Gcs from './GCS';
import Github from './GithubLight';
import GoLang from './GoLang';
import Google from './Google';
import Grafana from './Grafana';
import Hex from './Hex';
import Hudi from './Hudi';
import Iceberg from './Iceberg';
import Jdbc from './Jdbc';
import Kafka from './KafkaLight';
import Kubenetes from './Kubenetes';
import MariaDB from './MariaDB';
import Metabase from './Metabase';
import Microsoft from './Microsoft';
import MongoDb from './MongoDb';
import MySQL from './MySQL';
import NeonDB from './NeonDB';
import Nessie from './Nessie';
import NodeJs from './NodeJs';
import OneLake from './OneLake';
import { OVHLight as OVH } from './OVH';
import Postgres from './Postgres';
import Prequel from './Prequel';
import Python from './Python';
import Redpanda from './Redpanda';
import Rust from './RustLight';
import Snowflake from './Snowflake';
import Supabase from './Supabase';
import Superset from './Superset';
import Tableau from './TableauLight';
import TigerData from './TigerData';
import Upstash from './Upstash';
import Vector from './Vector';
import WarpStream from './WarpStream';
import { LogoName } from './types';

const LogosLight: Record<LogoName, (props: SVGAttributes<SVGElement>) => JSX.Element> = {
  clickhouse: Clickhouse,
  alloydb: AlloyDB,
  airbyte: Airbyte,
  aws: AWSLight,
  'aws-athena': AWSAthena,
  'aws-glue': AWSGlue,
  'aws-kinesis': AWSKinesis,
  'aws-msk': AWSMsk,
  'aws-aurora': AWSAurora,
  'aws-rds': AWSRds,
  'aws-redshift': AWSRedshift,
  'aws-s3': AWSS3,
  azure: Azure,
  'azure-blob-storage': AzureBlobStorage,
  'azure-event-hub': AzureEventHub,
  bigquery: BigQuery,
  'c#': Chash,
  cloudflare: Cloudflare,
  confluent: Confluent,
  'crunchy-bridge': CrunchyBridge,
  databricks: Databricks,
  datagrip: DataGrip,
  dbeaver: dBeaver,
  dbt: Dbt,
  decodeable: Decodeable,
  deepnote: DeepNote,
  deltalake: DeltaLake,
  digital_ocean: DigitalOcean,
  feature_database: FeatureDatabaseLight,
  feature_hexagon: FeatureHexagonLight,
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
  mariadb: MariaDB,
  metabase: Metabase,
  microsoft: Microsoft,
  mongodb: MongoDb,
  mysql: MySQL,
  neondb: NeonDB,
  nessie: Nessie,
  nodejs: NodeJs,
  onelake: OneLake,
  ovh: OVH,
  postgres: Postgres,
  prequel: Prequel,
  python: Python,
  redpanda: Redpanda,
  rust: Rust,
  snowflake: Snowflake,
  supabase: Supabase,
  superset: Superset,
  tableau: Tableau,
  tigerdata: TigerData,
  upstash: Upstash,
  vector: Vector,
  warpstream: WarpStream,
};

export default LogosLight;
