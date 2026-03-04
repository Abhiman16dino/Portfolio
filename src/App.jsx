import { useEffect, useRef } from 'react'
import './App.css'

const floatingPanels = [
  {
    title: 'Oracle · SMTS',
    detail: 'Full Stack · Oracle Cloud Infrastructure (2026–Present).',
  },
  {
    title: 'Oracle Cloud Full Stack',
    detail: 'Building OCI-backed services and platform automation.',
  },
  {
    title: 'Terraform Automation',
    detail: 'Infrastructure-as-code workflows for cloud delivery.',
  },
]

const workItems = [
  {
    title: 'RAG Chatbot · SAP Analytics Cloud',
    year: '2025',
    description:
      'Built an AI messaging platform with FAISS + LLMs to diagnose customer issues and cut support tickets by 45%.',
  },
  {
    title: 'SAC Joule Integration',
    year: '2024',
    description:
      'Integrated AI-powered insights into the product, making analytics workflows future-ready.',
  },
  {
    title: 'Connection Health Monitor POC',
    year: '2024',
    description:
      'Prototyped monitoring for data source connection health and troubleshooting workflows.',
  },
  {
    title: 'Android App Delivery',
    year: '2022',
    description:
      'Delivered a native Android app in 7 months and onboarded internal users quickly post launch.',
  },
]

const approachSteps = [
  {
    title: 'Full-stack delivery',
    detail: 'React, Node, Spring Boot, SQL, and microservices from prototype to production.',
  },
  {
    title: 'AI + data workflows',
    detail: 'LLMs, RAG pipelines, FAISS, and AWS integrations for smarter product support.',
  },
  {
    title: 'Mobile & platform craft',
    detail: 'Native Android, Swift, and cross-platform tooling with a focus on stability.',
  },
]

const skills = [
  'Java',
  'JavaScript',
  'Python',
  'Swift',
  'SQL',
  'React.js',
  'Node.js',
  'Spring Boot',
  'Oracle Cloud Infrastructure',
  'Terraform',
  'AWS',
  'Docker',
  'MongoDB',
  'LangChain',
  'Android',
  'iOS',
]

const certifications = [
  {
    title: 'Oracle Cloud Infrastructure Certification',
  },
  {
    title: 'Terraform Certification',
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    link: 'https://coursera.org/share/2992e7ce7e81736e73dcd69acabec699',
  },
  {
    title: 'React Deep Dive: From Beginner to Advanced',
    link: 'https://www.educative.io/verify-certificate/X6EJPZiDNRARZzvMQC7nj2kX9gZjiL',
  },
  {
    title: 'Java Multithreading',
    link: 'https://www.educative.io/verify-certificate/N8o38o737Dvc9woKJDlLnDuzLKXR30WqKc2',
  },
  {
    title: 'Java Spring Boot Trainer',
    link: 'https://www.credly.com/badges/11a76ff8-3815-4d87-b3c9-b9a62143ff08',
  },
]

const blogPosts = [
  {
    title: 'Building cloud-native platforms with OCI + Terraform',
    date: 'Coming soon',
    summary: 'Notes on infrastructure-as-code, service design, and automation.',
  },
  {
    title: 'RAG pipelines for real-world support teams',
    date: 'Coming soon',
    summary: 'Lessons from deploying AI copilots in enterprise workflows.',
  },
  {
    title: 'Full-stack velocity: patterns that scale',
    date: 'Coming soon',
    summary: 'Practical patterns for shipping reliable features fast.',
  },
]

function MeshBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let points = []
    let cols = 0
    let rows = 0
    let spacing = 120
    let animationFrame = null

    const buildGrid = () => {
      spacing = Math.max(90, Math.min(140, width / 10))
      cols = Math.ceil(width / spacing) + 1
      rows = Math.ceil(height / spacing) + 1
      points = []

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const jitter = spacing * 0.18
          const x = col * spacing + (Math.random() - 0.5) * jitter
          const y = row * spacing + (Math.random() - 0.5) * jitter
          points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
        }
      }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildGrid()
    }

    const drawLine = (a, b) => {
      if (!a || !b) return
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy)
      const maxDist = spacing * 1.5
      if (dist > maxDist) return
      const alpha = 1 - dist / maxDist
      const edgeBoost = Math.max(
        Math.abs(a.x / width - 0.5),
        Math.abs(b.x / width - 0.5),
      )
      const edgeContrast = 0.1 + edgeBoost * 0.35
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * edgeContrast})`
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1

      const { x: mx, y: my, active } = mouse.current
      points.forEach((point) => {
        if (active) {
          const dx = point.x - mx
          const dy = point.y - my
          const dist = Math.hypot(dx, dy) || 1
          const influence = 160
          if (dist < influence) {
            const force = (1 - dist / influence) * 2.6
            point.vx += (dx / dist) * force
            point.vy += (dy / dist) * force
          }
        }

        point.vx += (point.ox - point.x) * 0.015
        point.vy += (point.oy - point.y) * 0.015
        point.vx *= 0.88
        point.vy *= 0.88
        point.x += point.vx
        point.y += point.vy
      })

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = row * cols + col
          const point = points[index]
          drawLine(point, points[index + 1])
          drawLine(point, points[index + cols])
          drawLine(point, points[index + cols + 1])
        }
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.78)'
      points.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    const handlePointerMove = (event) => {
      mouse.current.x = event.clientX
      mouse.current.y = event.clientY
      mouse.current.active = true
    }

    const handlePointerLeave = () => {
      mouse.current.active = false
    }

    resize()
    animationFrame = requestAnimationFrame(animate)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="mesh-canvas" aria-hidden="true" />
}

function App() {
  const scrollProgress = useRef(0)
  const sectionsRef = useRef([])
  const footerRef = useRef(null)

  const setSectionRef = (node) => {
    if (node && !sectionsRef.current.includes(node)) {
      sectionsRef.current.push(node)
    }
  }

  useEffect(() => {
    let frame = null

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const maxScroll = scrollHeight - clientHeight
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
      scrollProgress.current = progress
      document.documentElement.style.setProperty('--scroll', progress.toFixed(4))

      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const viewHeight = window.innerHeight
        const center = rect.top + rect.height / 2
        const offset = (center - viewHeight / 2) / viewHeight
        const visibility = Math.max(0, 1 - Math.abs(offset) * 1.4)
        section.style.setProperty('--progress', visibility.toFixed(3))
        section.style.setProperty('--progress-inv', (1 - visibility).toFixed(3))
        section.style.setProperty('--offset', offset.toFixed(3))
      })

      frame = null
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="app">
      <MeshBackground />
      <div className="scroll-indicator" aria-hidden="true">
        <span />
      </div>

      <nav className="nav">
        <div className="logo">Abhishek Mondal</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#work">Work</a>
          <a href="#approach">Skills</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-cta">Start a project</button>
      </nav>

      <main>
        <section className="hero scroll-panel" id="home" ref={setSectionRef}>
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Abhishek Mondal</span>
              <h1 className="hero-title">
                Oracle SMTS building cloud-native full-stack platforms.
              </h1>
              <p className="hero-lead">
                I’m currently an SMTS at Oracle (2026–Present), focused on full-stack
                delivery across Oracle Cloud Infrastructure with Terraform-driven
                automation. I’m open to roles spanning full stack, platform,
                developer tooling, and AI/automation projects.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#work">View projects</a>
                <a className="btn ghost" href="mailto:mondal.abhishek.dev@gmail.com">
                  Contact me
                </a>
              </div>
              <div className="hero-meta">
                <span>Based in India</span>
                <span>Oracle SMTS · OCI · Terraform</span>
              </div>
            </div>
            <div className="float-grid">
              {floatingPanels.map((panel) => (
                <article key={panel.title} className="float-card">
                  <h3>{panel.title}</h3>
                  <p>{panel.detail}</p>
                </article>
              ))}
              <article className="float-card wide">
                <span className="eyebrow">Focus areas</span>
                <p>Full stack · Cloud platforms · Dev tooling · AI automation</p>
              </article>
            </div>
          </div>
        </section>

        <section className="manifesto scroll-panel" id="manifesto" ref={setSectionRef}>
          <div className="section-heading">
            <span className="eyebrow">Experience</span>
            <h2>Delivering cloud-native platforms, tooling, and automation.</h2>
          </div>
          <div className="manifesto-grid">
            <p className="manifesto-lead">
              Currently serving as an SMTS at Oracle (2026–Present) working on full
              stack delivery with Oracle Cloud Infrastructure and Terraform-driven
              automation. Previously, I built AI integrations, workflow automation,
              and mobile platforms at SAP Labs.
            </p>
            <div className="manifesto-points">
              <div>
                <span>2026–Present</span>
                <h4>Oracle · SMTS</h4>
                <p>Full stack engineering with OCI and infrastructure automation.</p>
              </div>
              <div>
                <span>2021–2025</span>
                <h4>SAP Labs India</h4>
                <p>AI support tooling, chrome extensions, mobile delivery.</p>
              </div>
              <div>
                <span>Stack</span>
                <h4>OCI · Terraform · React · Java</h4>
                <p>Infrastructure automation, microservices, and AI pipelines.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="works scroll-panel" id="work" ref={setSectionRef}>
          <div className="section-heading">
            <span className="eyebrow">Projects</span>
            <h2>AI and automation projects shipped for enterprise teams.</h2>
          </div>
          <div className="works-grid">
            {workItems.map((work) => (
              <article key={work.title} className="work-card">
                <div className="work-header">
                  <h3>{work.title}</h3>
                  <span>{work.year}</span>
                </div>
                <p>{work.description}</p>
                <button className="text-link">View details →</button>
              </article>
            ))}
          </div>
        </section>

        <section
          className="approach scroll-panel"
          id="approach"
          ref={setSectionRef}
        >
          <div className="section-heading">
            <span className="eyebrow">Skills & Certifications</span>
            <h2>Full-stack engineering with AI, cloud, and mobile expertise.</h2>
          </div>
          <div className="approach-grid">
            {approachSteps.map((step) => (
              <article key={step.title} className="approach-card">
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
            <article className="approach-card">
              <h3>Core skills</h3>
              <p>{skills.join(' · ')}</p>
            </article>
            <article className="approach-card">
              <h3>Certifications</h3>
              <ul>
                {certifications.map((cert) => (
                  <li key={cert.title}>
                    {cert.link ? (
                      <a href={cert.link} target="_blank" rel="noreferrer">
                        {cert.title}
                      </a>
                    ) : (
                      <span>{cert.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="blog scroll-panel" id="blog" ref={setSectionRef}>
          <div className="section-heading">
            <span className="eyebrow">Blog</span>
            <h2>Writing about cloud platforms, automation, and full-stack craft.</h2>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.title} className="blog-card">
                <span className="blog-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <button className="text-link">Read soon →</button>
              </article>
            ))}
          </div>
        </section>

        <section className="contact scroll-panel" id="contact" ref={setSectionRef}>
          <div className="contact-card">
            <span className="eyebrow">Let’s collaborate</span>
            <h2>Let’s build reliable products together.</h2>
            <p>
              Reach out for full-stack engineering, cloud platforms, developer
              tooling, AI automation, or mobile delivery projects. I’m open to
              opportunities across domains.
            </p>
            <div className="contact-actions">
              <a className="btn primary" href="mailto:mondal.abhishek.dev@gmail.com">
                Email me
              </a>
              <a
                className="btn ghost"
                href="https://www.linkedin.com/in/abhimandev/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn ghost"
                href="https://github.com/Abhiman16dino"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer scroll-panel" ref={footerRef}>
        <p>© 2026 Abhishek Mondal. Oracle SMTS · Full-stack engineering.</p>
        <div className="footer-links">
          <a href="#home">Back to top</a>
          <a href="https://www.linkedin.com/in/abhimandev/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/Abhiman16dino" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App