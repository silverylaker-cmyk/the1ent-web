import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import SurgerySteps from '@/components/SurgerySteps';
import SplitText from '@/components/motion/SplitText';
import Tilt from '@/components/motion/Tilt';
import CountUp from '@/components/motion/CountUp';
import Marquee from '@/components/motion/Marquee';
import Magnetic from '@/components/motion/Magnetic';
import Journey from '@/components/home/Journey';
import ParallaxBand from '@/components/home/ParallaxBand';
import HoursTable from '@/components/features/HoursTable';
import MapBox from '@/components/features/MapBox';
import { IconNose, IconEar, IconSleep, IconArrow } from '@/components/icons';
import { withBase } from '@/lib/base';
import {
  getCareContent,
  getAllSurgeryContent,
  getDoctors,
  getSiteConfig,
  getHomeContent,
  getMedia,
  getUi,
} from '@/lib/content';

export default function HomePage() {
  const site = getSiteConfig();
  const home = getHomeContent();
  const ui = getUi();
  const media = getMedia();
  const care = [getCareContent('nose'), getCareContent('ear'), getCareContent('sleep')];
  const careIcons = { nose: IconNose, ear: IconEar, sleep: IconSleep } as const;
  const surgeries = getAllSurgeryContent();
  const doctors = getDoctors();

  return (
    <>
      <Hero
        content={home.hero}
        kakaoUrl={site.kakaoChannelUrl}
        media={{
          poster: withBase(media.hero.poster),
          video: media.hero.video ? withBase(media.hero.video) : null,
        }}
        schedule={site.schedule}
        statusLabels={ui.status}
      />

      <Marquee items={home.marquee} />

      <section className="facts" aria-label="한눈에 보기">
        {home.facts.map((f: { value: number; suffix: string; label: string }, i: number) => (
          <Reveal as="div" className="fact" index={i} key={f.label}>
            <div className="fact-num">
              <CountUp value={f.value} />
              <small>{f.suffix}</small>
            </div>
            <p>{f.label}</p>
          </Reveal>
        ))}
      </section>

      <section id="care">
        <SplitText text={home.care.title} />
        <Reveal as="p" className="lead" index={1}>
          {home.care.lead}
        </Reveal>
        <div className="axis">
          {care.map((c, i) => {
            const Icon = careIcons[c.slug as keyof typeof careIcons];
            const art = media.care[c.slug as keyof typeof media.care];
            return (
              <Reveal as="div" index={i} key={c.slug}>
                <Tilt>
                  <Link href={`/care/${c.slug}`} className={c.color}>
                    {art && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="axis-art" src={withBase(art)} alt="" loading="lazy" />
                    )}
                    <Icon />
                    <h3>{c.title}</h3>
                    <p>{c.lead}</p>
                    <ul>
                      {c.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <span className="axis-more">
                      {home.care.more}
                      <IconArrow />
                    </span>
                  </Link>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="surg" id="surgery">
        <SplitText text={home.surgery.title} />
        <Reveal as="p" className="lead" index={1}>
          {home.surgery.lead}
        </Reveal>
        <div className="surg-grid">
          {surgeries.map((s, i) => (
            <Reveal as="div" className={`surg-item ${s.color}`} index={i} key={s.slug}>
              <span className="surg-no" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{s.title}</h3>
              <p className="sub">{s.sub}</p>
              <SurgerySteps steps={s.steps} color={s.color} />
              <Link className="more" href={`/surgery/${s.slug}`}>
                {home.surgery.more}
                <IconArrow />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="journey-wrap">
        <div className="journey-head">
          <SplitText text={home.journey.title} />
          <Reveal as="p" className="lead" index={1}>
            {home.journey.lead}
          </Reveal>
        </div>
        <Journey steps={home.journey.steps} />
      </section>

      <ParallaxBand
        image={withBase(media.band.image)}
        video={media.band.video ? withBase(media.band.video) : null}
      >
        <SplitText text={home.know.title} />
        <div className="know">
          {home.know.items.map((k: { title: string; body: string }, i: number) => (
            <Reveal as="div" index={i} key={k.title}>
              <div className="bar" />
              <h3>{k.title}</h3>
              <p>{k.body}</p>
            </Reveal>
          ))}
        </div>
      </ParallaxBand>

      <section id="tools">
        <SplitText text={home.tools.title} />
        <Reveal as="p" className="lead" index={1}>
          {home.tools.lead}
        </Reveal>
        <div className="tools">
          {home.tools.items.map((t: { href: string; title: string; body: string; color: string }, i: number) => (
            <Reveal as="div" index={i} key={t.href}>
              <Link href={t.href} className={`tool ${t.color}`}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                <span className="tool-go" aria-hidden>
                  <IconArrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="doctors">
        <SplitText text={home.doctors.title} />
        <Reveal as="p" className="lead" index={1}>
          {home.doctors.lead}
        </Reveal>
        <div className="docs">
          {doctors.map((doc, i) => (
            <Reveal as="div" className="doc" index={i} key={doc.name}>
              <div className="photo">{home.doctors.photoLabel}</div>
              <div>
                <h3>
                  {doc.name} {i === 0 ? '대표원장' : '원장'}
                </h3>
                <div className="role">{doc.role}</div>
                <ul>
                  {doc.career.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hours" id="hours">
        <Reveal as="div">
          <h2>{home.hours.title}</h2>
          <HoursTable site={site} ui={ui} />
        </Reveal>
        <Reveal as="div" className="kbox" index={1}>
          <h3>{home.hours.kakaoTitle}</h3>
          <p>{home.hours.kakaoBody}</p>
          <div className="kbox-cta">
            <Magnetic>
              <a className="btn dark shine" href={site.kakaoChannelUrl} target="_blank" rel="noopener">
                {home.hours.kakaoCta}
              </a>
            </Magnetic>
            <Link className="btn ghost" href="/reservation#helper">
              {home.hours.helperCta}
            </Link>
          </div>
          <a className="tel" href={site.telHref}>
            {site.tel}
          </a>
        </Reveal>
      </section>

      <section className="map" id="map">
        <Reveal as="div">
          <MapBox site={site} ui={ui} placeholder={home.map.placeholder} />
        </Reveal>
        <Reveal as="div" index={1}>
          <h2>{home.map.title}</h2>
          <p className="lead">{site.address}</p>
          <dl>
            <dt>지하철</dt>
            <dd>{site.addressDetail.subway}</dd>
            <dt>버스</dt>
            <dd>{site.addressDetail.bus}</dd>
            <dt>자가용</dt>
            <dd>{site.addressDetail.car}</dd>
          </dl>
        </Reveal>
      </section>
    </>
  );
}
