(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function et(n){const a=n.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!a)return null;const t={floatBuf:!!a.getExtension("EXT_color_buffer_float"),halfBuf:!!a.getExtension("EXT_color_buffer_half_float")};return a.ext=t,a.bezFloat=new URLSearchParams(location.search).has("rgba8"),a.domyslnyVAO=a.createVertexArray(),a.bindVertexArray(a.domyslnyVAO),a}function Ca(n,a,t,i){const e=n.createShader(a);if(n.shaderSource(e,t),n.compileShader(e),!n.getShaderParameter(e,n.COMPILE_STATUS)){const o=n.getShaderInfoLog(e),s=t.split(`
`).map((r,h)=>`${h+1}: ${r}`).join(`
`);throw console.error(s),new Error(`Shader "${i}" się nie skompilował: ${o}`)}return e}const X=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;class R{constructor(a,t,i,e="program"){this.gl=a,this.nazwa=e;const o=a.createProgram();if(a.attachShader(o,Ca(a,a.VERTEX_SHADER,t,e+".vs")),a.attachShader(o,Ca(a,a.FRAGMENT_SHADER,i,e+".fs")),a.linkProgram(o),!a.getProgramParameter(o,a.LINK_STATUS))throw new Error(`Program "${e}" się nie zlinkował: ${a.getProgramInfoLog(o)}`);this.p=o,this.u={};const s=a.getProgramParameter(o,a.ACTIVE_UNIFORMS);for(let r=0;r<s;r++){const h=a.getActiveUniform(o,r),u=h.name.replace(/\[0\]$/,"");this.u[u]=a.getUniformLocation(o,h.name)}}uzyj(){return this.gl.useProgram(this.p),this}f(a,t,i,e,o){const s=this.gl,r=this.u[a];return r==null?this:(o!==void 0?s.uniform4f(r,t,i,e,o):e!==void 0?s.uniform3f(r,t,i,e):i!==void 0?s.uniform2f(r,t,i):s.uniform1f(r,t),this)}i(a,t){const i=this.u[a];return i!=null&&this.gl.uniform1i(i,t),this}fv(a,t,i){const e=this.gl,o=this.u[a];return o==null?this:(t===1?e.uniform1fv(o,i):t===2?e.uniform2fv(o,i):t===3?e.uniform3fv(o,i):e.uniform4fv(o,i),this)}tex(a,t,i){const e=this.gl,o=this.u[a];return o==null?this:(e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,i),e.uniform1i(o,t),this)}}function da(n,a,t,i={}){const{wewn:e=n.RGBA8,format:o=n.RGBA,typ:s=n.UNSIGNED_BYTE,dane:r=null,filtr:h=n.LINEAR,zawijanieS:u=n.CLAMP_TO_EDGE,zawijanieT:l=n.CLAMP_TO_EDGE,mipmapy:c=!1}=i,f=n.createTexture();return n.bindTexture(n.TEXTURE_2D,f),n.texImage2D(n.TEXTURE_2D,0,e,a,t,0,o,s,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,c?n.LINEAR_MIPMAP_LINEAR:h),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,h),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,u),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,l),c&&n.generateMipmap(n.TEXTURE_2D),f}function it(n,a=!1){return n.ext.floatBuf&&!n.bezFloat?a?{wewn:n.RGBA16F,format:n.RGBA,typ:n.HALF_FLOAT}:{wewn:n.R11F_G11F_B10F,format:n.RGB,typ:n.HALF_FLOAT}:{wewn:n.RGBA8,format:n.RGBA,typ:n.UNSIGNED_BYTE}}class W{constructor(a,t,i,e,o={}){this.gl=a,this.formaty=Array.isArray(e)?e:[e],this.opcje=o,this.fbo=a.createFramebuffer(),this.tex=[],this.w=0,this.h=0,this.rozmiar(t,i)}rozmiar(a,t){if(a=Math.max(1,Math.round(a)),t=Math.max(1,Math.round(t)),a===this.w&&t===this.h)return;const i=this.gl;this.w=a,this.h=t;for(const o of this.tex)i.deleteTexture(o);this.tex=this.formaty.map(o=>da(i,a,t,{...o,...this.opcje})),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),this.tex.forEach((o,s)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+s,i.TEXTURE_2D,o,0)),i.drawBuffers(this.tex.map((o,s)=>i.COLOR_ATTACHMENT0+s));const e=i.checkFramebufferStatus(i.FRAMEBUFFER);if(e!==i.FRAMEBUFFER_COMPLETE)throw new Error("Niekompletny bufor ramki: 0x"+e.toString(16));i.bindFramebuffer(i.FRAMEBUFFER,null)}ustaw(){const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,this.fbo),a.viewport(0,0,this.w,this.h)}}function Ba(n,a,t){n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,a,t)}function U(n){n.drawArrays(n.TRIANGLES,0,3)}const aa=1/120;class ot{constructor({krok:a,rysuj:t}){this.krok=a,this.rysuj=t,this.zapas=0,this.ostatni=0,this.dziala=!1,this.pauza=!1,this.zamrozona=!1,this.fps=60,this.msKlatki=16.7,this._klatki=0,this._okno=0,this.historiaMs=[],this._tik=this._tik.bind(this)}start(){this.dziala||(this.dziala=!0,this.ostatni=performance.now(),requestAnimationFrame(this._tik))}stop(){this.dziala=!1}_tik(a){if(!this.dziala)return;const t=(a-this.ostatni)/1e3;this.ostatni=a;const i=Math.min(t,.1);if(!this.pauza){this.zapas+=i;let e=0;for(;this.zapas>=aa&&e<16;)this.krok(aa),this.zapas-=aa,e++;e===16&&(this.zapas=0)}if(this.zamrozona){requestAnimationFrame(this._tik);return}this.rysuj(this.zapas/aa,t),this._klatki++,this._okno+=t,this.historiaMs.push(t*1e3),this.historiaMs.length>240&&this.historiaMs.shift(),this._okno>=.5&&(this.fps=this._klatki/this._okno,this.msKlatki=1e3/this.fps,this._klatki=0,this._okno=0),requestAnimationFrame(this._tik)}przewin(a){const t=Math.round(a/aa);for(let i=0;i<t;i++)this.krok(aa)}}const Y=new URLSearchParams(location.search),ua=(n,a)=>{const t=parseFloat(Y.get(n));return Number.isFinite(t)?t:a},j={ziarno:Math.floor(ua("ziarno",1)),maZiarno:Y.has("ziarno"),kraina:Y.get("kraina"),x:Y.has("x")?ua("x",0):null,dy:ua("dy",0),dx:ua("dx",0),debug:Y.has("debug"),test:Y.has("test"),warstwa:Y.get("warstwa")||"wszystko",jakosc:Y.get("jakosc"),maska:Y.has("maska")};function ca(n,a){const t=new URL(location.href);a==null?t.searchParams.delete(n):t.searchParams.set(n,a),history.replaceState(null,"",t)}function Ua(n){return()=>{n|=0,n=n+1831565813|0;let a=Math.imul(n^n>>>15,1|n);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function ea(n,a=0,t=0){let i=Math.imul(n|0,668265261)^Math.imul(a|0,374761393)^Math.imul(t|0,2654435761)|0;return i^=i>>>15,i=Math.imul(i,2246822507),i^=i>>>13,i=Math.imul(i,3266489909),i^=i>>>16,(i>>>0)/4294967296}function ia(n,a=0,t=0){return Ua(ea(n,a,t)*4294967296|0)}const st=n=>n*n*(3-2*n);function rt(n,a=0){const t=Math.floor(n),i=n-t;return ea(t,a)+(ea(t+1,a)-ea(t,a))*st(i)}function C(n,a=0,t=4){let i=0,e=.5,o=0;for(let s=0;s<t;s++)i+=e*rt(n,a+s*17),o+=e,n*=2.03,e*=.5;return i/o}const nt=(n,a,t)=>Math.max(a,Math.min(t,n)),ha=(n,a,t)=>{const i=nt((t-n)/(a-n),0,1);return i*i*(3-2*i)};function ct(n,a,t){const i=new Float32Array(a*a);for(let s=0;s<i.length;s++)i[s]=ea(s,t,a);const e=new Float32Array(n*n),o=a/n;for(let s=0;s<n;s++){const r=s*o,h=Math.floor(r);let u=r-h;u=u*u*(3-2*u);const l=h%a*a,c=(h+1)%a*a;for(let f=0;f<n;f++){const m=f*o,p=Math.floor(m);let k=m-p;k=k*k*(3-2*k);const w=p%a,v=(p+1)%a,d=i[l+w],y=i[l+v],S=i[c+w],g=i[c+v];e[s*n+f]=d+(y-d)*k+(S+(g-S)*k-d-(y-d)*k)*u}}return e}function ya(n,a,t,i){const e=new Float32Array(n*n);let o=.5,s=0;for(let r=0;r<t;r++){const h=a<<r;if(h>n)break;const u=ct(n,h,i+r*101);for(let l=0;l<e.length;l++)e[l]+=u[l]*o;s+=o,o*=.5}for(let r=0;r<e.length;r++)e[r]/=s;return e}function lt(n,a=256){const t=ya(a,4,5,11),i=ya(a,4,5,57),e=ya(a,16,4,93),o=new Uint8Array(a*a*4);for(let s=0;s<a*a;s++)o[s*4]=t[s]*255,o[s*4+1]=i[s]*255,o[s*4+2]=e[s]*255,o[s*4+3]=ea(s,7)*255;return da(n,a,a,{dane:o,zawijanieS:n.REPEAT,zawijanieT:n.REPEAT,mipmapy:!0})}const T=`#version 300 es
precision highp float;
precision highp sampler2D;
`,za=`
uniform vec2 uCam;
uniform vec2 uPol;
uniform vec2 uRes;
uniform float uCzas;
uniform sampler2D uSzum;
vec2 swiatZUv(vec2 uv){ return uCam + (uv * 2.0 - 1.0) * uPol; }
float kleby(vec2 p){ return texture(uSzum, p).r; }
float kleby2(vec2 p){ return texture(uSzum, p).g; }
float faktura(vec2 p){ return texture(uSzum, p).b; }
`,ut=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = vec4(texture(uTex, vUv).rgb, 1.0); }`,ht=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb;
  o = vec4(s / 8.0, 1.0);
}`,ft=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv + uPx * vec2(-2, 0)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 2, 0)).rgb;
  s += texture(uTex, vUv + uPx * vec2(0, -2)).rgb;
  s += texture(uTex, vUv + uPx * vec2(0,  2)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb * 2.0;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb * 2.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb * 2.0;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb * 2.0;
  o = vec4(s / 12.0, 1.0);
}`,pt=T+`
in vec2 vUv; out vec4 o;
uniform sampler2D uSwiat, uGlow, uSzum;
uniform vec2 uRes; uniform float uCzas; uniform float uTryb; uniform float uZiarno;
vec3 ton(vec3 c){
  // Kompresja jasności liczona od najjaśniejszego kanału: proporcje kanałów (a więc barwa
  // i nasycenie) zostają, więc nic nie „wypala się” do bieli.
  float m = max(c.r, max(c.g, c.b));
  float k = (1.0 - exp(-m * 1.25)) / max(m, 1e-4);
  return c * k;
}
void main(){
  vec3 c = texture(uSwiat, vUv).rgb;
  vec3 g = texture(uGlow, vUv).rgb;
  // tam, gdzie pada barwne światło, blada mgła lekko ustępuje — tęcza zostaje nasycona także w jasnych krainach
  if (uTryb < 0.5) { float tm = min(max(g.r, max(g.g, g.b)) * 1.6, 1.0); c = c * (1.0 - 0.38 * tm) + g * 0.85; }
  else if (uTryb > 2.5) c = g;
  c = ton(max(c, 0.0));
  c = pow(c, vec3(0.92));
  vec2 v = vUv - 0.5;
  c *= 1.0 - 0.55 * dot(v, v);
  float z = texture(uSzum, gl_FragCoord.xy / 256.0 + fract(vec2(uCzas * 7.13, uCzas * 3.71))).a - 0.5;
  c += z * uZiarno * (0.6 + 0.4 * (1.0 - min(1.0, dot(c, vec3(0.5)))));
  o = vec4(c, 1.0);
}`,mt=T+za+`
in vec2 vUv; out vec4 o;
uniform vec3 uGora, uDol, uMgla, uMgla2;
uniform vec4 uNiebo;     // tarcza księżyca, czarne słońce z obręczą, zorza, gwiazdy
uniform vec2 uCialo;     // położenie ciała niebieskiego na ekranie
uniform float uPoswiata;
void main(){
  vec2 s = (vUv * 2.0 - 1.0) * vec2(uPol.x / uPol.y, 1.0);
  float hy = -0.22 - (uCam.y - 5.3) * 0.012;
  float t = s.y - hy;
  float k1 = kleby(vec2(s.x * 0.11 + uCam.x * 0.0012 + uCzas * 0.0012, s.y * 0.16));
  float k2 = kleby2(vec2(s.x * 0.3 + uCam.x * 0.003 - uCzas * 0.002, s.y * 0.4 + 0.3));
  float k3 = kleby2(vec2(s.x * 0.05 - uCam.x * 0.0008, s.y * 0.09 + uCzas * 0.0009));
  // trzy tony: świetlisty horyzont, pośredni ton „daleki”, głęboka ciemność u góry
  vec3 hor = mix(uMgla, uMgla2, 0.3) * 0.25;
  vec3 srodek = mix(uGora, uMgla2 * 0.085, 0.75);
  vec3 col = mix(hor, srodek, smoothstep(-0.12, 0.55, t + (k1 - 0.5) * 0.4));
  col = mix(col, uGora, smoothstep(0.35, 1.25, t + (k3 - 0.5) * 0.5));
  // ławice mgły: dwa pasma kłębów o różnej skali i paralaksie
  float lawica = smoothstep(0.42, 0.74, kleby(vec2(s.x * 0.06 + uCam.x * 0.0009 + uCzas * 0.0008, s.y * 0.22 + 0.1)));
  col += uMgla2 * 0.050 * lawica * smoothstep(1.3, 0.2, t) * smoothstep(-0.2, 0.3, t);
  float lawica2 = smoothstep(0.48, 0.8, kleby2(vec2(s.x * 0.13 + uCam.x * 0.002 - uCzas * 0.0015, s.y * 0.5)));
  col += uMgla * 0.045 * lawica2 * smoothstep(0.9, 0.0, t);
  col *= 0.8 + 0.4 * k1;
  // łuna: rozproszone światło gdzieś za horyzontem — podświetla sylwetki od tyłu
  vec2 dl = s - uCialo;
  float rl = length(dl * vec2(0.75, 1.0));
  col += mix(uMgla, vec3(1.0), 0.22) * uPoswiata * (0.15 * exp(-rl * 1.7) + 0.055 * exp(-rl * 0.65)) * (0.75 + 0.5 * k2);
  col *= mix(0.6, 1.0, smoothstep(-0.9, -0.1, t));

  vec2 d = s - uCialo; float r = length(d);
  // księżyc za mgłą: miękka tarcza z szeroką poświatą
  col += uNiebo.x * vec3(0.72, 0.85, 1.0) * (smoothstep(0.27, 0.19, r) * 0.20 * (0.7 + 0.6 * k2) + 0.15 * exp(-r * 2.1));
  // czarne słońce: ciemna tarcza i blada, nierówna obręcz
  float kat = atan(d.y, d.x);
  float kor = exp(-abs(r - 0.30) * 24.0) * (0.6 + 0.8 * kleby(vec2(kat * 0.22, uCzas * 0.008)));
  col = mix(col, col * 0.2, uNiebo.y * smoothstep(0.31, 0.27, r));
  col += uNiebo.y * vec3(0.95, 0.86, 1.0) * (kor * 0.55 + 0.11 * exp(-max(r - 0.3, 0.0) * 2.6));
  // zorza: pionowe zasłony światła
  float fa = kleby(vec2(s.x * 0.07 + uCam.x * 0.0015, uCzas * 0.004));
  float zas = kleby2(vec2(s.x * 0.9 + fa * 1.5, s.y * 0.05 + uCzas * 0.006));
  float pas = smoothstep(0.35, 0.7, fa) * smoothstep(-0.05, 0.25, t) * smoothstep(1.25, 0.3, t);
  vec3 zk = mix(vec3(0.95, 0.45, 0.85), vec3(0.45, 0.75, 1.0), smoothstep(0.1, 0.9, t + (zas - 0.5) * 0.6));
  col += uNiebo.z * zk * pas * (0.3 + 0.9 * zas) * 0.30;
  // gwiazdy
  vec2 g = s * 36.0 + vec2(uCam.x * 0.02, 0.0); vec2 gi = floor(g), gf = fract(g) - 0.5;
  float hs = fract(sin(dot(gi, vec2(127.1, 311.7))) * 43758.5);
  float gw = step(0.93, hs) * smoothstep(0.24, 0.0, length(gf - (vec2(fract(hs * 13.0), fract(hs * 29.0)) - 0.5) * 0.5))
    * (0.55 + 0.45 * sin(uCzas * (0.6 + hs * 2.0) + hs * 40.0));
  col += uNiebo.w * gw * 0.34 * smoothstep(0.0, 0.5, t) * (1.0 - k1 * 0.8);
  o = vec4(col, 1.0);
}`,Va=`
in vec2 vUv; out vec4 o;
uniform sampler2D uKafle, uKafle2, uSwiatlo;
uniform vec2 uCamL;
uniform float uLz;
uniform vec3 uKafelPar;      // 1/(4 × szerokość kafla), y0, 1/wysokość
uniform vec3 uMglaL, uMglaP; // barwa mgły na lewym i prawym brzegu ekranu
uniform vec3 uMgla2;          // drugi, „daleki” ton mgły
uniform vec4 uAtm;           // zamglenie, gęstość mgły, światło otoczenia, wpływ iskierki
uniform vec3 uIskra;         // x, y, zasięg światła
uniform vec3 uBarwaSw;       // barwa światła iskierki
uniform vec3 uEmis;
uniform vec4 uPogoda;        // wiatr, snopy światła, mglistość, —
uniform vec3 uSwNieba;       // kierunek do światła nieba (xy) i jego siła
uniform vec2 uGruntY;        // wysokość ziemi planu gry na lewym i prawym brzegu ekranu
float krag(vec2 pw, out vec2 Ld, out float R){
  vec2 L = uIskra.xy - pw; float dist = length(L);
  Ld = L / max(dist, 1e-3);
  float kat = atan(-L.y, -L.x);
  R = uIskra.z * (1.0 + 0.07 * sin(kat * 3.0 + uCzas * 0.5) + 0.05 * sin(kat * 5.0 - uCzas * 0.37) + 0.04 * sin(kat * 2.0 + uCzas * 0.23));
  float r = dist / R;
  return exp(-r * r);
}
`,kt=T+za+Va+`
uniform float uJasnosc;
void main(){
  vec2 pw = swiatZUv(vUv);
  vec2 pl = uCamL + (vUv * 2.0 - 1.0) * uPol * uLz;
  float wys = pl.y / uLz;                       // wysokość nad linią ziemi warstwy
  float kolys = 0.0;
  if (uPogoda.x > 0.01) kolys = (kleby(vec2(pl.x * 0.021 / uLz + uCzas * 0.035, pl.y * 0.03 / uLz)) - 0.5) * uPogoda.x * uLz * 0.12 * smoothstep(0.5, 7.0, wys);
  vec2 uvk = vec2((pl.x + kolys) * uKafelPar.x, (pl.y - uKafelPar.y) * uKafelPar.z);
  vec4 t = texture(uKafle, uvk), t2 = texture(uKafle2, uvk);
  float pok = t.a;
  vec3 mg = mix(uMglaL, uMglaP, vUv.x);
  vec2 n = pok > 0.02 ? (t2.rg / pok) * 2.0 - 1.0 : vec2(0.0);
  vec2 mm = texture(uSzum, pl * 0.045 / uLz + vec2(uCzas * 0.004, -uCzas * 0.002)).rg;
  float m1 = mm.r, m2 = mm.g;

  // światło nieba ślizga się po krawędziach sylwetek
  float rant = max(dot(n, uSwNieba.xy), 0.0) * uSwNieba.z;
  // mgła na głębokości tej warstwy: im dalej, tym jaśniejsza i bardziej w „dalekim” tonie
  float przyZiemi = exp(-max(wys, 0.0) / 2.4);
  vec3 barwaMgly = mix(mg, uMgla2, uAtm.x * 0.7) * uJasnosc * (0.72 + 0.56 * m1) * (1.0 + 0.5 * przyZiemi);
  vec3 c = t.rgb * mg * (uAtm.z * 0.05) + barwaMgly * pok * rant * 0.9;
  // zamglenie: im dalej i im bliżej ziemi, tym bardziej sylwetka tonie we mgle
  float zam = clamp(uAtm.x * (1.0 + 0.3 * przyZiemi), 0.0, 0.97);
  c = mix(c, barwaMgly * pok, zam);
  // świecenie własne (kryształy)
  c += (t.rgb / max(pok, 0.02)) * uEmis * t2.b * (1.0 - zam * 0.6) * (0.85 + 0.15 * sin(uCzas * 0.6 + pl.x * 0.3 / uLz));
  // światło iskierki i tęcz
  float blask = 0.0; vec3 tecza = vec3(0.0);
  if (uAtm.w > 0.001) {
    vec2 Ld; float R; blask = krag(pw, Ld, R);
    tecza = texture(uSwiatlo, vUv).rgb;
    c += t.rgb * (uBarwaSw * blask * 1.5 + tecza * 1.6) * uAtm.w * (0.75 + 1.3 * max(dot(n, Ld), 0.0));
  }
  // płachta mgły przed poprzednią warstwą, a za tą; snopy światła z góry
  float gest = clamp(uAtm.y * uPogoda.z * (0.12 + 0.88 * przyZiemi) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = barwaMgly * 1.1 + (mg * blask * 0.20 + tecza * (0.25 + 0.5 * m1)) * uAtm.w;
  vec3 dodane = vec3(0.0);
  if (uPogoda.y > 0.01) {
    float sn = kleby(vec2((pl.x + pl.y * 0.38) * 0.045 / uLz + uCzas * 0.0015, 0.37 + uLz * 0.3));
    dodane = mix(mg, vec3(1.0), 0.25) * smoothstep(0.50, 0.72, sn) * smoothstep(-1.5, 6.0, wys) * uPogoda.y * uJasnosc * 0.55 * (0.5 + m2);
  }
  o = vec4(mglaC * gest * (1.0 - pok) + dodane * (1.0 - pok * 0.7) + c, 1.0 - (1.0 - gest) * (1.0 - pok));
}`,dt=T+za+`
in vec2 vUv; out vec4 o;
uniform sampler2D uKafle, uSwiatlo;
uniform vec2 uCamL; uniform float uLz; uniform vec3 uKafelPar, uMglaL, uMglaP, uIskra;
void main(){
  vec2 pl = uCamL + (vUv * 2.0 - 1.0) * uPol * uLz;
  float pok = texture(uKafle, vec2(pl.x * uKafelPar.x, (pl.y - uKafelPar.y) * uKafelPar.z)).a;
  if (pok < 0.004) discard;
  vec2 L = uIskra.xy - swiatZUv(vUv); float r = length(L) / uIskra.z;
  float kraw = pok * (1.0 - pok) * 4.0;
  vec3 c = mix(uMglaL, uMglaP, vUv.x) * kraw * (exp(-r * r) * 0.20 + 0.012);
  if (kraw > 0.02) c += texture(uSwiatlo, vUv).rgb * kraw * 0.4;
  o = vec4(c, pok);
}`,zt=T+za+Va+`
uniform sampler2D uTlo;    // niebo i cztery dalsze plany — tło kadru i zarazem to, co odbija woda
uniform vec3 uWoda;          // poziom, obecność na lewym i prawym brzegu ekranu
void main(){
  vec2 pw = swiatZUv(vUv);
  vec2 uvk = vec2(pw.x * uKafelPar.x, (pw.y - uKafelPar.y) * uKafelPar.z);
  vec4 t = texture(uKafle, uvk), t2 = texture(uKafle2, uvk);
  float pok = t.a;
  vec3 mg = mix(uMglaL, uMglaP, vUv.x);
  vec2 Ld; float R; float blask = krag(pw, Ld, R);
  vec3 tecza = texture(uSwiatlo, vUv).rgb;
  vec2 n = pok > 0.02 ? (t2.rg / pok) * 2.0 - 1.0 : vec2(0.0);
  float nz = sqrt(max(1.0 - dot(n, n), 0.0));
  float lam = max(dot(vec3(n, nz), normalize(vec3(Ld, 0.6))), 0.0);
  float rant = pow(max(dot(n, Ld), 0.0), 2.0);
  vec3 c = t.rgb * uBarwaSw * blask * (0.30 + 1.5 * lam + 1.0 * rant);
  c += t.rgb * tecza * (0.9 + 1.2 * lam);
  c += t.rgb * mg * uAtm.z * 0.1;
  c += (t.rgb / max(pok, 0.02)) * uEmis * t2.b * (0.7 + 0.3 * sin(uCzas * 0.7 + pw.x * 0.6));

  float grunt = mix(uGruntY.x, uGruntY.y, vUv.x);
  float wys = pw.y - grunt;
  vec2 mm = texture(uSzum, pw * 0.06 + vec2(uCzas * 0.006, -uCzas * 0.003)).rg;
  float m1 = mm.r, m2 = mm.g;
  float gest = clamp(uAtm.y * uPogoda.z * (0.10 + 0.9 * exp(-max(wys, 0.0) / 2.4)) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = mg * (0.05 + 0.03 * m2) + mg * blask * (0.30 + 0.5 * m1) + tecza * (0.3 + 0.6 * m1);
  // samo powietrze też lekko świeci wokół iskierki
  vec3 powietrze = mg * blask * 0.085 * (0.5 + m1) + tecza * (0.34 + 0.26 * m1);
  float tm = min(max(tecza.r, max(tecza.g, tecza.b)) * 1.5, 1.0);
  vec3 wy = mglaC * gest * (1.0 - pok) * (1.0 - 0.3 * tm) + powietrze * (1.0 - pok) + c;
  float alfa = 1.0 - (1.0 - gest) * (1.0 - pok);

  // woda mokradeł: lustro dalszych planów, iskierki i tęcz, z drobną falą
  float poziom = uWoda.x - (1.0 - mix(uWoda.y, uWoda.z, vUv.x)) * 4.0;
  if (pw.y < poziom) {
    float gl = poziom - pw.y;
    float fala = kleby(vec2(pw.x * 0.33 + uCzas * 0.05, gl * 1.3 - uCzas * 0.03)) - 0.5;
    vec2 uvO = vec2(vUv.x + fala * 0.014 * (1.0 + gl), ((2.0 * poziom - pw.y) - uCam.y) / uPol.y * 0.5 + 0.5 + fala * 0.03);
    vec3 odb = texture(uTlo, uvO).rgb * 0.8;
    vec2 Lm = vec2(uIskra.x, 2.0 * poziom - uIskra.y) - pw; Lm.x += fala * 0.7;
    float dm = length(Lm * vec2(1.0, 0.5));
    odb += uBarwaSw * 0.42 * exp(-dm * dm / (R * R * 0.45));
    odb += texture(uSwiatlo, uvO).rgb * 0.8;
    float tafla = smoothstep(0.07, 0.0, gl);
    vec3 woda = odb * (0.9 - 0.25 * smoothstep(0.0, 2.0, gl)) + mg * tafla * (0.05 + 0.22 * blask);
    wy = mix(woda, woda * 0.45 + c * 0.4, pok);
    alfa = 1.0;
  }
  o = vec4(texture(uTlo, vUv).rgb * (1.0 - alfa) + wy, 1.0);
}`,$a=6,wt=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, grubość, faza, rodzaj (0 trawa, 1 liana, 2 trzcina)
layout(location = 2) in vec4 aKol;     // barwa, podatność na wiatr
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
out vec2 vSw; out float vV; out vec3 vKol; out float vT;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${$a});
  float wisi = aPar.w > 0.5 && aPar.w < 1.5 ? -1.0 : 1.0;
  float wiatr = (sin(uCzas * 1.3 + aPar.z + aBaza.x * 0.4) * 0.22 + sin(uCzas * 0.47 + aBaza.x * 0.13) * 0.34 + 0.12) * aKol.a;
  // źdźbła odchylają się od przelatującej iskierki
  vec2 sr = aBaza + vec2(0.0, wisi * aPar.x * 0.6);
  vec2 od = sr - uIskra.xy;
  float pchniecie = sign(od.x) * exp(-dot(od, od) / 0.9) * 0.9;
  float kat = (aPar.z - 3.14) * 0.09 + wiatr + pchniecie;
  float a = kat * t;
  vec2 kier = vec2(sin(a), wisi * cos(a));
  vec2 p = aBaza + kier * aPar.x * t;
  float gr = aPar.y * (1.0 - 0.8 * t);
  if (aPar.w > 1.5) gr += aPar.y * 2.2 * smoothstep(0.62, 0.74, t) * smoothstep(0.98, 0.88, t);   // pałka trzciny
  p += vec2(kier.y, -kier.x) * bok * gr;
  vSw = p; vV = bok; vKol = aKol.rgb; vT = t;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,yt=T+`
in vec2 vSw; in float vV; in vec3 vKol; in float vT; out vec4 o;
uniform vec3 uIskra, uBarwaSw; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  float a = smoothstep(1.0, 0.25, abs(vV)) * smoothstep(1.02, 0.9, vT);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = vKol * (uBarwaSw * blask * (0.5 + 0.6 * vT) + tecza * 1.3 + 0.004);
  o = vec4(c * a, a);
}`,vt=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas;
uniform float uWL[5]; uniform float uWP[5];
uniform float uWoda;
out float vAlfa; out float vKlasa; out vec2 vSw; out float vMig;
float hsz(float n){ return fract(sin(n * 91.345 + 7.1) * 47453.5453); }
void main(){
  float id = float(gl_VertexID);
  int klasa = gl_VertexID % 5;
  float h = hsz(id), h2 = hsz(id + 17.3), h3 = hsz(id + 41.7), h4 = hsz(id + 77.7);
  float glab = mix(0.6, 1.45, h3);
  vec2 pudlo = uPol * 2.0 + vec2(5.0, 4.0);
  vec2 v; float rozm; float alfa = 1.0; vec2 dryf = vec2(0.0);
  float t = uCzas;
  if (klasa == 0) { v = vec2(0.10, -0.20); rozm = 2.4; dryf = vec2(sin(t * 0.6 + h * 40.0) * 0.25, cos(t * 0.45 + h2 * 30.0) * 0.1); }
  else if (klasa == 1) { v = vec2(0.22, 0.015); rozm = 46.0; alfa = 0.085; }
  else if (klasa == 2) { v = vec2(0.02, 0.16); rozm = 2.6; dryf = vec2(sin(t * 0.4 + h * 40.0) * 0.15, 0.0); }
  else if (klasa == 3) { v = vec2(0.05, -0.085); rozm = 2.0; dryf = vec2(sin(t * 0.5 + h * 40.0) * 0.12, 0.0); }
  else { v = vec2(-2.3, -0.22); rozm = 2.2; dryf = vec2(0.0, sin(t * 1.1 + h * 40.0) * 0.2); }
  vec2 baza = vec2(h, h2) * pudlo + v * t + dryf - uCam * glab;
  vec2 od = mod(baza, pudlo) - pudlo * 0.5;
  vec2 p = uCam + od;
  if (klasa == 1) p.y = uWoda + 0.15 + h2 * h2 * 2.6 + sin(t * 0.2 + h * 9.0) * 0.2;
  float ex = clamp((od.x / uPol.x) * 0.5 + 0.5, 0.0, 1.0);
  float waga = mix(uWL[klasa], uWP[klasa], ex);
  // miękkie znikanie przy krawędziach pudła, żeby nic nie „wskakiwało”
  vec2 kraw = smoothstep(pudlo * 0.5, pudlo * 0.5 - 1.2, abs(od));
  vAlfa = alfa * waga * kraw.x * (klasa == 1 ? 1.0 : kraw.y) * (0.45 + 0.55 * h4);
  vKlasa = float(klasa); vSw = p;
  vMig = klasa == 2 ? pow(0.5 + 0.5 * sin(t * (1.2 + h4 * 2.0) + h * 60.0), 6.0) : 0.0;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
  gl_PointSize = max(1.5, rozm * uRes.y / 720.0 / mix(1.25, 0.8, h3));
}`,xt=T+`
in float vAlfa; in float vKlasa; in vec2 vSw; in float vMig; out vec4 o;
uniform vec3 uIskra, uBarwaSw, uMgla, uEmis; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(q, q);
  float plama = exp(-r2 * 3.2) * smoothstep(1.0, 0.6, r2);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = uMgla * 0.10 + uBarwaSw * blask * 0.9 + tecza * 1.4;
  if (vKlasa > 1.5 && vKlasa < 2.5) c += uEmis * (0.12 + 1.1 * vMig);
  if (vKlasa > 0.5 && vKlasa < 1.5) c = uMgla * (0.16 + 0.5 * blask) + tecza * 0.6;
  o = vec4(c * plama * vAlfa, 0.0);
}`,fa=20,Pa=.17,O=96,gt=.42,va=1.55,xa=.75,bt=1.25,St={ciagWskaznik:5.6,ciagKlawisze:5.6,oporCiag:1.55,oporSwobodny:.8,maksPredkosc:3.7,kolysanie:.16,drgniecieCo:[4.5,9],drgniecieSila:[.06,.14]};class Mt{constructor(a=1){this.x=8,this.y=6,this.vx=0,this.vy=0,this.zasiegBazowy=1.15,this.zasieg=this.zasiegBazowy,this.energia=0,this.tempo=xa,this.dx=0,this.dy=0,this.dvx=0,this.dvy=0,this.puls=0,this.pulsV=0,this.t=0,this.los=Ua(a*7919+13),this.doDrgniecia=3,this.hx=new Float32Array(O),this.hy=new Float32Array(O),this.hi=0,this.hn=0,this.smuga=new Float32Array(fa*2),this.dlSmugi=0,this.pudlo=[0,0,0,0],this.resetSmugi()}resetSmugi(){this.hn=0,this.hi=0;for(let a=0;a<fa;a++)this.smuga[a*2]=this.x,this.smuga[a*2+1]=this.y}przenies(a,t){this.x=a,this.y=t,this.vx=0,this.vy=0,this.dx=this.dy=this.dvx=this.dvy=0,this.resetSmugi()}tracnij(a){this.pulsV+=a}krok(a,t,i){this.t+=a;const e=St;this.tempo+=(xa+(bt-xa)*this.energia-this.tempo)*Math.min(1,a*1.5);const o=this.tempo;let s=t.os[0]*e.ciagKlawisze*o,r=t.os[1]*e.ciagKlawisze*o,h=s!==0||r!==0;if(t.cel){const d=t.cel[0]-this.x,y=t.cel[1]-this.y,S=Math.hypot(d,y);if(S>.12){const g=Math.min(1,S/1.8)*e.ciagWskaznik*o;s+=d/S*g,r+=y/S*g}h=!0}const u=this.t;if(s+=e.kolysanie*(Math.sin(u*.83)+.6*Math.sin(u*1.91+1.7)+.35*Math.sin(u*3.3+.4)),r+=e.kolysanie*(Math.cos(u*.71+.6)+.6*Math.sin(u*2.17+2.2)+.35*Math.cos(u*2.9+1.1)),this.doDrgniecia-=a,this.doDrgniecia<=0){this.doDrgniecia=e.drgniecieCo[0]+this.los()*(e.drgniecieCo[1]-e.drgniecieCo[0]);const d=this.los()*Math.PI*2,y=e.drgniecieSila[0]+this.los()*(e.drgniecieSila[1]-e.drgniecieSila[0]);this.vx+=Math.cos(d)*y,this.vy+=Math.sin(d)*y,this.pulsV+=1.2}const l=i.odpychanie(this.x,this.y,Pa);s+=l[0],r+=l[1],this.vx+=s*a,this.vy+=r*a;const c=Math.exp(-a*(h?e.oporCiag:e.oporSwobodny));this.vx*=c,this.vy*=c;const f=Math.hypot(this.vx,this.vy),m=e.maksPredkosc*o;f>m&&(this.vx*=m/f,this.vy*=m/f),this.x+=this.vx*a,this.y+=this.vy*a;const p=i.zderzenie(this.x,this.y,Pa*.8);if(p){this.x+=p.nx*p.gl,this.y+=p.ny*p.gl;const d=this.vx*p.nx+this.vy*p.ny;d<0&&(this.vx-=1.25*d*p.nx,this.vy-=1.25*d*p.ny,this.pulsV+=Math.min(6,-d*3))}const k=this.vx*.085,w=this.vy*.085;this.dvx+=((k-this.dx)*46-this.dvx*6.2)*a,this.dvy+=((w-this.dy)*46-this.dvy*6.2)*a,this.dx+=this.dvx*a,this.dy+=this.dvy*a,this.pulsV+=(-this.puls*90-this.pulsV*7)*a,this.puls+=this.pulsV*a,this.energia=Math.max(0,this.energia-a*.02);const v=this.zasiegBazowy+this.energia*4.7;this.zasieg+=(v-this.zasieg)*Math.min(1,a*1.4),this.hi=(this.hi+1)%O,this.hx[this.hi]=this.x,this.hy[this.hi]=this.y,this.hn<O&&this.hn++}zbudujSmuge(a){const t=fa,i=this.smuga,e=Math.min(this.hn,Math.round(gt/a));let o=0,s=this.x,r=this.y;const h=this._odc||(this._odc=new Float32Array(O));let u=0;for(let d=0;d<e;d++){const y=(this.hi-d+O)%O,S=Math.hypot(this.hx[y]-s,this.hy[y]-r);if(o+S>va){h[u++]=va-o,o=va;break}h[u++]=S,o+=S,s=this.hx[y],r=this.hy[y]}this.dlSmugi=o;let l=this.x,c=this.x,f=this.y,m=this.y,p=0,k=0,w=this.x,v=this.y;for(let d=0;d<t;d++){const y=o*d/(t-1);for(;p<u-1&&k+h[p]<y;){k+=h[p];const M=(this.hi-p+O)%O;w=this.hx[M],v=this.hy[M],p++}let S=w,g=v;if(u>0){const M=(this.hi-p+O)%O,z=this.hx[M],K=this.hy[M],x=Math.hypot(z-w,K-v),b=x>1e-6?Math.min(1,(y-k)/x):0;S=w+(z-w)*b,g=v+(K-v)*b}i[d*2]=S,i[d*2+1]=g}for(let d=1;d<t;d++){const y=d/(t-1),S=i[d*2]-i[d*2-2],g=i[d*2+1]-i[d*2-1],M=Math.hypot(S,g);if(M<1e-5)continue;const z=.03*y*y*Math.sin(y*o*5-this.t*6)*Math.min(1,o/.6);i[d*2]+=-g/M*z,i[d*2+1]+=S/M*z}for(let d=0;d<t;d++){const y=i[d*2],S=i[d*2+1];y<l&&(l=y),y>c&&(c=y),S<f&&(f=S),S>m&&(m=S)}this.pudlo[0]=l,this.pudlo[1]=f,this.pudlo[2]=c,this.pudlo[3]=m}}const _t=`#version 300 es
uniform vec2 uCam, uPol; uniform vec4 uPudlo;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  vP = mix(uPudlo.xy, uPudlo.zw, r);
  gl_Position = vec4((vP - uCam) / uPol, 0.0, 1.0);
}`,Pt=T+`
#define N ${fa}
in vec2 vP; out vec4 o;
uniform vec2 uSm[N];
uniform vec2 uGlowa, uDef;
uniform float uR, uCzas, uPuls, uMaska, uDl;
uniform vec3 uBarwa;

float smin(float a, float b, float k){ float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }

void main(){
  vec2 p = vP - uGlowa;
  // --- kropla: rozciągnięta w kierunku ruchu (z zachowaniem pola), brzeg delikatnie faluje
  float dl = length(uDef);
  vec2 kier = dl > 1e-4 ? uDef / dl : vec2(1.0, 0.0);
  float st = 1.0 + dl * 1.7 + uPuls * 0.5;
  vec2 q = vec2(dot(p, kier) / st, dot(p, vec2(-kier.y, kier.x)) * sqrt(st));
  float an = atan(q.y, q.x);
  float fal = 1.0 + 0.05 * sin(3.0 * an + uCzas * 3.1) + 0.025 * sin(5.0 * an - uCzas * 2.3) + 0.045 * sin(2.0 * an + uCzas * 1.7);
  float dK = (length(q) - uR * fal) * min(st, 1.0 / sqrt(st));

  // --- smuga: odległość od ciągłej łamanej o zwężającej się grubości
  // krótka smuga (wolny lot) chowa się w kropli: jej grubość płynnie maleje do zera
  float obecna = smoothstep(0.02, 0.3, uDl);
  float dS = 1e3, sS = 0.0;
  for (int i = 0; i < N - 1; i++) {
    vec2 a = uSm[i] - uGlowa, b = uSm[i + 1] - uGlowa;
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
    float s = (float(i) + h) / float(N - 1);
    float r = uR * 0.8 * (0.12 + 0.88 * pow(1.0 - s, 1.35)) * obecna;
    float d = length(pa - ba * h) - r;
    if (d < dS) { dS = d; sS = s; }
  }
  float zanik = mix(1.0, pow(1.0 - sS, 1.15), obecna);

  float k = 0.11;
  float d = smin(dK, dS, k);
  float wK = clamp(0.5 + 0.5 * (dS - dK) / k, 0.0, 1.0);   // 1 = jesteśmy w kropli, 0 = w smudze
  float jasn = mix(zanik, 1.0, wK);

  float miekko = 0.028;
  float cialo = smoothstep(miekko, -miekko, d) * jasn;
  if (uMaska > 0.5) { o = vec4(vec3(step(0.35, cialo)), 1.0); return; }

  // wnętrze: blady, świetlisty rdzeń przesunięty lekko ku przodowi, ku brzegom barwa krainy
  float glab = clamp(-d / uR, 0.0, 1.0);
  float srodek = exp(-dot(q - vec2(uR * 0.18, 0.0), q - vec2(uR * 0.18, 0.0)) / (uR * uR * 0.55));
  vec3 brzeg = uBarwa * 0.85 + 0.06;
  vec3 rdzen = vec3(0.93, 1.0, 0.97);
  float bialosc = max(smoothstep(0.05, 0.8, glab) * mix(0.5, 0.85, wK), srodek * wK);
  vec3 kol = mix(brzeg, rdzen, bialosc) * (0.9 + 0.5 * srodek * wK);
  float na = max(d, 0.0);
  float aura = (0.42 * exp(-na / 0.07) + 0.10 * exp(-na / 0.30)) * jasn * (1.0 - cialo);
  o = vec4(kol * cialo + uBarwa * aura, cialo * 0.92);
}`;class At{constructor(a){this.gl=a,this.p=new R(a,_t,Pt,"iskierka")}rysuj(a,t=!1){const i=this.gl,e=a.iskra,o=1.3;this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uPudlo",e.pudlo[0]-o,e.pudlo[1]-o,e.pudlo[2]+o,e.pudlo[3]+o).fv("uSm",2,e.smuga).f("uGlowa",e.x,e.y).f("uDef",e.dx,e.dy).f("uR",Pa).f("uCzas",a.czas).f("uPuls",e.puls).f("uMaska",t?1:0).f("uDl",e.dlSmugi).f("uBarwa",...a.mgla),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}const Lt=`#version 300 es
uniform vec4 uKafel;      // x0, y0, szerokość, wysokość kafla w jednostkach warstwy
uniform vec2 uPoz, uObsz; // środek i połowa rozmiaru malowanego prostokąta
uniform float uRot, uOdbij;
out vec2 vL; out vec2 vS;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vec2 lok = r * uObsz;
  float c = cos(uRot), s = sin(uRot);
  vS = uPoz + vec2(c * lok.x - s * lok.y, s * lok.x + c * lok.y);
  vL = vec2(lok.x * uOdbij, lok.y);
  gl_Position = vec4((vS - uKafel.xy) / uKafel.zw * 2.0 - 1.0, 0.0, 1.0);
}`,jt=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vL; in vec2 vS;
layout(location = 0) out vec4 o0;
layout(location = 1) out vec4 o1;
uniform sampler2D uSzum, uTeren;
uniform vec3 uTerenZakres;        // x pierwszej próbki, 1/odstęp, liczba próbek
uniform int uTyp;
uniform vec4 uPar;
uniform vec2 uRozm;
uniform float uZi, uSkala, uMiekko, uPxJ, uPostrzep;
uniform vec3 uKa, uKb, uKc;       // barwy rekwizytu
uniform vec3 uGruntL, uGruntP, uWierzchL, uWierzchP, uLiscL, uLiscP;   // barwy terenu na lewym i prawym brzegu kafla
uniform vec2 uKafelX;             // x0 i szerokość kafla (do mieszania barw terenu)

float D; vec3 ALB; float EM;

float h1(float n){ return fract(sin(n * 127.1 + uZi * 311.7) * 43758.5453); }
float nK(vec2 p){ return texture(uSzum, p).r; }
float nK2(vec2 p){ return texture(uSzum, p).g; }
float nF(vec2 p){ return texture(uSzum, p).b; }
float smin(float a, float b, float k){ float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float sdEl(vec2 p, vec2 r){ float k = length(p / r); return (k - 1.0) * min(r.x, r.y); }
float sdSegT(vec2 p, vec2 a, vec2 b, float ra, float rb){
  vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h) - mix(ra, rb, h);
}
mat2 obr(float a){ float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

// Malowana faktura: długie pociągnięcia pędzla wzdłuż kierunku + duże plamy drugiej barwy.
vec3 maluj(vec3 baza, vec3 akcent, vec2 p, vec2 kier, float ile){
  vec2 q = vec2(dot(p, kier), dot(p, vec2(-kier.y, kier.x))) / uSkala;
  float s1 = nF(q * vec2(0.035, 0.21) + uZi * 3.0);
  float s2 = nF(q * vec2(0.11, 0.55) + 0.37);
  float pl = nK(vS * 0.05 / uSkala + uZi * 0.7);
  vec3 c = mix(baza, akcent, smoothstep(0.38, 0.66, pl) * ile);
  return c * (0.58 + 0.62 * s1 + 0.3 * (s2 - 0.5));
}
// Mur: 0 na fugach, 1 w kamieniu; .y = losowy odcień kamienia.
vec2 mur(vec2 p, vec2 b){
  float rz = floor(p.y / b.y);
  vec2 q = vec2(p.x + mod(rz, 2.0) * b.x * 0.5 + h1(rz) * b.x, p.y) / b;
  vec2 f = abs(fract(q) - 0.5);
  float l = min((0.5 - f.x) * b.x, (0.5 - f.y) * b.y);
  return vec2(smoothstep(0.0, 0.04 * uSkala, l), h1(floor(q.x) * 7.3 + rz * 3.1));
}

vec4 terenW(float x){
  float f = (x - uTerenZakres.x) * uTerenZakres.y;
  float i = clamp(floor(f), 0.0, uTerenZakres.z - 2.0);
  float t = clamp(f - i, 0.0, 1.0);
  return mix(texelFetch(uTeren, ivec2(int(i), 0), 0), texelFetch(uTeren, ivec2(int(i) + 1, 0), 0), t);
}

// ---------- 0: teren (ziemia i korony drzew) ----------
void teren(){
  float tx = clamp((vS.x - uKafelX.x) / uKafelX.y, 0.0, 1.0);
  vec3 grunt = mix(uGruntL, uGruntP, tx), wierzch = mix(uWierzchL, uWierzchP, tx), lisc = mix(uLiscL, uLiscP, tx);
  vec4 t = terenW(vS.x);
  float e = 0.12 * uSkala;
  float nach = (terenW(vS.x + e).r - terenW(vS.x - e).r) / (2.0 * e);
  float d = (vS.y - t.r) / sqrt(1.0 + nach * nach);
  d += (nF(vS * 0.31 / uSkala) - 0.5) * 0.10 * uSkala;
  float gl = -d / uSkala;
  // skóra: mech, popiół albo bruk na wierzchu; pod spodem warstwy ziemi
  float skora = smoothstep(0.34, 0.02, gl + (nF(vS * 0.7 / uSkala) - 0.5) * 0.3);
  vec3 a = maluj(grunt, grunt * 1.35, vS, normalize(vec2(1.0, 0.12)), 1.0);
  a *= 0.8 + 0.3 * smoothstep(0.4, 0.6, nK(vec2(vS.x * 0.01, vS.y * 0.13) / uSkala));
  a = mix(a, wierzch * (0.66 + 0.6 * nF(vS * 1.1 / uSkala)), skora);
  // bruk ruin: płyty na wierzchu
  if (t.a > 0.01) {
    vec2 m = mur(vS + vec2(0.0, -t.r), vec2(0.9, 0.34) * uSkala);
    a = mix(a, a * (0.7 + 0.3 * m.x) * (0.85 + 0.3 * m.y), t.a * smoothstep(1.1, 0.15, gl));
  }
  D = d; ALB = a;
  EM = 0.0;
  // korony: nieregularny, liściasty sufit
  if (t.g < 900.0) {
    float dc = (t.g - vS.y) + (nK(vS * 0.085 / uSkala + uZi) - 0.5) * 2.4 * uSkala + (nF(vS * 0.45 / uSkala) - 0.5) * 0.55 * uSkala;
    if (dc < d) {
      D = dc; EM = 0.0;
      float kepki = smoothstep(0.35, 0.65, nF(vS * 0.42 / uSkala + 0.2));
      float glab = clamp(-dc / (2.5 * uSkala), 0.0, 1.0);
      ALB = mix(lisc * 0.9, lisc * 0.35, glab) * (0.55 + 0.6 * kepki) * (0.7 + 0.6 * nK2(vS * 0.12 / uSkala));
    }
  }
}

// ---------- 1: pień ----------
float wygiecie(float t){ return uPar.x * (sin(t * 3.1 + uZi * 6.0) * 0.7 + sin(t * 7.3 + uZi * 11.0) * 0.25); }
void pien(vec2 p, vec2 r){
  float t = (p.y + r.y) / (2.0 * r.y);
  float x = p.x - r.x * wygiecie(t);
  float wd = r.x * 0.5 * mix(1.0, uPar.w, t) + r.x * uPar.z * exp(-(p.y + r.y) / (r.x * 1.5));
  float d = max(abs(x) - wd, abs(p.y) - r.y);
  for (int i = 0; i < 3; i++) {
    if (float(i) >= uPar.y) break;
    float hh = h1(float(i) + 3.0), kier = h1(float(i) + 7.0) > 0.5 ? 1.0 : -1.0;
    float tb = mix(0.3, 0.9, hh);
    vec2 a = vec2(r.x * wygiecie(tb), (tb * 2.0 - 1.0) * r.y);
    vec2 b = a + vec2(kier * r.x * (2.4 + 2.0 * hh), r.x * (1.4 + hh * 2.2));
    d = min(d, sdSegT(p, a, b, r.x * 0.17, r.x * 0.045));
    vec2 c = mix(a, b, 0.55);
    d = min(d, sdSegT(p, c, c + vec2(kier * r.x * 0.9, r.x * 1.7), r.x * 0.075, r.x * 0.02));
  }
  D = d;
  ALB = maluj(uKa, uKb, vec2(x, p.y), vec2(0.0, 1.0), 0.9);
  ALB *= 0.62 + 0.5 * clamp(1.0 - abs(x) / max(wd, 1e-3), 0.0, 1.0);
  // głębokie bruzdy kory
  ALB *= 0.78 + 0.3 * smoothstep(0.3, 0.6, nF(vec2(x * 1.6, p.y * 0.12) / uSkala + uZi));
}

// ---------- 2: kłąb (listowie, krzew, głaz) ----------
void klab(vec2 p, vec2 r){
  float m = min(r.x, r.y), d = 1e3;
  for (int i = 0; i < 7; i++) {
    if (float(i) >= uPar.x) break;
    vec2 c = (vec2(h1(float(i) * 2.1 + 1.0), h1(float(i) * 3.7 + 2.0)) - 0.5) * 2.0 * (r - m * 0.55);
    d = smin(d, length(p - c) - m * (0.4 + 0.25 * h1(float(i) + 9.0)), m * uPar.w);
  }
  d += (nK(vS * 0.11 / uSkala + uZi) - 0.5) * uPar.y * m + (nF(vS * 0.5 / uSkala) - 0.5) * uPar.y * 0.3 * m;
  D = d;
  if (uPar.z > 0.5) {        // głaz: spękany kamień z mchem od góry
    ALB = maluj(uKa * 0.8, uKa * 1.15, p, normalize(vec2(1.0, 0.25)), 1.0);
    ALB *= 0.75 + 0.35 * smoothstep(0.44, 0.5, nK2(vS * 0.3 / uSkala + uZi));
    ALB = mix(ALB, uKb * (0.7 + 0.5 * nF(vS * 0.9 / uSkala)), smoothstep(0.1, 0.7, p.y / r.y + (nF(vS * 0.6 / uSkala) - 0.5)));
  } else {                   // listowie: kępki jaśniejszych liści na ciemnej masie
    float kepki = smoothstep(0.38, 0.62, nF(vS * 0.45 / uSkala + uZi));
    ALB = mix(uKb * 0.5, mix(uKb, uKc, 0.35), kepki) * (0.6 + 0.6 * nK2(vS * 0.13 / uSkala));
    ALB *= 0.7 + 0.4 * smoothstep(-0.6, 0.6, p.y / r.y);
  }
}

// ---------- 3: kolumna ----------
void kolumna(vec2 p, vec2 r){
  float t = (p.y + r.y) / (2.0 * r.y);
  float tr = r.x * 0.7 * (1.0 - 0.1 * t);
  float d = max(abs(p.x) - tr, abs(p.y) - r.y);
  d = min(d, sdBox(p - vec2(0.0, -r.y + r.x * 0.2), vec2(r.x * 1.0, r.x * 0.2)));
  d = min(d, sdBox(p - vec2(0.0, -r.y + r.x * 0.52), vec2(r.x * 0.84, r.x * 0.13)));
  if (uPar.y > 0.5 && uPar.x < 0.01) {
    d = min(d, sdBox(p - vec2(0.0, r.y - r.x * 0.18), vec2(r.x * 1.08, r.x * 0.18)));
    d = min(d, sdBox(p - vec2(0.0, r.y - r.x * 0.5), vec2(r.x * 0.88, r.x * 0.14)));
  }
  if (uPar.x > 0.01) {
    float ciecie = r.y - uPar.x * 2.0 * r.y + (nF(vec2(p.x * 0.8 / uSkala, uZi)) - 0.5) * r.x * 1.5 + p.x * (h1(5.0) - 0.5) * 1.2;
    d = max(d, p.y - ciecie);
  }
  D = d;
  float zlob = 0.5 + 0.5 * cos(p.x / tr * 3.14159 * uPar.z);
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.8) * (0.7 + 0.3 * zlob);
  float beben = abs(fract(p.y / (r.x * 2.4) + uZi) - 0.5);
  ALB *= 0.72 + 0.28 * smoothstep(0.0, 0.03, beben);
  ALB *= 0.7 + 0.42 * clamp(1.0 - abs(p.x) / tr, 0.0, 1.0);
}

// ---------- 4: łuk ----------
void luk(vec2 p, vec2 r){
  float filar = uPar.x * r.x * 2.0, wewn = r.x - filar, pieta = r.y - wewn - filar * 0.9;
  float otwor = p.y < pieta ? abs(p.x) - wewn : length(p - vec2(0.0, pieta)) - wewn;
  float d = max(sdBox(p, r), -otwor);
  d = min(d, sdBox(p - vec2(0.0, r.y), vec2(r.x * 1.06, filar * 0.22)));
  if (uPar.y > 0.01) {
    vec2 n = normalize(vec2(0.8, 0.6));
    float ciecie = dot(p - vec2(r.x * (1.0 - uPar.y * 1.6), r.y * 0.5), n) + (nF(p * 0.6 / uSkala + uZi) - 0.5) * r.x * 0.5;
    d = max(d, ciecie);
  }
  D = d;
  vec2 m = mur(p, vec2(filar * 0.95, filar * 0.45));
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.8) * (0.5 + 0.5 * m.x) * (0.8 + 0.35 * m.y);
}

// ---------- 5: blok / schody ----------
void blok(vec2 p, vec2 r){
  float zaokr = uPar.x * uSkala + 0.02 * uSkala, d;
  if (uPar.y > 0.5) {
    d = 1e3;
    for (int i = 0; i < 4; i++) {
      if (float(i) >= uPar.y) break;
      float k = float(i) / uPar.y;
      vec2 pol = vec2(r.x * (1.0 - k), r.y / uPar.y);
      d = min(d, sdBox(p - vec2(-r.x * k, -r.y + pol.y * (2.0 * float(i) + 1.0)), pol - zaokr) - zaokr);
    }
  } else d = sdBox(p, r - zaokr) - zaokr;
  d += (nF(vS * 0.4 / uSkala + uZi) - 0.5) * 0.06 * uSkala;
  D = d;
  ALB = maluj(uKa, uKb, p, normalize(vec2(1.0, 0.1)), 0.9);
  float peka = smoothstep(0.03, 0.0, abs(nK2(vS * 0.2 / uSkala + uZi) - 0.5));
  ALB *= 1.0 - 0.45 * peka;
  ALB *= 0.8 + 0.3 * smoothstep(-1.0, 1.0, p.y / r.y);
}

// ---------- 6: akwedukt ----------
void akwedukt(vec2 p, vec2 r){
  float n = max(uPar.x, 1.0), kom = 2.0 * r.x / n;
  float x = mod(p.x + r.x, kom) - kom * 0.5;
  float wewn = kom * 0.36, pomost = kom * 0.26, pieta = r.y - pomost - wewn;
  float otwor = p.y < pieta ? abs(x) - wewn : length(vec2(x, p.y - pieta)) - wewn;
  float d = max(sdBox(p, r), -otwor);
  if (uPar.z > 0.01) {
    float ciecie = p.x - r.x * (1.0 - uPar.z * 1.4) + (p.y + r.y) * 0.35 + (nF(p * 0.4 / uSkala + uZi) - 0.5) * kom * 0.8;
    d = max(d, ciecie);
  }
  D = d;
  vec2 m = mur(p, vec2(kom * 0.2, kom * 0.09));
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.8) * (0.55 + 0.45 * m.x) * (0.82 + 0.3 * m.y);
  ALB *= 0.75 + 0.3 * smoothstep(-1.0, 1.0, p.y / r.y);
}

// ---------- 7: posąg (zakapturzona postać) ----------
void posag(vec2 p, vec2 r){
  vec2 q = p / r.y;
  float szata = max(abs(q.x) - mix(0.40, 0.25, clamp((q.y + 1.0) / 1.3, 0.0, 1.0)), max(-1.0 - q.y, q.y - 0.32));
  float d = smin(szata, sdEl(q - vec2(0.0, 0.34), vec2(0.34, 0.2)), 0.1);
  if (uPar.x < 0.5) {
    d = smin(d, sdEl(q - vec2(0.03, 0.66), vec2(0.2, 0.24)), 0.07);     // kaptur
    d = smin(d, sdEl(q - vec2(0.12, 0.56), vec2(0.13, 0.15)), 0.05);    // pochylona twarz
  } else {
    d = max(d, q.y - 0.44 - (nF(q * 0.5 + uZi) - 0.5) * 0.25 - q.x * 0.3);  // utrącona głowa
  }
  d = smin(d, sdEl(q - vec2(0.17, 0.02), vec2(0.13, 0.26)), 0.08);      // złożone ręce
  d = min(d, sdBox(q - vec2(0.0, -0.97), vec2(0.56, 0.07)));
  D = d * r.y;
  float faldy = 0.5 + 0.5 * sin(q.x * 34.0 + nK(q * 0.2 + uZi) * 9.0 + q.y * 3.0);
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 1.0) * (0.66 + 0.34 * mix(1.0, faldy, smoothstep(0.3, 0.0, q.y)));
  float peka = smoothstep(0.02, 0.0, abs(nK2(q * 0.12 + uZi) - 0.5));
  ALB *= 1.0 - 0.4 * peka;
  ALB *= 0.7 + 0.4 * clamp(1.0 - abs(q.x) / 0.4, 0.0, 1.0);
}

// ---------- 8: kryształy (grono albo pojedynczy, także lewitujący) ----------
void krysztal(vec2 p, vec2 r){
  float d = 1e3; vec3 a = uKa; float em = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    if (fi >= uPar.x) break;
    float kat = i == 0 ? (h1(1.0) - 0.5) * 0.25 * uPar.y : (h1(fi) - 0.5) * 2.0 * uPar.y;
    float dl = 2.0 * r.y * (i == 0 ? 1.0 : 0.3 + 0.55 * h1(fi + 5.0));
    float sz = r.x * (i == 0 ? 0.5 : 0.26 + 0.24 * h1(fi + 8.0)) * (uPar.x < 1.5 ? 1.9 : 1.0);
    vec2 baza = vec2(i == 0 ? 0.0 : (h1(fi + 3.0) - 0.5) * r.x * 1.5, -r.y);
    vec2 q = obr(-kat) * (p - baza);
    float t = q.y / dl;
    float czub = 0.8 + 0.1 * h1(fi + 13.0);
    float skos = (h1(fi + 15.0) - 0.5) * 0.5;                     // czubek nie zawsze na osi
    float prof = uPar.z > 0.5
      ? sz * min(min(t / 0.34, 1.0), (1.0 - t) / 0.3)
      : sz * (t < czub ? mix(0.82, 1.0, t / czub) : (1.0 - t) / (1.0 - czub));
    float x = q.x - (uPar.z > 0.5 ? 0.0 : skos * sz * smoothstep(czub - 0.1, 1.0, t));
    float di = max(abs(x) - prof, max(-q.y, q.y - dl)) * 0.92;
    if (di < d) {
      d = di;
      float f = clamp(x / max(prof, 1e-3), -1.0, 1.0);
      // trzy ścianki o różnej jasności; granice ścianek lekko skośne
      float g = (f + 1.0) * 1.5 + (t - 0.5) * 0.25 * (h1(fi + 17.0) - 0.5);
      float gs = g - 0.5, s0 = floor(gs);
      float cA = 0.5 + 0.5 * fract(sin((clamp(s0, 0.0, 2.0) * 1.7 + fi * 3.0 + uZi * 17.0) * 91.7) * 437.5);
      float cB = 0.5 + 0.5 * fract(sin((clamp(s0 + 1.0, 0.0, 2.0) * 1.7 + fi * 3.0 + uZi * 17.0) * 91.7) * 437.5);
      float cien = mix(cA, cB, smoothstep(0.42, 0.58, fract(gs)));
      vec3 barwa = mix(mix(uKa, uKb, h1(fi + 11.0)), uKc, 0.35 * h1(fi + 19.0));
      a = barwa * cien * (0.7 + 0.45 * t);
      a *= 0.88 + 0.24 * nF(q * vec2(0.5, 0.06) / uSkala + fi);
      // światło uwięzione w środku: najmocniejsze u podstawy i w osi
      em = (0.3 + 0.7 * (1.0 - abs(f))) * (1.0 - 0.65 * t) * (0.7 + 0.3 * cien) * uPar.w;
    }
  }
  D = d; ALB = a; EM = em;
}

// ---------- 9: żebro ----------
void zebro(vec2 p, vec2 r){
  vec2 c = vec2(r.x, -r.y), R = 2.0 * r;
  vec2 q = (p - c) / R;
  float kat = atan(q.y, -q.x), maks = 1.5708 * uPar.y, u = clamp(kat / maks, 0.0, 1.0);
  float gr = r.x * uPar.x * (1.0 - 0.8 * u * u) * (1.0 + 0.5 * exp(-u * 9.0));
  float d = abs(length(q) - 1.0) * min(R.x, R.y) - gr;
  if (kat > maks) { vec2 kon = c + R * vec2(-cos(maks), sin(maks)); d = length(p - kon) - r.x * uPar.x * 0.2; }
  d = max(d, -(p.y + r.y) - 0.5 * uSkala);
  D = d;
  ALB = maluj(uKa, uKb, vec2(kat * R.y, (length(q) - 1.0) * R.x), vec2(1.0, 0.0), 0.9);
  ALB *= 0.8 + 0.3 * smoothstep(0.42, 0.6, nF(vS * 0.8 / uSkala + uZi));
  ALB = mix(ALB, uKc, 0.3 * smoothstep(0.5, 0.0, abs(length(q) - 1.0) * min(R.x, R.y) / max(gr, 1e-3)));
}

// ---------- 10: kręgi ----------
void kregi(vec2 p, vec2 r){
  float n = max(uPar.x, 1.0), kom = 2.0 * r.x / n;
  float nr = clamp(floor((p.x + r.x) / kom), 0.0, n - 1.0);
  p.y -= r.y * 0.5 * sin((nr + 0.5) / n * 3.14159) - r.y * 0.4;
  float x = p.x + r.x - (nr + 0.5) * kom;
  float mala = 0.75 + 0.25 * sin((nr + 0.5) / n * 3.14159);
  float d = sdBox(vec2(x, p.y + r.y * 0.45), vec2(kom * 0.33, r.y * 0.4) * mala - 0.05 * uSkala) - 0.07 * uSkala;
  d = min(d, sdSegT(vec2(x, p.y), vec2(0.0, -r.y * 0.2), vec2(kom * 0.3, r.y * 0.85 * mala), kom * 0.15, kom * 0.05));
  D = d;
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.9) * (0.8 + 0.3 * h1(nr + 2.0));
  ALB *= 0.8 + 0.3 * smoothstep(0.42, 0.6, nF(vS * 0.8 / uSkala + uZi));
}

// ---------- 11: czaszka olbrzyma ----------
void czaszka(vec2 p, vec2 r){
  vec2 q = p / r.y;
  float d = sdEl(q - vec2(-0.25, 0.2), vec2(0.95, 0.78));                      // mózgoczaszka
  d = smin(d, sdBox(q - vec2(0.55, -0.3), vec2(0.42, 0.36)) - 0.12, 0.35);      // szczęka górna
  d = smin(d, sdEl(q - vec2(0.42, 0.42), vec2(0.42, 0.22)), 0.2);               // łuk brwiowy
  float oko = sdEl(q - vec2(0.42, 0.02), vec2(0.27, 0.25));
  float nos = sdEl(obr(0.35) * (q - vec2(0.93, -0.22)), vec2(0.1, 0.2));
  float skron = sdEl(q - vec2(-0.1, -0.28), vec2(0.3, 0.16));
  d = max(d, -oko); d = max(d, -nos); d = max(d, -skron);
  float zeby = (abs(fract(q.x * 5.5) - 0.5) - 0.28) / 5.5;
  d = max(d, -max(zeby, q.y + 0.6));
  d = max(d, -(q.y + 0.86));
  D = d * r.y;
  ALB = maluj(uKa, uKb, p, normalize(vec2(1.0, 0.4)), 1.0);
  float szwy = smoothstep(0.014, 0.0, abs(nK2(q * 0.07 + uZi) - 0.5)) * smoothstep(0.0, 0.3, q.y);
  ALB *= 1.0 - 0.5 * szwy;
  ALB *= 0.62 + 0.5 * smoothstep(-0.8, 0.9, q.y);
  ALB *= 0.55 + 0.45 * smoothstep(0.0, 0.16, min(oko, min(nos, skron)));         // cień wokół otworów
}

// ---------- 12: martwe drzewo (z korzeniami-szczudłami) ----------
void drzewo(vec2 p, vec2 r){
  float gr = r.y * 0.085;
  vec2 a = vec2(0.0, -r.y), b = vec2(uPar.z * r.x * 0.5, -r.y * 0.1), c = vec2(uPar.z * r.x * 0.2 + (h1(1.0) - 0.5) * r.x * 0.5, r.y * 0.9);
  float d = min(sdSegT(p, a, b, gr * 1.25, gr * 0.8), sdSegT(p, b, c, gr * 0.8, gr * 0.12));
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    if (fi >= uPar.x) break;
    float t = 0.12 + 0.8 * (fi + h1(fi + 2.0) * 0.7) / uPar.x, kier = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
    vec2 s = mix(b, c, t);
    float dl = r.x * (0.95 - 0.55 * t) * (0.6 + 0.5 * h1(fi + 4.0));
    vec2 e1 = s + vec2(kier * dl * 0.6, dl * (0.1 + 0.4 * h1(fi + 6.0)));
    vec2 e2 = e1 + vec2(kier * dl * 0.5, dl * (0.45 + 0.4 * h1(fi + 8.0)));
    float g0 = gr * (0.5 - 0.3 * t);
    d = min(d, sdSegT(p, s, e1, g0, g0 * 0.6));
    d = min(d, sdSegT(p, e1, e2, g0 * 0.6, g0 * 0.1));
    d = min(d, sdSegT(p, e1, e1 + vec2(-kier * dl * 0.12, dl * 0.5), g0 * 0.4, g0 * 0.08));
  }
  if (uPar.y > 0.5) for (int i = 0; i < 4; i++) {      // korzenie-szczudła: łuki schodzące do wody
    float fi = float(i), kier = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
    float rozst = r.x * (0.16 + 0.11 * fi + 0.06 * h1(fi + 21.0));
    vec2 s = vec2(0.0, -r.y * (0.62 + 0.1 * h1(fi + 20.0)));
    vec2 e = vec2(kier * rozst, -r.y * 1.04);
    vec2 m = vec2(kier * rozst * 0.78, mix(s.y, e.y, 0.3));
    d = min(d, sdSegT(p, s, m, gr * 0.42, gr * 0.3));
    d = min(d, sdSegT(p, m, e, gr * 0.3, gr * 0.2));
  }
  D = d;
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.7);
  ALB *= 0.75 + 0.35 * smoothstep(0.35, 0.6, nF(vec2(p.x * 1.4, p.y * 0.1) / uSkala + uZi));
}

// ---------- 13: kępa trzcin ----------
void trzciny(vec2 p, vec2 r){
  float d = 1e3; float pal = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    if (fi >= uPar.x) break;
    float x0 = (h1(fi + 1.0) - 0.5) * r.x * 1.2, pochyl = (h1(fi + 3.0) - 0.5) * r.x * 1.3, dl = r.y * (1.1 + 0.9 * h1(fi + 5.0));
    vec2 a = vec2(x0, -r.y), m = vec2(x0 + pochyl * 0.35, -r.y + dl * 0.55), b = vec2(x0 + pochyl, -r.y + dl);
    float gr = r.y * 0.016;
    d = min(d, min(sdSegT(p, a, m, gr * 1.5, gr), sdSegT(p, m, b, gr, gr * 0.4)));
    if (h1(fi + 9.0) > 0.45) {
      vec2 k = mix(m, b, 0.8), kier = normalize(b - m);
      float dp = sdSegT(p, k - kier * r.y * 0.09, k + kier * r.y * 0.09, gr * 3.4, gr * 3.0);
      if (dp < d) { d = dp; pal = 1.0; }
    }
  }
  D = d;
  ALB = mix(uKb * (0.6 + 0.6 * nF(vS * 0.9 / uSkala)), uKa * 0.7, pal);
}

// ---------- 14: kość ----------
void kosc(vec2 p, vec2 r){
  float d = sdSegT(p, vec2(-r.x * 0.78, 0.0), vec2(r.x * 0.78, 0.0), r.y * 0.36, r.y * 0.3);
  for (int i = 0; i < 4; i++) {
    vec2 s = vec2(i < 2 ? -1.0 : 1.0, mod(float(i), 2.0) < 0.5 ? -1.0 : 1.0);
    d = smin(d, length(p - vec2(s.x * r.x * 0.84, s.y * r.y * 0.36)) - r.y * 0.5, r.y * 0.4);
  }
  D = d;
  ALB = maluj(uKa, uKb, p, vec2(1.0, 0.0), 0.9);
  ALB *= 0.78 + 0.3 * smoothstep(0.42, 0.6, nF(vS * 0.8 / uSkala + uZi));
  ALB *= 0.75 + 0.35 * smoothstep(-1.0, 1.0, p.y / r.y);
}

void main(){
  D = 1e3; ALB = vec3(0.5); EM = 0.0;
  vec2 p = vL, r = uRozm;
  if (uTyp == 0) teren();
  else if (uTyp == 1) pien(p, r);
  else if (uTyp == 2) klab(p, r);
  else if (uTyp == 3) kolumna(p, r);
  else if (uTyp == 4) luk(p, r);
  else if (uTyp == 5) blok(p, r);
  else if (uTyp == 6) akwedukt(p, r);
  else if (uTyp == 7) posag(p, r);
  else if (uTyp == 8) krysztal(p, r);
  else if (uTyp == 9) zebro(p, r);
  else if (uTyp == 10) kregi(p, r);
  else if (uTyp == 11) czaszka(p, r);
  else if (uTyp == 12) drzewo(p, r);
  else if (uTyp == 13) trzciny(p, r);
  else kosc(p, r);

  // nierówna, „malowana” krawędź zamiast wektorowej kreski
  float postrzep = (nF(vS * 0.8 / uSkala + 0.5) - 0.5) * uMiekko * 1.3 * uPostrzep;
  float pokrycie = smoothstep(uMiekko, -uMiekko, D + postrzep);
  if (pokrycie < 0.004) discard;
  vec2 g = vec2(dFdx(D), dFdy(D)) / uPxJ;
  float gl = length(g); g = gl > 1e-4 ? g / gl : vec2(0.0);
  float brzeg = exp(min(D, 0.0) / (0.2 * uSkala));
  float jasn = dot(ALB, vec3(0.333));
  vec2 wypukl = vec2(dFdx(jasn), dFdy(jasn)) / uPxJ * 0.16 * uSkala;
  vec2 n = clamp(g * brzeg * 0.92 - wypukl, -1.0, 1.0);
  ALB = clamp(ALB, 0.0, 1.0);
  o0 = vec4(ALB * pokrycie, pokrycie);
  o1 = vec4((n * 0.5 + 0.5) * pokrycie, clamp(EM, 0.0, 1.0) * pokrycie, pokrycie);
}`,B=[{id:"las",nazwa:"Las szeptów",mgla:[.4,.9,.74],mgla2:[.34,.72,.92],nieboGora:[.01,.022,.026],nieboDol:[.045,.125,.105],grunt:[.2,.22,.24],wierzch:[.3,.52,.4],a:[.42,.38,.44],b:[.36,.62,.5],c:[.62,.86,.72],emis:[.5,1,.8],teren:{baza:1.6,amp:1,drobne:.35,sufit:13.4},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:0,snopy:1,poswiata:.55},wiatr:.5,mglistosc:1},{id:"mokradla",nazwa:"Mgliste mokradła",mgla:[.44,.72,1],mgla2:[.62,.66,1],nieboGora:[.012,.02,.04],nieboDol:[.06,.11,.17],grunt:[.16,.19,.22],wierzch:[.3,.42,.4],a:[.34,.36,.42],b:[.42,.56,.58],c:[.66,.82,.9],emis:[.5,.8,1],teren:{baza:.85,amp:.75,drobne:.2,sufit:15.5},niebo:{tarcza:1,obrecz:0,zorza:0,gwiazdy:.25,snopy:0,poswiata:1},wiatr:.35,mglistosc:1.7},{id:"krysztaly",nazwa:"Kryształowe pole",mgla:[.74,.56,1],mgla2:[1,.52,.84],nieboGora:[.022,.012,.042],nieboDol:[.105,.06,.165],grunt:[.15,.13,.21],wierzch:[.36,.3,.52],a:[.56,.44,.86],b:[.9,.56,.84],c:[.8,.9,1],emis:[.85,.55,1],teren:{baza:1.5,amp:1.2,drobne:.7,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:1,gwiazdy:.8,snopy:0,poswiata:.7},wiatr:0,mglistosc:.7},{id:"ruiny",nazwa:"Kamienne ruiny",mgla:[.5,.86,.94],mgla2:[.6,.76,1],nieboGora:[.012,.022,.034],nieboDol:[.055,.115,.14],grunt:[.21,.23,.26],wierzch:[.4,.46,.5],a:[.5,.56,.62],b:[.4,.56,.56],c:[.74,.86,.9],emis:[.6,.9,1],teren:{baza:1.7,amp:.55,drobne:.15,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:.45,snopy:.75,poswiata:.75},wiatr:.2,mglistosc:.9},{id:"kosci",nazwa:"Cmentarzysko olbrzymów",mgla:[.8,.74,.96],mgla2:[1,.76,.86],nieboGora:[.02,.016,.034],nieboDol:[.12,.095,.15],grunt:[.24,.22,.28],wierzch:[.5,.46,.56],a:[.68,.64,.7],b:[.52,.48,.62],c:[.92,.88,.96],emis:[.9,.8,1],teren:{baza:1.5,amp:1.25,drobne:.12,sufit:15.5},niebo:{tarcza:0,obrecz:1,zorza:0,gwiazdy:.55,snopy:0,poswiata:.95},wiatr:.9,mglistosc:.8}],E=B.length,Aa=1.22,D=[{f:.07,z:4.2,s:-.26,px:512,miekkosc:.34,zamglenie:.8,mgla:.3,otoczenie:.5,iskra:0,jasnosc:.21,komorka:22,postrzep:0},{f:.15,z:2.9,s:-.42,px:512,miekkosc:.2,zamglenie:.64,mgla:.34,otoczenie:.4,iskra:.05,jasnosc:.155,komorka:15,postrzep:.1},{f:.3,z:2,s:-.58,px:640,miekkosc:.11,zamglenie:.46,mgla:.36,otoczenie:.3,iskra:.3,jasnosc:.105,komorka:11,postrzep:.25},{f:.58,z:1.35,s:-.78,px:768,miekkosc:.055,zamglenie:.26,mgla:.36,otoczenie:.2,iskra:.85,jasnosc:.066,komorka:8,postrzep:.6},{f:1,z:1,s:0,px:1024,miekkosc:.03,zamglenie:0,mgla:.4,otoczenie:.05,iskra:1,jasnosc:.05,komorka:5,gra:!0,postrzep:1},{f:1.8,z:.6,s:-1.12,px:384,miekkosc:.42,zamglenie:0,mgla:.16,otoczenie:0,iskra:.25,jasnosc:0,komorka:9,bliska:!0,postrzep:0}],G=4,La=5.3,ta=5.6,Et=16;for(const n of D){if(n.gra)n.y0=-1,n.wys=20,n.A=La;else{n.A=-n.s*ta*n.z;const a=n.A-ta*n.z-.3*n.z,t=n.A+(15-La)*n.f*n.z+ta*n.z+.3*n.z;n.y0=a,n.wys=t-a}n.szer=Et*n.z,n.pxW=n.px,n.pxH=Math.round(n.px*n.wys/n.szer/16)*16,n.mnoznikX=n.f*n.z}function Rt(n,a,t=[0,0]){return t[0]=a.x*n.mnoznikX,t[1]=n.gra?a.y:n.A+(a.y-La)*n.f*n.z,t}const _={TEREN:0,PIEN:1,KLAB:2,KOLUMNA:3,LUK:4,BLOK:5,AKWEDUKT:6,POSAG:7,KRYSZTAL:8,ZEBRO:9,KREGI:10,CZASZKA:11,DRZEWO:12,TRZCINY:13,KOSC:14},Tt=[2.3,1.75,1.4,1.12,1,1.35];function ga(n,a,t=.07){const i=1+(n()-.5)*2*t;return[a[0]*i,a[1]*i,a[2]*i]}function A(n,a,t,i,e,o,s,r={}){const h=B[a],u={typ:t,x:i,y:e,w:o,h:s,rot:0,par:[0,0,0,0],zi:n(),kraina:a,ka:ga(n,h.a),kb:ga(n,h.b),kc:ga(n,h.c),przed:!1,kolejnosc:n(),odbij:n()<.5?-1:1,bryla:null,...r};if(u.ox==null&&(u.ox=Math.abs(o)*1.25),u.oy==null&&(u.oy=Math.abs(s)*1.12),u.rot){const l=Math.hypot(u.ox,u.oy);u.ox=l,u.oy=l}return u}function Kt(n,a,t,i,e,o,s){const r=n.terenWarstwy(a,o),h=t.y0+t.wys/2,u=t.wys/2+t.z,l=(c,f,m)=>s.push(A(e,0,_.PIEN,c,h,f,u,{par:[.35+e()*.6,m,.5+e()*.5,.45+e()*.25],ox:f*5.5}));if(a<=3){const c=a===3?e()<.7?1:0:1+(e()<.45?1:0);for(let f=0;f<c;f++)l(o+(e()-.5)*t.komorka*t.z*.8,i*(.85+e()*e()*1.5),Math.floor(e()*3.4));if(a>=2&&e()<.6){const f=i*(1.2+e()*1.6),m=i*(.45+e()*.6),p=o+(e()-.5)*4*t.z;s.push(A(e,0,_.KLAB,p,n.terenWarstwy(a,p)+m*.5,f,m,{par:[6,.55,0,.3],przed:!0}))}}else if(a===G){if(e()<.34){const c=.5+e()*.9,f=.3+e()*.45;s.push(A(e,0,_.KLAB,o,r+f*.35,c,f,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:r+f*.2,rx:c*.5,ry:f*.45,r:.15}}))}else if(e()<.2){const c=.42+e()*.3,f=.45+e()*.5;s.push(A(e,0,_.PIEN,o,r+f*.6,c,f,{par:[.15,0,.9,.85],ox:c*2.2,bryla:{x:o,y:r+f*.5,rx:c*.3,ry:f*.9,r:.12}}))}}else{if(e()<.55){const c=i*(1.8+e()*2),f=i*(.7+e()*.6);s.push(A(e,0,_.KLAB,o+3*t.z,r+f*.2,c,f,{par:[6,.6,0,.3]}))}if(e()<.5){const c=i*(2+e()*2.5),f=i*(.8+e()*.7);s.push(A(e,0,_.KLAB,o-2*t.z,t.y0+t.wys-f*.4,c,f,{par:[7,.7,0,.3]}))}}}function Ct(n,a,t,i,e,o,s){const r=n.terenWarstwy(a,o),h=(l,c,f)=>{const m=c*(.55+e()*.25),p=n.terenWarstwy(a,l);s.push(A(e,1,_.DRZEWO,l,p+c-.25*i,m,c,{par:[3+Math.floor(e()*3),f,(e()-.5)*.7,0],ox:m*1.3}))},u=(l,c,f)=>{const m=n.terenWarstwy(a,l),p=c*(.5+e()*.5);s.push(A(e,1,_.TRZCINY,l,m+c*.85,p,c,{par:[4+Math.floor(e()*5),0,0,0],przed:f,ox:p*1.6}))};if(a===0)e()<.5&&h(o,i*(2.2+e()*2.2),0);else if(a<=2)e()<.7&&h(o,i*(2+e()*2.6),a===2&&e()<.5?1:0),e()<.65&&u(o+(e()-.5)*8*t.z,i*(.7+e()*.7),!0);else if(a===3){if(e()<.62&&h(o,i*(2.2+e()*3),e()<.5?1:0),e()<.6&&u(o+(e()-.5)*5*t.z,i*(.8+e()*.8),!0),e()<.35){const l=i*(.9+e()),c=i*(.3+e()*.3),f=o+2*t.z;s.push(A(e,1,_.KLAB,f,n.terenWarstwy(a,f)+c*.3,l,c,{par:[4,.3,1,.2],przed:!0}))}}else if(a===G){if(e()<.22&&r>1.3){const l=.6+e()*.8,c=.25+e()*.3;s.push(A(e,1,_.KLAB,o,r+c*.3,l,c,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:r+c*.15,rx:l*.5,ry:c*.4,r:.12}}))}}else e()<.8&&u(o,i*(1.6+e()*1.4),!1)}function Bt(n,a,t,i,e,o,s){const r=n.terenWarstwy(a,o),h=(l,c,f,m,p={})=>{const k=n.terenWarstwy(a,l);return A(e,2,_.KRYSZTAL,l,k+c*.9,f,c,{par:[m,.35+e()*.4,0,.5+e()*.5],ox:f*1.9+c*.5,oy:c*1.25,...p})},u=(l,c,f)=>s.push(A(e,2,_.KRYSZTAL,l,c,f*.3,f,{par:[1,0,1,.8],rot:(e()-.5)*1.6,przed:!0}));if(a<=1)e()<.75&&s.push(h(o,i*(2.2+e()*3.6),i*(.9+e()*.9),3+Math.floor(e()*3)));else if(a<=3)e()<.75&&s.push(h(o,i*(1.2+e()*2.8),i*(.6+e()*.8),3+Math.floor(e()*4))),e()<.35&&u(o+(e()-.5)*6*t.z,r+i*(3+e()*4.5),i*(.35+e()*.5));else if(a===G){if(e()<.5){const l=.35+e()*e()*1,c=.35+e()*.45,f=h(o,l,c,2+Math.floor(e()*4),{przed:e()<.5});l>.6&&(f.bryla={x:o,y:r+l*.6,rx:c*.45,ry:l*.7,r:.1}),s.push(f)}}else e()<.3&&s.push(h(o,i*(1.2+e()*1.2),i*(1.3+e()*.8),3)),e()<.22&&s.push(A(e,2,_.KRYSZTAL,o+4*t.z,t.y0+t.wys-i*1.2,i*.8,i*1.8,{par:[3,.5,0,.6],rot:Math.PI,ox:i*3,oy:i*3}))}function Ft(n,a,t,i,e,o,s){const r=n.terenWarstwy(a,o),h=(l,c,f,m)=>{const p=n.terenWarstwy(a,l);s.push(A(e,3,_.KOLUMNA,l,p+c-.2*i,f,c,{par:[m,1,3+Math.floor(e()*3),0],ox:f*1.6}))},u=(l,c,f)=>{const m=n.terenWarstwy(a,l);s.push(A(e,3,_.LUK,l,m+f-.3*i,c,f,{par:[.2+e()*.08,e()<.45?.3+e()*.5:0,0,0]}))};if(a===0)if(e()<.55){const l=i*(1.6+e()*1.2),c=i*(5+e()*4);s.push(A(e,3,_.AKWEDUKT,o,r+l-.3*i,c,l,{par:[3+Math.floor(e()*3),0,e()<.5?.5+e()*.4:0,0]}))}else e()<.5&&h(o,i*(2.5+e()*3),i*(.5+e()*.4),e()<.5?e()*.3:0);else if(a===1)if(e()<.4){const l=i*(1.5+e()),c=i*(4+e()*3);s.push(A(e,3,_.AKWEDUKT,o,r+l-.3*i,c,l,{par:[3+Math.floor(e()*2),0,e()<.6?.4+e()*.5:0,0]}))}else e()<.6&&u(o,i*(1.3+e()),i*(1.8+e()*1.4));else if(a<=3){const l=i*(2.3+e()*2.4),c=i*(.34+e()*.16);if(e()<.78?(h(o,l,c,e()<.4?.15+e()*.55:0),e()<.5&&h(o+c*(7+e()*3),l,c,e()<.5?.2+e()*.6:0)):e()<.7&&u(o,i*(1.4+e()*.8),i*(2+e()*1.6)),a===3&&e()<.35){const f=i*(.6+e()*.7),m=i*(.3+e()*.25),p=o+3*t.z;s.push(A(e,3,_.BLOK,p,n.terenWarstwy(a,p)+m*.6,f,m,{par:[.06,0,0,0],rot:(e()-.5)*.7,przed:!0}))}}else if(a===G){const l=e();if(l<.3){const c=.45+e()*.6,f=.28+e()*.3,m=(e()-.5)*.5;s.push(A(e,3,_.BLOK,o,r+f*.75,c,f,{par:[.05,0,0,0],rot:m,przed:!0,bryla:{x:o,y:r+f*.7,rx:c*.85,ry:f*.8,r:.08}}))}else if(l<.42){const c=1.2+e()*.7,f=.5+e()*.35;s.push(A(e,3,_.BLOK,o,r+f*.8,c,f,{par:[.03,3,0,0],przed:!0,bryla:{x:o,y:r+f*.3,rx:c*.9,ry:f*.5,r:.08}}))}else if(l<.56){const c=.42+e()*.12,f=.5+e()*.8;s.push(A(e,3,_.KOLUMNA,o,r+f-.1,c,f,{par:[.25+e()*.3,0,4,0],ox:c*1.6,bryla:{x:o,y:r+f*.6,rx:c*.6,ry:f*.75,r:.1}}))}}else if(e()<.4){const l=i*(1.5+e()),c=i*(.8+e()*.5);s.push(A(e,3,_.BLOK,o,r+c*.5,l,c,{par:[.1,0,0,0],rot:(e()-.5)*.6}))}}function Dt(n,a,t,i,e,o,s){const r=n.terenWarstwy(a,o),h=(l,c,f)=>{const m=e()<.5?-1:1,p=c*(.42+e()*.15);for(let k=0;k<f;k++){const w=c*(1-.13*k-e()*.05),v=l+k*p,d=n.terenWarstwy(a,v),y=w*(.42+e()*.1);s.push(A(e,4,_.ZEBRO,v,d+w-.3*i,y,w,{par:[.13+e()*.04,.9+e()*.35,0,0],odbij:m,ox:y*1.5,oy:w*1.15,kolejnosc:.5+k*.01}))}},u=(l,c,f={})=>{const m=n.terenWarstwy(a,l),p=c*(.16+e()*.05);return A(e,4,_.KOSC,l,m+p*.6,c,p,{rot:(e()-.5)*.5,par:[0,0,0,0],przed:!0,...f})};if(a<=1)e()<.62&&h(o,i*(2.4+e()*3),2+Math.floor(e()*3));else if(a<=3){if(e()<.58)h(o,i*(2+e()*3),2+Math.floor(e()*3));else if(e()<.5){const l=i*(2+e()*2),c=i*(.5+e()*.25);s.push(A(e,4,_.KREGI,o,r+c*.7,l,c,{par:[5+Math.floor(e()*4),0,0,0],przed:!0}))}a===3&&e()<.3&&s.push(u(o+3*t.z,i*(.8+e()*.8)))}else if(a===G){const l=e();if(l<.2){const c=1+e()*.9,f=.3+e()*.15;s.push(A(e,4,_.KREGI,o,r+f*.55,c,f,{par:[4+Math.floor(e()*3),0,0,0],przed:!0,bryla:{x:o,y:r+f*.1,rx:c*.9,ry:f*.45,r:.08}}))}else if(l<.42){const c=.5+e()*.7,f=u(o,c);f.bryla={x:o,y:f.y,rx:c*.8,ry:f.h*.5,r:.08},s.push(f)}}else e()<.4&&h(o,i*(2.5+e()*2),1)}const It=[Kt,Ct,Bt,Ft,Dt];function Fa(n,a,t,i,e,o,s,r){const h=n.terenWarstwy(a,s);switch(o){case 0:{const u=i*1.9,l=i*9;r.push(A(e,0,_.PIEN,s,h+i*2.3,u,l,{par:[.35,3,.8,.5],rot:1.28*(e()<.5?-1:1),ox:l*1.1,oy:l*1.1,kolejnosc:.9})),r.push(A(e,0,_.PIEN,s+i*11,t.y0+t.wys/2,i*2.6,t.wys/2+t.z,{par:[.3,2,.9,.7],ox:i*12,kolejnosc:.1}));break}case 1:{const u=i*4.2,l=u*.75;r.push(A(e,1,_.DRZEWO,s,h+u-.4*i,l,u,{par:[5,1,.25,0],ox:l*1.3,kolejnosc:.9}));break}case 2:{const u=i*4.6,l=i*1.7;r.push(A(e,2,_.KRYSZTAL,s,h+u*.86,l,u,{par:[1,.12,0,1.6],ox:l*2+u*.3,oy:u*1.2,kolejnosc:.9})),r.push(A(e,2,_.KRYSZTAL,s+i*2.2,h+i*1.6,i*1.3,i*2.2,{par:[4,.7,0,.9],ox:i*4,oy:i*3,kolejnosc:.95}));break}case 3:{const u=i*3.1;r.push(A(e,3,_.POSAG,s,h+u-.5*i,u*.62,u,{par:[e()<.35?1:0,0,0,0],kolejnosc:.9}));break}case 4:{const u=i*2;r.push(A(e,4,_.CZASZKA,s,h+u*.62,u*1.45,u,{par:[0,0,0,0],rot:(e()-.5)*.3,kolejnosc:.9,ox:u*1.9,oy:u*1.5}));break}}}function Ot(n,a,t){const i=D[a],e=i.z*Tt[a],o=i.komorka*i.z,s=ia(n.ziarno,a*7919+17,t),r=[],h=(t+.2+.6*s())*o,u=h/i.mnoznikX,l=n.wagi(u);let c=s(),f=0;for(;f<E-1&&(c-=l[f],!(c<0));f++);if(It[f](n,a,i,e,s,h,r),a===2){const m=n.segment(u),p=n.srodekSegmentu(m)*i.mnoznikX-5.5*i.z;p>=t*o&&p<(t+1)*o?Fa(n,a,i,e,ia(n.ziarno,991,m),n.krainaSegmentu(m),p,r):l[f]>.95&&s()<.07&&Fa(n,a,i,e,s,f,h,r)}return r}const ma=16;function Nt(n,a){const t=ia(n.ziarno,4242,a),i=[],e=a*ma,o=(s,r,h,u,l,c,f)=>i.push(s,r,h,u,t()*6.283,l,c[0],c[1],c[2],f);for(let s=e;s<e+ma;s+=.22){const r=s+t()*.22,h=n.wagi(r),u=n.ziemia(r);let l=t(),c=0;for(;c<E-1&&(l-=h[c],!(l<0));c++);const f=B[c],m=.6+t()*.6,p=[f.b[0]*m,f.b[1]*m,f.b[2]*m],k=t();if(c===0){if(k<.8&&o(r,u-.05,.18+t()*t()*.75,.014+t()*.012,0,p,1),t()<.085){const w=n.sufit(r);w<100&&o(r,w+.9,1.4+t()*t()*4.2,.018+t()*.014,1,[p[0]*.8,p[1]*.8,p[2]*.8],.55)}}else c===1?k<.42&&u<1.75?o(r,u-.05,.7+t()*1.7,.013+t()*.008,t()<.4?2:0,p,.7):k<.6&&o(r,u-.05,.15+t()*.4,.012,0,p,1):c===3?k<.22&&o(r,u-.04,.12+t()*.4,.011+t()*.006,0,p,1):c===4&&k<.2&&o(r,u-.04,.25+t()*.75,.009+t()*.006,0,p,1.6)}return new Float32Array(i)}const $=4,Da=4,J=161;class Wt{constructor(a,t,i){this.gl=a,this.szum=t,this.swiat=i,this.p=new R(a,Lt,jt,"wypiek");const e={wewn:a.RGBA8,format:a.RGBA,typ:a.UNSIGNED_BYTE};this.warstwy=D.map(o=>({W:o,bufor:new W(a,o.pxW*$,o.pxH,[e,e],{zawijanieS:a.REPEAT}),kafle:new Array($).fill(null)})),this.terenDane=new Float32Array(J*4),this.terenTex=da(a,J,1,{wewn:a.RGBA32F,format:a.RGBA,typ:a.FLOAT,filtr:a.NEAREST,dane:this.terenDane}),this.zadanie=null,this.upieczono=0}reset(){for(const a of this.warstwy)a.kafle.fill(null);this.zadanie=null}zapewnij(a,t,i=1){let e=null;for(let o=0;o<this.warstwy.length;o++){const s=this.warstwy[o],r=s.W,h=a.x*r.mnoznikX,u=t*r.z+.6*r.z,l=Math.floor((h-u)/r.szer),c=Math.floor((h+u)/r.szer);for(let f=l;f<=c;f++)s.kafle[V(f)]!==f&&this._pieczCaly(o,f);if(!e){const f=r.szer*.45,m=i>=0?Math.floor((h+u+f)/r.szer):Math.floor((h-u-f)/r.szer);s.kafle[V(m)]!==m&&m-l<$&&c-m<$&&(e=[o,m])}}this.zadanie?this._pieczPasek():e&&(this.zadanie=this._przygotuj(e[0],e[1]),this.warstwy[e[0]].kafle[V(e[1])]=null,this._pieczPasek())}_przygotuj(a,t){const i=D[a],e=this.swiat,o=t*i.szer,s=o+i.szer,r=new Float32Array(J*4),h=i.szer/(J-33),u=o-16*h;for(let m=0;m<J;m++){const p=u+m*h,k=p/i.mnoznikX,w=e.wagi(k);r[m*4]=e.terenWarstwy(a,p),r[m*4+1]=e.sufitWarstwy(a,p),r[m*4+2]=w[2],r[m*4+3]=w[3]}const l=o/i.mnoznikX,c=s/i.mnoznikX,f=m=>e.mieszaj(m,"b",[0,0,0]);return{l:a,i:t,pasek:0,dane:r,xs:u,dx:h,x0:o,rekwizyty:e.rekwizytyW(a,o,s),barwy:{gL:e.mieszaj(l,"grunt",[0,0,0]),gP:e.mieszaj(c,"grunt",[0,0,0]),wL:e.mieszaj(l,"wierzch",[0,0,0]),wP:e.mieszaj(c,"wierzch",[0,0,0]),lL:f(l),lP:f(c)}}}_pieczCaly(a,t){this.zadanie&&this.zadanie.l===a&&V(this.zadanie.i)===V(t)&&(this.zadanie=null);const i=this._przygotuj(a,t);this._rysuj(i,0,D[a].pxH),this.warstwy[a].kafle[V(t)]=t,this.upieczono++}_pieczPasek(){const a=this.zadanie,t=D[a.l],i=Math.ceil(t.pxH/Da);this._rysuj(a,a.pasek*i,Math.min(i,t.pxH-a.pasek*i)),++a.pasek>=Da&&(this.warstwy[a.l].kafle[V(a.i)]=a.i,this.zadanie=null,this.upieczono++)}_rysuj(a,t,i){const e=this.gl,o=D[a.l],s=this.warstwy[a.l],r=this.p,h=V(a.i);e.bindFramebuffer(e.FRAMEBUFFER,s.bufor.fbo),e.viewport(h*o.pxW,0,o.pxW,o.pxH),e.enable(e.SCISSOR_TEST),e.scissor(h*o.pxW,t,o.pxW,i),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.terenTex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,J,1,0,e.RGBA,e.FLOAT,a.dane);const u=a.barwy;r.uzyj().tex("uSzum",0,this.szum).i("uTeren",1).f("uTerenZakres",a.xs,1/a.dx,J).f("uKafel",a.x0,o.y0,o.szer,o.wys).f("uSkala",o.z).f("uPostrzep",o.postrzep).f("uMiekko",o.miekkosc*o.z).f("uPxJ",o.szer/o.pxW).f("uKafelX",a.x0,o.szer).f("uGruntL",...u.gL).f("uGruntP",...u.gP).f("uWierzchL",...u.wL).f("uWierzchP",...u.wP).f("uLiscL",...u.lL).f("uLiscP",...u.lP);const l=c=>{r.i("uTyp",c.typ).f("uPoz",c.x,c.y).f("uObsz",c.ox+o.miekkosc*o.z*2,c.oy+o.miekkosc*o.z*2).f("uRot",c.rot).f("uOdbij",c.odbij).f("uRozm",c.w,c.h).f("uPar",c.par[0],c.par[1],c.par[2],c.par[3]).f("uZi",c.zi).f("uKa",...c.ka).f("uKb",...c.kb).f("uKc",...c.kc),e.drawArrays(e.TRIANGLE_STRIP,0,4)};for(const c of a.rekwizyty)c.przed||l(c);r.i("uTyp",_.TEREN).f("uPoz",a.x0+o.szer/2,o.y0+o.wys/2).f("uObsz",o.szer/2,o.wys/2).f("uRot",0).f("uOdbij",1).f("uZi",.37+a.l*.11),e.drawArrays(e.TRIANGLE_STRIP,0,4);for(const c of a.rekwizyty)c.przed&&l(c);e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null)}}function V(n){return(n%$+$)%$}const Gt=$,Ia=10;class Zt{constructor(a,t){this.gl=a,this.swiat=t,this.p=new R(a,wt,yt,"flora"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf);const i=Ia*4;[[0,2,0],[1,4,2],[2,4,6]].forEach(([e,o,s])=>{a.enableVertexAttribArray(e),a.vertexAttribPointer(e,o,a.FLOAT,!1,i,s*4),a.vertexAttribDivisor(e,1)}),a.bindVertexArray(a.domyslnyVAO),this.klucz="",this.ile=0,this.pamiec=new Map}reset(){this.klucz="",this.pamiec.clear()}rysuj(a,t,i,e,o){const s=this.gl,r=Math.floor((a.cam.x-a.polX-3)/ma),h=Math.floor((a.cam.x+a.polX+3)/ma),u=r+":"+h;if(u!==this.klucz){this.klucz=u;const l=[];let c=0;for(let p=r;p<=h;p++){let k=this.pamiec.get(p);k||(this.pamiec.size>12&&this.pamiec.clear(),k=Nt(this.swiat,p),this.pamiec.set(p,k)),l.push(k),c+=k.length}const f=new Float32Array(c);let m=0;for(const p of l)f.set(p,m),m+=p.length;s.bindBuffer(s.ARRAY_BUFFER,this.buf),s.bufferData(s.ARRAY_BUFFER,f,s.DYNAMIC_DRAW),this.ile=c/Ia}this.ile&&(this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...t.barwaSw).f("uRes",e,o).tex("uSwiatlo",1,i),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,2*($a+1),this.ile),s.bindVertexArray(s.domyslnyVAO))}}const Z=16,la=8;function Oa(n,a){const t=4+Math.floor(n()*4.99),i=[];let e=0;for(let p=0;p<t;p++){const k=.35+n();i.push(k),e+=k}const o=1+n()*1.1,s=n()*Math.PI*2,r=[];let h=n()*Math.PI*2;const u=Math.floor(n()*t),l=n()<.4?Math.floor(n()*t):-1;for(let p=0;p<t;p++){h+=i[p]/e*Math.PI*2;let k=a*(.5+.5*n());(p===u||p===l)&&(k*=.38+n()*.2);const w=Math.cos(h)*k*o,v=Math.sin(h)*k;r.push([w*Math.cos(s)-v*Math.sin(s),w*Math.sin(s)+v*Math.cos(s)])}let c=0,f=0;for(const p of r)c+=p[0],f+=p[1];c/=t,f/=t;let m=0;for(const p of r)p[0]-=c,p[1]-=f,m=Math.max(m,Math.hypot(p[0],p[1]));return{v:r,zasieg:m}}function Ha(n,a){const t=a*Z,i=t+Z/2,e=n.segment(i),o=n.srodekSegmentu(e)+13;if(o<t||o>=t+Z)return null;const s=n.krainaSegmentu(e);return{id:"f"+e,x:o,y:Math.min(n.ziemia(o)+4.4,n.granicaLotu(o)-2.2),kraina:s,segment:e,odsloniecie:0,odkryty:!1}}function qt(n,a){const t=ia(n.ziarno,9001,a),i=[],e=a*Z,o=1+(t()<.6?1:0)+(t()<.22?1:0);for(let r=0;r<o;r++){const h=e+(r+.15+.7*t())*Z/o,u=n.ziemia(h),l=Math.min(n.granicaLotu(h)-.9,u+9.5),c=u+1.4+t()*Math.max(.5,l-u-1.4),f=t()<.32,m=f?2+Math.floor(t()*3):1;for(let p=0;p<m;p++){const k=f?.2+t()*.32:.32+t()*.4,w=t()*Math.PI*2,v=p===0?0:.6+t()*.9,d=Oa(t,k),y=h+Math.cos(w)*v,S=c+Math.sin(w)*v*.8;i.push({id:a*16+i.length,x:y,y:S,px:y,py:S,kat:t()*Math.PI*2,obrot:(t()-.5)*.42,faza:t()*Math.PI*2,v:d.v,zasieg:d.zasieg,os:t()*Math.PI,wachlarz:null,oswietlenie:0})}}const s=Ha(n,a);if(s)for(let r=0;r<3;r++){const h=Oa(t,.3+t()*.25),u=s.x-2.6+r*2.4+(t()-.5)*.6,l=s.y-1.9+(t()-.5)*.9;i.push({id:a*16+i.length,x:u,y:l,px:u,py:l,kat:t()*6.283,obrot:(t()-.5)*.42,faza:t()*6.283,v:h.v,zasieg:h.zasieg,os:t()*Math.PI,wachlarz:null,oswietlenie:0})}return i}class ja{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[]}reset(){this.kawalki.clear(),this.widoczne.length=0}krok(a,t,i,e){const o=Math.floor((t.x-i-8)/Z),s=Math.floor((t.x+i+8)/Z);this.widoczne.length=0;for(let r=o;r<=s;r++){let h=this.kawalki.get(r);if(!h){if(this.kawalki.size>24)for(const u of this.kawalki.keys())(u<o-2||u>s+2)&&this.kawalki.delete(u);h=qt(this.swiat,r),this.kawalki.set(r,h),this.naNowyKawalek?.(r,h)}for(const u of h)u.kat+=u.obrot*a,u.py=u.y+Math.sin(e*.6+u.faza)*.12,u.px=u.x+Math.sin(e*.37+u.faza*1.7)*.05,this.widoczne.push(u)}}static wierzcholki(a,t){const i=Math.cos(a.kat),e=Math.sin(a.kat);for(let o=0;o<a.v.length;o++){const s=a.v[o];t[o*2]=i*s[0]-e*s[1],t[o*2+1]=e*s[0]+i*s[1]}return t}}const Ja=`
// Sześć wyraźnych, nasyconych barw: czerwień, pomarańcz, żółć, zieleń, błękit, fiolet.
vec3 widmo(float t){
  t = clamp(t, 0.0, 1.0) * 5.0;
  vec3 c0 = vec3(1.00, 0.10, 0.16), c1 = vec3(1.00, 0.46, 0.06), c2 = vec3(0.98, 0.88, 0.10);
  vec3 c3 = vec3(0.12, 0.92, 0.36), c4 = vec3(0.12, 0.46, 1.00), c5 = vec3(0.60, 0.16, 1.00);
  vec3 c = mix(c0, c1, smoothstep(0.0, 1.0, t));
  c = mix(c, c2, smoothstep(1.0, 2.0, t));
  c = mix(c, c3, smoothstep(2.0, 3.0, t));
  c = mix(c, c4, smoothstep(3.0, 4.0, t));
  return mix(c, c5, smoothstep(4.0, 5.0, t));
}`,Xt=`#version 300 es
uniform vec2 uCam, uPol, uO; uniform float uKat, uDl, uRozw, uStart;
out vec2 vL;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  float koniec = uStart + uDl * 1.7;
  float bok = koniec * sin(min(uRozw * 0.5 + 0.06, 1.5));
  vL = vec2(mix(uStart * 0.6, koniec, r.x), (r.y * 2.0 - 1.0) * bok);
  float c = cos(uKat), s = sin(uKat);
  vec2 p = uO + vec2(c * vL.x - s * vL.y, s * vL.x + c * vL.y);
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,Yt=T+Ja+`
in vec2 vL; out vec4 o;
uniform float uDl, uRozw, uSila, uZnak, uZi, uCzas, uStart, uSkos;
uniform sampler2D uSzum;
void main(){
  float r = length(vL), a = atan(vL.y, vL.x);
  float u = a / (uRozw * 0.5);
  if (abs(u) >= 1.0) discard;
  float t = u * uZnak * 0.5 + 0.5;                       // 0 = brzeg czerwony, 1 = fioletowy
  float katowy = smoothstep(0.0, 0.13, t) * (1.0 - smoothstep(0.74, 1.0, t)) * (1.12 - 0.3 * t);
  float ts = pow(clamp((t - 0.07) / 0.80, 0.0, 1.0), 0.86);
  // szerokie pasma jasności w poprzek wiązki i drobne smugi wzdłuż promieni
  float pasma = 0.5 + 1.0 * texture(uSzum, vec2(a * 0.55 + uZi * 0.37, uZi * 0.13)).r;
  float smugi = 0.72 + 0.56 * texture(uSzum, vec2(a * 1.7 + uZi, r * 0.025 - uCzas * 0.004)).r;
  float rr = r - uStart;
  float dl = uDl * (1.0 + uSkos * (t - 0.5)) * (0.72 + 0.56 * pasma);
  float q = rr / dl;
  float rad = smoothstep(0.0, 0.4, rr) * exp(-q * q * 2.4);
  o = vec4(widmo(ts) * uSila * katowy * rad * pasma * smugi * 2.0, 1.0);
}`,Ut=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){
  vec3 L = texture(uTex, vUv).rgb;
  float mn = min(L.r, min(L.g, L.b));
  L -= mn * 0.92;
  float mx = max(L.r, max(L.g, L.b));
  L *= (1.0 - exp(-mx * 1.35)) / max(mx, 1e-4) * 0.92;
  o = vec4(L, 1.0);
}`,Vt=`#version 300 es
uniform vec2 uCam, uPol, uSrodek; uniform float uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,$t=T+Ja+`
in vec2 vP; out vec4 o;
uniform vec2 uW[${la}]; uniform int uN;
uniform vec2 uDoIskry, uOs, uBlyskPoz, uRes;
uniform float uBlask, uFaza, uBlysk, uOsw;
uniform vec3 uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  // odległość ze znakiem od wielokąta i normalna najbliższej krawędzi
  float d2 = 1e9, znak = 1.0; vec2 nrm = vec2(0.0, 1.0);
  for (int i = 0; i < ${la}; i++) {
    if (i >= uN) break;
    int j = i == 0 ? uN - 1 : i - 1;
    vec2 e = uW[j] - uW[i], w = vP - uW[i];
    vec2 b = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
    float bb = dot(b, b);
    if (bb < d2) { d2 = bb; vec2 nn = normalize(vec2(e.y, -e.x)); nrm = dot(nn, uW[i] + e * 0.5) < 0.0 ? -nn : nn; }
    bvec3 c = bvec3(vP.y >= uW[i].y, vP.y < uW[j].y, e.x * w.y > e.y * w.x);
    if (all(c) || all(not(c))) znak = -znak;
  }
  float d = znak * sqrt(d2);
  float wn = smoothstep(0.022, -0.022, d);
  float kraw = exp(-abs(d) / 0.026);
  float lic = max(dot(nrm, uDoIskry), 0.0);                       // krawędź zwrócona ku iskierce
  float faza = exp(-abs(d + 0.055) / 0.014) * wn * smoothstep(0.1, 0.7, dot(nrm, uOs));
  float polysk = pow(max(0.0, sin(dot(vP, uOs) * 7.0 + uFaza)), 26.0) * wn;
  vec3 lod = mix(vec3(0.74, 0.90, 1.0), uBarwaSw, 0.3);
  float widac = uBlask + 0.035 + uBlysk * 0.35;
  float grad = 0.5 + 0.5 * dot(normalize(vP + 1e-4), uOs);
  vec3 c = lod * (wn * (0.07 + 0.16 * grad) + kraw * (0.05 + 0.85 * lic) + faza * 0.2 + polysk * 0.42) * widac;
  // pryzmatyczna obwódka: tuż przy krawędzi szkło samo rozszczepia światło
  c += widmo(fract(-d * 11.0 + uFaza * 0.16)) * wn * exp(d / 0.05) * 0.22 * (uOsw + uBlask * 0.4);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  c += tecza * (wn * 0.45 + kraw * 0.5);
  // błysk na wierzchołku: miękki krzyżyk
  vec2 g = abs(vP - uBlyskPoz);
  float gw = exp(-g.x * 70.0 - g.y * 9.0) + exp(-g.y * 70.0 - g.x * 9.0) + 0.6 * exp(-length(g) * 22.0);
  c += lod * gw * uBlysk * (0.25 + uBlask);
  o = vec4(c, wn * 0.10 * min(1.0, widac));
}`;class Ht{constructor(a,t){this.gl=a,this.szum=t,this.pWachlarz=new R(a,Xt,Yt,"wachlarz"),this.pNasycenie=new R(a,X,Ut,"nasycenie"),this.pOdlamek=new R(a,Vt,$t,"odlamek"),this._w=new Float32Array(la*2)}wachlarze(a,t){const i=this.gl,e=this.pWachlarz;i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),e.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).tex("uSzum",0,this.szum);for(const o of t)e.f("uO",o.x,o.y).f("uKat",o.kat).f("uDl",o.dlugosc).f("uRozw",o.rozwarcie).f("uSila",o.sila).f("uZnak",o.znak).f("uZi",o.zi).f("uStart",o.start).f("uSkos",o.skos),i.drawArrays(i.TRIANGLE_STRIP,0,4);i.disable(i.BLEND)}odlamki(a,t,i,e,o,s){const r=this.gl,h=this.pOdlamek,u=a.iskra;h.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uBarwaSw",...t.barwaSw).tex("uSwiatlo",1,e);for(const l of i){if(Math.abs(l.px-a.cam.x)>a.polX+1.5)continue;const c=u.x-l.px,f=u.y-l.py,m=Math.hypot(c,f)||1,p=m/(u.zasieg*1.25);ja.wierzcholki(l,this._w);const k=Math.pow(Math.max(0,Math.sin(a.czas*.9+l.faza*3)),40),w=Math.floor(a.czas*.9/(2*Math.PI)+l.faza)%l.v.length;h.f("uSrodek",l.px,l.py).f("uObsz",l.zasieg+.5).fv("uW",2,this._w).i("uN",l.v.length).f("uDoIskry",c/m,f/m).f("uOs",Math.cos(l.os+l.kat),Math.sin(l.os+l.kat)).f("uBlyskPoz",this._w[w*2],this._w[w*2+1]).f("uBlask",Math.exp(-p*p)).f("uFaza",a.czas*.7+l.faza).f("uBlysk",k).f("uOsw",l.oswietlenie),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}}const sa=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Qa=`
float zSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
float zh(float n){ return fract(sin(n * 91.3 + 3.7) * 4375.85); }
float znak(vec2 p, int typ, float w){
  float d = 1e3;
  if (typ == 0) {                      // pióro: stosina i promienie w obrysie liścia
    p = mat2(0.8, -0.6, 0.6, 0.8) * p;
    float szer = 0.24 + 0.05 * w;
    float obrys = abs(p.x) - szer * sin(clamp((p.y + 0.8) / 1.7, 0.0, 1.0) * 3.14159) * (1.0 - 0.12 * w * (p.y + 0.8));
    d = min(abs(obrys), zSeg(p, vec2(0.0, -1.0), vec2(0.0, 0.9)));
    float promienie = abs(fract((p.y - abs(p.x) * (0.9 + 0.2 * w)) * (4.5 + w)) - 0.5) / (4.5 + w);
    if (obrys < 0.0 && p.y > -0.75) d = min(d, promienie);
  } else if (typ == 1) {               // klucz: ucho, trzon, zęby
    float ucho = abs(length(p - vec2(-0.6, 0.0)) - 0.3);
    if (w > 2.5) ucho = min(ucho, abs(length(p - vec2(-0.6, 0.0)) - 0.14));
    d = min(ucho, zSeg(p, vec2(-0.3, 0.0), vec2(0.95, 0.0)));
    for (int i = 0; i < 3; i++) {
      float fi = float(i); if (fi > 1.0 + mod(w, 2.0)) break;
      float x = 0.9 - fi * 0.2, dl = 0.18 + 0.14 * zh(w * 3.0 + fi);
      d = min(d, zSeg(p, vec2(x, 0.0), vec2(x, -dl)));
      if (zh(w + fi * 7.0) > 0.5) d = min(d, zSeg(p, vec2(x, -dl), vec2(x - 0.1, -dl)));
    }
  } else if (typ == 2) {               // kwiat zamknięty w krysztale
    vec2 q = abs(p);
    float kr = max(q.x * 0.9 + q.y * 0.42, q.x) - 0.62;
    d = abs(kr);
    float n = 5.0 + mod(w, 4.0), kat = atan(p.y, p.x), r = length(p);
    float platki = r - 0.36 * (0.45 + 0.55 * abs(cos(kat * n * 0.5 + w)));
    d = min(d, abs(platki));
    d = min(d, abs(r - 0.07));
  } else if (typ == 3) {               // znak wyryty w kamieniu: kreski na siatce w kole
    d = abs(length(p) - 0.92);
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 a = (floor(vec2(zh(w * 7.0 + fi), zh(w * 11.0 + fi * 3.0)) * 3.0) - 1.0) * 0.44;
      vec2 b = (floor(vec2(zh(w * 13.0 + fi * 5.0), zh(w * 17.0 + fi * 2.0)) * 3.0) - 1.0) * 0.44;
      if (dot(a - b, a - b) > 0.01) d = min(d, zSeg(p, a, b));
    }
    d = min(d, abs(length(p - vec2(0.0, 0.44 * (mod(w, 3.0) - 1.0))) - 0.1));
  } else {                             // skamielina: zwinięta muszla z żebrami
    float r = length(p), kat = atan(p.y, p.x);
    float b = 0.13 + 0.012 * w;
    float t = log(max(r, 1e-3) / 0.09) / b;
    float zwoj = (kat - t) / 6.28318;
    float f = fract(zwoj) - 0.5;
    d = abs(f) * 6.28318 * b * r;
    if (r > 0.95) d = max(d, r - 0.95) + abs(r - 0.95);
    float zebra = abs(fract(t * (1.2 + 0.2 * mod(w, 3.0))) - 0.5) * r * 0.5;
    if (r > 0.18 && r < 0.95) d = min(d, zebra + smoothstep(0.1, 0.4, abs(f)) * 0.0 + 0.02 * step(0.47, abs(f)));
    d = min(d, abs(r - 0.95) + 0.0);
  }
  return d;
}`,Jt=T+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uPuls;
void main(){
  float r = length(vP);
  float rdzen = exp(-r * r / 0.0035);
  float aura = exp(-r / 0.11) * 0.42 + exp(-r / 0.36) * 0.10;
  o = vec4((mix(uBarwa, vec3(0.93, 1.0, 0.96), 0.55) * rdzen * 0.9 + uBarwa * aura) * uPuls * smoothstep(1.0, 0.7, r), 0.0);
}`,Qt=T+Qa+`
in vec2 vP; out vec4 o;
uniform vec3 uBarwa; uniform float uOdsl, uCzas, uWariant, uSkala; uniform int uTyp;
uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  vec2 p = vP / uSkala;
  float d = znak(p, uTyp, uWariant) * uSkala;
  float kreska = exp(-d / 0.02) * 0.95 + exp(-d / 0.075) * 0.3;
  float r = length(p);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = mix(uBarwa, vec3(1.0), 0.3) * kreska + (uBarwa * 0.5 + tecza * 0.8) * exp(-r * r * 1.4) * 0.22;
  c += tecza * kreska * 0.8;
  float drz = 0.85 + 0.15 * sin(uCzas * 2.3 + p.x * 4.0);
  o = vec4(c * uOdsl * drz * smoothstep(1.5, 1.1, r), 0.0);
}`,ae=T+Qa+`
in vec2 vP; out vec4 o;
uniform vec3 uBarwa; uniform float uOdsl, uOdkryty, uZaplon, uCzas; uniform int uTyp;
uniform sampler2D uSwiatlo, uSzum; uniform vec2 uRes;
void main(){
  vec2 p = vP;
  float d = 1e3;
  // środkowy motyw i dwa mniejsze po bokach
  d = min(d, znak(p / 1.25, uTyp, 3.0) * 1.25);
  d = min(d, znak((p - vec2(2.35, -0.1)) / 0.7, uTyp, 1.0) * 0.7);
  d = min(d, znak((p + vec2(2.35, 0.1)) / 0.7, uTyp, 4.0) * 0.7);
  // rama: podwójna linia i fryz z łuków
  vec2 q = abs(p) - vec2(3.4, 1.75);
  float rama = abs(length(max(q, 0.0)) + min(max(q.x, q.y), 0.0));
  d = min(d, min(rama, abs(rama - 0.12)));
  if (abs(p.x) < 3.3) {
    float lx = mod(p.x, 0.55) - 0.275;
    d = min(d, abs(length(vec2(lx, p.y + 1.62)) - 0.22) + step(-1.62, -abs(p.y + 1.62) - 1.4) * 0.0);
    d = min(d, abs(length(vec2(lx, p.y - 1.62)) - 0.22));
  }
  float zatarcie = smoothstep(0.25, 0.6, texture(uSzum, p * 0.07 + 0.3).r + 0.25 * texture(uSzum, p * 0.3).b);
  float kreska = (0.8 * exp(-d / 0.04) + 0.3 * exp(-d / 0.13)) * (0.12 + 0.88 * zatarcie);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  float tm = max(tecza.r, max(tecza.g, tecza.b));
  float brzeg = smoothstep(0.0, 0.5, -max(q.x, q.y) + 0.45);
  vec3 c = (tecza * 1.5 + uBarwa * tm * 0.6) * kreska;                       // w tęczy
  // w trakcie odsłaniania: malowidło rozżarza się od środka ku brzegom, coraz jaśniej
  float front = smoothstep(0.0, 0.25, uOdsl * 1.25 - length(p / vec2(3.6, 1.9)) * 0.9);
  c += mix(uBarwa, vec3(1.0), 0.2) * kreska * uOdsl * (0.12 + 0.5 * front);
  // zapalone: świeci samo i już nie gaśnie — jasna kreska, miękka łuna wokół rysunku, powolny oddech
  float oddech = 0.9 + 0.1 * sin(uCzas * 0.8 + p.x);
  float luna = exp(-d / 0.45) * 0.10 + 0.035 * (1.0 - smoothstep(0.0, 1.0, length(p / vec2(3.6, 1.9))));
  c += (mix(uBarwa, vec3(1.0), 0.3) * kreska * 1.05 + uBarwa * luna) * oddech * uOdkryty;
  // chwila zapłonu: krótki rozbłysk, który opada do stałego blasku
  c += mix(uBarwa, vec3(1.0), 0.5) * (kreska * 1.6 + exp(-d / 0.8) * 0.25) * uZaplon;
  o = vec4(c * brzeg, 0.0);
}`,te=T+`
in vec2 vP; out vec4 o; uniform float uCzas, uGoni, uZanik, uFaza; uniform vec2 uRuch; uniform sampler2D uSzum;
void main(){
  // ciało wyciąga się pod prąd ruchu (ogon jak dym)
  vec2 p = vP + uRuch * 0.10 * smoothstep(0.0, 0.5, dot(vP, -normalize(uRuch + 1e-4)) + 0.1);
  float kat = atan(p.y, p.x), r = length(p);
  float postrz = texture(uSzum, vec2(kat * 0.16 + uFaza, uCzas * 0.05 + uFaza)).r;
  float R = (0.17 + 0.08 * postrz + 0.02 * sin(uCzas * 3.0 + uFaza)) * (1.0 + uZanik * 1.6);
  float cialo = smoothstep(R + 0.05, R - 0.05, r);
  float obw = exp(-abs(r - R) / 0.035) * (0.22 + 0.5 * uGoni) + exp(-max(r - R, 0.0) / 0.16) * (0.05 + 0.12 * uGoni);
  float zyje = 1.0 - uZanik;
  vec3 barwa = mix(vec3(0.34, 0.20, 0.62), vec3(0.75, 0.16, 0.42), uGoni);
  // premultiplikowane: czerń zasłania tło, obwódka świeci
  o = vec4(barwa * obw * zyje * (1.0 - cialo * 0.85), cialo * 0.96 * zyje);
}`,ee=T+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uT, uR;
void main(){
  float r = length(vP), prom = uR * (1.0 - exp(-uT * 2.6));
  // miękka fala światła, nie kreska cyrklem: szeroka, rozmyta i szybko gasnąca
  float pierscien = exp(-abs(r - prom) / (0.14 + 0.3 * uT)) * smoothstep(0.0, 0.25, r);
  o = vec4(mix(uBarwa, vec3(1.0), 0.3) * pierscien * exp(-uT * 3.0) * 0.42, 0.0);
}`;class ie{constructor(a,t){this.gl=a,this.szum=t,this.pDrobinka=new R(a,sa,Jt,"drobinka"),this.pCien=new R(a,sa,te,"cien"),this.pSlad=new R(a,sa,Qt,"slad"),this.pFresk=new R(a,sa,ae,"fresk"),this.pKrag=new R(a,sa,ee,"krag")}miniatura(a,t,i=144){const e=this.gl;this._mini||(this._mini=new W(e,i,i,{wewn:e.RGBA8,format:e.RGBA,typ:e.UNSIGNED_BYTE}),this._czarna=da(e,1,1,{dane:new Uint8Array([0,0,0,255])})),this._mini.ustaw(),e.disable(e.BLEND),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),this.pSlad.uzyj().f("uCam",0,0).f("uPol",.7,.7).f("uSrodek",0,0).f("uObsz",.7,.7).f("uRes",i,i).f("uCzas",0).tex("uSwiatlo",1,this._czarna).f("uSkala",.42).i("uTyp",a).f("uWariant",t).f("uBarwa",...B[a].c).f("uOdsl",1.15),e.drawArrays(e.TRIANGLE_STRIP,0,4);const o=new Uint8Array(i*i*4);e.readPixels(0,0,i,i,e.RGBA,e.UNSIGNED_BYTE,o),e.bindFramebuffer(e.FRAMEBUFFER,null);const s=document.createElement("canvas");s.width=s.height=i;const r=s.getContext("2d"),h=r.createImageData(i,i);for(let u=0;u<i;u++)for(let l=0;l<i;l++){const c=((i-1-u)*i+l)*4,f=(u*i+l)*4,m=o[c],p=o[c+1],k=o[c+2],w=Math.max(m,p,k);h.data[f]=m,h.data[f+1]=p,h.data[f+2]=k,h.data[f+3]=Math.min(255,w*1.6)}return r.putImageData(h,0,0),s.toDataURL("image/png")}_wspolne(a,t){return a.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY)}freski(a,t,i,e,o){if(!t.freski.length)return;const s=this.gl,r=this._wspolne(this.pFresk,a);r.f("uRes",e,o).f("uCzas",a.czas).tex("uSwiatlo",1,i).tex("uSzum",0,this.szum);for(const h of t.freski)Math.abs(h.x-a.cam.x)>a.polX+4||(r.f("uSrodek",h.x,h.y).f("uObsz",3.9,2.25).i("uTyp",h.kraina).f("uBarwa",...B[h.kraina].c).f("uOdsl",h.odkryty?0:h.odsloniecie).f("uOdkryty",h.odkryty?1:0).f("uZaplon",h.odkryty&&h.tZaplonu!=null?Math.exp(-Math.max(0,a.czas-h.tZaplonu)*.9):0),s.drawArrays(s.TRIANGLE_STRIP,0,4))}reszta(a,t,i,e,o,s){const r=this.gl,h=a.polX+1.5;let u=this._wspolne(this.pDrobinka,a);for(const l of i.drobinki)Math.abs(l.px-a.cam.x)>h||(u.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uBarwa",...t.barwaSw).f("uPuls",.8+.2*Math.sin(a.czas*2.2+l.faza)),r.drawArrays(r.TRIANGLE_STRIP,0,4));if(i.cienie.length){u=this._wspolne(this.pCien,a),u.f("uCzas",a.czas).tex("uSzum",0,this.szum);for(const l of i.cienie)Math.abs(l.px-a.cam.x)>h||(u.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uGoni",l.stan===1?1:0).f("uZanik",l.zanik).f("uFaza",l.faza).f("uRuch",l.vx,l.vy),r.drawArrays(r.TRIANGLE_STRIP,0,4))}if(i.slady.length){u=this._wspolne(this.pSlad,a),u.f("uRes",o,s).f("uCzas",a.czas).tex("uSwiatlo",1,e).f("uSkala",.42);for(const l of i.slady)Math.abs(l.x-a.cam.x)>h||(u.f("uSrodek",l.x,l.y+Math.sin(a.czas*.8+l.faza)*.06).f("uObsz",.75,.75).i("uTyp",l.kraina).f("uWariant",l.wariant).f("uBarwa",...B[l.kraina].c).f("uOdsl",l.odsloniecie),r.drawArrays(r.TRIANGLE_STRIP,0,4))}if(i.efekty.length){u=this._wspolne(this.pKrag,a);for(const l of i.efekty){const c=l.rodzaj===2?5:l.rodzaj===1?2.2:1.3;u.f("uSrodek",l.x,l.y).f("uObsz",c+.5,c+.5).f("uBarwa",...t.barwaSw).f("uT",l.t).f("uR",c),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}}}const Ea=["wszystko","tlo","swiat","swiatlo","glow","maska"],oe=170;class se{constructor(a,t){this.gl=a,this.swiat=t,this.szum=lt(a),this.warstwa="wszystko",this.jakosc={tlo:.5,swiatlo:.5,ziarno:.028,drobinki:1,flora:!0},this.ziarno=.028;const i=it(a);this.bTlo=new W(a,4,4,i),this.bSwiat=new W(a,4,4,i),this.bSwiatlo=new W(a,4,4,i),this.bSurowe=new W(a,4,4,i),this.bGlow=[new W(a,4,4,i),new W(a,4,4,i),new W(a,4,4,i)],this.bGlowWy=new W(a,4,4,i),this.pNiebo=new R(a,X,mt,"niebo"),this.pWarstwa=new R(a,X,kt,"warstwa"),this.pBliska=new R(a,X,dt,"warstwa-bliska"),this.pGra=new R(a,X,zt,"plan-gry"),this.pDrobinki=new R(a,vt,xt,"drobinki"),this.pKopia=new R(a,X,ut,"kopia"),this.pDol=new R(a,X,ht,"rozmyj-dol"),this.pGora=new R(a,X,ft,"rozmyj-gora"),this.pFinal=new R(a,X,pt,"final"),this.iskierka=new At(a),this.wypiek=new Wt(a,this.szum,t),this.flora=new Zt(a,t),this.szklo=new Ht(a,this.szum),this.obiekty=new ie(a,this.szum),this.bez={},this.w=0,this.h=0,this.atm={mglaL:[0,0,0],mglaP:[0,0,0],mgla:[0,0,0],mgla2:[0,0,0],gora:[0,0,0],dol:[0,0,0],barwaSw:[0,0,0],emis:[0,0,0],niebo:[0,0,0,0],cialo:[0,0],poswiata:0,swNieba:[0,1,0],pogoda:[0,0,1,0],gruntY:[0,0],woda:[Aa,0,0],wL:new Float32Array(E),wP:new Float32Array(E)},this._camL=[0,0]}rozmiar(a,t){this.w=a,this.h=t;const i=this.jakosc;this.bTlo.rozmiar(a*i.tlo,t*i.tlo),this.bSwiat.rozmiar(a,t),this.bSwiatlo.rozmiar(a*i.swiatlo,t*i.swiatlo),this.bSurowe.rozmiar(a*i.swiatlo,t*i.swiatlo);let e=a*i.swiatlo,o=t*i.swiatlo;for(const s of this.bGlow)e/=2,o/=2,s.rozmiar(e,o);this.bGlowWy.rozmiar(a*i.swiatlo*.5,t*i.swiatlo*.5)}miniatura(a,t){return this.obiekty.miniatura(a,t)}_atmosfera(a){const t=this.atm,i=this.swiat,e=a.cam.x;i.mieszaj(e-a.polX,"mgla",t.mglaL),i.mieszaj(e+a.polX,"mgla",t.mglaP),i.mieszaj(e,"mgla",t.mgla),i.mieszaj(e,"mgla2",t.mgla2),i.mieszaj(e,"nieboGora",t.gora),i.mieszaj(e,"nieboDol",t.dol),i.mieszaj(e,"emis",t.emis);for(let k=0;k<3;k++)t.barwaSw[k]=t.mgla[k]*.68+.34;const o=k=>i.mieszajLiczbe(e,w=>w.niebo[k]);t.niebo[0]=o("tarcza"),t.niebo[1]=o("obrecz"),t.niebo[2]=o("zorza"),t.niebo[3]=o("gwiazdy"),t.poswiata=o("poswiata");const s=o("snopy");t.pogoda[0]=i.mieszajLiczbe(e,k=>k.wiatr),t.pogoda[1]=s,t.pogoda[2]=i.mieszajLiczbe(e,k=>k.mglistosc);const r=i.segment(e),h=a.polX/a.polY;t.cialo[0]=Math.max(-h*.8,Math.min(h*.8,(i.srodekSegmentu(r)-e)*.011+h*.28)),t.cialo[1]=.4-(a.cam.y-5.3)*.012;const u=t.niebo[0]+t.niebo[1];let l=t.cialo[0]*u+.25*s,c=t.cialo[1]*u+1*s+.3;const f=Math.hypot(l,c)||1;t.swNieba[0]=l/f,t.swNieba[1]=c/f,t.swNieba[2]=Math.min(1,.35+u*.7+s*.3),t.gruntY[0]=i.ziemia(e-a.polX),t.gruntY[1]=i.ziemia(e+a.polX),i.wagi(e-a.polX,t.wL),i.wagi(e+a.polX,t.wP),t.woda[1]=t.wL[1],t.woda[2]=t.wP[1];const m=Math.max(0,Math.min(1,(a.iskra.zasieg-a.iskra.zasiegBazowy)/4.7)),p=t.otoczenie=.15+.85*Math.pow(m,.75);for(let k=0;k<3;k++)t.mglaL[k]*=p,t.mglaP[k]*=p,t.mgla[k]*=p,t.mgla2[k]*=p,t.gora[k]*=p,t.dol[k]*=p;return t.niebo[0]*=p,t.niebo[1]*=p,t.niebo[2]*=p,t.poswiata*=p,t.swNieba[2]*=p,t}_widok(a,t){a.f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uRes",this.w,this.h).f("uCzas",t.czas).tex("uSzum",0,this.szum)}_warstwa(a,t,i,e){const o=D[t],s=this.wypiek.warstwy[t];Rt(o,i.cam,this._camL),this._widok(a.uzyj(),i),a.tex("uKafle",1,s.bufor.tex[0]).tex("uKafle2",2,s.bufor.tex[1]).tex("uSwiatlo",3,this.bSwiatlo.tex[0]).f("uCamL",this._camL[0],this._camL[1]).f("uLz",o.z).f("uKafelPar",1/(Gt*o.szer),o.y0,1/o.wys).f("uMglaL",...e.mglaL).f("uMglaP",...e.mglaP).f("uMgla2",...e.mgla2).f("uAtm",o.zamglenie,o.mgla,o.otoczenie,o.iskra).f("uIskra",i.iskra.x,i.iskra.y,i.iskra.zasieg).f("uBarwaSw",...e.barwaSw).f("uEmis",.9,.9,.9).f("uPogoda",...e.pogoda).f("uSwNieba",...e.swNieba).f("uGruntY",...e.gruntY).f("uJasnosc",o.jasnosc),U(this.gl)}rysuj(a){const t=this.gl;if(t.disable(t.BLEND),this.warstwa==="maska"){this._maska(a);return}const i=this._atmosfera(a);if(this.wypiek.zapewnij(a.cam,a.polX,a.iskra.vx),this.bTlo.ustaw(),this._widok(this.pNiebo.uzyj(),a),this.pNiebo.f("uGora",...i.gora).f("uDol",...i.dol).f("uMgla",...i.mgla).f("uMgla2",...i.mgla2).f("uNiebo",...i.niebo).f("uCialo",...i.cialo).f("uPoswiata",i.poswiata),U(t),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),!this.bez.dalekie)for(let u=0;u<4;u++)this._warstwa(this.pWarstwa,u,a,i);t.disable(t.BLEND);const e=a.tecze?a.tecze.wachlarze:[],o=e.length>0;o&&(this.bSurowe.ustaw(),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),this.szklo.wachlarze(a,e),this.bSwiatlo.ustaw(),this.szklo.pNasycenie.uzyj().tex("uTex",0,this.bSurowe.tex[0]),U(t)),(o||this._swiecilo)&&(o||(this.bSwiatlo.ustaw(),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)),this._poswiata()),this._swiecilo=o,a.znaleziska&&a.znaleziska.freski.length&&(this.bTlo.ustaw(),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),this.obiekty.freski(a,a.znaleziska,this.bSwiatlo.tex[0],this.bTlo.w,this.bTlo.h),t.disable(t.BLEND)),this.bSwiat.ustaw(),this.pGra.uzyj().tex("uTlo",4,this.bTlo.tex[0]).f("uWoda",...i.woda),this.bez.gra?(this.pKopia.uzyj().tex("uTex",0,this.bTlo.tex[0]),U(t)):this._warstwa(this.pGra,G,a,i),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),this.jakosc.flora&&!this.bez.flora&&this.flora.rysuj(a,i,this.bSwiatlo.tex[0],this.w,this.h),a.odlamki&&this.szklo.odlamki(a,i,a.odlamki,this.bSwiatlo.tex[0],this.w,this.h),a.znaleziska&&this.obiekty.reszta(a,i,a.znaleziska,this.bSwiatlo.tex[0],this.w,this.h);const s=this.bez.drobinki?0:Math.round(oe*this.jakosc.drobinki);s>0&&(this.pDrobinki.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).fv("uWL",1,i.wL).fv("uWP",1,i.wP).f("uWoda",Aa).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).f("uEmis",...i.emis).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),t.drawArrays(t.POINTS,0,s)),a.mgla=i.mgla,this.bez.iskra||this.iskierka.rysuj(a),this.bez.bliska||this._warstwa(this.pBliska,5,a,i),t.disable(t.BLEND),Ba(t,this.w,this.h);const r=Ea.indexOf(this.warstwa),h=r===1?this.bTlo.tex[0]:r===3?this.bSwiatlo.tex[0]:this.bSwiat.tex[0];this.pFinal.uzyj().tex("uSwiat",0,h).tex("uGlow",1,this.bGlowWy.tex[0]).tex("uSzum",2,this.szum).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uTryb",r===4?3:r===0?0:1).f("uZiarno",this.ziarno),U(t)}pomiar(a,t=40){const i=this.gl,e=new Uint8Array(4);this.rysuj(a),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,e);const o=performance.now();for(let s=0;s<t;s++)a.czas+=.016,this.rysuj(a);return i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,e),(performance.now()-o)/t}_maska(a){const t=this.gl;Ba(t,this.w,this.h),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),a.mgla=this.atm.mgla,this.iskierka.rysuj(a,!0)}_poswiata(){const a=this.gl;let t=this.bSwiatlo;this.pDol.uzyj();for(const i of this.bGlow)i.ustaw(),this.pDol.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),U(a),t=i;this.pGora.uzyj();for(let i=this.bGlow.length-2;i>=0;i--){const e=this.bGlow[i];e.ustaw(),this.pGora.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),U(a),t=e}this.bGlowWy.ustaw(),this.pGora.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),U(a)}}const ba={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,1],w:[0,1],arrowdown:[0,-1],s:[0,-1]};class re{constructor(a){this.canvas=a,this.wcisniete=new Set,this.wskaznik=null,this.poruszono=!1,this.naPierwszyRuch=null;const t=()=>{this.poruszono||(this.poruszono=!0,this.naPierwszyRuch?.())};addEventListener("keydown",e=>{const o=e.key.toLowerCase();ba[o]&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(this.wcisniete.add(o),e.preventDefault(),t())}),addEventListener("keyup",e=>this.wcisniete.delete(e.key.toLowerCase())),addEventListener("blur",()=>{this.wcisniete.clear(),this.wskaznik=null}),a.addEventListener("pointerdown",e=>{this.wskaznik={x:e.clientX,y:e.clientY};try{a.setPointerCapture(e.pointerId)}catch{}t()}),a.addEventListener("pointermove",e=>{this.wskaznik&&(this.wskaznik.x=e.clientX,this.wskaznik.y=e.clientY)});const i=()=>{this.wskaznik=null};a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),a.addEventListener("contextmenu",e=>e.preventDefault())}odczyt(a){let t=0,i=0;for(const s of this.wcisniete)t+=ba[s][0],i+=ba[s][1];const e=Math.hypot(t,i);e>1&&(t/=e,i/=e);let o=null;if(this.wskaznik){const s=this.canvas.getBoundingClientRect(),r=(this.wskaznik.x-s.left)/s.width*2-1,h=1-(this.wskaznik.y-s.top)/s.height*2;o=[a.cam.x+r*a.polX,a.cam.y+h*a.polY]}return{cel:o,os:[t,i]}}}function ne(n){const a=document.createElement("div");a.className="dev",a.innerHTML=`<div id="dev-stan"></div>
    <div class="rzad" id="dev-warstwy"></div>
    <div class="rzad" id="dev-tele"></div>
    <div class="rzad"><button id="dev-ziarno">nowe ziarno</button><button id="dev-pauza">pauza</button></div>`,document.getElementById("nakladka").appendChild(a);const t=a.querySelector("#dev-stan"),i=a.querySelector("#dev-warstwy");for(const s of Ea){const r=document.createElement("button");r.textContent=s,r.dataset.w=s,r.onclick=()=>{n.renderer.warstwa=s,ca("warstwa",s==="wszystko"?null:s),o()},i.appendChild(r)}const e=a.querySelector("#dev-tele");for(const s of n.teleporty()){const r=document.createElement("button");r.textContent=s.nazwa,r.onclick=()=>n.teleport(s.x),e.appendChild(r)}a.querySelector("#dev-ziarno").onclick=()=>{ca("ziarno",Math.floor(Math.random()*1e6)),location.reload()},a.querySelector("#dev-pauza").onclick=()=>{n.petla.pauza=!n.petla.pauza};function o(){for(const s of i.children)s.classList.toggle("wl",s.dataset.w===n.renderer.warstwa)}return o(),setInterval(()=>{const s=n.petla,r=n.renderer,h=n.stan;t.innerHTML=`<b>${s.fps.toFixed(0)} kl./s</b> · ${s.msKlatki.toFixed(1)} ms · ${r.w}×${r.h}<br>ziarno ${n.ziarno} · x ${h.iskra.x.toFixed(1)} y ${h.iskra.y.toFixed(1)} · ${n.opisJakosci()}`},250),a}const Na=132,oa=22,Wa=46;class ce{constructor(a){this.ziarno=a|0,this._perm=new Map,this._komorki=new Map,this._w=new Float32Array(E),this._w2=new Float32Array(E)}_permSurowa(a){const t=ia(this.ziarno,a,5),i=[...Array(E).keys()];for(let e=E-1;e>0;e--){const o=Math.floor(t()*(e+1));[i[e],i[o]]=[i[o],i[e]]}if(a===0)for(;i[0]!==0;)i.push(i.shift());return i}_permutacja(a){let t=this._perm.get(a);if(!t){t=this._permSurowa(a);const i=this._permSurowa(a-1)[E-1];a!==0&&t[0]===i?[t[0],t[1]]=[t[1],t[0]]:a===0&&(this._permSurowa(1)[0],t[E-1]),this._perm.set(a,t)}return t}krainaSegmentu(a){const t=Math.floor(a/E);return this._permutacja(t)[a-t*E]}granica(a){return a*Na-Wa+(ea(a,this.ziarno,77)-.5)*34}segment(a){let t=Math.floor((a+Wa)/Na);for(;a<this.granica(t);)t--;for(;a>=this.granica(t+1);)t++;return t}srodekSegmentu(a){return(this.granica(a)+this.granica(a+1))/2}wagi(a,t=new Float32Array(E)){t.fill(0);const i=this.segment(a),e=this.granica(i),o=this.granica(i+1),s=this.krainaSegmentu(i);if(a>o-oa){const r=ha(o-oa,o+oa,a);t[s]+=1-r,t[this.krainaSegmentu(i+1)]+=r}else if(a<e+oa){const r=ha(e-oa,e+oa,a);t[this.krainaSegmentu(i-1)]+=1-r,t[s]+=r}else t[s]=1;return t}krainaW(a){return this.krainaSegmentu(this.segment(a))}mieszaj(a,t,i=[0,0,0]){const e=this.wagi(a,this._w2);i[0]=i[1]=i[2]=0;for(let o=0;o<E;o++)if(e[o]>0){const s=B[o][t];i[0]+=s[0]*e[o],i[1]+=s[1]*e[o],i[2]+=s[2]*e[o]}return i}mieszajLiczbe(a,t){const i=this.wagi(a,this._w2);let e=0;for(let o=0;o<E;o++)i[o]>0&&(e+=i[o]*t(B[o],o));return e}teleporty(){const a=[];for(let t=0;a.length<E&&t<40;t++){const i=this.krainaSegmentu(t);a.some(e=>e.kraina===i)||a.push({nazwa:B[i].id,kraina:i,x:this.srodekSegmentu(t),segment:t})}return a.sort((t,i)=>t.kraina-i.kraina)}_terenKrainy(a,t){const i=B[a].teren,e=this.ziarno,o=C(t*.021,e+3,3);switch(a){case 1:{const s=C(t*.05,e+31,3);return i.baza+i.amp*(s-.5)*2.1+.12*(C(t*.4,e+32,2)-.5)}case 2:{const s=C(t*.35,e+41,2);return i.baza+i.amp*(o-.5)*2+i.drobne*Math.abs(s-.5)*2}case 3:{const s=i.baza+i.amp*(o-.5)*2*1.6,r=.55,h=s/r,u=Math.floor(h),l=h-u;return(u+ha(.35,.65,l))*r+.05*(C(t*.6,e+51,2)-.5)}case 4:{const s=C(t*.032,e+61,2);return i.baza+i.amp*(s-.5)*2+.25*Math.sin(t*.21+6*s)}default:return i.baza+i.amp*(o-.5)*2+i.drobne*(C(t*.23,e+21,3)-.5)*2}}ziemia(a){const t=this.wagi(a,this._w);let i=0;for(let e=0;e<E;e++)t[e]>0&&(i+=t[e]*this._terenKrainy(e,a));return i}sufit(a){const t=this.wagi(a,this._w)[0];return t<.02?1e4:B[0].teren.sufit+1.1*(C(a*.11,this.ziarno+71,3)-.5)+(1-t)*9}granicaLotu(a){return Math.min(15.3,this.sufit(a)-.5)}terenWarstwy(a,t){if(a===G)return this.ziemia(t);const i=D[a],e=t/i.mnoznikX,o=t/i.z,s=this.ziarno+100*(a+1),r=this.wagi(e,this._w),h=a===0?1.7:a===1?1.25:1;let u=0;if(r[0]>0&&(u+=r[0]*(1.5*C(o*.06,s,3)+.3*C(o*.3,s+1,2))),r[1]>0&&(u+=r[1]*(.35*C(o*.07,s+2,2)+.2)),r[2]>0){const l=C(o*.11,s+3,3);u+=r[2]*(2.3*(1-Math.abs(2*l-1))*h+.5*C(o*.5,s+4,2))}if(r[3]>0){const l=C(o*.05,s+5,2)*3;u+=r[3]*((Math.floor(l)+ha(.4,.6,l-Math.floor(l)))*.55+.2)}return r[4]>0&&(u+=r[4]*(1.9*C(o*.045,s+6,2)*h+.25*Math.sin(o*.3))),i.bliska&&(u=u*.6-.5),u*i.z}sufitWarstwy(a,t){if(a===G)return this.sufit(t);const i=D[a];if(a<2||i.bliska)return 1e4;const e=this.wagi(t/i.mnoznikX,this._w)[0];return e<.02?1e4:i.A+i.z*(a===2?3.4:4.3)+i.z*(1.4*(C(t/i.z*.1,this.ziarno+80+a,3)-.5)+(1-e)*9)}rekwizyty(a,t){const i=a*1e6+t+5e5;let e=this._komorki.get(i);return e||(this._komorki.size>600&&this._komorki.clear(),e=Ot(this,a,t),this._komorki.set(i,e)),e}rekwizytyW(a,t,i){const e=D[a],o=e.komorka*e.z,s=9*e.z,r=[];for(let h=Math.floor((t-s)/o);h<=Math.floor((i+s)/o);h++)for(const u of this.rekwizyty(a,h))u.x+u.ox>t&&u.x-u.ox<i&&r.push(u);return r.sort((h,u)=>h.kolejnosc-u.kolejnosc),r}_bryly(a){const t=D[G],i=Math.floor(a/t.komorka),e=this._tmpBryly||(this._tmpBryly=[]);e.length=0;for(let o=i-1;o<=i+1;o++)for(const s of this.rekwizyty(G,o))s.bryla&&e.push(s.bryla);return e}odleglosc(a,t){let i=Math.min(t-this.ziemia(a),this.granicaLotu(a)-t);for(const e of this._bryly(a)){const o=Math.abs(a-e.x)-e.rx,s=Math.abs(t-e.y)-e.ry,r=Math.hypot(Math.max(o,0),Math.max(s,0))+Math.min(Math.max(o,s),0)-e.r;r<i&&(i=r)}return i}_normalna(a,t){const e=this.odleglosc(a+.06,t)-this.odleglosc(a-.06,t),o=this.odleglosc(a,t+.06)-this.odleglosc(a,t-.06),s=Math.hypot(e,o)||1;return[e/s,o/s]}odpychanie(a,t,i){const e=this.odleglosc(a,t)-i,o=.75;if(e>=o)return le;const s=this._normalna(a,t),r=10*(1-Math.max(0,e)/o)**2;return[s[0]*r,s[1]*r]}zderzenie(a,t,i){const e=this.odleglosc(a,t)-i;if(e>=0)return null;const o=this._normalna(a,t);return{nx:o[0],ny:o[1],gl:-e}}woda(a){return this.ziemia(a)<Aa}}const le=[0,0],ue=1.44,he=1.66,fe=.54,pe=1.4,Sa=13,me=.2,Ma=18,ra=new Float32Array(la*2);function ke(n,a,t,i,e,o,s){let r=!1,h=0;for(let u=0;u<5;u++){let l=1e9,c=0,f=0,m=-1;for(let g=0;g<n;g++){const M=(g+1)%n,z=ra[g*2],K=ra[g*2+1],x=ra[M*2]-z,b=ra[M*2+1]-K,I=i*b-e*x;if(Math.abs(I)<1e-9)continue;const F=z-a,q=K-t,wa=(F*b-q*x)/I,Ka=(F*e-q*i)/I;wa>1e-4&&Ka>=0&&Ka<=1&&wa<l&&(l=wa,c=x,f=b,m=g)}if(m<0)return null;a+=i*l,t+=e*l;let p=f,k=-c;const w=Math.hypot(p,k);p/=w,k/=w;let v=-(i*p+e*k);v<0&&(p=-p,k=-k,v=-v);const d=r?o:1/o,y=1-d*d*(1-v*v);if(y<0)i+=2*v*p,e+=2*v*k,h++;else{const g=Math.sqrt(y);if(i=d*i+(d*v-g)*p,e=d*e+(d*v-g)*k,r=!r,!r){const M=Math.hypot(i,e);return s[0]=a,s[1]=t,s[2]=i/M,s[3]=e/M,s[4]=m,s[5]=h,s}}const S=Math.hypot(i,e);i/=S,e/=S}return null}const de=[0,0,0,0,0,0],pa=(n,a)=>{let t=n-a;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t},_a=n=>n-Math.floor(n),H=[];for(let n=0;n<la;n++)H.push({wr:0,rx:0,ry:0,wf:0,fx:0,fy:0,px:0,py:0,ile:0,waga:0,kat:0,dk:0,ox:0,oy:0,szer:0});function Ga(n,a,t){const i=n.v.length,e=Math.hypot(a,t),o=-a/e,s=-t/e,r=1.9*n.zasieg/Sa;ja.wierzcholki(n,ra);for(let l=0;l<i;l++){const c=H[l];c.wr=c.rx=c.ry=c.wf=c.fx=c.fy=c.px=c.py=c.ile=c.waga=0}let h=0,u=0;for(let l=0;l<Sa;l++){const c=((l+.5)/Sa*2-1)*n.zasieg*.95;let f=-s*c-a,m=o*c-t;const p=Math.hypot(f,m);f/=p,m/=p;let k=!1;for(let w=0;w<2;w++){const v=ke(i,a,t,f,m,w?he:ue,de);if(!v||(k=!0,v[5]>2||v[2]*o+v[3]*s<me))continue;const d=v[5]===0?1:v[5]===1?.5:.25,y=H[v[4]];w?(y.wf+=d,y.fx+=v[2]*d,y.fy+=v[3]*d):(y.wr+=d,y.rx+=v[2]*d,y.ry+=v[3]*d),y.px+=v[0]*d,y.py+=v[1]*d,y.ile++}k&&h++}for(let l=0;l<i;l++){const c=H[l];if(c.wr<=0||c.wf<=0){c.waga=0;continue}const f=Math.atan2(c.ry,c.rx);c.dk=pa(Math.atan2(c.fy,c.fx),f),c.kat=f+c.dk/2,c.ox=c.px/(c.wr+c.wf),c.oy=c.py/(c.wr+c.wf),c.waga=(c.wr+c.wf)/(2*Math.max(1,h)),c.szer=c.ile*.5*r,c.waga>u&&(u=c.waga)}return u}function Za(n,a,t,i,e,o){const s=_a(a.faza*7.31+t*.37),r=_a(a.faza*3.17+t*.61),h=_a(a.faza*5.71+t*.23),u=Math.abs(n.dk);return o.rozw=Math.max(.27,Math.min(pe,(fe+.72*(1-Math.exp(-u*4)))*(.9+.22*s)*(.3+1*e))),o.start=Math.min(1,Math.max(.2,n.szer*.8/Math.tan(o.rozw/2))),o.dlugosc=Math.min(5.2,i*(.52+.45*Math.sqrt(n.waga))*(.85+.3*r)*(.4+.85*e)),o.skos=(h*2-1)*.55,o.znak=(n.dk>=0?1:-1)*Math.min(1,u/.035),o}function qa(n,a,t,i=0){const e=Math.abs(n),o=a-i;if(e>=1||o<=0)return 0;const s=(e-.6)/.4,r=e<.6?1:1-s*s*(3-2*s),h=o/t,u=Math.min(1,o/.4);return r*u*u*(3-2*u)*Math.exp(-h*h*2.4)}const L={};class ze{constructor(){this.wachlarze=[],this._pula=[]}aktualizuj(a,t,i){const e=this.wachlarze;e.length=0;const o=1.6+t.zasieg*1.25,s=1.7+t.zasieg*.62,r=1-Math.exp(-a*9),h=1-Math.exp(-a*5);let u=0;const l=()=>(this._pula[u]||(this._pula[u]={}),this._pula[u++]);for(const f of i){const m=f.px-t.x,p=f.py-t.y,k=Math.hypot(m,p);let w=0;k<o&&k>f.zasieg*.6&&(w=Math.pow(1-k/o,1.15));const v=f.oswietlenie;if(f.oswietlenie+=(w-f.oswietlenie)*h,v<.15&&f.oswietlenie>=.15&&this.naSzklo?.(f),f.oswietlenie<.01||k<.001){f.wachlarz=null;continue}const d=f.v.length;let y=f.wachlarz;if(!y){y=f.wachlarz=[];for(let g=0;g<d;g++)y.push({sila:0,kat:0,ox:0,oy:0,rozw:0,start:0,dlugosc:0,skos:0,znak:0})}const S=w>0?Ga(f,-m,-p):0;for(let g=0;g<d;g++){const M=H[g],z=y[g],K=S>0?M.waga/S:0;if(K<.4)z.sila+=(0-z.sila)*h;else{Za(M,f,g,s,w,L);const I=M.ox-Math.cos(M.kat)*L.start,F=M.oy-Math.sin(M.kat)*L.start;z.sila<.02?(z.kat=M.kat,z.ox=I,z.oy=F,z.rozw=L.rozw,z.start=L.start,z.dlugosc=L.dlugosc,z.znak=L.znak):(z.kat+=pa(M.kat,z.kat)*r,z.ox+=(I-z.ox)*r,z.oy+=(F-z.oy)*r,z.rozw+=(L.rozw-z.rozw)*r,z.start+=(L.start-z.start)*r,z.dlugosc+=(L.dlugosc-z.dlugosc)*r,z.znak+=(L.znak-z.znak)*r),z.skos=L.skos,z.sila+=(Math.pow(K,1.5)-z.sila)*h}const x=z.sila*f.oswietlenie*Math.min(1,Math.abs(z.znak)*1.6);if(x<.02||e.length>=Ma-2)continue;const b=l();b.x=f.px+z.ox,b.y=f.py+z.oy,b.kat=z.kat,b.rozwarcie=z.rozw,b.dlugosc=z.dlugosc,b.start=z.start,b.skos=z.skos,b.sila=x,b.znak=z.znak>=0?1:-1,b.zi=f.faza+g*1.7,b.zrodlo=f,b.wtorny=!1,e.push(b)}}const c=e.length;for(let f=0;f<c&&e.length<Ma;f++){const m=e[f];for(const p of i){if(p===m.zrodlo)continue;const k=p.px-m.x,w=p.py-m.y,v=Math.hypot(k,w);if(v>m.start+m.dlugosc*.95||v<m.start+.4)continue;const d=pa(Math.atan2(w,k),m.kat)/(m.rozwarcie/2),y=qa(d,v,m.dlugosc,m.start)*m.sila*.75;if(y<.12||Ga(p,-k,-w)<=0)continue;let g=0;for(let K=1;K<p.v.length;K++)H[K].waga>H[g].waga&&(g=K);const M=H[g];if(Za(M,p,g+3,m.dlugosc*.9,Math.min(1,.35+y),L),Math.abs(L.znak)<.6)continue;const z=l();if(z.x=p.px+M.ox-Math.cos(M.kat)*L.start,z.y=p.py+M.oy-Math.sin(M.kat)*L.start,z.kat=M.kat,z.rozwarcie=L.rozw,z.dlugosc=L.dlugosc,z.start=L.start,z.skos=L.skos,z.sila=y,z.znak=L.znak>=0?1:-1,z.zi=p.faza+1,z.zrodlo=p,z.wtorny=!0,p.oswietlenie=Math.max(p.oswietlenie,y*.8),e.push(z),e.length>=Ma)break}}}natezenie(a,t,i=1){let e=0;for(const o of this.wachlarze){const s=a-o.x,r=t-o.y,h=Math.hypot(s,r);h>o.start+o.dlugosc*1.4*i||(e+=qa(pa(Math.atan2(r,s),o.kat)/(o.rozwarcie/2*i),h,o.dlugosc*i,o.start/i)*o.sila)}return e}}const Ra=6,Q={wech:5,wytrwalosc:6.5,odpoczynek:9,przewaga:1.12,minPredkosc:2.3,kradnie:.3},ka=[{rodzaj:"Pióro",nazwy:["Pióro puszczyka","Pióro sójki","Pióro czapli","Pióro kruka","Pióro jastrzębia","Pióro bez ptaka"]},{rodzaj:"Klucz",nazwy:["Klucz od śluzy","Klucz przewoźnika","Klucz bez drzwi","Klucz z dna","Klucz latarnika","Klucz od niczego"]},{rodzaj:"Kwiat w krysztale",nazwy:["Kwiat pięciopłatkowy","Kwiat nocy","Kwiat szronu","Kwiat ośmiu płatków","Kwiat ciszy","Kwiat, który nie zwiądł"]},{rodzaj:"Znak w kamieniu",nazwy:["Znak bramy","Znak wody","Znak drogi","Znak snu","Znak strażnika","Znak zapomniany"]},{rodzaj:"Skamielina",nazwy:["Muszla mała","Muszla podwójna","Muszla żebrowana","Muszla wielka","Muszla ciasno zwinięta","Muszla sprzed światła"]}],Ta=["Fresk koron","Fresk księżyca nad wodą","Fresk kryształowego serca","Fresk procesji","Fresk czarnego słońca"];function we(n,a,t){const i=ia(n.ziarno,7717,a),e=a*Z,o={drobinki:[],slady:[],fresk:Ha(n,a),cien:null};for(let r=0;r<3;r++){const h=e+(r+i())*Z/3,u=n.ziemia(h),l=Math.min(n.granicaLotu(h)-.8,u+8.5);o.drobinki.push({id:`d${a}:${r}`,x:h,y:u+.9+i()*Math.max(.5,l-u-.9),faza:i()*6.283})}const s=ia(n.ziarno,4243,a);if(e>48&&s()<.34){const r=e+(.15+.7*s())*Z,h=n.ziemia(r),u=Math.min(n.granicaLotu(r)-1,h+8);o.cien={id:`c${a}`,x:r,y:h+1.5+s()*Math.max(.5,u-h-1.5),px:r,py:0,vx:0,vy:0,faza:s()*6.283,stan:0,sily:0,odpoczynek:0,zanik:0},o.cien.py=o.cien.y}return t.forEach((r,h)=>{if(!(i()>.42))for(let u=0;u<6;u++){const l=i()*6.283,c=1.5+i()*1.1,f=r.x+Math.cos(l)*c,m=r.y+Math.sin(l)*c*.85;if(m>n.ziemia(f)+.7&&m<n.granicaLotu(f)-.5){o.slady.push({id:`s${a}:${h}`,x:f,y:m,kraina:n.krainaW(f),wariant:Math.floor(i()*Ra),faza:i()*6.283,odsloniecie:0});break}}}),o}class ye{constructor(a,t,i){this.swiat=a,this.kolekcja=i,this.kawalki=new Map,this.zebrane=new Set,this.drobinki=[],this.slady=[],this.freski=[],this.efekty=[],this.cienie=[],this.cienieWlaczone=!0,this.zdarzenie=null,t.naNowyKawalek=(e,o)=>this.kawalki.set(e,we(a,e,o)),this._odlamki=t}krok(a,t,i,e){this.drobinki.length=0,this.slady.length=0,this.freski.length=0,this.cienie.length=0;for(const[o,s]of this.kawalki){if(!this._odlamki.kawalki.has(o)){this.kawalki.delete(o);continue}for(const h of s.drobinki){if(this.zebrane.has(h.id))continue;h.px=h.x+Math.sin(e*.7+h.faza)*.3,h.py=h.y+Math.cos(e*.9+h.faza)*.25;const u=Math.hypot(t.x-h.px,t.y-h.py);if(u<2.2&&u>.001){const l=(1-u/2.2)*2.4*a;h.x+=(t.x-h.px)*l,h.y+=(t.y-h.py)*l}if(u<.5){this.zebrane.add(h.id),t.energia=Math.min(1,t.energia+.17),t.tracnij(4),this.efekty.push({x:h.px,y:h.py,t:0,rodzaj:0}),this.zdarzenie?.("energia",h);continue}this.drobinki.push(h)}for(const h of s.slady){if(this.zebrane.has(h.id))continue;const u=i.natezenie(h.x,h.y,1.3),l=h.odsloniecie;if(h.odsloniecie=Math.max(0,Math.min(1,h.odsloniecie+(u>.05?a*(.9+u*2):-a*.015))),l<.6&&h.odsloniecie>=.6&&this.zdarzenie?.("odsloniecie",h),h.odsloniecie>=.6&&Math.hypot(t.x-h.x,t.y-h.y)<.75){this.zebrane.add(h.id);const c=this.kolekcja.dodajSlad(h.kraina,h.wariant);t.energia=Math.min(1,t.energia+.12),t.tracnij(3),this.efekty.push({x:h.x,y:h.y,t:0,rodzaj:1}),this.zdarzenie?.("slad",{...h,nowy:c});continue}h.odsloniecie>.005&&this.slady.push(h)}s.cien&&this.cienieWlaczone&&!this.zebrane.has(s.cien.id)&&this._cien(s.cien,a,t,i,e);const r=s.fresk;if(r){const h=this.swiat.ziarno+":"+r.id;if(!r.odkryty&&(this.zebrane.has(r.id)||this.kolekcja.jestZapalony(h))&&(r.odkryty=!0),!r.odkryty){let u=0;for(let l=-2;l<=2;l++)u+=i.natezenie(r.x+l*.9,r.y+l%2*.5,1.3);if(u/=5,r.odsloniecie=Math.max(0,Math.min(1,r.odsloniecie+(u>.06?a*(.12+u*.5):-a*.01))),r.odsloniecie>=1){r.odkryty=!0,r.tZaplonu=e,this.zebrane.add(r.id),this.kolekcja.zapalFresk(h);const l=this.kolekcja.dodajFresk(r.kraina);t.energia=1,this.efekty.push({x:r.x,y:r.y,t:0,rodzaj:2}),this.zdarzenie?.("fresk",{...r,nowy:l})}}this.freski.push(r)}}for(let o=this.efekty.length-1;o>=0;o--){const s=this.efekty[o];s.t+=a,s.t>1.6&&this.efekty.splice(o,1)}}_cien(a,t,i,e,o){if(a.zanik>0){if(a.zanik+=t*1.6,a.zanik>=1){this.zebrane.add(a.id);return}this.cienie.push(a);return}const s=i.x-a.px,r=i.y-a.py,h=Math.hypot(s,r)||.001;let u,l,c;a.stan===0?(a.odpoczynek-=t,u=a.x+Math.sin(o*.4+a.faza)*.6,l=a.y+Math.cos(o*.53+a.faza)*.4,c=.6,h<Q.wech&&a.odpoczynek<=0&&(a.stan=1,a.sily=Q.wytrwalosc,this.zdarzenie?.("cien-budzi",a))):a.stan===1?(u=i.x,l=i.y,c=Math.max(Q.minPredkosc,Math.hypot(i.vx,i.vy)*Q.przewaga),a.sily-=t,(a.sily<=0||h>Q.wech*2.2)&&(a.stan=2)):(u=a.x,l=a.y,c=1.1,Math.hypot(a.x-a.px,a.y-a.py)<.5&&(a.stan=0,a.odpoczynek=Q.odpoczynek));const f=u-a.px,m=l-a.py,p=Math.hypot(f,m)||.001,k=f/p*c*Math.min(1,p/.4),w=m/p*c*Math.min(1,p/.4),v=1-Math.exp(-t*2.6);a.vx+=(k-a.vx)*v,a.vy+=(w-a.vy)*v,a.px+=a.vx*t,a.py+=a.vy*t,a.py=Math.max(this.swiat.ziemia(a.px)+.4,Math.min(this.swiat.granicaLotu(a.px)-.3,a.py)),e.natezenie(a.px,a.py)>.22?(a.zanik=.01,a.wTeczy=!0,this.efekty.push({x:a.px,y:a.py,t:0,rodzaj:0}),this.zdarzenie?.("cien-rozproszony",a)):a.stan===1&&h<.42&&(i.energia=Math.max(0,i.energia-Q.kradnie),i.zasieg=Math.max(i.zasiegBazowy,i.zasieg-.5),i.vx*=.45,i.vy*=.45,i.tracnij(-5),a.zanik=.01,a.wTeczy=!1,this.zdarzenie?.("cien",a)),this.cienie.push(a)}}const Xa="iskierka-kolekcja-v1";class ve{constructor(a=xe()){this.pamiec=a,this.slady={},this.freski={},this.zapalone={};try{const t=JSON.parse(a?.getItem(Xa)||"null");t&&typeof t=="object"&&(this.slady=t.slady||{},this.freski=t.freski||{},this.zapalone=t.zapalone||{})}catch{}this.naZmiane=null}_zapisz(){try{this.pamiec?.setItem(Xa,JSON.stringify({slady:this.slady,freski:this.freski,zapalone:this.zapalone}))}catch{}this.naZmiane?.()}dodajSlad(a,t){const i=`${a}-${t}`,e=!this.slady[i];return this.slady[i]=(this.slady[i]||0)+1,this._zapisz(),e}dodajFresk(a){const t=!this.freski[a];return this.freski[a]=!0,this._zapisz(),t}zapalFresk(a){this.zapalone[a]=!0,this._zapisz()}jestZapalony(a){return!!this.zapalone[a]}maSlad(a,t){return!!this.slady[`${a}-${t}`]}maFresk(a){return!!this.freski[a]}ileSladow(){return Object.keys(this.slady).length}ileFreskow(){return Object.keys(this.freski).length}wszystkichSladow(){return ka.length*Ra}wszystkichFreskow(){return Ta.length}wyczysc(){this.slady={},this.freski={},this.zapalone={},this._zapisz()}}function xe(){try{return window.localStorage}catch{return null}}class ge{constructor(a){this.kolekcja=a;const t=this.el=document.createElement("div");t.className="hud",t.innerHTML=`<div class="hud-prawy"><span class="hud-slady" id="hud-slady"></span>
      <div class="hud-energia" role="img" aria-label="Energia"><i id="hud-en"></i></div></div>
      <div class="hud-kraina" id="hud-kraina"></div><div class="hud-wiesc" id="hud-wiesc" role="status" aria-live="polite"></div>`,document.getElementById("nakladka").appendChild(t),this.slady=t.querySelector("#hud-slady"),this.en=t.querySelector("#hud-en"),this.krainaEl=t.querySelector("#hud-kraina"),this.wiescEl=t.querySelector("#hud-wiesc"),this.kraina=-1,this._enPoprz=-1,this.odswiez()}odswiez(){this.slady.textContent=`ślady ${this.kolekcja.ileSladow()} / ${this.kolekcja.wszystkichSladow()}`}energia(a){const t=Math.round(a*100);t!==this._enPoprz&&(this._enPoprz=t,this.en.style.width=t+"%")}ustawKraine(a){if(a===this.kraina)return;const t=this.kraina<0;this.kraina=a,clearTimeout(this._tk),this.krainaEl.classList.remove("widac"),this._tk=setTimeout(()=>{this.krainaEl.textContent=B[a].nazwa,this.krainaEl.classList.add("widac"),this._tk=setTimeout(()=>this.krainaEl.classList.remove("widac"),5e3)},t?300:900)}wiesc(a){clearTimeout(this._tw),this.wiescEl.textContent=a,this.wiescEl.classList.add("widac"),this._tw=setTimeout(()=>this.wiescEl.classList.remove("widac"),4200)}}const Ya=[{akord:[146.83,220,369.99,659.25],filtr:1e3,wiatr:0,wiatrHz:1800,skala:[293.66,369.99,440,554.37,659.25]},{akord:[69.3,103.83,164.81,246.94],filtr:480,wiatr:.16,wiatrHz:300,skala:[277.18,329.63,415.3,493.88,554.37]},{akord:[110,164.81,277.18,493.88],filtr:1100,wiatr:.03,wiatrHz:2400,skala:[440,554.37,659.25,830.61,987.77]},{akord:[98,146.83,196,220],filtr:700,wiatr:.08,wiatrHz:700,skala:[392,440,587.33,659.25,783.99]},{akord:[61.74,92.5,130.81,185],filtr:420,wiatr:.3,wiatrHz:900,skala:[246.94,277.18,369.99,415.3,493.88]}],be=[.85,.9,1,.85,.65];class Se{constructor(){this.ac=null,this.wlaczony=!1,this.wagi=new Float32Array(E),this.licznik={szklo:0,energia:0,odsloniecie:0,slad:0,fresk:0},this._ostSzklo=0,this._doAktualizacji=0,this.glosnosc=.75}get dostepny(){return typeof(window.AudioContext||window.webkitAudioContext)=="function"}_zbuduj(){const a=window.AudioContext||window.webkitAudioContext,t=this.ac=new a;this.wyjscie=t.createGain(),this.wyjscie.gain.value=0,this.analizator=t.createAnalyser(),this.analizator.fftSize=1024;const i=t.createDynamicsCompressor();i.threshold.value=-20,i.knee.value=12,i.ratio.value=6,i.attack.value=.01,i.release.value=.4,this.wyjscie.connect(i),i.connect(this.analizator),this.analizator.connect(t.destination),this.poglos=t.createGain(),this.poglos.gain.value=.3;for(const[h,u]of[[.37,.52],[.53,.46]]){const l=t.createDelay(1.5);l.delayTime.value=h;const c=t.createBiquadFilter();c.type="lowpass",c.frequency.value=1900;const f=t.createGain();f.gain.value=u,this.poglos.connect(l),l.connect(c),c.connect(f),f.connect(l),c.connect(this.wyjscie)}const e=t.sampleRate*3,o=t.createBuffer(1,e,t.sampleRate),s=o.getChannelData(0);let r=0;for(let h=0;h<e;h++)r=r*.97+(Math.random()*2-1)*.03,s[h]=r*6;this.szum=t.createBufferSource(),this.szum.buffer=o,this.szum.loop=!0,this.szum.start(),this.tla=Ya.map(h=>{const u=t.createGain();u.gain.value=0;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=h.filtr,l.Q.value=.4,l.connect(u),u.connect(this.wyjscie),u.connect(this.poglos),h.akord.forEach((k,w)=>{for(const v of[-5,6]){const d=t.createOscillator();d.type=w%2?"triangle":"sine",d.frequency.value=k,d.detune.value=v+w;const y=t.createGain();y.gain.value=.034/(1+w*.35);const S=t.createOscillator();S.frequency.value=.03+.017*w+(v>0?.011:0);const g=t.createGain();g.gain.value=y.gain.value*.6,S.connect(g),g.connect(y.gain),S.start(),d.connect(y),y.connect(l),d.start()}});const c=t.createBiquadFilter();c.type="bandpass",c.frequency.value=h.wiatrHz,c.Q.value=.7;const f=t.createGain();f.gain.value=h.wiatr*.45;const m=t.createOscillator();m.frequency.value=.07;const p=t.createGain();return p.gain.value=h.wiatr*.2,m.connect(p),p.connect(f.gain),m.start(),this.szum.connect(c),c.connect(f),f.connect(u),u})}async przelacz(a=!this.wlaczony){return this.dostepny?(this.ac||this._zbuduj(),this.wlaczony=a,a&&this.ac.resume().catch(()=>{}),this.wyjscie.gain.setTargetAtTime(a?this.glosnosc:0,this.ac.currentTime,.5),this.wlaczony):!1}ustawGlosnosc(a){this.glosnosc=a,this.ac&&this.wlaczony&&this.wyjscie.gain.setTargetAtTime(a,this.ac.currentTime,.2)}aktualizuj(a,t){if(this.wagi.set(t),!(!this.ac||!this.wlaczony)&&(this._doAktualizacji-=a,!(this._doAktualizacji>0))){this._doAktualizacji=.25;for(let i=0;i<E;i++)this.tla[i].gain.setTargetAtTime(t[i]*be[i],this.ac.currentTime,1.6)}}_krainaDominujaca(){let a=0;for(let t=1;t<E;t++)this.wagi[t]>this.wagi[a]&&(a=t);return a}_dzwonek(a,t,i=0,e=2.6,o="sine"){const s=this.ac,r=s.currentTime+i,h=s.createOscillator(),u=s.createOscillator(),l=s.createGain(),c=s.createGain();h.type=o,h.frequency.value=a,u.type="sine",u.frequency.value=a*2.01,c.gain.value=.18,l.gain.setValueAtTime(0,r),l.gain.linearRampToValueAtTime(t,r+.02),l.gain.exponentialRampToValueAtTime(4e-4,r+e),h.connect(l),u.connect(c),c.connect(l),l.connect(this.wyjscie),l.connect(this.poglos),h.start(r),u.start(r),h.stop(r+e+.1),u.stop(r+e+.1)}zdarzenie(a,t){if(a in this.licznik&&this.licznik[a]++,!this.ac||!this.wlaczony)return;const i=Ya[t&&t.kraina!=null?t.kraina:this._krainaDominujaca()].skala;if(a==="szklo"){const e=this.ac.currentTime;if(e-this._ostSzklo<.35)return;this._ostSzklo=e;const o=i[Math.abs(Math.floor(t.faza*97))%i.length]*2;this._dzwonek(o,.022,0,1.8),this._dzwonek(o*1.5,.008,.03,1.2)}else a==="cien"?(this._dzwonek(i[0]/2,.05,0,1.4,"triangle"),this._dzwonek(i[0]/2*.94,.04,.12,1.8,"triangle")):a==="cien-rozproszony"?this._dzwonek(i[4]*2,.02,0,1.2):a==="energia"?(this._dzwonek(i[1]*2,.04,0,1.6,"triangle"),this._dzwonek(i[3]*2,.035,.11,2,"triangle")):a==="odsloniecie"?[0,2,4].forEach((e,o)=>this._dzwonek(i[e],.04,o*.16,2.8)):a==="slad"?[0,1,2,3,4].forEach((e,o)=>this._dzwonek(i[e]*(o===4?2:1),.05,o*.13,3.2)):a==="fresk"&&[0,2,4,1,3].forEach((e,o)=>{this._dzwonek(i[e]/2,.06,o*.4,6),this._dzwonek(i[e]*2,.02,o*.4+.2,5)})}poziom(){if(!this.ac)return 0;const a=new Float32Array(this.analizator.fftSize);this.analizator.getFloatTimeDomainData(a);let t=0;for(const i of a)t+=i*i;return Math.sqrt(t/a.length)}}const na=[{nazwa:"wysoka",tlo:1,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"średnia",tlo:.5,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"oszczędna",tlo:.5,swiatlo:.34,drobinki:.5,flora:!0,skala:1},{nazwa:"niska",tlo:.4,swiatlo:.34,drobinki:.35,flora:!0,skala:.9},{nazwa:"minimalna",tlo:.4,swiatlo:.25,drobinki:.25,flora:!1,skala:.8}],Me=2.5;class _e{constructor(a){this.auto=!0,this.poziom=1,this.naZmiane=a,this._ms=[],this._czas=0,this._dobre=0,this._sufit=0,this._blokada=0,this._rozgrzewka=4}get ustawienia(){return na[this.poziom]}ustaw(a){a==="auto"?(this.auto=!0,this._sufit=0):(this.auto=!1,this._zmien(Math.max(0,Math.min(na.length-1,a|0))))}_zmien(a){a!==this.poziom&&(this.poziom=a,this.naZmiane(na[a])),this._ms.length=0,this._czas=0,this._rozgrzewka=1}probka(a,t){if(!this.auto)return;if(this._rozgrzewka>0){this._rozgrzewka-=t;return}if(this._blokada=Math.max(0,this._blokada-t),this._ms.push(a),this._czas+=t,this._czas<Me)return;let i=0,e=0;for(const s of this._ms)s<120&&(i+=s,e++);const o=e?i/e:16.7;this._ms=[],this._czas=0,(this.dziennik||(this.dziennik=[])).push(`${this.poziom}:${o.toFixed(1)}`),this.dziennik.length>40&&this.dziennik.shift(),o>19.5&&this.poziom<na.length-1?(this._blokada=this._probaWGore?600:45,this._probaWGore=!1,this._sufit=this.poziom+1,this._dobre=0,this._zmien(this.poziom+1)):o<17.4&&this.poziom>this._sufit&&this.poziom>0?++this._dobre>=4&&(this._dobre=0,this._probaWGore=!0,this._zmien(this.poziom-1)):(this._dobre=0,this._blokada===0&&(this._sufit=0))}}const at="iskierka-ustawienia-v1",P=(n,a,t)=>{const i=document.createElement(n);return a&&(i.className=a),t!=null&&(i.textContent=t),i};function Pe(){try{const n=JSON.parse(localStorage.getItem(at)||"null");if(n&&typeof n=="object")return{jakosc:"auto",glosnosc:.75,...n}}catch{}return{jakosc:"auto",glosnosc:.75}}function Ae(n){try{localStorage.setItem(at,JSON.stringify(n))}catch{}}class Le{constructor(a){this.gra=a,this.otwarte=!1,this.ustawienia=Pe();const t=document.getElementById("nakladka");this.tytul=P("div","tytul"),this.tytul.innerHTML='<h1>Iskierka</h1><p class="podtytul">leć w ciemność · szkło pokaże barwy</p><p class="podpowiedz">Przytrzymaj mysz lub palec tam, dokąd iskierka ma lecieć. Klawiatura: W A S D lub strzałki.</p>',t.appendChild(this.tytul);const i=this.rzad=P("div","rzad-przyciskow");this.bDzwiek=P("button","przycisk"),this.bDzwiek.type="button",this.bDzwiek.id="b-dzwiek",this.bDzwiek.onclick=async()=>{await a.dzwiek.przelacz(),this._opiszDzwiek(),this.bDzwiek.blur()},this.bMenu=P("button","przycisk","Menu"),this.bMenu.type="button",this.bMenu.id="b-menu",this.bMenu.setAttribute("aria-haspopup","dialog"),this.bMenu.onclick=()=>this.przelacz(),i.append(this.bDzwiek,this.bMenu),t.appendChild(i),this._opiszDzwiek(),this.obrot=P("div","obrot","Obróć telefon poziomo: zobaczysz więcej świata."),t.appendChild(this.obrot),this.panel=P("div","panel"),this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-label","Menu"),this.panel.hidden=!0;const e=P("div","okno"),o=P("div","okno-naglowek");o.appendChild(P("h2",null,"Pauza"));const s=P("div","zakladki");this.zakladki={};for(const[r,h]of[["kolekcja","Kolekcja"],["ustawienia","Ustawienia"]]){const u=P("button","zakladka",h);u.type="button",u.onclick=()=>this._pokaz(r),s.appendChild(u),this.zakladki[r]=u}o.appendChild(s),this.bWroc=P("button","przycisk glowny","Wróć do lotu"),this.bWroc.type="button",this.bWroc.id="b-wroc",this.bWroc.onclick=()=>this.przelacz(!1),o.appendChild(this.bWroc),this.tresc=P("div","okno-tresc"),e.append(o,this.tresc),this.panel.appendChild(e),this.panel.addEventListener("pointerdown",r=>{r.target===this.panel&&this.przelacz(!1)}),t.appendChild(this.panel),addEventListener("keydown",r=>{r.key==="Escape"||r.key.toLowerCase()==="p"&&!this._wPolu(r)?(r.preventDefault(),this.przelacz()):r.key.toLowerCase()==="m"&&!this._wPolu(r)?this.bDzwiek.click():r.key.toLowerCase()==="f"&&!this._wPolu(r)&&this.pelnyEkran()}),document.addEventListener("visibilitychange",()=>{document.hidden&&!this.otwarte&&a.sterowanie.poruszono&&this.przelacz(!0)}),a.sterowanie.naPierwszyRuch=()=>this.tytul.classList.add("znika"),this._miniatury=new Map,this._zakladka="kolekcja",this._zastosuj()}_wPolu(a){const t=a.target;return t&&(t.tagName==="INPUT"||t.tagName==="SELECT"||t.tagName==="TEXTAREA")}_opiszDzwiek(){const a=this.gra.dzwiek;if(!a.dostepny){this.bDzwiek.disabled=!0,this.bDzwiek.textContent="Brak dźwięku";return}this.bDzwiek.textContent=a.wlaczony?"Wycisz":"Włącz dźwięk",this.bDzwiek.setAttribute("aria-pressed",String(a.wlaczony))}_zastosuj(){const a=this.ustawienia,t=this.gra;t.jakosc.ustaw(a.jakosc==="auto"?"auto":Number(a.jakosc)),t.dzwiek.ustawGlosnosc(a.glosnosc)}przelacz(a=!this.otwarte){a!==this.otwarte&&(this.otwarte=a,this.panel.hidden=!a,this.gra.petla.pauza=a,this.gra.petla.zamrozona=a,this.rzad.classList.toggle("schowany",a),a?(this.tytul.classList.add("znika"),this._pokaz(this._zakladka),this.bWroc.focus()):(this.bMenu.blur(),this.gra.canvas.focus?.()))}_pokaz(a){this._zakladka=a;for(const[t,i]of Object.entries(this.zakladki))i.classList.toggle("wybrana",t===a);this.tresc.replaceChildren(a==="kolekcja"?this._kolekcja():this._ustawienia())}_miniatura(a,t){const i=a+"-"+t;return this._miniatury.has(i)||this._miniatury.set(i,this.gra.renderer.miniatura(a,t)),this._miniatury.get(i)}_kolekcja(){const a=this.gra.kolekcja,t=P("div","kolekcja");return t.appendChild(P("p","kolekcja-stan",`Ślady: ${a.ileSladow()} z ${a.wszystkichSladow()} · freski: ${a.ileFreskow()} z ${a.wszystkichFreskow()}`)),B.forEach((i,e)=>{const o=P("section","kolekcja-kraina");o.appendChild(P("h3",null,`${i.nazwa} · ${ka[e].rodzaj.toLowerCase()}`));const s=P("div","siatka");for(let h=0;h<Ra;h++){const u=a.maSlad(e,h),l=P("figure","kafel"+(u?" znaleziony":""));if(u){const c=new Image;c.src=this._miniatura(e,h),c.alt="",l.appendChild(c)}else l.appendChild(P("div","nieznany","?"));l.appendChild(P("figcaption",null,u?ka[e].nazwy[h]:"jeszcze w ciemności")),s.appendChild(l)}const r=P("p","fresk"+(a.maFresk(e)?" znaleziony":""),a.maFresk(e)?"✦ "+Ta[e]:"Fresk tej krainy czeka na barwne światło.");o.append(s,r),t.appendChild(o)}),t}_ustawienia(){const a=this.ustawienia,t=this.gra,i=P("div","ustawienia"),e=(f,m,p)=>{const k=P("label","pole");return k.appendChild(P("span","pole-opis",f)),k.appendChild(m),p&&k.appendChild(P("span","pole-uwaga",p)),i.appendChild(k),m},o=()=>{Ae(a),this._zastosuj()},s=P("select");s.id="u-jakosc",s.appendChild(new Option("automatyczna","auto")),na.forEach((f,m)=>s.appendChild(new Option(f.nazwa,String(m)))),s.value=String(a.jakosc),s.onchange=()=>{a.jakosc=s.value,o()},e("Jakość obrazu",s,"Automatyczna pilnuje płynności: najpierw upraszcza efekty, rozdzielczość rusza na samym końcu.");const r=P("input");r.type="range",r.min="0",r.max="1",r.step="0.05",r.value=String(a.glosnosc),r.id="u-glosnosc",r.oninput=()=>{a.glosnosc=Number(r.value),o()},e("Głośność",r,t.dzwiek.wlaczony?null:"Dźwięk włącza się przyciskiem w rogu ekranu.");const h=P("div","rzad"),u=P("button","przycisk",document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran");u.type="button",u.onclick=async()=>{await this.pelnyEkran(),u.textContent=document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran"};const l=P("button","przycisk","Nowy świat");l.type="button",l.onclick=()=>{ca("ziarno",Math.floor(Math.random()*1e6)),ca("kraina",null),ca("x",null),location.reload()};const c=P("button","przycisk","Wyczyść kolekcję");return c.type="button",c.onclick=()=>{c.dataset.pewne?(t.kolekcja.wyczysc(),c.textContent="Kolekcja wyczyszczona",c.disabled=!0):(c.dataset.pewne="1",c.textContent="Na pewno? Naciśnij jeszcze raz")},h.append(u,l,c),i.appendChild(h),i.appendChild(P("p","pole-uwaga",`Świat nr ${t.ziarno}. Ten sam numer w adresie (?ziarno=${t.ziarno}) zawsze daje ten sam świat. Skróty: Esc lub P — pauza, M — dźwięk, F — pełny ekran.`)),i}async pelnyEkran(){try{if(document.fullscreenElement)await document.exitFullscreen();else{await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.("landscape")}catch{}}}catch{}}}const je=1080,N=document.getElementById("gra"),Ee=document.getElementById("nakladka");function tt(n){const a=document.createElement("div");a.className="blad",a.textContent=n,Ee.appendChild(a)}function Re(){const n=et(N);if(!n){(window.__bledy||(window.__bledy=[])).push("brak WebGL2"),tt("Ta przeglądarka nie udostępnia WebGL2, a Iskierka go potrzebuje.");return}const a=new ce(j.ziarno),t=new se(n,a);Ea.includes(j.warstwa)&&(t.warstwa=j.warstwa);const i=new Mt(j.ziarno);let e=null;const o=new re(N),s=new ja(a),r=new ze,h=new ve,u=new ye(a,s,h),l=new ge(h);(j.test||j.warstwa==="maska")&&(l.el.style.visibility="hidden"),h.naZmiane=()=>l.odswiez();const c=new Se;r.naSzklo=x=>c.zdarzenie("szklo",x);const f=[(x,b)=>c.zdarzenie(x,b)],m=new Float32Array(B.length);u.zdarzenie=(x,b)=>{x==="slad"?l.wiesc(ka[b.kraina].nazwy[b.wariant]+(b.nowy?"":" (już w kolekcji)")):x==="fresk"&&l.wiesc(Ta[b.kraina]);for(const I of f)I(x,b)};const p={czas:0,iskra:i,cam:{x:i.x,y:6.5},polX:ta*16/9,polY:ta};let k=1;const w=new _e(x=>{t.jakosc=x,k=x.skala,v()});t.jakosc=w.ustawienia;function v(){const x=Math.min(window.devicePixelRatio||1,2),b=N.clientWidth||innerWidth,I=N.clientHeight||innerHeight;let F=Math.min(I*x,je)*k,q=F*b/I;q=Math.max(320,Math.round(q)),F=Math.max(180,Math.round(F)),(N.width!==q||N.height!==F)&&(N.width=q,N.height=F),p.polX=ta*q/F,t.rozmiar(q,F)}addEventListener("resize",v),v();function d(x){p.czas+=x,i.krok(x,e||o.odczyt(p),a);const b=1-Math.exp(-x*1.6);p.cam.x+=(i.x+i.vx*.5-p.cam.x)*b,p.cam.y+=(i.y+.6-p.cam.y)*b,y(),s.krok(x,p.cam,p.polX,p.czas),r.aktualizuj(x,i,s.widoczne),u.krok(x,i,r,p.czas),c.aktualizuj(x,a.wagi(i.x,m))}function y(){p.cam.y=Math.max(Math.max(a.ziemia(p.cam.x)+ta-1.9,4.7),Math.min(12.4,p.cam.y))}const S=()=>({cam:p.cam,polX:p.polX,polY:p.polY,czas:p.czas,iskra:i,tecze:r.ukryte?null:r,odlamki:s.widoczne,znaleziska:u});function g(x,b){b&&w.probka(b*1e3,b),i.zbudujSmuge(aa),l.energia(i.energia),l.ustawKraine(a.krainaW(i.x)),t.rysuj(S())}const M=new ot({krok:d,rysuj:g}),z={gotowe:!0,canvas:N,sterowanie:o,jakosc:w,stan:p,petla:M,renderer:t,swiat:a,odlamki:s,tecze:r,znaleziska:u,kolekcja:h,hud:l,sluchacze:f,dzwiek:c,ziarno:j.ziarno,bledy:[],teleporty:()=>a.teleporty(),teleport(x,b){i.przenies(x,b??a.ziemia(x)+4.5),p.cam.x=x,p.cam.y=i.y+.6,y()},przewin(x){M.przewin(x),g()},rysuj:g,pomiar:x=>t.pomiar(S(),x),ustawWejscie(x){e=x},krainy:B,opisJakosci:()=>`jakość ${w.auto?"auto: ":""}${w.ustawienia.nazwa}`,info(){return{renderer:n.getParameter(n.RENDERER),w:N.width,h:N.height,fps:M.fps,hdr:n.ext.floatBuf}}};if(window.iskierka=z,j.kraina){const x=a.teleporty().find(b=>b.nazwa===j.kraina);x&&z.teleport(x.x+j.dx,a.ziemia(x.x+j.dx)+4.5+j.dy)}else j.x!=null?z.teleport(j.x):z.teleport(8);const K=z.menu=new Le(z);j.jakosc!=null&&w.ustaw(j.jakosc==="auto"?"auto":Number(j.jakosc)),j.debug&&ne(z),j.test&&(M.pauza=!0,j.jakosc==null&&w.ustaw(1),u.cienieWlaczone=!1,K.tytul.style.display="none",K.rzad.style.visibility="hidden",K.obrot.style.visibility="hidden"),M.start()}addEventListener("error",n=>{(window.__bledy||(window.__bledy=[])).push(String(n.message))});try{Re()}catch(n){console.error(n),(window.__bledy||(window.__bledy=[])).push(String(n.message)),tt("Nie udało się uruchomić gry: "+n.message)}
