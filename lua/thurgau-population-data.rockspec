package = "voxgig-sdk-thurgau-population-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/thurgau-population-data-sdk.git"
}
description = {
  summary = "ThurgauPopulationData SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["thurgau-population-data_sdk"] = "thurgau-population-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
