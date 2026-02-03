---
'@clickhouse/click-ui': minor
---

Reconcile FileUpload and FileMultiUpload to prevent and reduce concurrent implementations, e.g. behaviour, features, styles, etc. In the previous version, the multiple file upload component was recreating the file upload in its file context which is prone to mistakes and hard to maintain.
