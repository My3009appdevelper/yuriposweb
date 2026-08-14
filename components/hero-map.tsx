export function HeroMap() {
  return (
    <div className="hero-map-shell">
      <div className="hero-map-caption">
        <span className="hero-map-pulse" aria-hidden="true" />
        Un sistema conectado
      </div>
      <svg
        className="hero-map hero-map-desktop"
        viewBox="0 0 620 500"
        role="img"
        aria-labelledby="hero-map-title hero-map-description"
      >
        <title id="hero-map-title">Mapa operativo de Yuri POS</title>
        <desc id="hero-map-description">
          Venta, inventario, compras, caja y reportes conectados alrededor de la operación del negocio.
        </desc>
        <defs>
          <linearGradient id="map-glow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#00B1FF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#00B1FF" stopOpacity="0" />
          </linearGradient>
          <filter id="map-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="16" floodColor="#10212B" floodOpacity="0.14" stdDeviation="14" />
          </filter>
        </defs>
        <circle cx="320" cy="250" r="185" fill="url(#map-glow)" />
        <path className="hero-map-line" d="M174 145 C234 156 244 189 276 211" />
        <path className="hero-map-line" d="M448 143 C387 159 376 191 345 211" />
        <path className="hero-map-line" d="M160 370 C227 345 246 307 276 288" />
        <path className="hero-map-line" d="M455 363 C395 345 378 311 346 289" />
        <path className="hero-map-line hero-map-line-dashed" d="M308 205 C287 158 299 121 319 90" />
        <g filter="url(#map-shadow)">
          <rect className="hero-map-center" x="247" y="211" width="146" height="80" rx="20" />
          <text className="hero-map-center-label" x="320" y="244" textAnchor="middle">YURI POS</text>
          <text className="hero-map-center-subtitle" x="320" y="266" textAnchor="middle">operación en contexto</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="89" y="98" width="136" height="70" rx="17" />
          <circle cx="113" cy="123" r="12" />
          <text x="136" y="124">VENTA</text>
          <text className="hero-map-node-detail" x="136" y="145">caja y clientes</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="397" y="98" width="136" height="70" rx="17" />
          <circle cx="421" cy="123" r="12" />
          <text x="444" y="124">INVENTARIO</text>
          <text className="hero-map-node-detail" x="444" y="145">existencias y lotes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="79" y="334" width="148" height="70" rx="17" />
          <circle cx="103" cy="359" r="12" />
          <text x="126" y="360">COMPRAS</text>
          <text className="hero-map-node-detail" x="126" y="381">proveedores y órdenes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="393" y="329" width="148" height="70" rx="17" />
          <circle cx="417" cy="354" r="12" />
          <text x="440" y="355">REPORTES</text>
          <text className="hero-map-node-detail" x="440" y="376">KPIs y decisiones</text>
        </g>
        <g className="hero-map-node hero-map-node-red">
          <rect x="253" y="40" width="134" height="63" rx="17" />
          <circle cx="277" cy="63" r="11" />
          <text x="299" y="66">CAJA</text>
          <text className="hero-map-node-detail" x="299" y="84">turnos y cortes</text>
        </g>
      </svg>
      <svg
        className="hero-map hero-map-mobile"
        viewBox="0 0 360 540"
        role="img"
        aria-labelledby="hero-map-mobile-title hero-map-mobile-description"
      >
        <title id="hero-map-mobile-title">Mapa operativo de Yuri POS</title>
        <desc id="hero-map-mobile-description">
          Venta, inventario, compras, caja y reportes conectados alrededor de la operación del negocio.
        </desc>
        <defs>
          <linearGradient id="map-glow-mobile" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#00B1FF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#00B1FF" stopOpacity="0" />
          </linearGradient>
          <filter id="map-shadow-mobile" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" floodColor="#10212B" floodOpacity="0.14" stdDeviation="10" />
          </filter>
        </defs>
        <circle cx="180" cy="296" r="142" fill="url(#map-glow-mobile)" />
        <path className="hero-map-line hero-map-mobile-line" d="M92 145 C128 176 151 207 164 242" />
        <path className="hero-map-line hero-map-mobile-line" d="M268 145 C232 176 209 207 196 242" />
        <path className="hero-map-line hero-map-mobile-line" d="M92 414 C128 383 151 352 164 322" />
        <path className="hero-map-line hero-map-mobile-line" d="M268 414 C232 383 209 352 196 322" />
        <path className="hero-map-line hero-map-line-dashed hero-map-mobile-line" d="M180 230 C180 198 180 168 180 144" />
        <g filter="url(#map-shadow-mobile)">
          <rect className="hero-map-center" x="93" y="242" width="174" height="80" rx="20" />
          <text className="hero-map-center-label" x="180" y="276" textAnchor="middle">YURI POS</text>
          <text className="hero-map-center-subtitle" x="180" y="299" textAnchor="middle">operación en contexto</text>
        </g>
        <g className="hero-map-node hero-map-node-red">
          <rect x="101" y="50" width="158" height="70" rx="18" />
          <circle cx="126" cy="76" r="12" />
          <text x="149" y="79">CAJA</text>
          <text className="hero-map-node-detail" x="149" y="101">turnos y cortes</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="12" y="116" width="148" height="70" rx="18" />
          <circle cx="37" cy="142" r="12" />
          <text x="60" y="145">VENTA</text>
          <text className="hero-map-node-detail" x="60" y="167">caja y clientes</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="200" y="116" width="148" height="70" rx="18" />
          <circle cx="225" cy="142" r="12" />
          <text x="248" y="145">INVENTARIO</text>
          <text className="hero-map-node-detail" x="248" y="167">existencias y lotes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="12" y="388" width="148" height="70" rx="18" />
          <circle cx="37" cy="414" r="12" />
          <text x="60" y="417">COMPRAS</text>
          <text className="hero-map-node-detail" x="60" y="439">proveedores y órdenes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="200" y="388" width="148" height="70" rx="18" />
          <circle cx="225" cy="414" r="12" />
          <text x="248" y="417">REPORTES</text>
          <text className="hero-map-node-detail" x="248" y="439">KPIs y decisiones</text>
        </g>
      </svg>
    </div>
  );
}

