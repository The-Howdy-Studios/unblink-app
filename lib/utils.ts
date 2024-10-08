import { redirect } from "next/navigation";

/**
 * Creates a function that checks if a prop should not be forwarded to the DOM element.
 * It uses a list of property keys from custom component props.
 *
 * @param props Array of property keys from custom props that should not be forwarded.
 * @returns A function that takes a property name and returns a boolean indicating
 *          whether it should not be forwarded.
 */
export const shouldNotForwardPropsWithKeys =
  <CustomProps>(props: Array<keyof CustomProps>) =>
  (propName: PropertyKey): boolean =>
    !props.map((p) => p.toString()).includes(propName.toString());

/**
 * Asynchronously wait for a given amount of milliseconds.
 *
 * @param ms amount of milliseconds to wait
 * @returns A promise that resolves after a given amount of milliseconds.
 */
export const sleep = async (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

/**
 * Logs a message to the console if the environment is not production.
 *
 * @param props Any number of properties to log to the console.
 */
export const localLog = (...props: any) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
    console.log(...props);
  }
};

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message?: string
) {
  if (message) {
    return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
  }
  return redirect(path);
}
