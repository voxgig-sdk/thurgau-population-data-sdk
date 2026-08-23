package = "voxgig-sdk-thurgau-population-data"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/thurgau-population-data-sdk.git",
  tag = "lua/v0.0.1",
  dir = "thurgau-population-data-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Thurgau Population Data public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/thurgau-population-data-sdk",
  issues_url = "https://github.com/voxgig-sdk/thurgau-population-data-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "thurgau-population-data" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["thurgau-population-data_sdk"] = "thurgau-population-data_sdk.lua",
    ["config"] = "config.lua",
    ["config_shared"] = "config_shared.lua",
    ["features"] = "features.lua",
    ["feature.base_feature"] = "feature/base_feature.lua",
    ["feature.test_feature"] = "feature/test_feature.lua",
  }
}
