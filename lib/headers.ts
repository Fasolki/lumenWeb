/**
 * Custom request header the proxy sets so pages can tell which host served
 * them. Kept in its own module with no runtime imports, because it is read
 * from both the proxy (edge) and server components.
 */
export const SURFACE_HEADER = 'x-lumen-surface'
