import { parseAsInteger, parseAsString } from "nuqs/server"
import { z } from "zod"
import { PAGINATION } from "@/config/constants"

export const workFlowParams = {
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({
    clearOnDefault: true, // clear the param when the default value is used
  }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({
      clearOnDefault: true,
    }),
  search: parseAsString.withDefault(PAGINATION.DEFAULT_SEARCH).withOptions({
    clearOnDefault: true,
  }),
}
