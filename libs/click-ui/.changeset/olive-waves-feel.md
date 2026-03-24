---
'@clickhouse/click-ui': minor
---

Introducing logos in the library is a manual process which is prone to mistakes and relies on developer time. Furthermore, originally, it lacked documentation, which caused further confusion and wasted time due to context switching; Although the documentation was introduced recently, there's still space for improvement.

To help improve collaboration with the design team, an SVG to React Component workflow is offered to enable anyone to contribute as easily and quickly as possible. Including documentation, providing information on topics, such as further customisation for theme-based computed logos, e.g. light VS dark.

While this helps standardise the introduction of logos consistently, there's still space for improvement, e.g. there are two separate registries for light and dark logos and icons introduction, which are similar SVG data types, and are still a manual process. These and others will be addressed separately in the next iterations.

# What has changed?

The logos API remains the same, you can update Click UI without any further changes. Although, the logo name `c#` was renamed to `c-sharp` due to need to use valid javascript identifiers during the auto-conversation process and usage of `c#` is NOT recommended as its being dropped to favour `c-sharp`.
