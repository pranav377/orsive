// /hooks/tailwind.ts
import create from '@kodingdotninja/use-tailwind-breakpoint';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

const config = resolveConfig(tailwindConfig as any);

export const { useBreakpoint } = create(config!.theme!.screens);
