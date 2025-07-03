import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';

const bgShapes = [
  { left: '10%', size: 120, speed: 0.35, color: '#e0e0e0', top: 100 },
  { left: '70%', size: 180, speed: 0.28, color: '#d1d5db', top: 400 },
  { left: '30%', size: 100, speed: 0.45, color: '#f3f4f6', top: 800 },
  { left: '85%', size: 160, speed: 0.32, color: '#e5e7eb', top: 1200 },
  { left: '50%', size: 140, speed: 0.38, color: '#bdbdbd', top: 600 },
  { left: '20%', size: 90, speed: 0.5, color: '#a3a3a3', top: 1400 },
];

function ParallaxBackground({ scrollY, mouse }) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {bgShapes.map((shape, i) => (
        <svg
          key={i}
          width={shape.size}
          height={shape.size}
          style={{
            position: 'absolute',
            left: `calc(${shape.left} + ${mouse.x * 80 * (i % 2 === 0 ? 1 : -1)}px)` ,
            top: shape.top + scrollY * shape.speed + mouse.y * 50 * (i % 2 === 0 ? 1 : -1),
            opacity: 0.7,
            filter: 'blur(0.5px)',
            transition: 'top 0.1s, left 0.1s',
            zIndex: -10,
            transform: `rotate(${mouse.x * 10 * (i % 2 === 0 ? 1 : -1)}deg) scale(${1 + mouse.y * 0.1})`,
          }}
        >
          <rect x="0" y="0" width={shape.size} height={shape.size} rx={shape.size/4} fill={shape.color} />
        </svg>
      ))}
    </div>
  );
}

// ParallaxText: independent parallax for each text element
function ParallaxText({
  children,
  as: Tag = 'span',
  multX = 1,
  multY = 1,
  scale = 1,
  rotate = 0,
  className = '',
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setOffset({ x, y });
  }
  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const transform = `translateX(${offset.x * 20 * multX}px) translateY(${offset.y * 10 * multY}px) scale(${1 + Math.abs(offset.x) * 0.04 * scale}) rotate(${offset.x * 3 * rotate}deg)`;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, transform, transition: 'transform 0.15s', willChange: 'transform', display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}

// SVG icons
const GroupIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="10" cy="14" r="4" stroke="#111" strokeWidth="2"/><circle cx="22" cy="14" r="4" stroke="#111" strokeWidth="2"/><ellipse cx="16" cy="22" rx="10" ry="5" stroke="#111" strokeWidth="2"/></svg>
);
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="4" stroke="#fff" strokeWidth="2"/>
    <ellipse cx="10" cy="15" rx="7" ry="4" stroke="#fff" strokeWidth="2"/>
  </svg>
);
const FriendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="4" width="12" height="12" rx="6" stroke="#111" strokeWidth="2"/></svg>
);
const FloppyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="#111" strokeWidth="2"/><rect x="6" y="6" width="8" height="5" rx="1" stroke="#111" strokeWidth="1.5"/><rect x="8" y="13" width="4" height="2" rx="0.5" stroke="#111" strokeWidth="1.5"/></svg>
);
const MicIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="12" y="6" width="8" height="14" rx="4" stroke="#111" strokeWidth="2" fill="#fff"/>
    <rect x="14" y="20" width="4" height="4" rx="2" stroke="#111" strokeWidth="2" fill="#fff"/>
    <path d="M16 24v4" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 18a6 6 0 0 0 12 0" stroke="#111" strokeWidth="2"/>
  </svg>
);
const ChatIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="8" width="24" height="14" rx="4" stroke="#111" strokeWidth="2" fill="#fff"/>
    <path d="M10 22v4l6-4h6" stroke="#111" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="15" r="1.5" fill="#111"/>
    <circle cx="16" cy="15" r="1.5" fill="#111"/>
    <circle cx="20" cy="15" r="1.5" fill="#111"/>
  </svg>
);
const PersonTalkingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 26c0-8 4-14 10-14 2.5 0 5 1.5 6 4.5M8 26c2-2 6-3 10-3M8 26c0-8 4-14 10-14" stroke="#111" strokeWidth="2" fill="none"/>
    <path d="M22 16c1.5.5 3 2 3 3.5" stroke="#111" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M22 18c.8.2 1.6 1 1.6 1.8" stroke="#111" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

