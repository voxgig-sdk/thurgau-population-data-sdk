# ThurgauPopulationData SDK utility: feature_add
module ThurgauPopulationDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
