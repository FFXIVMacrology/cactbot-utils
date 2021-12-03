/**
 * @param {Method} method
 * @param {string} url
 * @param {string[]} columns
 * @param {number} page
 * @returns {Promise<any>}
 */
export function request(method: Method, url: string, columns: string[], page?: number): Promise<any>;
/**
 * @param {string} url
 * @param {string[]} columns
 */
export function get(url: string, columns: string[], page?: number): Promise<any>;
/**
 * @param {string} url
 * @param {string[]} columns
 */
export function post(url: string, columns: string[], page?: number): Promise<any>;
/**
 * @param {any[]} array
 */
export function all(array: any[]): Promise<any[]>;
import { Method } from "axios";
