declare module '*.ico';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.eot';
