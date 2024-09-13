/* eslint-disable @typescript-eslint/no-explicit-any */
import { getErrorMessage } from "@/utils/get-error-msg";
import { AxiosError, AxiosResponse } from "axios";

/**
 * A generic API resolver function that abstracts the fetching and error handling logic for API calls.
 * It uses a fetcher function, which must return a promise that resolves to an AxiosResponse.
 *
 * @template ClientResponse The expected type of the response data from the client.
 * @param {() => Promise<AxiosResponse<ClientResponse>>} fetcher A function that returns a promise resolving to an AxiosResponse.
 * @returns {Promise<ClientResponse>} The data from the resolved AxiosResponse.
 * @throws {Error} Throws an error if the fetcher function fails. The error includes details about the failure.
 *
 * The function first attempts to execute the fetcher function. If the fetcher function resolves successfully,
 * the data from the AxiosResponse is returned. If the fetcher function throws an error, the function will
 * handle it based on the type of error:
 *
 * - If the error is an instance of AxiosError, the function will throw a new Error with the stringified AxiosError.
 * - If the error is an instance of a standard Error, the function constructs a detailed error object including
 *   the message, status, cause, and stack trace of the error, and then throws a new Error with this information.
 * - For all other types of errors, the function uses a utility function `getErrorMessage` to extract a meaningful
 *   error message and throws a new Error with this message.
 */
const apiResolver = async <ClientResponse = any>(
  fetcher: () => Promise<AxiosResponse<ClientResponse>>
) => {
  try {
    const res = await fetcher();
    return res.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      // throw the whole AxiosError
      throw new Error(JSON.stringify(err));
    }
    if (err instanceof Error) {
      const errorDetails = {
        message: err.message,
        status: err.name,
        cause: err.cause,
        stack: err.stack,
      };
      throw new Error(JSON.stringify(errorDetails));
    }
    throw new Error(getErrorMessage(err));
  }
};

export default apiResolver;
