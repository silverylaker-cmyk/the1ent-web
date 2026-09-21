'use client';

import { useEffect, useState } from 'react';
import { IconKakao } from './icons';

export default function Fab({ kakaoUrl }: { kakaoUrl: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a className={`fab${show ? ' show' : ''}`} href={kakaoUrl} target="_blank" rel="noopener">
      <IconKakao />
      예약
    </a>
  );
}
