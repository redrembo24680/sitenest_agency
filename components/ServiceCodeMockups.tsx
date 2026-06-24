import React from 'react';

export const FrontendVisual: React.FC = () => (
  <div className="service-code-mockup">
    <div className="code-header">
      <span className="code-dot red"></span>
      <span className="code-dot yellow"></span>
      <span className="code-dot green"></span>
    </div>
    <div className="code-line"><span className="code-keyword">import</span> React, &#123; useState, useEffect &#125; <span className="code-keyword">from</span> <span className="code-string">'react'</span>;</div>
    <div className="code-line"><span className="code-keyword">import</span> &#123; motion &#125; <span className="code-keyword">from</span> <span className="code-string">'framer-motion'</span>;</div>
    <div className="code-line">&nbsp;</div>
    <div className="code-line"><span className="code-keyword">const</span> <span className="code-property">SiteNestShowcase</span> = () =&gt; &#123;</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">const</span> [active, setActive] = <span className="code-property">useState</span>(<span className="code-keyword">true</span>);</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-comment">// Інноваційний інтерфейс з 60fps</span></div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-property">useEffect</span>(() =&gt; &#123;</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-property">console</span>.<span className="code-property">log</span>(<span className="code-string">"SiteNest UI: Active & Smooth"</span>);</div>
    <div className="code-line">&nbsp;&nbsp;&#125;, []);</div>
    <div className="code-line">&nbsp;</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">return</span> (</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-keyword">div</span> className=<span className="code-string">"glassmorphic-card glow"</span>&gt;</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-keyword">h1</span>&gt;Ми створюємо майбутнє веб-розробки&lt;/<span className="code-keyword">h1</span>&gt;</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-keyword">p</span>&gt;Швидкість, естетика та конверсія.&lt;/<span className="code-keyword">p</span>&gt;</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="code-keyword">div</span>&gt;</div>
    <div className="code-line">&nbsp;&nbsp;);</div>
    <div className="code-line">&#125;;</div>
  </div>
);

export const BackendVisual: React.FC = () => (
  <div className="service-code-mockup" style={{ color: '#6ee7b7' }}>
    <div className="code-header">
      <span className="code-dot red"></span>
      <span className="code-dot yellow"></span>
      <span className="code-dot green"></span>
    </div>
    <div className="code-line"><span className="code-keyword">const</span> express = <span className="code-property">require</span>(<span className="code-string">'express'</span>);</div>
    <div className="code-line"><span className="code-keyword">const</span> app = <span className="code-property">express</span>();</div>
    <div className="code-line"><span className="code-keyword">const</span> redis = <span className="code-property">require</span>(<span className="code-string">'redis'</span>);</div>
    <div className="code-line"><span className="code-keyword">const</span> client = redis.<span className="code-property">createClient</span>();</div>
    <div className="code-line">&nbsp;</div>
    <div className="code-line"><span className="code-comment">// Оптимізація запитів: Redis Cache Layer</span></div>
    <div className="code-line">app.<span className="code-property">get</span>(<span className="code-string">'/api/products'</span>, <span className="code-keyword">async</span> (req, res) =&gt; &#123;</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">const</span> cached = <span className="code-keyword">await</span> client.<span className="code-property">get</span>(<span className="code-string">'all_products'</span>);</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">if</span> (cached) &#123;</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> res.<span className="code-property">json</span>(JSON.<span className="code-property">parse</span>(cached));</div>
    <div className="code-line">&nbsp;&nbsp;&#125;</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">const</span> dbProducts = <span className="code-keyword">await</span> db.<span className="code-property">query</span>(<span className="code-string">'SELECT * FROM products'</span>);</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">await</span> client.<span className="code-property">setEx</span>(<span className="code-string">'all_products'</span>, 3600, JSON.<span className="code-property">stringify</span>(dbProducts));</div>
    <div className="code-line">&nbsp;&nbsp;res.<span className="code-property">json</span>(dbProducts);</div>
    <div className="code-line">&#125;);</div>
  </div>
);

export const DevopsVisual: React.FC = () => (
  <div className="service-code-mockup" style={{ color: '#93c5fd' }}>
    <div className="code-header">
      <span className="code-dot red"></span>
      <span className="code-dot yellow"></span>
      <span className="code-dot green"></span>
    </div>
    <div className="code-line"><span className="code-comment"># CI/CD GitHub Actions Workflow for SiteNest</span></div>
    <div className="code-line"><span className="code-keyword">name</span>: CI/CD Pipeline</div>
    <div className="code-line"><span className="code-keyword">on</span>: [push]</div>
    <div className="code-line">&nbsp;</div>
    <div className="code-line"><span className="code-keyword">jobs</span>:</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">build-and-deploy</span>:</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">runs-on</span>: ubuntu-latest</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">steps</span>:</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="code-keyword">uses</span>: actions/checkout@v4</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="code-keyword">name</span>: Run Linter & Tests</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">run</span>: npm ci && npm test</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="code-keyword">name</span>: Deploy to Kubernetes Cluster</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">run</span>: kubectl apply -f k8s/</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="code-keyword">name</span>: Purge CDN Cache</div>
    <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">run</span>: curl -X POST "https://api.cloudflare.com/..."</div>
  </div>
);

export const SmmVisual: React.FC = () => (
  <div className="service-code-mockup" style={{ color: '#fbcfe8' }}>
    <div className="code-header">
      <span className="code-dot red"></span>
      <span className="code-dot yellow"></span>
      <span className="code-dot green"></span>
    </div>
    <div className="code-line"><span className="code-comment">// Маркетингова стратегія SiteNest SMM</span></div>
    <div className="code-line"><span className="code-keyword">const</span> CampaignStats = &#123;</div>
    <div className="code-line">&nbsp;&nbsp;platform: <span className="code-string">"Instagram & TikTok"</span>,</div>
    <div className="code-line">&nbsp;&nbsp;audience: <span className="code-string">"E-commerce Business Owners"</span>,</div>
    <div className="code-line">&nbsp;&nbsp;monthlyCTR: <span className="code-string">"4.8%"</span>,</div>
    <div className="code-line">&nbsp;&nbsp;organicReachIncrease: <span className="code-string">"+120%"</span>,</div>
    <div className="code-line">&nbsp;&nbsp;leadGenerationCost: <span className="code-string">"-35%"</span></div>
    <div className="code-line">&#125;;</div>
    <div className="code-line">&nbsp;</div>
    <div className="code-line"><span className="code-keyword">function</span> <span className="code-property">optimizeTargetingAds</span>(budget) &#123;</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">const</span> lookalikeAudience = <span className="code-property">getMetaLookalike</span>();</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">const</span> A_B_Test = <span className="code-property">runCreativeVariations</span>();</div>
    <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-string">"Максимальний ROI досягнуто!"</span>;</div>
    <div className="code-line">&#125;</div>
  </div>
);
