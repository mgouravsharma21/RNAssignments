type UseFetchResult<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
};

export default UseFetchResult;