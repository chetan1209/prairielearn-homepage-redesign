"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Code2, GitBranch, GraduationCap, GripVertical, Menu, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const variants = [{ height: 20, answer: 2.02 }, { height: 45, answer: 3.03 }, { height: 80, answer: 4.04 }];
const workflowSteps = [
  { number: "01", label: "Write once", title: "Define the idea, not every copy.", body: "Authors express the question, parameters, and grading logic once in a reusable question bank." },
  { number: "02", label: "Generate variants", title: "Each learner gets real practice.", body: "Parameters change while the underlying learning objective stays consistent." },
  { number: "03", label: "Instant feedback", title: "Feedback arrives while thinking is fresh.", body: "Students can grade their work, learn from feedback, and try another variant." },
  { number: "04", label: "Reuse everywhere", title: "One bank supports the whole course.", body: "Bring the same authored material into practice, homework, in-class work, and testing." },
];
const journeyStages = [
  { key: "class", label: "In-class", kicker: "See understanding in the room", body: "Use questions during lectures or group activities, then discuss the distribution of responses together." },
  { key: "practice", label: "Practice", kicker: "Repeat without repeating", body: "Students keep working through fresh variants of a difficult idea until the method clicks." },
  { key: "homework", label: "Homework", kicker: "Feedback at the useful moment", body: "Automatic grading returns feedback immediately while students are still engaged with the problem." },
  { key: "exam", label: "Exams", kicker: "Assess from the same question bank", body: "Reuse familiar question structures in proctored facilities or bring-your-own-device testing." },
];
const assessmentTypes = [{ value: "numerical", label: "Numerical" }, { value: "code", label: "Code" }, { value: "graphical", label: "Graphical" }, { value: "ordered", label: "Ordered blocks" }, { value: "multiple", label: "Multiple select" }];
const institutionNames = ["University of Illinois", "University of British Columbia", "Rice University", "New York University", "UC Davis", "Arizona State University", "University of York", "Grand Valley State University"];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span>P</span><span>L</span></span>;
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy ? <p className="section-copy">{copy}</p> : null}</div>;
}

function AssessmentDemo() {
  const [variantIndex, setVariantIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "incorrect">("idle");
  const variant = variants[variantIndex];
  const submitAnswer = () => {
    const value = Number(answer);
    setFeedback(Number.isFinite(value) && Math.abs(value - variant.answer) <= 0.05 ? "correct" : "incorrect");
  };
  const newVariant = () => {
    setVariantIndex((current) => (current + 1) % variants.length);
    setAnswer("");
    setFeedback("idle");
  };

  return <div className="assessment-shell" aria-label="Interactive PrairieLearn assessment example">
    <div className="assessment-topbar"><div><span className="window-dot" /><span className="window-dot" /><span className="window-dot" /></div><span>PHYS 101 · Question 3 of 8</span></div>
    <div className="assessment-body" key={variant.height}>
      <div className="question-meta"><span>Homework 3</span><span>1 point</span></div>
      <h3>Free fall from rest</h3>
      <p>A ball is released from a height of <strong className="changing-value">{variant.height} m</strong>. How long does it take to reach the ground? Use <span className="formula">g = 9.8 m/s²</span>.</p>
      <div className="answer-line"><label htmlFor="hero-answer">t =</label><Input id="hero-answer" inputMode="decimal" value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback("idle"); }} onKeyDown={(event) => event.key === "Enter" && answer && submitAnswer()} aria-describedby="answer-feedback" /><span>seconds</span></div>
      <div id="answer-feedback" className={`feedback ${feedback}`} aria-live="polite">
        {feedback === "correct" ? <><span className="feedback-icon"><Check /></span><div><strong>Correct.</strong><p>You can now try another randomized variant.</p></div></> : feedback === "incorrect" ? <><span className="feedback-icon">!</span><div><strong>Try again.</strong><p>Hint: use t = √(2h/g), then substitute the new height.</p></div></> : <><span className="feedback-idle">?</span><p>Submit an answer to receive immediate feedback.</p></>}
      </div>
      <div className="assessment-actions"><Button onClick={submitAnswer} disabled={!answer} className="yellow-button">Submit answer</Button><Button onClick={newVariant} variant="outline" className="new-variant"><RefreshCw /> New variant</Button></div>
    </div>
    <div className="assessment-progress"><span /></div>
  </div>;
}

