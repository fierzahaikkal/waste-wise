/**
 * Extracts a human-readable message from an error object.
 * This function handles different types of error inputs, including instances of Error,
 * objects containing a 'message' property, strings, or other types that do not fit the previous categories.
 *
 * @param {unknown} error - The error from which to extract the message.
 * @returns {string} The extracted error message or a default error message if none is found.
 */
export function getErrorMessage(error: unknown): string {
  let message: string;
  if (error instanceof Error) {
    // If error is an instance of Error, use its message property.
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    // If error is an object and has a 'message' property, convert it to string.
    message = String(error.message);
  } else if (typeof error === "string") {
    // If error is a string, use it directly.
    message = error;
  } else {
    // For all other cases, use a generic error message.
    message = "something went wrong";
  }
  return message;
}