function ConfettiCheck({ show }) {
  // Simple checkmark with confetti burst
  if (!show) return null;
  return (
    <div className="flex flex-col items-center mt-6 animate-fade-in">
      <svg width="60" height="60" viewBox="0 0 60 60" className="mb-2">
        <circle cx="30" cy="30" r="28" fill="#fff" stroke="#4ade80" strokeWidth="4" />
        <polyline points="18,32 28,42 44,20" fill="none" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="text-green-600 font-mono text-lg">You and your friends are in!</div>
      <div className="confetti absolute inset-0 pointer-events-none z-50" />
    </div>
  );
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [emails, setEmails] = useState(['', '', '', '', '']);
  const [signupStatus, setSignupStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const formRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    setProgress(emails.filter(e => e.trim()).length);
  }, [emails]);

  // Handle beta signup form submit
  async function handleBetaSignup(e) {
    e.preventDefault();
    setSignupStatus(null);
    const group_id = uuidv4();
    const res = await fetch('/api/beta-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails, group_id }),
    });
    const data = await res.json();
    if (data.success) {
      setSignupStatus('success');
      setEmails(['', '', '', '', '']);
    } else {
      setSignupStatus(data.error || 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black font-retro relative overflow-x-hidden">
      <Head>
        <title>ChitChat</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* Google Fonts stylesheet moved to _document.js */}
      </Head>
      <ParallaxBackground scrollY={scrollY} mouse={mouse} />
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20 bg-[#f8f8f8] border-b border-black/10 backdrop-blur-sm">
        <div className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase"></div>
        <div className="flex gap-6 text-xs md:text-base font-bold uppercase">
          <a href="#about" className="hover:underline">About</a>
          <a href="#beta" className="hover:underline">Beta</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </nav>
      {/* Scanline Overlay (extra, for effect) */}
      <div className="pointer-events-none fixed inset-0 z-50" style={{background: 'url(/grain.png)', opacity: 0.15, mixBlendMode: 'multiply'}} />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] pt-32 pb-16 px-4 text-center overflow-hidden select-none">
        <ParallaxText
          as="h1"
          className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest mb-8 leading-tight drop-shadow-lg relative z-20"
          style={{ letterSpacing: '0.15em' }}
          multX={1}
          multY={1}
          scale={1}
          rotate={1}
        >
          ChitChat
        </ParallaxText>
        <ParallaxText
          as="p"
          className="text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-mono opacity-80 relative z-20"
          multX={0.5}
          multY={0.5}
          scale={0.5}
          rotate={0}
        >
          We're changing the way you text, by getting rid of it. Talk on your phone how you'd talk in person.
        </ParallaxText>
      </section>
      {/* Beta Signup Section */}
      <section id="beta" className="relative max-w-xl mx-auto py-16 px-4 text-center border-t border-black/10">
        <div className="mx-auto max-w-md bg-white/80 border-4 border-black rounded-2xl shadow-xl p-8 relative retro-card">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#f8f8f8] border-2 border-black rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-md">
            <GroupIcon />
          </div>
          <ParallaxText
            as="h2"
            className="text-2xl md:text-3xl font-bold uppercase mb-4 tracking-widest mt-8"
            multX={0.7}
            multY={0.7}
            scale={0.5}
            rotate={0.5}
          >Sign up for Beta</ParallaxText>
          <p className="font-mono opacity-80 mb-6">Enter your email and 4 friends' emails to get early access.</p>
          {/* Progress bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden border-2 border-black">
            <div className="h-full bg-green-400 transition-all duration-300" style={{ width: `${(progress/5)*100}%` }} />
          </div>
          <form ref={formRef} className="flex flex-col gap-2 items-center" onSubmit={handleBetaSignup}>
            {emails.map((email, i) => (
              <div key={i} className="relative w-full">
                <input
                  type="email"
                  required
                  placeholder={i === 0 ? 'Your Email' : `Friend ${i} Email`}
                  className="border-2 border-black rounded-lg px-4 py-2 font-mono bg-white focus:outline-dashed focus:outline-2 focus:outline-black w-full transition-all duration-150 focus:shadow-[0_0_0_4px_#4ade80]"
                  value={email}
                  onChange={e => setEmails(emails.map((em, idx) => idx === i ? e.target.value : em))}
                  style={{ marginBottom: 0 }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg opacity-60">
                  {i === 0 ? <UserIcon /> : <FriendIcon />}
                </span>
              </div>
            ))}
            <ParallaxText
              as="button"
              type="submit"
              className="border-2 border-black rounded-lg px-6 py-2 font-bold uppercase tracking-widest bg-[#f8f8f8] hover:bg-black hover:text-[#f8f8f8] transition-all duration-200 shadow-md active:scale-95 focus:ring-4 focus:ring-black/20 mt-2 retro-btn flex items-center justify-center gap-2"
              multX={0.5}
              multY={0.5}
              scale={0.5}
              rotate={0.2}
              disabled={progress < 5 || signupStatus === 'success'}
              style={{ cursor: progress < 5 ? 'not-allowed' : 'pointer', opacity: progress < 5 ? 0.5 : 1 }}
            >
              <FloppyIcon /> Sign Up
            </ParallaxText>
          </form>
          <ConfettiCheck show={signupStatus === 'success'} />
          {signupStatus && signupStatus !== 'success' && <div className="mt-4 text-red-600 font-mono">{signupStatus}</div>}
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="relative max-w-4xl mx-auto py-24 px-4 grid md:grid-cols-2 gap-12 items-center border-t border-black/10">
        <ParallaxText
          as="h2"
          className="text-2xl md:text-3xl font-bold uppercase mb-4 tracking-widest col-span-2"
          multX={0.6}
          multY={0.6}
          scale={0.4}
          rotate={0.3}
        >About</ParallaxText>
        <div>
          <p className="font-mono opacity-80">ChitChat is a playful homage to the early web, blending social media and voice with a retro-futuristic twist. Experience chat, posts, and audio in a bold, minimal interface.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="border-2 border-black rounded-lg p-4 flex items-center gap-4 bg-white">
            <span className="inline-block bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
              <UserIcon />
            </span>
            <span className="font-mono">Text Less, Talk More</span>
          </div>
          <div className="border-2 border-black rounded-lg p-4 flex items-center gap-4 bg-white">
            <span className="inline-block bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
              <ChatIcon />
            </span>
            <span className="font-mono">Summarize Your Voice</span>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="relative max-w-4xl mx-auto py-24 px-4 border-t border-black/10">
        <ParallaxText
          as="h2"
          className="text-2xl md:text-3xl font-bold uppercase mb-8 tracking-widest"
          multX={0.6}
          multY={0.6}
          scale={0.4}
          rotate={0.3}
        >Contact</ParallaxText>
        <form className="flex flex-col gap-4 max-w-md mx-auto">
          <input type="text" placeholder="Your Name" className="border-2 border-black rounded-lg px-4 py-2 font-mono bg-white focus:outline-dashed focus:outline-2 focus:outline-black" />
          <input type="email" placeholder="Your Email" className="border-2 border-black rounded-lg px-4 py-2 font-mono bg-white focus:outline-dashed focus:outline-2 focus:outline-black" />
          <textarea placeholder="Message" className="border-2 border-black rounded-lg px-4 py-2 font-mono bg-white focus:outline-dashed focus:outline-2 focus:outline-black" rows={4} />
          <button type="submit" className="border-2 border-black rounded-lg px-6 py-2 font-bold uppercase tracking-widest bg-[#f8f8f8] hover:bg-black hover:text-[#f8f8f8] transition-colors duration-200 shadow-md">Send</button>
        </form> 
      </section>
      {/* Footer */}
      <footer className="w-full text-center py-8 text-xs opacity-70 font-mono border-t border-black/10">© 2025 ChitChat</footer>
    </div>
  );
} 