function WorkflowDiagram() {
  const [active, setActive] = useState(0);
  const step = workflowSteps[active];
  return <div className="workflow-layout">
    <div className="workflow-nav" role="tablist" aria-label="Question workflow">{workflowSteps.map((item, index) => <button key={item.number} type="button" className={active === index ? "active" : ""} onClick={() => setActive(index)} role="tab" aria-selected={active === index}><span>{item.number}</span>{item.label}</button>)}</div>
    <div className="workflow-stage">
      <div className="workflow-canvas" aria-hidden="true">
        <div className="author-file"><span>question.py</span><code>height = random(20, 80)</code><code>answer = √(2h / 9.8)</code></div>
        <div className="connector trunk" /><div className="variant-fan">{[20, 45, 80].map((height, index) => <div className={`mini-variant v${index + 1}`} key={height}><span>h = {height} m</span><strong>t = ?</strong></div>)}</div>
        <div className="connector rail" /><div className="reuse-row"><span>Practice</span><span>Homework</span><span>Exam</span></div><div className="moving-pulse" style={{ left: `${12 + active * 25}%` }} />
      </div>
      <div className="workflow-caption" key={step.number}><span>{step.number} / 04</span><h3>{step.title}</h3><p>{step.body}</p></div>
    </div>
  </div>;
}

function CoursePreview({ stage }: { stage: number }) {
  const item = journeyStages[stage];
  return <div className="course-preview" key={item.key}>
    <div className="preview-browser"><span className="preview-path">ME 201 / {item.label}</span><span className="preview-status">Live</span></div>
    <div className="preview-content"><div className="preview-copy"><span className="tiny-label">{item.kicker}</span><h3>{item.label}</h3><p>{item.body}</p></div>
      <div className={`stage-figure stage-${item.key}`} aria-hidden="true">
        {item.key === "class" ? <><i style={{ height: "42%" }} /><i style={{ height: "78%" }} /><i style={{ height: "58%" }} /><i style={{ height: "31%" }} /></> : null}
        {item.key === "practice" ? <><span>Variant 6</span><strong>Mastery<br />in progress</strong><em>4 / 6</em></> : null}
        {item.key === "homework" ? <><span className="check-ring"><Check /></span><strong>Correct</strong><small>Feedback returned instantly</small></> : null}
        {item.key === "exam" ? <><span>Exam 1</span><strong>18 questions</strong><small>From your existing question bank</small></> : null}
      </div>
    </div>
  </div>;
}

function NumericalPreview() {
  return <div className="question-preview numerical-preview"><span className="preview-label">Numerical input</span><h3>Find the voltage across the resistor.</h3><p>R = <mark>47 Ω</mark> and I = <mark>0.25 A</mark></p><div className="inline-answer"><span>V =</span><Input aria-label="Voltage answer" placeholder="Enter value" /><span>V</span></div><p className="preview-note">Answers can include decimals, fractions, or scientific notation.</p></div>;
}

function CodePreview() {
  const [ran, setRan] = useState(false);
  return <div className="question-preview code-preview"><div className="code-toolbar"><span>solution.py</span><span>Python</span></div><pre><code><span>def</span> kinetic_energy(mass, velocity):{"\n"}    return <b>0.5 * mass * velocity ** 2</b></code></pre><div className="test-row"><Button size="sm" onClick={() => setRan(true)}>Run tests</Button><span className={ran ? "tests-passed" : ""}>{ran ? "3 tests passed" : "Ready to run"}</span></div></div>;
}

function GraphicalPreview() {
  return <div className="question-preview graphical-preview"><span className="preview-label">Graphical input</span><h3>Construct the free-body diagram.</h3><svg viewBox="0 0 480 245" role="img" aria-label="Free-body diagram with force vectors"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="currentColor" /></marker></defs><line x1="80" y1="200" x2="400" y2="200" className="ground" /><rect x="195" y="115" width="90" height="85" rx="4" /><line x1="240" y1="115" x2="240" y2="48" markerEnd="url(#arrow)" /><line x1="240" y1="200" x2="240" y2="232" markerEnd="url(#arrow)" /><text x="250" y="58">N</text><text x="250" y="230">mg</text></svg></div>;
}

function OrderedPreview() {
  return <div className="question-preview ordered-preview"><span className="preview-label">Ordered blocks</span><h3>Arrange the steps to complete the proof.</h3>{["Assume n is even.", "Then n = 2k for some integer k.", "Therefore n² = 4k² is even."].map((text, index) => <button type="button" key={text}><GripVertical /><span>{index + 1}</span>{text}</button>)}</div>;
}

