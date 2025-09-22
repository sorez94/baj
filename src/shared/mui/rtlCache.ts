'use client';

import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Emotion cache configured for RTL. Use with <CacheProvider value={rtlCache}>.
export const rtlCache = createCache({
	key: 'mui-rtl',
	stylisPlugins: [prefixer, rtlPlugin],
}); 