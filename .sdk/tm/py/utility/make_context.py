# ThurgauPopulationData SDK utility: make_context

from core.context import ThurgauPopulationDataContext


def make_context_util(ctxmap, basectx):
    return ThurgauPopulationDataContext(ctxmap, basectx)