function MultiplePreview() {
  return <div className="question-preview multiple-preview"><span className="preview-label">Multiple select</span><h3>Select every statement that must be true.</h3>{["Kinetic energy is conserved", "Momentum is conserved", "The collision is perfectly elastic"].map((option) => <label key={option}><Checkbox /> <span>{option}</span></label>)}</div>;
}

function AssessmentShowcase() {
  const [type, setType] = useState("numerical");
  const preview = useMemo(() => ({ numerical: <NumericalPreview />, code: <CodePreview />, graphical: <GraphicalPreview />, ordered: <OrderedPreview />, multiple: <MultiplePreview /> })[type], [type]);
  return <Tabs value={type} onValueChange={setType} className="assessment-showcase"><TabsList variant="line" className="assessment-tabs" aria-label="Assessment types">{assessmentTypes.map((item) => <TabsTrigger key={item.value} value={item.value}>{item.label}</TabsTrigger>)}</TabsList><div className="showcase-frame"><div className="showcase-chrome"><span>Question preview</span><span>PrairieLearn</span></div><div className="showcase-content" key={type}>{preview}</div></div></Tabs>;
}

export default function Home() {
  const [journeyStage, setJourneyStage] = useState(0);
  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="PrairieLearn home"><BrandMark /><span>PrairieLearn</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#product">Product</a><a href="#journey">Use Cases</a><a href="#assessments">Examples</a><a href="#research">Research</a><a href="https://www.prairielearn.com/pricing">Pricing</a><a href="#resources">Resources</a></nav>
      <div className="header-actions"><Button asChild variant="ghost" className="login-button"><a href="https://us.prairielearn.com/pl/login">Log in</a></Button><Button asChild className="blue-button"><a href="https://www.prairielearn.com/pricing">Start free</a></Button></div>
      <details className="mobile-menu"><summary aria-label="Open navigation"><Menu /></summary><nav><a href="#product">Product</a><a href="#journey">Use Cases</a><a href="#assessments">Examples</a><a href="#research">Research</a><a href="https://www.prairielearn.com/pricing">Pricing</a><a href="#resources">Resources</a><a href="https://us.prairielearn.com/pl/login">Log in</a></nav></details>
    </header>

    <section className="hero" id="top"><div className="hero-grid" /><div className="hero-copy"><p className="hero-kicker"><span /> Open-source online assessment</p><h1>Assessment that helps students <em>learn by doing.</em></h1><p className="hero-lede">Write questions once, generate randomized variants, grade them automatically, and give students feedback while they are still thinking.</p><div className="hero-actions"><Button asChild className="yellow-button hero-primary"><a href="https://www.prairielearn.com/pricing">Start free</a></Button><Button asChild variant="outline" className="hero-secondary"><a href="https://us.prairielearn.com/pl/login">Explore the demo <ArrowRight /></a></Button></div><div className="hero-notes"><span><Check /> Free for instructors</span><span><Check /> Open source</span></div></div><div className="hero-product"><AssessmentDemo /><p className="interaction-note"><span>Try it:</span> answer, get feedback, then generate a new variant.</p></div></section>

    <section className="trust-strip" aria-label="PrairieLearn adoption"><div className="metrics"><div><strong>50+</strong><span>Institutions</span></div><div><strong>1,000+</strong><span>Courses</span></div><div><strong>185K+</strong><span>Students</span></div><div><strong>165M+</strong><span>Questions graded</span></div></div><div className="institutions"><span className="institution-label">Used by instructors at</span>{institutionNames.map((name) => <span key={name}>{name}</span>)}</div></section>

    <section className="section workflow-section" id="product"><SectionIntro eyebrow="One question, endlessly useful" title="Author the idea once. Let the question keep teaching." copy="PrairieLearn questions are defined as code, so the same learning objective can produce fresh practice across the course." /><WorkflowDiagram /></section>

    <section className="section journey-section" id="journey"><div className="journey-heading"><SectionIntro eyebrow="Across the course" title="One continuous learning journey." copy="Move from a live classroom check to independent practice, homework, and testing without rebuilding your material." /></div><div className="journey-timeline" role="tablist" aria-label="Course journey">{journeyStages.map((stage, index) => <button key={stage.key} type="button" onClick={() => setJourneyStage(index)} className={journeyStage === index ? "active" : ""} role="tab" aria-selected={journeyStage === index}><span>{index + 1}</span><strong>{stage.label}</strong></button>)}</div><CoursePreview stage={journeyStage} /></section>

    <section className="section assessment-section" id="assessments"><div className="assessment-heading"><SectionIntro eyebrow="Beyond multiple choice" title="Assess the work your discipline actually requires." copy="Switch between question formats to see how numerical work, code, diagrams, proofs, and conceptual reasoning can live in one assessment system." /></div><AssessmentShowcase /></section>

    <section className="research-section" id="research"><div className="research-quote"><span className="eyebrow">Research & academic practice</span><blockquote>“Built in university classrooms. Studied in university classrooms.”</blockquote></div><div className="research-copy"><p>PrairieLearn grew from university teaching and continues to sit inside a broader community of educational research and case studies.</p><p>Its public research collection spans question randomization, instant feedback, retrieval practice, computer-based testing, open-ended autograding, collaborative learning, and applications across STEM courses.</p><a href="https://www.prairielearn.com/research">Browse the research collection <ArrowRight /></a></div><div className="research-index" aria-label="Research topics"><span>Question randomization</span><span>Retrieval practice</span><span>Computer-based testing</span><span>Open-ended autograding</span><span>Collaborative learning</span></div></section>

    <section className="section institutional-section" id="resources"><SectionIntro eyebrow="Open by design" title="Built for academic work. Supported for institutional use." /><div className="institutional-grid"><a href="https://github.com/PrairieLearn/PrairieLearn"><GitBranch /><span><strong>Open source</strong><small>See the code, run it yourself, and contribute.</small></span><ArrowRight /></a><a href="https://www.prairielearn.com/accessibility"><GraduationCap /><span><strong>Accessibility</strong><small>Read PrairieLearn’s accessibility statement and approach.</small></span><ArrowRight /></a><a href="https://www.prairielearn.com/security"><ShieldCheck /><span><strong>Security</strong><small>Review published security practices and audit information.</small></span><ArrowRight /></a><a href="https://docs.prairielearn.com/"><Code2 /><span><strong>Hosted support</strong><small>Use managed hosting or follow the documentation to self-host.</small></span><ArrowRight /></a></div></section>

    <section className="pathways-section"><div className="pathways-heading"><span className="eyebrow">Where to go next</span><h2>Choose the path that fits where you are.</h2></div><div className="pathways-list"><article><span>01</span><div><p>Explore PrairieLearn</p><h3>See the product from a student’s point of view.</h3></div><a href="https://us.prairielearn.com/pl/login" aria-label="Explore PrairieLearn"><ArrowRight /></a></article><article><span>02</span><div><p>Teach with PrairieLearn</p><h3>Build your first question and bring it into a course.</h3></div><a href="https://docs.prairielearn.com/" aria-label="Use PrairieLearn in a course"><ArrowRight /></a></article><article><span>03</span><div><p>Evaluate for an institution</p><h3>Review hosting, security, accessibility, and pricing.</h3></div><a href="https://www.prairielearn.com/pricing" aria-label="Evaluate PrairieLearn"><ArrowRight /></a></article></div></section>

    <section className="final-cta"><div><span className="eyebrow">Ready when you are</span><h2>Give every student another meaningful attempt.</h2></div><div className="final-actions"><Button asChild className="yellow-button"><a href="https://www.prairielearn.com/pricing">Start free</a></Button><Button asChild variant="outline"><a href="https://www.prairielearn.com/contact">Request a demo</a></Button><a href="https://www.prairielearn.com/pricing">View pricing <ArrowRight /></a></div></section>

    <footer><div className="footer-brand"><a className="brand" href="#top"><BrandMark /><span>PrairieLearn</span></a><p>Open-source online assessment and learning.</p></div><div><strong>Product</strong><a href="#product">How it works</a><a href="#journey">Use cases</a><a href="#assessments">Question types</a><a href="https://www.prairielearn.com/pricing">Pricing</a></div><div><strong>Resources</strong><a href="https://docs.prairielearn.com/">Documentation</a><a href="https://www.prairielearn.com/research">Research</a><a href="https://github.com/PrairieLearn/PrairieLearn">GitHub</a><a href="https://www.prairielearn.com/support">Support</a></div><div><strong>Institutional</strong><a href="https://www.prairielearn.com/security">Security</a><a href="https://www.prairielearn.com/accessibility">Accessibility</a><a href="https://www.prairielearn.com/contact">Contact</a></div><p className="footer-note">© PrairieLearn, Inc. · Product facts and links reference PrairieLearn’s public website.</p></footer>
  </main>;
}
