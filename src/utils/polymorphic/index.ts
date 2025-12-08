import { ComponentProps, ComponentPropsWithRef, ElementType, ReactNode } from "react";

/**
 * Utility types for creating type-safe polymorphic components with SCSS modules
 *
 * Usage example:
 * ```tsx
 * interface MyComponentProps<T extends ElementType = "div"> extends PolymorphicComponentProps<T> {
 *   customProp?: string;
 * }
 *
 * type MyComponentType = PolymorphicComponent<MyComponentProps>;
 *
 * const _MyComponent = <T extends ElementType = "div">(
 *   props: PolymorphicProps<T, MyComponentProps<T>>,
 *   ref: PolymorphicRef<T>
 * ) => {
 *   const Component = props.component ?? "div";
 *   return <Component ref={ref} {...props} />;
 * };
 *
 * export const MyComponent: MyComponentType = forwardRef(_MyComponent);
 * ```
 */

/**
 * Base props for polymorphic components
 */
export interface PolymorphicComponentProps<T extends ElementType> {
  component?: T;
}

/**
 * Merges the component's custom props with native HTML element props
 * Excludes conflicting keys from ComponentProps to ensure custom props take precedence
 */
export type PolymorphicProps<
  T extends ElementType,
  TProps extends PolymorphicComponentProps<T>,
> = Omit<ComponentProps<T>, keyof TProps> & TProps;

/**
 * Extracts the correct ref type for the polymorphic component
 */
export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

/**
 * Type for the final exported polymorphic component
 * This uses a mapped type to properly infer the element type
 */
export type PolymorphicComponent<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TProps extends PolymorphicComponentProps<any>,
  TDefaultElement extends ElementType = "div",
> = <T extends ElementType = TDefaultElement>(
  props: PolymorphicProps<T, Omit<TProps, "component"> & { component?: T }>
) => ReactNode;
