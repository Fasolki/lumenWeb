/* ECHO — Room Tone
 * Content comes from tracks.js. Motion is GSAP + ScrollTrigger on top of Lenis
 * smooth scrolling; with reduced motion asked for, the page is fully static.
 */
;(() => {
  const MEDIA = window.ECHO_MEDIA
  const ACTS = window.ECHO_ACTS
  const TRACKS = window.ECHO_TRACKS

  const $ = (sel, root = document) => root.querySelector(sel)
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]
  const el = (tag, cls, html) => {
    const n = document.createElement(tag)
    if (cls) n.className = cls
    if (html != null) n.innerHTML = html
    return n
  }
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  const pad = (n) => String(n).padStart(2, '0')
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
  const smooth = (a, b, x) => {
    const t = clamp((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasGsap = !!(window.gsap && window.ScrollTrigger)
  const animate = hasGsap && !reduced

  const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>'
  const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'

  // Colour per track: the show's three lights in turn, draining toward gray as
  // the record quiets. Track 9 gets a faint flare back — the crowd's voice
  // replayed as a reverb tail.
  const HUES = ['--pink', '--blue', '--gold', '--pink', '--blue', '--gold', '--pink', '--blue', '--gold', '--off']
  const SAT = [1, 1, 0.92, 0.62, 0.55, 0.42, 0.24, 0.16, 0.3, 0.05]
  const WEIGHT = [900, 900, 800, 800, 500, 500, 300, 300, 500, 300]

  /* ------------------------------------------------------------ framing -- */

  // Only offer a way back to the Lab when opened full screen, not when
  // embedded in the Lab's own project page.
  try {
    if (window.self === window.top) $('.back').hidden = false
  } catch {
    // Cross-origin parent: treat as embedded.
  }

  /* ------------------------------------------------------------- tracks -- */

  const acts = $('#acts')
  const players = []

  ACTS.forEach((act) => {
    const wrap = el('div', 'act')
    wrap.innerHTML = `
      <div class="act-head">
        <span class="act-num">${act.numeral}.</span>
        <h3 class="act-name">${esc(act.name)}</h3>
        <p class="act-line">${esc(act.line)}</p>
      </div>`
    const list = el('ol', 'act-list')
    list.style.cssText = 'list-style:none;margin:0;padding:0'
    TRACKS.filter((t) => t.n >= act.range[0] && t.n <= act.range[1]).forEach((t) => {
      list.appendChild(buildTrack(t))
    })
    wrap.appendChild(list)
    acts.appendChild(wrap)
  })

  function buildTrack(t) {
    const i = t.n - 1
    const li = el('li', 'track')
    li.style.setProperty('--hue', `var(${HUES[i]})`)
    li.style.setProperty('--sat', SAT[i])
    li.style.setProperty('--wt', WEIGHT[i])
    li.innerHTML = `
      <span class="track-num" aria-hidden="true">${pad(t.n)}</span>
      <div class="track-info">
        <h4 class="track-title">${esc(t.title)}<span class="track-role">${esc(t.role)}</span></h4>
        <p class="track-about">${esc(t.about)}</p>
        ${t.art ? `<img class="track-art" src="${t.art}" alt="${esc(t.title)} single artwork" loading="lazy" width="64" height="64" />` : ''}
      </div>
      <div class="track-actions"></div>`

    const actions = $('.track-actions', li)
    actions.appendChild(buildPlayer(t, li))

    const lyricsBtn = el('button', 'btn', 'Lyrics')
    lyricsBtn.type = 'button'
    lyricsBtn.setAttribute('aria-label', `Lyrics for ${t.title}`)
    lyricsBtn.addEventListener('click', () => openLyrics(t, li))
    actions.appendChild(lyricsBtn)
    return li
  }

  /* ------------------------------------------------------------- player -- */

  function fmt(sec) {
    if (!isFinite(sec)) return '0:00'
    const s = Math.floor(sec)
    return `${Math.floor(s / 60)}:${pad(s % 60)}`
  }

  function buildPlayer(t, row) {
    const src = MEDIA.audio[t.n]
    const box = el('div', 'player')

    if (!src) {
      box.classList.add('is-empty')
      box.innerHTML = `<span class="player-btn" aria-hidden="true">${ICON_PLAY}</span><span class="player-soon">Audio soon</span>`
      box.setAttribute('aria-label', `${t.title}: audio coming soon`)
      box.setAttribute('role', 'note')
      return box
    }

    box.innerHTML = `
      <button class="player-btn" type="button" aria-label="Play ${esc(t.title)}">${ICON_PLAY}</button>
      <div class="player-bar" aria-hidden="true"><span></span></div>
      <span class="player-time">0:00</span>`
    const btn = $('.player-btn', box)
    const bar = $('.player-bar', box)
    const time = $('.player-time', box)
    let audio = null

    const p = {
      pause() {
        if (audio && !audio.paused) audio.pause()
      },
    }
    players.push(p)

    const setIcon = (playing) => {
      btn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY
      btn.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${t.title}`)
      row.classList.toggle('is-playing', playing)
    }

    function ensure() {
      if (audio) return audio
      // Created on first press only, so nothing downloads until asked for.
      audio = new Audio(src)
      audio.preload = 'metadata'
      audio.addEventListener('play', () => setIcon(true))
      audio.addEventListener('pause', () => setIcon(false))
      audio.addEventListener('ended', () => {
        setIcon(false)
        bar.style.setProperty('--pp', 0)
      })
      audio.addEventListener('timeupdate', () => {
        bar.style.setProperty('--pp', audio.duration ? audio.currentTime / audio.duration : 0)
        time.textContent = fmt(audio.currentTime)
      })
      audio.addEventListener('loadedmetadata', () => (time.textContent = fmt(audio.duration)))
      return audio
    }

    btn.addEventListener('click', () => {
      const a = ensure()
      if (a.paused) {
        stopAll(p)
        a.play().catch(() => setIcon(false))
      } else a.pause()
    })
    bar.addEventListener('click', (e) => {
      const a = ensure()
      const r = bar.getBoundingClientRect()
      const go = () => (a.currentTime = clamp((e.clientX - r.left) / r.width, 0, 1) * a.duration)
      if (a.duration) go()
      else a.addEventListener('loadedmetadata', go, { once: true })
    })
    return box
  }

  function stopAll(except) {
    players.forEach((p) => p !== except && p.pause())
  }

  /* ------------------------------------------------------------- lyrics -- */

  const sheet = $('#sheet')
  let lenis = null

  function openLyrics(t, row) {
    sheet.style.setProperty('--tc', getComputedStyle(row).getPropertyValue('--tc') || 'var(--fog)')
    sheet.style.setProperty('--hue', `var(${HUES[t.n - 1]})`)
    sheet.style.setProperty('--sat', SAT[t.n - 1])
    $('.sheet-k', sheet).textContent = `Track ${pad(t.n)} · ${t.role}`
    $('.sheet-title', sheet).textContent = t.title
    $('.sheet-about', sheet).textContent = t.about

    const out = $('.sheet-lyrics', sheet)
    out.innerHTML = ''
    t.lyrics.split(/\n\s*\n/).forEach((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
      const st = el('div', 'stanza')
      if (/^\[.*\]$/.test(lines[0])) st.appendChild(el('p', 'stanza-tag', esc(lines.shift().slice(1, -1))))
      lines.forEach((l) => st.appendChild(el('p', /^\(.*\)$/.test(l) ? 'note' : '', esc(l))))
      out.appendChild(st)
    })

    $('.sheet-inner', sheet).scrollTop = 0
    sheet.showModal()
    if (lenis) lenis.stop()
    if (animate) gsap.from($$('.stanza', sheet), { opacity: 0, y: 16, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.1 })
  }

  $('.sheet-close').addEventListener('click', () => sheet.close())
  sheet.addEventListener('click', (e) => e.target === sheet && sheet.close())
  sheet.addEventListener('close', () => lenis && lenis.start())

  /* -------------------------------------------------------------- video -- */

  ;(() => {
    const v = MEDIA.video
    $('#video-h').textContent = v.title
    $('.video-caption').textContent = v.caption
    const screen = $('#screen')
    const poster = `<img class="screen-poster" src="${v.poster}" alt="" loading="lazy" />`

    if (v.file) {
      screen.innerHTML = `<video controls preload="metadata" playsinline poster="${v.poster}" src="${v.file}"></video>`
      $('video', screen).addEventListener('play', () => stopAll())
      return
    }
    if (v.youtubeId) {
      screen.innerHTML = `${poster}<button class="screen-overlay" type="button" aria-label="Play the ${esc(v.title)} music video"><span class="screen-play">${ICON_PLAY}</span></button>`
      $('button', screen).addEventListener('click', () => {
        stopAll()
        // Facade: YouTube only loads when someone actually presses play.
        screen.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtubeId)}?autoplay=1&rel=0&modestbranding=1" title="${esc(v.title)} music video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
      })
      return
    }
    screen.innerHTML = `${poster}<div class="screen-overlay"><span class="screen-play" style="opacity:.55">${ICON_PLAY}</span><span class="screen-soon">Premiering soon</span></div>`
  })()

  /* ------------------------------------------------------- echo ghosts -- */

  // Reverb copies of a heading — the band's fading tail, as type.
  $$('[data-echo]').forEach((h) => {
    const n = +h.dataset.echo || 3
    const text = h.textContent
    for (let k = 1; k <= n; k++) {
      const g = el('span', 'echo-ghost')
      g.textContent = text
      g.setAttribute('aria-hidden', 'true')
      g.style.setProperty('--k', k)
      h.appendChild(g)
    }
  })

  /* -------------------------------------------------------------- meter -- */

  const BARS = 14
  const meterBars = $('.meter-bars')
  const meterColors = ['--blue', '--blue', '--blue', '--blue', '--blue', '--pink', '--pink', '--pink', '--pink', '--pink', '--gold', '--gold', '--gold', '--gold']
  for (let i = 0; i < BARS; i++) {
    const b = el('i')
    b.style.setProperty('--c', `var(${meterColors[i]}-c)`)
    meterBars.appendChild(b)
  }
  const bars = $$('i', meterBars)
  const root = document.documentElement
  const progressEl = $('.progress span')
  const topbar = $('.topbar')

  function onScroll(y) {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight)
    const p = clamp(y / max, 0, 1)
    // Colour holds through the loud half, then drains with the record.
    root.style.setProperty('--chroma', (1 - 0.92 * smooth(0.12, 0.92, p)).toFixed(3))
    const lit = Math.ceil((1 - p) * BARS)
    bars.forEach((b, i) => b.classList.toggle('on', i < lit))
    progressEl.style.setProperty('--p', p)
    topbar.classList.toggle('is-solid', y > 60)
  }

  /* ------------------------------------------------------- word splits -- */

  const statement = $('[data-words]')
  statement.innerHTML = statement.textContent
    .trim()
    .split(/\s+/)
    .map((w) => `<span class="w">${esc(w)}</span>`)
    .join(' ')

  const finaleLine = $('[data-letters]')
  finaleLine.setAttribute('aria-label', finaleLine.textContent)
  finaleLine.innerHTML = [...finaleLine.textContent]
    .map((c) => `<span class="l" aria-hidden="true">${c === ' ' ? ' ' : esc(c)}</span>`)
    .join('')

  /* -------------------------------------------------------------- story -- */

  const storyImgs = $$('.story-frame img')
  const storyCount = $('.story-count b')
  const chapters = $$('.chapter')
  function setChapter(i) {
    chapters.forEach((c, k) => c.classList.toggle('is-on', k === i))
    storyImgs.forEach((img, k) => img.classList.toggle('is-on', k === i))
    storyCount.textContent = pad(i + 1)
  }
  setChapter(0)

  /* ----------------------------------------------------------- confetti -- */

  const confetti = (() => {
    const canvas = $('.confetti')
    const ctx = canvas.getContext('2d')
    const COLORS = ['#ff3ea5', '#3d7bff', '#f2b544', '#ece9e2']
    let w = 0
    let h = 0
    let parts = []
    let level = 1
    let running = false

    function size() {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(clamp(w / 12, 50, 130))
      parts = Array.from({ length: count }, () => spawn(true))
    }
    function spawn(anywhere) {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0.5 + Math.random() * 1.1,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.08,
        s: 3 + Math.random() * 5,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        t: Math.random() * 100,
      }
    }
    function frame() {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      const n = Math.round(parts.length * level)
      for (let i = 0; i < n; i++) {
        const p = parts[i]
        p.t += 0.02
        p.x += p.vx + Math.sin(p.t) * 0.35
        p.y += p.vy
        p.r += p.vr
        if (p.y > h + 20) parts[i] = spawn(false)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.r)
        ctx.scale(1, Math.cos(p.t * 3))
        ctx.globalAlpha = 0.85 * level
        ctx.fillStyle = p.c
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2)
        ctx.restore()
      }
      requestAnimationFrame(frame)
    }
    return {
      start() {
        if (running) return
        running = true
        requestAnimationFrame(frame)
      },
      stop() {
        running = false
      },
      size,
      set level(v) {
        level = v
      },
    }
  })()

  /* ------------------------------------------------------------- static -- */

  if (!animate) {
    // Reduced motion (or the libraries failed to load): no smooth scroll, no
    // scrubbed scenes. Keep the meter and chapters honest with plain events.
    const onY = () => onScroll(scrollY)
    addEventListener('scroll', onY, { passive: true })
    onY()
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setChapter(chapters.indexOf(e.target))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    chapters.forEach((c) => io.observe(c))
    $$('.statement-text .w').forEach((w) => (w.style.opacity = 1))
    document.body.classList.remove('is-loading')
    return
  }

  /* ---------------------------------------------------------- animated -- */

  gsap.registerPlugin(ScrollTrigger)

  lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
  lenis.on('scroll', ({ scroll }) => {
    ScrollTrigger.update()
    onScroll(scroll)
  })
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  onScroll(0)

  // In-page links glide instead of jumping.
  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')
      const target = id === '#top' ? 0 : $(id)
      if (target == null) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: id === '#top' ? 0 : -40, duration: 1.6 })
      if (id !== '#top' && target.focus) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    }),
  )

  // Active nav item.
  $$('.nav a').forEach((a) => {
    const sec = $(a.getAttribute('href'))
    if (!sec) return
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => a.classList.toggle('is-active', self.isActive),
    })
  })

  /* hero: the packed room empties out ------------------------------------ */

  confetti.size()
  addEventListener('resize', () => confetti.size())
  const confettiState = { v: 1 }
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? confetti.start() : confetti.stop()),
  })
  confetti.start()

  const title = $('.hero-title')
  gsap.set(title, { '--spread': '0.06em', '--blur': '1.5px' })

  // Intro: everything arrives at once, hook first.
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, onStart: () => document.body.classList.remove('is-loading') })
  intro
    .from('.hero-img.hero-full', { scale: 1.45, duration: 2.4 }, 0)
    .from(title, { '--spread': '0.6em', '--blur': '8px', duration: 2.2 }, 0.1)
    .from(title, { opacity: 0, y: 40, duration: 1.6 }, 0.1)
    .from(['.hero-eyebrow', '.hero-tag', '.scroll-cue'], { opacity: 0, y: 24, duration: 1.4, stagger: 0.12 }, 0.5)
    .from('.beams', { opacity: 0, duration: 2 }, 0)
    .from('.topbar', { opacity: 0, y: -20, duration: 1.2 }, 0.6)
    .from('.meter', { opacity: 0, x: 20, duration: 1.2 }, 0.8)

  gsap
    .timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      defaults: { ease: 'none' },
    })
    .to('.scroll-cue', { opacity: 0, duration: 0.08 }, 0)
    .to(['.hero-eyebrow', '.hero-tag'], { opacity: 0, y: -30, duration: 0.35 }, 0.02)
    .to('.beams', { opacity: 0, duration: 0.6 }, 0.05)
    .to(confettiState, { v: 0, duration: 0.65, onUpdate: () => (confetti.level = confettiState.v) }, 0)
    .to('.hero-full', { scale: 1.42, duration: 1 }, 0)
    .to('.hero-full', { opacity: 0, duration: 0.5 }, 0.28)
    .fromTo('.hero-empty', { opacity: 0, scale: 1.3, filter: 'saturate(1) brightness(1)' }, { opacity: 1, scale: 1.24, filter: 'saturate(0.3) brightness(0.8)', duration: 0.55 }, 0.28)
    .to(title, { '--spread': '0.26em', '--blur': '2.5px', duration: 0.8 }, 0.1)
    .to(title, { opacity: 0.7, scale: 0.9, yPercent: -18, duration: 0.7 }, 0.25)
    .to('.hero-after', { opacity: 1, duration: 0.2 }, 0.72)

  /* statement: words light up as you read -------------------------------- */

  gsap.to('.statement-text .w', {
    opacity: 1,
    ease: 'none',
    stagger: 0.1,
    scrollTrigger: { trigger: '.statement', start: 'top 72%', end: 'bottom 62%', scrub: true },
  })

  /* story ---------------------------------------------------------------- */

  chapters.forEach((c, i) =>
    ScrollTrigger.create({
      trigger: c,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && setChapter(i),
    }),
  )

  /* parallax ------------------------------------------------------------- */

  const parallax = (target, trigger, from, to) =>
    gsap.fromTo(target, { yPercent: from }, { yPercent: to, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } })
  parallax('.band-photo img', '.band-photo', -9, 9)
  $$('.story-frame img').forEach((img) => parallax(img, '.story', -5, 5))

  /* headings: a reverb tail that grows as they pass ----------------------- */

  $$('[data-echo]:not(.hero-title)').forEach((h) => {
    gsap.fromTo(
      h,
      { '--spread': '0.01em', '--blur': '0px' },
      { '--spread': '0.16em', '--blur': '1.6px', ease: 'none', scrollTrigger: { trigger: h, start: 'top 85%', end: 'top 15%', scrub: true } },
    )
  })

  /* reveals -------------------------------------------------------------- */

  const reveal = $$(
    '.member, .ref, .track, .act-head, .tracks-head > *, .album-text > *, .video-head > *, .screen, .sound header > *, .story-text > .eyebrow, .story-text > .h2, .band-inner > .eyebrow, .band-inner > .h2',
  )
  reveal.forEach((n) => n.classList.add('rv'))
  ScrollTrigger.batch(reveal, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, overwrite: true }),
  })

  /* album: the record slides out, the sleeve turns to the empty room ------ */

  const mm = gsap.matchMedia()
  mm.add('(min-width: 961px)', () => {
    gsap
      .timeline({
        scrollTrigger: { trigger: '.album', start: 'top top', end: 'bottom bottom', scrub: 0.8 },
        defaults: { ease: 'none' },
      })
      .fromTo('.sleeve', { xPercent: 0 }, { xPercent: -14, duration: 0.45 }, 0)
      .fromTo('.vinyl', { xPercent: 0, rotation: 0 }, { xPercent: 28, rotation: 220, duration: 0.45 }, 0)
      .to('.vinyl', { rotation: 720, duration: 0.55 }, 0.45)
      .to('.sleeve', { rotationY: 180, duration: 0.35 }, 0.55)
  })
  mm.add('(max-width: 960px)', () => {
    gsap
      .timeline({ scrollTrigger: { trigger: '.record', start: 'top 85%', end: 'bottom 35%', scrub: 0.8 }, defaults: { ease: 'none' } })
      .fromTo('.vinyl', { xPercent: 0, rotation: 0 }, { xPercent: 16, rotation: 300 }, 0)
      .fromTo('.sleeve', { xPercent: 0 }, { xPercent: -6 }, 0)
  })

  /* artwork reel: vertical scroll drives it sideways ---------------------- */

  mm.add('(min-width: 641px)', () => {
    const reel = $('.reel')
    const distance = () => Math.max(0, reel.scrollWidth - innerWidth)
    gsap.to(reel, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.visuals',
        pin: '.visuals-pin',
        start: 'top top',
        end: () => `+=${distance()}`,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })
  })

  /* video poster drifts --------------------------------------------------- */

  if ($('.screen-poster')) parallax('.screen-poster', '.screen', -6, 6)

  /* finale: the line fades out letter by letter -------------------------- */

  gsap
    .timeline({ scrollTrigger: { trigger: '.finale', start: 'top top', end: 'bottom bottom', scrub: 0.8 } })
    .fromTo('.finale-media img', { scale: 1.32 }, { scale: 1.2, ease: 'none', duration: 1 }, 0)
    .fromTo('.streak', { opacity: 0.6 }, { opacity: 0.12, ease: 'none', duration: 1 }, 0)
    .to('.finale-line .l', { opacity: 0, filter: 'blur(12px)', y: -18, ease: 'power1.in', stagger: 0.035, duration: 0.35 }, 0.25)

  // Fonts change line lengths; measure again once they land.
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh())
  addEventListener('load', () => ScrollTrigger.refresh())
})()
