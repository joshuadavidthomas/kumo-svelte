/**
 * Kumo Catalog Module
 *
 * Runtime utilities for JSON-based UI rendering with Kumo components.
 * Based on the json-render pattern: https://github.com/vercel-labs/json-render
 *
 * Features:
 * - Catalog creation with generated component-name schemas
 * - UI tree validation
 * - Dynamic value resolution (data binding)
 * - Visibility condition evaluation
 * - Action handling
 *
 * @example
 * import {
 *   createKumoCatalog,
 *   initCatalog,
 *   evaluateVisibility,
 *   resolveProps,
 * } from '@cloudflare/kumo/catalog';
 *
 * // Create catalog with actions
 * const catalog = createKumoCatalog({
 *   actions: {
 *     submit: { description: 'Submit form' },
 *   },
 * });
 *
 * // Initialize (kept for upstream API compatibility)
 * await initCatalog(catalog);
 *
 * // Validate AI-generated tree
 * const result = catalog.validateTree(aiGeneratedJson);
 */

// Types
export type {
  // Core types
  UIElement,
  UITree,
  DynamicValue,
  DynamicString,
  DynamicNumber,
  DynamicBoolean,
  // Visibility
  VisibilityCondition,
  LogicExpression,
  // Actions
  Action,
  ActionConfirm,
  ActionHandler,
  ActionHandlers,
  ActionDefinition,
  // Auth & Data
  AuthState,
  DataModel,
  // Catalog
  KumoCatalog,
  CatalogConfig,
  ValidationResult,
  // Registry (re-exported)
  ComponentRegistry,
  ComponentSchema,
  PropSchema,
  SubComponentSchema,
} from "./types";

// Catalog
export { createKumoCatalog, initCatalog, loadSchemas } from "./catalog";

// Data utilities
export { getByPath, setByPath, isDynamicPath, resolveDynamicValue, resolveProps } from "./data";

// Visibility
export { evaluateVisibility, createVisibilityContext, type VisibilityContext } from "./visibility";
