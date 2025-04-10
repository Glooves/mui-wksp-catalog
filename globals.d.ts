declare module '*.svg' {
    import { FC, SVGProps } from 'react';
    const src: FC<SVGProps<SVGElement>>;
    export default src;
  }
  