import { useInject } from "../ioc/ioc-provider";
import { Pagination } from "./pagination";
import { useOnMount } from "../hooks/use-on-mount";

export const usePagination = () => {
  const pagination = useInject(Pagination);

  useOnMount(() => pagination.reset());

  return pagination;
}
