(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();function Ct(c){const a=c.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!a)return null;const e={floatBuf:!!a.getExtension("EXT_color_buffer_float"),halfBuf:!!a.getExtension("EXT_color_buffer_half_float")};return a.ext=e,a.bezFloat=new URLSearchParams(location.search).has("rgba8"),a.domyslnyVAO=a.createVertexArray(),a.bindVertexArray(a.domyslnyVAO),a}function ut(c,a,e,i){const t=c.createShader(a);if(c.shaderSource(t,e),c.compileShader(t),!c.getShaderParameter(t,c.COMPILE_STATUS)){const o=c.getShaderInfoLog(t),s=e.split(`
`).map((r,n)=>`${n+1}: ${r}`).join(`
`);throw console.error(s),new Error(`Shader "${i}" się nie skompilował: ${o}`)}return t}const H=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;class R{constructor(a,e,i,t="program"){this.gl=a,this.nazwa=t;const o=a.createProgram();if(a.attachShader(o,ut(a,a.VERTEX_SHADER,e,t+".vs")),a.attachShader(o,ut(a,a.FRAGMENT_SHADER,i,t+".fs")),a.linkProgram(o),!a.getProgramParameter(o,a.LINK_STATUS))throw new Error(`Program "${t}" się nie zlinkował: ${a.getProgramInfoLog(o)}`);this.p=o,this.u={};const s=a.getProgramParameter(o,a.ACTIVE_UNIFORMS);for(let r=0;r<s;r++){const n=a.getActiveUniform(o,r),h=n.name.replace(/\[0\]$/,"");this.u[h]=a.getUniformLocation(o,n.name)}}uzyj(){return this.gl.useProgram(this.p),this}f(a,e,i,t,o){const s=this.gl,r=this.u[a];return r==null?this:(o!==void 0?s.uniform4f(r,e,i,t,o):t!==void 0?s.uniform3f(r,e,i,t):i!==void 0?s.uniform2f(r,e,i):s.uniform1f(r,e),this)}i(a,e){const i=this.u[a];return i!=null&&this.gl.uniform1i(i,e),this}fv(a,e,i){const t=this.gl,o=this.u[a];return o==null?this:(e===1?t.uniform1fv(o,i):e===2?t.uniform2fv(o,i):e===3?t.uniform3fv(o,i):t.uniform4fv(o,i),this)}tex(a,e,i){const t=this.gl,o=this.u[a];return o==null?this:(t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,i),t.uniform1i(o,e),this)}}function Na(c,a,e,i={}){const{wewn:t=c.RGBA8,format:o=c.RGBA,typ:s=c.UNSIGNED_BYTE,dane:r=null,filtr:n=c.LINEAR,zawijanieS:h=c.CLAMP_TO_EDGE,zawijanieT:l=c.CLAMP_TO_EDGE,mipmapy:u=!1}=i,f=c.createTexture();return c.bindTexture(c.TEXTURE_2D,f),c.texImage2D(c.TEXTURE_2D,0,t,a,e,0,o,s,r),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,u?c.LINEAR_MIPMAP_LINEAR:n),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,n),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,h),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,l),u&&c.generateMipmap(c.TEXTURE_2D),f}function Kt(c,a=!1){return c.ext.floatBuf&&!c.bezFloat?a?{wewn:c.RGBA16F,format:c.RGBA,typ:c.HALF_FLOAT}:{wewn:c.R11F_G11F_B10F,format:c.RGB,typ:c.HALF_FLOAT}:{wewn:c.RGBA8,format:c.RGBA,typ:c.UNSIGNED_BYTE}}class ta{constructor(a,e,i,t,o={}){this.gl=a,this.formaty=Array.isArray(t)?t:[t],this.opcje=o,this.fbo=a.createFramebuffer(),this.tex=[],this.w=0,this.h=0,this.rozmiar(e,i)}rozmiar(a,e){if(a=Math.max(1,Math.round(a)),e=Math.max(1,Math.round(e)),a===this.w&&e===this.h)return;const i=this.gl;this.w=a,this.h=e;for(const o of this.tex)i.deleteTexture(o);this.tex=this.formaty.map(o=>Na(i,a,e,{...o,...this.opcje})),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),this.tex.forEach((o,s)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+s,i.TEXTURE_2D,o,0)),i.drawBuffers(this.tex.map((o,s)=>i.COLOR_ATTACHMENT0+s));const t=i.checkFramebufferStatus(i.FRAMEBUFFER);if(t!==i.FRAMEBUFFER_COMPLETE)throw new Error("Niekompletny bufor ramki: 0x"+t.toString(16));i.bindFramebuffer(i.FRAMEBUFFER,null)}ustaw(){const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,this.fbo),a.viewport(0,0,this.w,this.h)}}function ht(c,a,e){c.bindFramebuffer(c.FRAMEBUFFER,null),c.viewport(0,0,a,e)}function Q(c){c.drawArrays(c.TRIANGLES,0,3)}const ha=1/120;class Ft{constructor({krok:a,rysuj:e}){this.krok=a,this.rysuj=e,this.zapas=0,this.ostatni=0,this.dziala=!1,this.pauza=!1,this.zamrozona=!1,this.fps=60,this.msKlatki=16.7,this._klatki=0,this._okno=0,this.historiaMs=[],this._tik=this._tik.bind(this)}start(){this.dziala||(this.dziala=!0,this.ostatni=performance.now(),requestAnimationFrame(this._tik))}stop(){this.dziala=!1}_tik(a){if(!this.dziala)return;const e=(a-this.ostatni)/1e3;this.ostatni=a;const i=Math.min(e,.1);if(!this.pauza){this.zapas+=i;let t=0;for(;this.zapas>=ha&&t<16;)this.krok(ha),this.zapas-=ha,t++;t===16&&(this.zapas=0)}if(this.zamrozona){requestAnimationFrame(this._tik);return}this.rysuj(this.zapas/ha,e),this._klatki++,this._okno+=e,this.historiaMs.push(e*1e3),this.historiaMs.length>240&&this.historiaMs.shift(),this._okno>=.5&&(this.fps=this._klatki/this._okno,this.msKlatki=1e3/this.fps,this._klatki=0,this._okno=0),requestAnimationFrame(this._tik)}przewin(a){const e=Math.round(a/ha);for(let i=0;i<e;i++)this.krok(ha)}}const oa=new URLSearchParams(location.search),_a=(c,a)=>{const e=parseFloat(oa.get(c));return Number.isFinite(e)?e:a},F={ziarno:Math.floor(_a("ziarno",1)),maZiarno:oa.has("ziarno"),kraina:oa.get("kraina"),x:oa.has("x")?_a("x",0):null,dy:_a("dy",0),dx:_a("dx",0),debug:oa.has("debug"),test:oa.has("test"),warstwa:oa.get("warstwa")||"wszystko",jakosc:oa.get("jakosc"),maska:oa.has("maska")};function xa(c,a){const e=new URL(location.href);a==null?e.searchParams.delete(c):e.searchParams.set(c,a),history.replaceState(null,"",e)}function st(c){return()=>{c|=0,c=c+1831565813|0;let a=Math.imul(c^c>>>15,1|c);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function za(c,a=0,e=0){let i=Math.imul(c|0,668265261)^Math.imul(a|0,374761393)^Math.imul(e|0,2654435761)|0;return i^=i>>>15,i=Math.imul(i,2246822507),i^=i>>>13,i=Math.imul(i,3266489909),i^=i>>>16,(i>>>0)/4294967296}function ea(c,a=0,e=0){return st(za(c,a,e)*4294967296|0)}const It=c=>c*c*(3-2*c);function Ot(c,a=0){const e=Math.floor(c),i=c-e;return za(e,a)+(za(e+1,a)-za(e,a))*It(i)}function K(c,a=0,e=4){let i=0,t=.5,o=0;for(let s=0;s<e;s++)i+=t*Ot(c,a+s*17),o+=t,c*=2.03,t*=.5;return i/o}const Dt=(c,a,e)=>Math.max(a,Math.min(e,c)),da=(c,a,e)=>{const i=Dt((e-c)/(a-c),0,1);return i*i*(3-2*i)};function Nt(c,a,e){const i=new Float32Array(a*a);for(let s=0;s<i.length;s++)i[s]=za(s,e,a);const t=new Float32Array(c*c),o=a/c;for(let s=0;s<c;s++){const r=s*o,n=Math.floor(r);let h=r-n;h=h*h*(3-2*h);const l=n%a*a,u=(n+1)%a*a;for(let f=0;f<c;f++){const p=f*o,z=Math.floor(p);let m=p-z;m=m*m*(3-2*m);const w=z%a,d=(z+1)%a,k=i[l+w],y=i[l+d],x=i[u+w],v=i[u+d];t[s*c+f]=k+(y-k)*m+(x+(v-x)*m-k-(y-k)*m)*h}}return t}function Za(c,a,e,i){const t=new Float32Array(c*c);let o=.5,s=0;for(let r=0;r<e;r++){const n=a<<r;if(n>c)break;const h=Nt(c,n,i+r*101);for(let l=0;l<t.length;l++)t[l]+=h[l]*o;s+=o,o*=.5}for(let r=0;r<t.length;r++)t[r]/=s;return t}function Zt(c,a=256){const e=Za(a,4,5,11),i=Za(a,4,5,57),t=Za(a,16,4,93),o=new Uint8Array(a*a*4);for(let s=0;s<a*a;s++)o[s*4]=e[s]*255,o[s*4+1]=i[s]*255,o[s*4+2]=t[s]*255,o[s*4+3]=za(s,7)*255;return Na(c,a,a,{dane:o,zawijanieS:c.REPEAT,zawijanieT:c.REPEAT,mipmapy:!0})}const E=`#version 300 es
precision highp float;
precision highp sampler2D;
`,ma=`
uniform vec2 uCam;
uniform vec2 uPol;
uniform vec2 uRes;
uniform float uCzas;
uniform sampler2D uSzum;
vec2 swiatZUv(vec2 uv){ return uCam + (uv * 2.0 - 1.0) * uPol; }
float kleby(vec2 p){ return texture(uSzum, p).r; }
float kleby2(vec2 p){ return texture(uSzum, p).g; }
float faktura(vec2 p){ return texture(uSzum, p).b; }
`,Wt=E+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = vec4(texture(uTex, vUv).rgb, 1.0); }`,Gt=E+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb;
  o = vec4(s / 8.0, 1.0);
}`,qt=E+`
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
}`,Yt=E+`
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
}`,Ma=`
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
}`,ba=16,Xt=.3;class Vt{constructor(){this.dane=new Float32Array(ba*4),this.nr=0,this.ox=null,this.oy=0,this.wyslanych=0,this.wyczysc()}wyczysc(){for(let a=0;a<ba;a++)this.dane[a*4+2]=0,this.dane[a*4+3]=-100;this.ox=null}krok(a,e){if(this.ox===null){this.ox=a.x,this.oy=a.y;return}const i=a.x-this.ox,t=a.y-this.oy,o=Math.hypot(i,t);if(o>3){this.wyczysc();return}if(o<Xt)return;const s=this.nr*4;this.dane[s]=a.x-i*.5,this.dane[s+1]=a.y-t*.5,this.dane[s+2]=Math.max(-1.3,Math.min(1.3,a.vx/3)),this.dane[s+3]=e,this.nr=(this.nr+1)%ba,this.wyslanych++,this.ox=a.x,this.oy=a.y}}const Ut=E+ma+`
in vec2 vUv; out vec4 o;
uniform vec3 uGora, uDol, uMgla, uMgla2;
uniform vec4 uNiebo;     // tarcza księżyca, czarne słońce z obręczą, zorza, gwiazdy
uniform vec2 uCialo;     // położenie ciała niebieskiego na ekranie
uniform float uPoswiata;
uniform vec2 uZjawiska;   // zaćmienie księżyca (0..1), dodatkowe gwiazdy
uniform vec4 uBurza;      // siła burzy, błysk (0..1), położenie pioruna na ekranie, ziarno jego kształtu
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
  // zaćmienie: ciemna tarcza nasuwa się z boku na księżyc; gdy go zakryje, zostaje blada obręcz
  float zc = uZjawiska.x;
  float zakryte = zc > 0.001 ? smoothstep(0.29, 0.24, length(d - vec2(0.70, 0.12) * (1.0 - zc))) : 0.0;
  col += uNiebo.x * vec3(0.72, 0.85, 1.0) * (smoothstep(0.27, 0.19, r) * 0.20 * (0.7 + 0.6 * k2) * (1.0 - zakryte) + 0.15 * exp(-r * 2.1) * (1.0 - 0.75 * zc));
  if (zc > 0.001) {
    float calk = smoothstep(0.8, 1.0, zc);
    float ob = exp(-abs(r - 0.265) * 26.0) * (0.55 + 0.9 * kleby(vec2(atan(d.y, d.x) * 0.22, uCzas * 0.01)));
    col += uNiebo.x * vec3(0.80, 0.88, 1.0) * (ob * 0.5 + 0.08 * exp(-max(r - 0.27, 0.0) * 3.0)) * calk;
  }
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
  col += (uNiebo.w + uZjawiska.y) * gw * 0.34 * smoothstep(0.0, 0.5, t) * (1.0 - k1 * 0.8) * (1.0 - 0.9 * uBurza.x);
  // burza: ciężkie chmury, a w błysku łuna za chmurami i sam piorun
  if (uBurza.x > 0.001) {
    float chm = kleby(vec2(s.x * 0.09 + uCam.x * 0.002 + uCzas * 0.004, s.y * 0.2 + 0.7));
    col *= 1.0 - uBurza.x * 0.45 * smoothstep(0.3, 0.75, chm) * smoothstep(-0.1, 0.5, t);
    if (uBurza.y > 0.003) {
      float odl = abs(s.x - uBurza.z);
      col += vec3(0.72, 0.80, 1.0) * uBurza.y * (0.05 + 0.34 * exp(-odl * 1.1)) * (0.35 + 1.1 * chm) * smoothstep(-0.3, 0.4, t);
      float bx = uBurza.z + (kleby(vec2(s.y * 0.23 + uBurza.w, uBurza.w * 0.37)) - 0.5) * 0.9 + (kleby2(vec2(s.y * 1.3 + uBurza.w, 0.3)) - 0.5) * 0.16;
      float piorun = exp(-abs(s.x - bx) * 150.0) + 0.12 * exp(-abs(s.x - bx) * 14.0);
      col += vec3(0.85, 0.90, 1.0) * piorun * uBurza.y * 2.4 * smoothstep(0.0, 0.12, t);
    }
  }
  o = vec4(col, 1.0);
}`,Mt=`
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
`,$t=E+ma+Mt+`
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
}`,Ht=E+ma+`
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
}`,Jt=E+ma+Mt+`
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
}`,_t=6,Qt=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, grubość, faza, rodzaj (0 trawa, 1 liana, 2 trzcina)
layout(location = 2) in vec4 aKol;     // barwa, podatność na wiatr
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
uniform vec4 uPodmuchy[${ba}];
out vec2 vSw; out float vV; out vec3 vKol; out float vT;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${_t});
  float wisi = aPar.w > 0.5 && aPar.w < 1.5 ? -1.0 : 1.0;
  float wiatr = (sin(uCzas * 1.3 + aPar.z + aBaza.x * 0.4) * 0.22 + sin(uCzas * 0.47 + aBaza.x * 0.13) * 0.34 + 0.12) * aKol.a;
  // Źdźbła kładą się za przelatującą iskierką: każdy zapisany podmuch działa jak pchnięcie
  // tłumionej sprężyny (wychylenie zgodne z lotem, powrót, lekkie przejście na drugą stronę).
  vec2 sr = aBaza + vec2(0.0, wisi * aPar.x * 0.6);
  float omega = 7.0 + 3.0 * fract(aPar.z * 1.61), pchniecie = 0.0;
  for (int k = 0; k < ${ba}; k++) {
    vec4 q = uPodmuchy[k];
    float wiek = max(0.0, uCzas - q.w);
    vec2 dq = sr - q.xy;
    pchniecie += q.z * exp(-dot(dq, dq) / 0.7) * exp(-wiek * 2.3) * sin(wiek * omega);
  }
  // sama obecność iskierki lekko rozchyla źdźbła na boki (płynnie, bez przeskoku nad źdźbłem)
  vec2 od = sr - uIskra.xy;
  pchniecie = clamp(pchniecie * 0.6 * aKol.a, -1.25, 1.25) + od.x * exp(-dot(od, od) / 0.5) * 0.5;
  float kat = (aPar.z - 3.14) * 0.09 + wiatr + pchniecie;
  float a = kat * t;
  vec2 kier = vec2(sin(a), wisi * cos(a));
  vec2 p = aBaza + kier * aPar.x * t;
  float gr = aPar.y * (1.0 - 0.8 * t);
  if (aPar.w > 1.5) gr += aPar.y * 2.2 * smoothstep(0.62, 0.74, t) * smoothstep(0.98, 0.88, t);   // pałka trzciny
  p += vec2(kier.y, -kier.x) * bok * gr;
  vSw = p; vV = bok; vKol = aKol.rgb; vT = t;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,ae=E+`
in vec2 vSw; in float vV; in vec3 vKol; in float vT; out vec4 o;
uniform vec3 uIskra, uBarwaSw; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  float a = smoothstep(1.0, 0.25, abs(vV)) * smoothstep(1.02, 0.9, vT);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = vKol * (uBarwaSw * blask * (0.5 + 0.6 * vT) + tecza * 1.3 + 0.004);
  o = vec4(c * a, a);
}`,te=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas;
uniform float uWL[6]; uniform float uWP[6];
uniform float uWoda;
out float vAlfa; out float vKlasa; out vec2 vSw; out float vMig;
float hsz(float n){ return fract(sin(n * 91.345 + 7.1) * 47453.5453); }
void main(){
  float id = float(gl_VertexID);
  int klasa = gl_VertexID % 6;
  float h = hsz(id), h2 = hsz(id + 17.3), h3 = hsz(id + 41.7), h4 = hsz(id + 77.7);
  float glab = mix(0.6, 1.45, h3);
  vec2 pudlo = uPol * 2.0 + vec2(5.0, 4.0);
  vec2 v; float rozm; float alfa = 1.0; vec2 dryf = vec2(0.0);
  float t = uCzas;
  if (klasa == 0) { v = vec2(0.10, -0.20); rozm = 2.4; dryf = vec2(sin(t * 0.6 + h * 40.0) * 0.25, cos(t * 0.45 + h2 * 30.0) * 0.1); }
  else if (klasa == 1) { v = vec2(0.22, 0.015); rozm = 46.0; alfa = 0.085; }
  else if (klasa == 2) { v = vec2(0.02, 0.16); rozm = 2.6; dryf = vec2(sin(t * 0.4 + h * 40.0) * 0.15, 0.0); }
  else if (klasa == 3) { v = vec2(0.05, -0.085); rozm = 2.0; dryf = vec2(sin(t * 0.5 + h * 40.0) * 0.12, 0.0); }
  else if (klasa == 4) { v = vec2(-2.3, -0.22); rozm = 2.2; dryf = vec2(0.0, sin(t * 1.1 + h * 40.0) * 0.2); }
  else { v = vec2(-0.65, -0.34); rozm = 2.5; dryf = vec2(sin(t * 0.8 + h * 40.0) * 0.3, cos(t * 0.5 + h2 * 20.0) * 0.08); }   // grań: igiełki lodu niesione wiatrem
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
}`,ee=E+`
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
  if (vKlasa > 4.5) c += vec3(0.05) + uBarwaSw * blask * 0.5;       // lód łapie światło mocniej niż pył
  o = vec4(c * plama * vAlfa, 0.0);
}`,ie=E+ma+`
in vec2 vUv; out vec4 o;
uniform vec2 uCamL; uniform float uLz;
uniform vec4 uOlbrzym;      // x, wysokość ziemi, wysokość postaci, faza chodu
uniform float uKier;
uniform vec3 uMgla, uMgla2;
float odc(vec2 p, vec2 a, vec2 b, float ra, float rb){
  vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - mix(ra, rb, h);
}
float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float noga(vec2 p, vec2 biodro, float faza){
  // stopa stoi na ziemi i cofa się względem tułowia, potem unosi się i wraca do przodu
  float c = cos(faza), s = sin(faza);
  vec2 stopa = vec2(biodro.x - 0.12 * c, max(0.0, s) * 0.06);
  vec2 sr = (biodro + stopa) * 0.5;
  vec2 kolano = sr + vec2(0.035 + 0.03 * max(0.0, s), 0.02);
  return min(odc(p, biodro, kolano, 0.017, 0.011), odc(p, kolano, stopa, 0.011, 0.007));
}
void main(){
  vec2 pl = uCamL + (vUv * 2.0 - 1.0) * uPol * uLz;
  vec2 p = (pl - uOlbrzym.xy) / uOlbrzym.z;
  p.x *= uKier;
  if (abs(p.x) > 0.8 || p.y > 1.4) discard;
  float f = uOlbrzym.w;
  float kolys = sin(f * 2.0) * 0.008;
  p.y -= kolys;
  // tułów: długa, garbata bryła wysoko nad ziemią
  float d = odc(p, vec2(-0.17, 0.90), vec2(0.13, 0.94), 0.060, 0.050);
  d = smin(d, length((p - vec2(-0.04, 0.985)) * vec2(0.55, 1.0)) - 0.055, 0.05);
  // szyja i mała głowa, lekko kiwająca się w rytm kroków
  // długa szyja opada łukiem ku ziemi; mała głowa wisi nisko i kołysze się w rytm kroków
  vec2 kark = vec2(0.14, 0.95), lok = vec2(0.25, 0.99), glowa = vec2(0.31 + 0.012 * sin(f), 0.84 + 0.014 * sin(f * 2.0 + 1.0));
  d = smin(d, odc(p, kark, lok, 0.032, 0.020), 0.04);
  d = smin(d, odc(p, lok, glowa, 0.020, 0.011), 0.035);
  d = smin(d, length((p - glowa - vec2(0.008, -0.018)) * vec2(1.0, 0.7)) - 0.018, 0.02);
  // na grzbiecie niesie coś jak ruinę: kilka cienkich, krzywych masztów
  d = smin(d, odc(p, vec2(-0.10, 1.00), vec2(-0.13, 1.19), 0.010, 0.003), 0.02);
  d = smin(d, odc(p, vec2(-0.03, 1.03), vec2(-0.02, 1.27), 0.011, 0.003), 0.02);
  d = smin(d, odc(p, vec2(0.04, 1.00), vec2(0.07, 1.15), 0.009, 0.003), 0.02);
  // cztery nogi, każda w innej fazie chodu
  d = smin(d, noga(p, vec2(-0.15, 0.88), f), 0.03);
  d = smin(d, noga(p, vec2(-0.10, 0.88), f + 3.14159), 0.03);
  d = smin(d, noga(p, vec2(0.08, 0.90), f + 1.5708), 0.03);
  d = smin(d, noga(p, vec2(0.12, 0.90), f + 4.7124), 0.03);
  float pok = smoothstep(0.012, -0.012, d);
  if (pok < 0.003) discard;
  // mgła: przy ziemi postać w niej tonie, w górze ciemnieje na tle nieba
  float m = kleby(pl * 0.004 + vec2(uCzas * 0.002, 0.0));
  vec3 c = mix(uMgla, uMgla2, 0.6) * mix(0.150, 0.060, smoothstep(0.0, 1.1, p.y)) * (0.8 + 0.4 * m);
  float alfa = pok * mix(0.35, 0.92, smoothstep(0.0, 0.5, p.y));
  o = vec4(c * alfa, alfa);
}`,oe=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas, uSila;
out float vAlfa; out vec2 vSw; out float vBarwa; out float vMig;
float hsz(float n){ return fract(sin(n * 78.233 + 3.3) * 43758.5453); }
void main(){
  float id = float(gl_VertexID);
  float h = hsz(id), h2 = hsz(id + 11.1), h3 = hsz(id + 37.7), h4 = hsz(id + 59.9);
  float glab = mix(0.7, 1.4, h3);
  vec2 pudlo = uPol * 2.0 + vec2(4.0, 4.0);
  vec2 v = vec2(-0.12 - 0.1 * h4, -0.55 - 0.5 * h3);
  vec2 dryf = vec2(sin(uCzas * (0.5 + h) + h2 * 40.0) * 0.22, 0.0);
  vec2 od = mod(vec2(h, h2) * pudlo + v * uCzas + dryf - uCam * glab, pudlo) - pudlo * 0.5;
  vec2 kraw = smoothstep(pudlo * 0.5, pudlo * 0.5 - 1.0, abs(od));
  vSw = uCam + od;
  vMig = pow(0.5 + 0.5 * sin(uCzas * (2.0 + h4 * 4.0) + h * 70.0), 5.0);
  vBarwa = fract(h2 * 7.0 + uCzas * 0.03 * (h - 0.5));
  // drobiny pojawiają się stopniowo: przy słabym zjawisku widać tylko część
  vAlfa = kraw.x * kraw.y * smoothstep(h4 * 0.8, h4 * 0.8 + 0.2, uSila);
  gl_Position = vec4(od / uPol, 0.0, 1.0);
  gl_PointSize = max(3.0, (5.0 + 8.0 * vMig) * uRes.y / 720.0 / mix(1.25, 0.75, h3));
}`,se=E+Ma+`
in float vAlfa; in vec2 vSw; in float vBarwa; in float vMig; out vec4 o;
uniform vec3 uIskra; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(q, q);
  vec2 g = abs(q);
  float ksztalt = exp(-r2 * 9.0) + 0.25 * exp(-r2 * 2.5) + 0.6 * vMig * (exp(-g.x * 16.0 - g.y * 2.2) + exp(-g.y * 16.0 - g.x * 2.2));
  vec2 L = uIskra.xy - vSw; float r = length(L) / (uIskra.z * 1.3);
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = mix(widmo(vBarwa), vec3(1.0), 0.22) * (0.05 + 0.5 * vMig + 1.5 * blask * (0.35 + vMig)) + tecza * 0.9;
  o = vec4(c * ksztalt * vAlfa * smoothstep(1.0, 0.7, r2), 0.0);
}`,Ba=20,tt=.17,U=96,re=.42,Wa=1.55,Ga=.75,ne=1.25,le={ciagWskaznik:5.6,ciagKlawisze:5.6,oporCiag:1.55,oporSwobodny:.8,maksPredkosc:3.7,kolysanie:.16,drgniecieCo:[4.5,9],drgniecieSila:[.06,.14]};class ce{constructor(a=1){this.x=8,this.y=6,this.vx=0,this.vy=0,this.zasiegBazowy=1.15,this.zasieg=this.zasiegBazowy,this.energia=0,this.pradX=0,this.pradY=0,this.wPradzie=0,this.tempo=Ga,this.dx=0,this.dy=0,this.dvx=0,this.dvy=0,this.puls=0,this.pulsV=0,this.t=0,this.los=st(a*7919+13),this.doDrgniecia=3,this.hx=new Float32Array(U),this.hy=new Float32Array(U),this.hi=0,this.hn=0,this.smuga=new Float32Array(Ba*2),this.dlSmugi=0,this.pudlo=[0,0,0,0],this.resetSmugi()}resetSmugi(){this.hn=0,this.hi=0;for(let a=0;a<Ba;a++)this.smuga[a*2]=this.x,this.smuga[a*2+1]=this.y}przenies(a,e){this.x=a,this.y=e,this.vx=0,this.vy=0,this.pradX=this.pradY=0,this.dx=this.dy=this.dvx=this.dvy=0,this.resetSmugi()}tracnij(a){this.pulsV+=a}krok(a,e,i){this.t+=a;const t=le;this.tempo+=(Ga+(ne-Ga)*this.energia-this.tempo)*Math.min(1,a*1.5);const o=this.tempo;let s=e.os[0]*t.ciagKlawisze*o,r=e.os[1]*t.ciagKlawisze*o,n=s!==0||r!==0;if(e.cel){const k=e.cel[0]-this.x,y=e.cel[1]-this.y,x=Math.hypot(k,y);if(x>.12){const v=Math.min(1,x/1.8)*t.ciagWskaznik*o;s+=k/x*v,r+=y/x*v}n=!0}const h=this.t;if(s+=t.kolysanie*(Math.sin(h*.83)+.6*Math.sin(h*1.91+1.7)+.35*Math.sin(h*3.3+.4)),r+=t.kolysanie*(Math.cos(h*.71+.6)+.6*Math.sin(h*2.17+2.2)+.35*Math.cos(h*2.9+1.1)),this.doDrgniecia-=a,this.doDrgniecia<=0){this.doDrgniecia=t.drgniecieCo[0]+this.los()*(t.drgniecieCo[1]-t.drgniecieCo[0]);const k=this.los()*Math.PI*2,y=t.drgniecieSila[0]+this.los()*(t.drgniecieSila[1]-t.drgniecieSila[0]);this.vx+=Math.cos(k)*y,this.vy+=Math.sin(k)*y,this.pulsV+=1.2}const l=i.odpychanie(this.x,this.y,tt);s+=l[0],r+=l[1],this.vx+=s*a,this.vy+=r*a;const u=Math.exp(-a*(n?t.oporCiag:t.oporSwobodny));this.vx*=u,this.vy*=u;const f=Math.hypot(this.vx,this.vy),p=t.maksPredkosc*o;f>p&&(this.vx*=p/f,this.vy*=p/f),this.x+=(this.vx+this.pradX)*a,this.y+=(this.vy+this.pradY)*a;const z=i.zderzenie(this.x,this.y,tt*.8);if(z){this.x+=z.nx*z.gl,this.y+=z.ny*z.gl;const k=this.vx*z.nx+this.vy*z.ny;k<0&&(this.vx-=1.25*k*z.nx,this.vy-=1.25*k*z.ny,this.pulsV+=Math.min(6,-k*3))}const m=(this.vx+this.pradX)*.085,w=(this.vy+this.pradY)*.085;this.dvx+=((m-this.dx)*46-this.dvx*6.2)*a,this.dvy+=((w-this.dy)*46-this.dvy*6.2)*a,this.dx+=this.dvx*a,this.dy+=this.dvy*a,this.pulsV+=(-this.puls*90-this.pulsV*7)*a,this.puls+=this.pulsV*a,this.energia=Math.max(0,this.energia-a*.02*(1-.85*this.wPradzie));const d=this.zasiegBazowy+this.energia*4.7;this.zasieg+=(d-this.zasieg)*Math.min(1,a*1.4),this.hi=(this.hi+1)%U,this.hx[this.hi]=this.x,this.hy[this.hi]=this.y,this.hn<U&&this.hn++}zbudujSmuge(a){const e=Ba,i=this.smuga,t=Math.min(this.hn,Math.round(re/a));let o=0,s=this.x,r=this.y;const n=this._odc||(this._odc=new Float32Array(U));let h=0;for(let k=0;k<t;k++){const y=(this.hi-k+U)%U,x=Math.hypot(this.hx[y]-s,this.hy[y]-r);if(o+x>Wa){n[h++]=Wa-o,o=Wa;break}n[h++]=x,o+=x,s=this.hx[y],r=this.hy[y]}this.dlSmugi=o;let l=this.x,u=this.x,f=this.y,p=this.y,z=0,m=0,w=this.x,d=this.y;for(let k=0;k<e;k++){const y=o*k/(e-1);for(;z<h-1&&m+n[z]<y;){m+=n[z];const M=(this.hi-z+U)%U;w=this.hx[M],d=this.hy[M],z++}let x=w,v=d;if(h>0){const M=(this.hi-z+U)%U,b=this.hx[M],g=this.hy[M],T=Math.hypot(b-w,g-d),j=T>1e-6?Math.min(1,(y-m)/T):0;x=w+(b-w)*j,v=d+(g-d)*j}i[k*2]=x,i[k*2+1]=v}for(let k=1;k<e;k++){const y=k/(e-1),x=i[k*2]-i[k*2-2],v=i[k*2+1]-i[k*2-1],M=Math.hypot(x,v);if(M<1e-5)continue;const b=.03*y*y*Math.sin(y*o*5-this.t*6)*Math.min(1,o/.6);i[k*2]+=-v/M*b,i[k*2+1]+=x/M*b}for(let k=0;k<e;k++){const y=i[k*2],x=i[k*2+1];y<l&&(l=y),y>u&&(u=y),x<f&&(f=x),x>p&&(p=x)}this.pudlo[0]=l,this.pudlo[1]=f,this.pudlo[2]=u,this.pudlo[3]=p}}const ue=`#version 300 es
uniform vec2 uCam, uPol; uniform vec4 uPudlo;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  vP = mix(uPudlo.xy, uPudlo.zw, r);
  gl_Position = vec4((vP - uCam) / uPol, 0.0, 1.0);
}`,he=E+`
#define N ${Ba}
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
}`;class fe{constructor(a){this.gl=a,this.p=new R(a,ue,he,"iskierka")}rysuj(a,e=!1){const i=this.gl,t=a.iskra,o=1.3;this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uPudlo",t.pudlo[0]-o,t.pudlo[1]-o,t.pudlo[2]+o,t.pudlo[3]+o).fv("uSm",2,t.smuga).f("uGlowa",t.x,t.y).f("uDef",t.dx,t.dy).f("uR",tt).f("uCzas",a.czas).f("uPuls",t.puls).f("uMaska",e?1:0).f("uDl",t.dlSmugi).f("uBarwa",...a.mgla),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}const ze=`#version 300 es
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
}`,pe=`#version 300 es
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

// ---------- 15: skalna iglica ----------
// Zwężająca się ku górze skała o schodkowym, poszarpanym obrysie; par.x = pochylenie, par.y = druga, niższa iglica obok.
void iglica(vec2 p, vec2 r){
  float t = clamp((p.y + r.y) / (2.0 * r.y), 0.0, 1.0);
  float x = p.x - uPar.x * r.x * t * t * 2.0;
  float schodek = floor(t * (5.0 + 4.0 * h1(1.0)) + h1(2.0));
  float szer = r.x * (pow(1.0 - t, 0.75) * 0.9 + 0.05) * (0.82 + 0.3 * h1(schodek + 3.0));
  x += (h1(schodek + 9.0) - 0.5) * r.x * 0.22 * (1.0 - t);
  float d = max(abs(x) - szer, abs(p.y) - r.y);
  if (uPar.y > 0.5) {
    vec2 q = p - vec2(r.x * 0.95 * (h1(5.0) > 0.5 ? 1.0 : -1.0), -r.y * 0.45);
    float t2 = clamp((q.y + r.y * 0.55) / (r.y * 1.1), 0.0, 1.0);
    d = min(d, max(abs(q.x - (h1(6.0) - 0.5) * r.x * 0.5 * t2) - r.x * 0.5 * (1.0 - t2 * 0.92), abs(q.y) - r.y * 0.55));
  }
  d += (nF(p * 0.5 / uSkala + uZi) - 0.5) * 0.14 * uSkala;
  D = d;
  // skośne warstwy skały; ku szczytowi szron
  float warstwy = 0.5 + 0.5 * sin((p.y + p.x * 0.35) / (max(r.x, 0.2 * uSkala) * 0.24) + nF(p * 0.2 / uSkala) * 4.0);
  ALB = maluj(uKa, uKb, p, normalize(vec2(0.35, 1.0)), 0.9) * (0.68 + 0.36 * warstwy);
  ALB = mix(ALB, uKc * (0.7 + 0.4 * nF(p * 0.9 / uSkala)), 0.32 * smoothstep(0.55, 1.0, t));
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
  else if (uTyp == 14) kosc(p, r);
  else iglica(p, r);

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
}`,W=[{id:"las",nazwa:"Las szeptów",mgla:[.4,.9,.74],mgla2:[.34,.72,.92],nieboGora:[.01,.022,.026],nieboDol:[.045,.125,.105],grunt:[.2,.22,.24],wierzch:[.3,.52,.4],a:[.42,.38,.44],b:[.36,.62,.5],c:[.62,.86,.72],emis:[.5,1,.8],teren:{baza:1.6,amp:1,drobne:.35,sufit:13.4},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:0,snopy:1,poswiata:.55},wiatr:.5,mglistosc:1},{id:"mokradla",nazwa:"Mgliste mokradła",mgla:[.44,.72,1],mgla2:[.62,.66,1],nieboGora:[.012,.02,.04],nieboDol:[.06,.11,.17],grunt:[.16,.19,.22],wierzch:[.3,.42,.4],a:[.34,.36,.42],b:[.42,.56,.58],c:[.66,.82,.9],emis:[.5,.8,1],teren:{baza:.85,amp:.75,drobne:.2,sufit:15.5},niebo:{tarcza:1,obrecz:0,zorza:0,gwiazdy:.25,snopy:0,poswiata:1},wiatr:.35,mglistosc:1.7},{id:"krysztaly",nazwa:"Kryształowe pole",mgla:[.74,.56,1],mgla2:[1,.52,.84],nieboGora:[.022,.012,.042],nieboDol:[.105,.06,.165],grunt:[.15,.13,.21],wierzch:[.36,.3,.52],a:[.56,.44,.86],b:[.9,.56,.84],c:[.8,.9,1],emis:[.85,.55,1],teren:{baza:1.5,amp:1.2,drobne:.6,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:1,gwiazdy:.8,snopy:0,poswiata:.7},wiatr:0,mglistosc:.7},{id:"ruiny",nazwa:"Kamienne ruiny",mgla:[.5,.86,.94],mgla2:[.6,.76,1],nieboGora:[.012,.022,.034],nieboDol:[.055,.115,.14],grunt:[.21,.23,.26],wierzch:[.4,.46,.5],a:[.5,.56,.62],b:[.4,.56,.56],c:[.74,.86,.9],emis:[.6,.9,1],teren:{baza:1.7,amp:.55,drobne:.15,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:.45,snopy:.75,poswiata:.75},wiatr:.2,mglistosc:.9},{id:"kosci",nazwa:"Cmentarzysko olbrzymów",mgla:[.8,.74,.96],mgla2:[1,.76,.86],nieboGora:[.02,.016,.034],nieboDol:[.12,.095,.15],grunt:[.24,.22,.28],wierzch:[.5,.46,.56],a:[.68,.64,.7],b:[.52,.48,.62],c:[.92,.88,.96],emis:[.9,.8,1],teren:{baza:1.5,amp:1.25,drobne:.12,sufit:15.5},niebo:{tarcza:0,obrecz:1,zorza:0,gwiazdy:.55,snopy:0,poswiata:.95},wiatr:.9,mglistosc:.8},{id:"gran",nazwa:"Grań nad chmurami",mgla:[1,.58,.84],mgla2:[1,.7,.86],nieboGora:[.026,.012,.034],nieboDol:[.15,.07,.13],grunt:[.22,.2,.24],wierzch:[.58,.5,.56],a:[.66,.5,.62],b:[.46,.36,.56],c:[1,.88,.96],emis:[1,.7,.88],teren:{baza:1.2,amp:1.5,drobne:.3,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:.3,gwiazdy:1,snopy:0,poswiata:1},wiatr:.7,mglistosc:1.35}],I=W.length,et=1.22,G=[{f:.07,z:4.2,s:-.26,px:512,miekkosc:.34,zamglenie:.8,mgla:.3,otoczenie:.5,iskra:0,jasnosc:.21,komorka:22,postrzep:0},{f:.15,z:2.9,s:-.42,px:512,miekkosc:.2,zamglenie:.64,mgla:.34,otoczenie:.4,iskra:.05,jasnosc:.155,komorka:15,postrzep:.1},{f:.3,z:2,s:-.58,px:640,miekkosc:.11,zamglenie:.46,mgla:.36,otoczenie:.3,iskra:.3,jasnosc:.105,komorka:11,postrzep:.25},{f:.58,z:1.35,s:-.78,px:768,miekkosc:.055,zamglenie:.26,mgla:.36,otoczenie:.2,iskra:.85,jasnosc:.066,komorka:8,postrzep:.6},{f:1,z:1,s:0,px:1024,miekkosc:.03,zamglenie:0,mgla:.4,otoczenie:.05,iskra:1,jasnosc:.05,komorka:5,gra:!0,postrzep:1},{f:2.3,z:.6,s:-1.12,px:384,miekkosc:.42,zamglenie:0,mgla:.16,otoczenie:0,iskra:.25,jasnosc:0,komorka:6.5,bliska:!0,postrzep:0}],J=4,it=5.3,fa=5.6,de=16;for(const c of G){if(c.gra)c.y0=-1,c.wys=20,c.A=it;else{c.A=-c.s*fa*c.z;const a=c.A-fa*c.z-.3*c.z,e=c.A+(15-it)*c.f*c.z+fa*c.z+.3*c.z;c.y0=a,c.wys=e-a}c.szer=de*c.z,c.pxW=c.px,c.pxH=Math.round(c.px*c.wys/c.szer/16)*16,c.mnoznikX=c.f*c.z}function ft(c,a,e=[0,0]){return e[0]=a.x*c.mnoznikX,e[1]=c.gra?a.y:c.A+(a.y-it)*c.f*c.z,e}const _={TEREN:0,PIEN:1,KLAB:2,KOLUMNA:3,LUK:4,BLOK:5,AKWEDUKT:6,POSAG:7,KRYSZTAL:8,ZEBRO:9,KREGI:10,CZASZKA:11,DRZEWO:12,TRZCINY:13,KOSC:14,IGLICA:15},me=[2.3,1.75,1.4,1.12,1,1.35],ke=.5;function qa(c,a,e=.07){const i=1+(c()-.5)*2*e;return[a[0]*i,a[1]*i,a[2]*i]}function P(c,a,e,i,t,o,s,r={}){const n=W[a],h={typ:e,x:i,y:t,w:o,h:s,rot:0,par:[0,0,0,0],zi:c(),kraina:a,ka:qa(c,n.a),kb:qa(c,n.b),kc:qa(c,n.c),przed:!1,kolejnosc:c(),odbij:c()<.5?-1:1,bryla:null,...r};if(h.ox==null&&(h.ox=Math.abs(o)*1.25),h.oy==null&&(h.oy=Math.abs(s)*1.12),h.rot){const l=Math.hypot(h.ox,h.oy);h.ox=l,h.oy=l}return h}function we(c,a,e,i,t,o,s){const r=c.terenWarstwy(a,o),n=e.y0+e.wys/2,h=e.wys/2+e.z,l=(u,f,p)=>s.push(P(t,0,_.PIEN,u,n,f,h,{par:[.35+t()*.6,p,.5+t()*.5,.45+t()*.25],ox:f*5.5}));if(a<=3){const u=a===3?t()<.7?1:0:1+(t()<.45?1:0);for(let f=0;f<u;f++)l(o+(t()-.5)*e.komorka*e.z*.8,i*(.85+t()*t()*1.5),Math.floor(t()*3.4));if(a>=2&&t()<.6){const f=i*(1.2+t()*1.6),p=i*(.45+t()*.6),z=o+(t()-.5)*4*e.z;s.push(P(t,0,_.KLAB,z,c.terenWarstwy(a,z)+p*.5,f,p,{par:[6,.55,0,.3],przed:!0}))}}else if(a===J){if(t()<.34){const u=.5+t()*.9,f=.3+t()*.45;s.push(P(t,0,_.KLAB,o,r+f*.35,u,f,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:r+f*.2,rx:u*.5,ry:f*.45,r:.15}}))}else if(t()<.2){const u=.42+t()*.3,f=.45+t()*.5;s.push(P(t,0,_.PIEN,o,r+f*.6,u,f,{par:[.15,0,.9,.85],ox:u*2.2,bryla:{x:o,y:r+f*.5,rx:u*.3,ry:f*.9,r:.12}}))}}else{if(t()<.55){const u=i*(1.8+t()*2),f=i*(.7+t()*.6);s.push(P(t,0,_.KLAB,o+3*e.z,r+f*.2,u,f,{par:[6,.6,0,.3]}))}if(t()<.5){const u=i*(2+t()*2.5),f=i*(.8+t()*.7);s.push(P(t,0,_.KLAB,o-2*e.z,e.y0+e.wys-f*.4,u,f,{par:[7,.7,0,.3]}))}t()<.3&&l(o+(t()-.5)*3*e.z,i*(.8+t()*.8),0)}}function ye(c,a,e,i,t,o,s){const r=c.terenWarstwy(a,o),n=(l,u,f)=>{const p=u*(.55+t()*.25),z=c.terenWarstwy(a,l);s.push(P(t,1,_.DRZEWO,l,z+u-.25*i,p,u,{par:[3+Math.floor(t()*3),f,(t()-.5)*.7,0],ox:p*1.3}))},h=(l,u,f)=>{const p=c.terenWarstwy(a,l),z=u*(.5+t()*.5);s.push(P(t,1,_.TRZCINY,l,p+u*.85,z,u,{par:[4+Math.floor(t()*5),0,0,0],przed:f,ox:z*1.6}))};if(a===0)t()<.5&&n(o,i*(2.2+t()*2.2),0);else if(a<=2)t()<.7&&n(o,i*(2+t()*2.6),a===2&&t()<.5?1:0),t()<.65&&h(o+(t()-.5)*8*e.z,i*(.7+t()*.7),!0);else if(a===3){if(t()<.62&&n(o,i*(2.2+t()*3),t()<.5?1:0),t()<.6&&h(o+(t()-.5)*5*e.z,i*(.8+t()*.8),!0),t()<.35){const l=i*(.9+t()),u=i*(.3+t()*.3),f=o+2*e.z;s.push(P(t,1,_.KLAB,f,c.terenWarstwy(a,f)+u*.3,l,u,{par:[4,.3,1,.2],przed:!0}))}}else if(a===J){if(t()<.22&&r>1.3){const l=.6+t()*.8,u=.25+t()*.3;s.push(P(t,1,_.KLAB,o,r+u*.3,l,u,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:r+u*.15,rx:l*.5,ry:u*.4,r:.12}}))}}else t()<.6&&h(o,i*(1.6+t()*1.4),!1),t()<.24&&n(o+(1.5+t()*2)*e.z,i*(4+t()*2.5),0),t()<.35&&h(o-(1+t()*2)*e.z,i*(2.2+t()*1.6),!1)}function ve(c,a,e,i,t,o,s){const r=c.terenWarstwy(a,o),n=(l,u,f,p,z={})=>{const m=c.terenWarstwy(a,l);return P(t,2,_.KRYSZTAL,l,m+u*.9,f,u,{par:[p,.35+t()*.4,0,.5+t()*.5],ox:f*1.9+u*.5,oy:u*1.25,...z})},h=(l,u,f)=>s.push(P(t,2,_.KRYSZTAL,l,u,f*.3,f,{par:[1,0,1,.8],rot:(t()-.5)*1.6,przed:!0}));if(a<=1)t()<.75&&s.push(n(o,i*(2.2+t()*3.6),i*(.9+t()*.9),3+Math.floor(t()*3)));else if(a<=3)t()<.75&&s.push(n(o,i*(1.2+t()*2.8),i*(.6+t()*.8),3+Math.floor(t()*4))),t()<.35&&h(o+(t()-.5)*6*e.z,r+i*(3+t()*4.5),i*(.35+t()*.5));else if(a===J){if(t()<.5){const l=.35+t()*t()*1,u=.35+t()*.45,f=n(o,l,u,2+Math.floor(t()*4),{przed:t()<.5});l>.6&&(f.bryla={x:o,y:r+l*.6,rx:u*.45,ry:l*.7,r:.1}),s.push(f)}}else t()<.3&&s.push(n(o,i*(1.2+t()*1.2),i*(1.3+t()*.8),3)),t()<.22&&s.push(P(t,2,_.KRYSZTAL,o+4*e.z,e.y0+e.wys-i*1.2,i*.8,i*1.8,{par:[3,.5,0,.6],rot:Math.PI,ox:i*3,oy:i*3})),t()<.34&&s.push(n(o-(1+t()*2)*e.z,i*(2.6+t()*2.6),i*(.9+t()*.6),2+Math.floor(t()*2))),t()<.3&&h(o+(t()-.5)*4*e.z,r+i*(3.5+t()*3.5),i*(.8+t()*.8))}function ge(c,a,e,i,t,o,s){const r=c.terenWarstwy(a,o),n=(l,u,f,p)=>{const z=c.terenWarstwy(a,l);s.push(P(t,3,_.KOLUMNA,l,z+u-.2*i,f,u,{par:[p,1,3+Math.floor(t()*3),0],ox:f*1.6}))},h=(l,u,f)=>{const p=c.terenWarstwy(a,l);s.push(P(t,3,_.LUK,l,p+f-.3*i,u,f,{par:[.2+t()*.08,t()<.45?.3+t()*.5:0,0,0]}))};if(a===0)if(t()<.55){const l=i*(1.6+t()*1.2),u=i*(5+t()*4);s.push(P(t,3,_.AKWEDUKT,o,r+l-.3*i,u,l,{par:[3+Math.floor(t()*3),0,t()<.5?.5+t()*.4:0,0]}))}else t()<.5&&n(o,i*(2.5+t()*3),i*(.5+t()*.4),t()<.5?t()*.3:0);else if(a===1)if(t()<.4){const l=i*(1.5+t()),u=i*(4+t()*3);s.push(P(t,3,_.AKWEDUKT,o,r+l-.3*i,u,l,{par:[3+Math.floor(t()*2),0,t()<.6?.4+t()*.5:0,0]}))}else t()<.6&&h(o,i*(1.3+t()),i*(1.8+t()*1.4));else if(a<=3){const l=i*(2.3+t()*2.4),u=i*(.34+t()*.16);if(t()<.78?(n(o,l,u,t()<.4?.15+t()*.55:0),t()<.5&&n(o+u*(7+t()*3),l,u,t()<.5?.2+t()*.6:0)):t()<.7&&h(o,i*(1.4+t()*.8),i*(2+t()*1.6)),a===3&&t()<.35){const f=i*(.6+t()*.7),p=i*(.3+t()*.25),z=o+3*e.z;s.push(P(t,3,_.BLOK,z,c.terenWarstwy(a,z)+p*.6,f,p,{par:[.06,0,0,0],rot:(t()-.5)*.7,przed:!0}))}}else if(a===J){const l=t();if(l<.3){const u=.45+t()*.6,f=.28+t()*.3,p=(t()-.5)*.5;s.push(P(t,3,_.BLOK,o,r+f*.75,u,f,{par:[.05,0,0,0],rot:p,przed:!0,bryla:{x:o,y:r+f*.7,rx:u*.85,ry:f*.8,r:.08}}))}else if(l<.42){const u=1.2+t()*.7,f=.5+t()*.35;s.push(P(t,3,_.BLOK,o,r+f*.8,u,f,{par:[.03,3,0,0],przed:!0,bryla:{x:o,y:r+f*.3,rx:u*.9,ry:f*.5,r:.08}}))}else if(l<.56){const u=.42+t()*.12,f=.5+t()*.8;s.push(P(t,3,_.KOLUMNA,o,r+f-.1,u,f,{par:[.25+t()*.3,0,4,0],ox:u*1.6,bryla:{x:o,y:r+f*.6,rx:u*.6,ry:f*.75,r:.1}}))}}else{if(t()<.4){const l=i*(1.5+t()),u=i*(.8+t()*.5);s.push(P(t,3,_.BLOK,o,r+u*.5,l,u,{par:[.1,0,0,0],rot:(t()-.5)*.6}))}t()<.24&&n(o+(1.5+t()*2)*e.z,i*(3.5+t()*4),i*(.6+t()*.45),t()<.55?.2+t()*.5:0)}}function xe(c,a,e,i,t,o,s){const r=c.terenWarstwy(a,o),n=(l,u,f)=>{const p=t()<.5?-1:1,z=u*(.42+t()*.15);for(let m=0;m<f;m++){const w=u*(1-.13*m-t()*.05),d=l+m*z,k=c.terenWarstwy(a,d),y=w*(.42+t()*.1);s.push(P(t,4,_.ZEBRO,d,k+w-.3*i,y,w,{par:[.13+t()*.04,.9+t()*.35,0,0],odbij:p,ox:y*1.5,oy:w*1.15,kolejnosc:.5+m*.01}))}},h=(l,u,f={})=>{const p=c.terenWarstwy(a,l),z=u*(.16+t()*.05);return P(t,4,_.KOSC,l,p+z*.6,u,z,{rot:(t()-.5)*.5,par:[0,0,0,0],przed:!0,...f})};if(a<=1)t()<.62&&n(o,i*(2.4+t()*3),2+Math.floor(t()*3));else if(a<=3){if(t()<.58)n(o,i*(2+t()*3),2+Math.floor(t()*3));else if(t()<.5){const l=i*(2+t()*2),u=i*(.5+t()*.25);s.push(P(t,4,_.KREGI,o,r+u*.7,l,u,{par:[5+Math.floor(t()*4),0,0,0],przed:!0}))}a===3&&t()<.3&&s.push(h(o+3*e.z,i*(.8+t()*.8)))}else if(a===J){const l=t();if(l<.2){const u=1+t()*.9,f=.3+t()*.15;s.push(P(t,4,_.KREGI,o,r+f*.55,u,f,{par:[4+Math.floor(t()*3),0,0,0],przed:!0,bryla:{x:o,y:r+f*.1,rx:u*.9,ry:f*.45,r:.08}}))}else if(l<.42){const u=.5+t()*.7,f=h(o,u);f.bryla={x:o,y:f.y,rx:u*.8,ry:f.h*.5,r:.08},s.push(f)}}else{const l=t();l<.2?n(o,i*(2.5+t()*2),1):l<.32&&n(o+(1+t()*2)*e.z,i*(3.6+t()*2),1)}}function be(c,a,e,i,t,o,s){const r=c.terenWarstwy(a,o),n=(l,u,f,p={})=>{const z=c.terenWarstwy(a,l);return P(t,5,_.IGLICA,l,z+u-.35*i,f,u,{par:[(t()-.5)*.5,t()<.45?1:0,0,0],ox:f*2.4,oy:u*1.1,...p})},h=(l,u,f)=>s.push(P(t,5,_.BLOK,l,u,f,f*(.5+t()*.3),{par:[.12,0,0,0],rot:(t()-.5)*1.2,przed:!0}));if(a<=1)t()<.8&&s.push(n(o,i*(2.6+t()*4),i*(.7+t()*.8)));else if(a<=3)t()<.7&&s.push(n(o,i*(1.6+t()*3.2),i*(.5+t()*.6))),t()<.3&&h(o+(t()-.5)*6*e.z,r+i*(3+t()*4),i*(.5+t()*.6));else if(a===J){const l=t();if(l<.3){const u=.5+t()*t()*1.1,f=.3+t()*.3,p=n(o,u,f,{przed:t()<.5});u>.7&&(p.bryla={x:o,y:r+u*.5,rx:f*.4,ry:u*.7,r:.1}),s.push(p)}else if(l<.48){const u=.45+t()*.5,f=.28+t()*.25;s.push(P(t,5,_.BLOK,o,r+f*.6,u,f,{par:[.1,0,0,0],rot:(t()-.5)*.5,przed:!0,bryla:{x:o,y:r+f*.5,rx:u*.8,ry:f*.7,r:.08}}))}}else t()<.4&&s.push(n(o,i*(3+t()*3),i*(.8+t()*.6)))}const Se=[we,ye,ve,ge,xe,be];function zt(c,a,e,i,t,o,s,r){const n=c.terenWarstwy(a,s);switch(o){case 0:{const h=i*1.9,l=i*9;r.push(P(t,0,_.PIEN,s,n+i*2.3,h,l,{par:[.35,3,.8,.5],rot:1.28*(t()<.5?-1:1),ox:l*1.1,oy:l*1.1,kolejnosc:.9})),r.push(P(t,0,_.PIEN,s+i*11,e.y0+e.wys/2,i*2.6,e.wys/2+e.z,{par:[.3,2,.9,.7],ox:i*12,kolejnosc:.1}));break}case 1:{const h=i*4.2,l=h*.75;r.push(P(t,1,_.DRZEWO,s,n+h-.4*i,l,h,{par:[5,1,.25,0],ox:l*1.3,kolejnosc:.9}));break}case 2:{const h=i*4.6,l=i*1.7;r.push(P(t,2,_.KRYSZTAL,s,n+h*.86,l,h,{par:[1,.12,0,1.6],ox:l*2+h*.3,oy:h*1.2,kolejnosc:.9})),r.push(P(t,2,_.KRYSZTAL,s+i*2.2,n+i*1.6,i*1.3,i*2.2,{par:[4,.7,0,.9],ox:i*4,oy:i*3,kolejnosc:.95}));break}case 3:{const h=i*3.1;r.push(P(t,3,_.POSAG,s,n+h-.5*i,h*.62,h,{par:[t()<.35?1:0,0,0,0],kolejnosc:.9}));break}case 5:{const h=i*6.5,l=i*1.5;r.push(P(t,5,_.IGLICA,s,n+h-.5*i,l,h,{par:[.18*(t()<.5?-1:1),1,0,0],ox:l*2.4,oy:h*1.1,kolejnosc:.9}));for(let u=0;u<4;u++){const f=u*1.6+t(),p=i*(.35+t()*.4);r.push(P(t,5,_.BLOK,s+Math.cos(f)*i*3.6,n+h*1.55+Math.sin(f)*i*1.3,p,p*.6,{par:[.12,0,0,0],rot:(t()-.5)*1.4,przed:!0,kolejnosc:.95}))}break}case 4:{const h=i*2;r.push(P(t,4,_.CZASZKA,s,n+h*.62,h*1.45,h,{par:[0,0,0,0],rot:(t()-.5)*.3,kolejnosc:.9,ox:h*1.9,oy:h*1.5}));break}}}function Me(c,a,e){const i=G[a],t=i.z*me[a],o=i.komorka*i.z;if(i.bliska&&K(e*.31,c.ziarno+555,2)<ke)return[];const s=ea(c.ziarno,a*7919+17,e),r=[],n=(e+.2+.6*s())*o,h=n/i.mnoznikX,l=c.wagi(h);let u=s(),f=0;for(;f<I-1&&(u-=l[f],!(u<0));f++);if(Se[f](c,a,i,t,s,n,r),a===2){const p=c.segment(h),z=c.srodekSegmentu(p)*i.mnoznikX-5.5*i.z;z>=e*o&&z<(e+1)*o?zt(c,a,i,t,ea(c.ziarno,991,p),c.krainaSegmentu(p),z,r):l[f]>.95&&s()<.07&&zt(c,a,i,t,s,f,n,r)}return r}const Ka=16;function _e(c,a){const e=ea(c.ziarno,4242,a),i=[],t=a*Ka,o=(s,r,n,h,l,u,f)=>i.push(s,r,n,h,e()*6.283,l,u[0],u[1],u[2],f);for(let s=t;s<t+Ka;s+=.22){const r=s+e()*.22,n=c.wagi(r),h=c.ziemia(r);let l=e(),u=0;for(;u<I-1&&(l-=n[u],!(l<0));u++);const f=W[u],p=.6+e()*.6,z=[f.b[0]*p,f.b[1]*p,f.b[2]*p],m=e();if(u===0){if(m<.8&&o(r,h-.05,.18+e()*e()*.75,.014+e()*.012,0,z,1),e()<.085){const w=c.sufit(r);w<100&&o(r,w+.9,1.4+e()*e()*4.2,.018+e()*.014,1,[z[0]*.8,z[1]*.8,z[2]*.8],.55)}}else u===1?m<.42&&h<1.75?o(r,h-.05,.7+e()*1.7,.013+e()*.008,e()<.4?2:0,z,.7):m<.6&&o(r,h-.05,.15+e()*.4,.012,0,z,1):u===3?m<.22&&o(r,h-.04,.12+e()*.4,.011+e()*.006,0,z,1):u===4?m<.2&&o(r,h-.04,.25+e()*.75,.009+e()*.006,0,z,1.6):u===5&&m<.13&&o(r,h-.04,.1+e()*.3,.009+e()*.005,0,z,1.4)}return new Float32Array(i)}const na=4,pt=4,ua=161;class Pe{constructor(a,e,i){this.gl=a,this.szum=e,this.swiat=i,this.p=new R(a,ze,pe,"wypiek");const t={wewn:a.RGBA8,format:a.RGBA,typ:a.UNSIGNED_BYTE};this.warstwy=G.map(o=>({W:o,bufor:new ta(a,o.pxW*na,o.pxH,[t,t],{zawijanieS:a.REPEAT}),kafle:new Array(na).fill(null)})),this.terenDane=new Float32Array(ua*4),this.terenTex=Na(a,ua,1,{wewn:a.RGBA32F,format:a.RGBA,typ:a.FLOAT,filtr:a.NEAREST,dane:this.terenDane}),this.zadanie=null,this.upieczono=0}reset(){for(const a of this.warstwy)a.kafle.fill(null);this.zadanie=null}zapewnij(a,e,i=1){let t=null;for(let o=0;o<this.warstwy.length;o++){const s=this.warstwy[o],r=s.W,n=a.x*r.mnoznikX,h=e*r.z+.6*r.z,l=Math.floor((n-h)/r.szer),u=Math.floor((n+h)/r.szer);for(let f=l;f<=u;f++)s.kafle[sa(f)]!==f&&this._pieczCaly(o,f);if(!t){const f=r.szer*.45,p=i>=0?Math.floor((n+h+f)/r.szer):Math.floor((n-h-f)/r.szer);s.kafle[sa(p)]!==p&&p-l<na&&u-p<na&&(t=[o,p])}}this.zadanie?this._pieczPasek():t&&(this.zadanie=this._przygotuj(t[0],t[1]),this.warstwy[t[0]].kafle[sa(t[1])]=null,this._pieczPasek())}_przygotuj(a,e){const i=G[a],t=this.swiat,o=e*i.szer,s=o+i.szer,r=new Float32Array(ua*4),n=i.szer/(ua-33),h=o-16*n;for(let p=0;p<ua;p++){const z=h+p*n,m=z/i.mnoznikX,w=t.wagi(m);r[p*4]=t.terenWarstwy(a,z),r[p*4+1]=t.sufitWarstwy(a,z),r[p*4+2]=w[2],r[p*4+3]=w[3]}const l=o/i.mnoznikX,u=s/i.mnoznikX,f=p=>t.mieszaj(p,"b",[0,0,0]);return{l:a,i:e,pasek:0,dane:r,xs:h,dx:n,x0:o,rekwizyty:t.rekwizytyW(a,o,s),barwy:{gL:t.mieszaj(l,"grunt",[0,0,0]),gP:t.mieszaj(u,"grunt",[0,0,0]),wL:t.mieszaj(l,"wierzch",[0,0,0]),wP:t.mieszaj(u,"wierzch",[0,0,0]),lL:f(l),lP:f(u)}}}_pieczCaly(a,e){this.zadanie&&this.zadanie.l===a&&sa(this.zadanie.i)===sa(e)&&(this.zadanie=null);const i=this._przygotuj(a,e);this._rysuj(i,0,G[a].pxH),this.warstwy[a].kafle[sa(e)]=e,this.upieczono++}_pieczPasek(){const a=this.zadanie,e=G[a.l],i=Math.ceil(e.pxH/pt);this._rysuj(a,a.pasek*i,Math.min(i,e.pxH-a.pasek*i)),++a.pasek>=pt&&(this.warstwy[a.l].kafle[sa(a.i)]=a.i,this.zadanie=null,this.upieczono++)}_rysuj(a,e,i){const t=this.gl,o=G[a.l],s=this.warstwy[a.l],r=this.p,n=sa(a.i);t.bindFramebuffer(t.FRAMEBUFFER,s.bufor.fbo),t.viewport(n*o.pxW,0,o.pxW,o.pxH),t.enable(t.SCISSOR_TEST),t.scissor(n*o.pxW,e,o.pxW,i),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.terenTex),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,ua,1,0,t.RGBA,t.FLOAT,a.dane);const h=a.barwy;r.uzyj().tex("uSzum",0,this.szum).i("uTeren",1).f("uTerenZakres",a.xs,1/a.dx,ua).f("uKafel",a.x0,o.y0,o.szer,o.wys).f("uSkala",o.z).f("uPostrzep",o.postrzep).f("uMiekko",o.miekkosc*o.z).f("uPxJ",o.szer/o.pxW).f("uKafelX",a.x0,o.szer).f("uGruntL",...h.gL).f("uGruntP",...h.gP).f("uWierzchL",...h.wL).f("uWierzchP",...h.wP).f("uLiscL",...h.lL).f("uLiscP",...h.lP);const l=u=>{r.i("uTyp",u.typ).f("uPoz",u.x,u.y).f("uObsz",u.ox+o.miekkosc*o.z*2,u.oy+o.miekkosc*o.z*2).f("uRot",u.rot).f("uOdbij",u.odbij).f("uRozm",u.w,u.h).f("uPar",u.par[0],u.par[1],u.par[2],u.par[3]).f("uZi",u.zi).f("uKa",...u.ka).f("uKb",...u.kb).f("uKc",...u.kc),t.drawArrays(t.TRIANGLE_STRIP,0,4)};for(const u of a.rekwizyty)u.przed||l(u);r.i("uTyp",_.TEREN).f("uPoz",a.x0+o.szer/2,o.y0+o.wys/2).f("uObsz",o.szer/2,o.wys/2).f("uRot",0).f("uOdbij",1).f("uZi",.37+a.l*.11),t.drawArrays(t.TRIANGLE_STRIP,0,4);for(const u of a.rekwizyty)u.przed&&l(u);t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.bindFramebuffer(t.FRAMEBUFFER,null)}}function sa(c){return(c%na+na)%na}const Ae=na,dt=10;class je{constructor(a,e){this.gl=a,this.swiat=e,this.p=new R(a,Qt,ae,"flora"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf);const i=dt*4;[[0,2,0],[1,4,2],[2,4,6]].forEach(([t,o,s])=>{a.enableVertexAttribArray(t),a.vertexAttribPointer(t,o,a.FLOAT,!1,i,s*4),a.vertexAttribDivisor(t,1)}),a.bindVertexArray(a.domyslnyVAO),this.klucz="",this.ile=0,this.pamiec=new Map,this._brak=new Float32Array(16*4)}reset(){this.klucz="",this.pamiec.clear()}rysuj(a,e,i,t,o){const s=this.gl,r=Math.floor((a.cam.x-a.polX-3)/Ka),n=Math.floor((a.cam.x+a.polX+3)/Ka),h=r+":"+n;if(h!==this.klucz){this.klucz=h;const l=[];let u=0;for(let z=r;z<=n;z++){let m=this.pamiec.get(z);m||(this.pamiec.size>12&&this.pamiec.clear(),m=_e(this.swiat,z),this.pamiec.set(z,m)),l.push(m),u+=m.length}const f=new Float32Array(u);let p=0;for(const z of l)f.set(z,p),p+=z.length;s.bindBuffer(s.ARRAY_BUFFER,this.buf),s.bufferData(s.ARRAY_BUFFER,f,s.DYNAMIC_DRAW),this.ile=u/dt}this.ile&&(this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...e.barwaSw).f("uRes",t,o).tex("uSwiatlo",1,i),this.p.fv("uPodmuchy",4,a.podmuchy?a.podmuchy.dane:this._brak),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,2*(_t+1),this.ile),s.bindVertexArray(s.domyslnyVAO))}}const Y=16,Sa=8,ka={zasieg:1.5,sila:2.6,maks:3.2,gasnie:.45},Le=.3,Re=.9;function Ya(c,a){const e=4+Math.floor(c()*4.99),i=[];let t=0;for(let z=0;z<e;z++){const m=.35+c();i.push(m),t+=m}const o=1+c()*1.1,s=c()*Math.PI*2,r=[];let n=c()*Math.PI*2;const h=Math.floor(c()*e),l=c()<.4?Math.floor(c()*e):-1;for(let z=0;z<e;z++){n+=i[z]/t*Math.PI*2;let m=a*(.5+.5*c());(z===h||z===l)&&(m*=.38+c()*.2);const w=Math.cos(n)*m*o,d=Math.sin(n)*m;r.push([w*Math.cos(s)-d*Math.sin(s),w*Math.sin(s)+d*Math.cos(s)])}let u=0,f=0;for(const z of r)u+=z[0],f+=z[1];u/=e,f/=e;let p=0;for(const z of r)z[0]-=u,z[1]-=f,p=Math.max(p,Math.hypot(z[0],z[1]));return{v:r,zasieg:p}}function Pt(c,a){const e=a*Y,i=e+Y/2,t=c.segment(i),o=c.srodekSegmentu(t)+13;if(o<e||o>=e+Y)return null;const s=c.krainaSegmentu(t);return{id:"f"+t,x:o,y:Math.min(c.ziemia(o)+4.4,c.granicaLotu(o)-2.2),kraina:s,segment:t,odsloniecie:0,odkryty:!1}}function Te(c,a){const e=a*Y,i=c.segment(e+Y/2),t=c.srodekSegmentu(i)+38;return t<e||t>=e+Y?null:{x:t,segment:i}}const Xa=(c,a,e,i,t)=>({id:c,x:a,y:e,px:a,py:e,kat:t()*Math.PI*2,obrot:(t()-.5)*.42,faza:t()*Math.PI*2,v:i.v,zasieg:i.zasieg,os:t()*Math.PI,wachlarz:null,oswietlenie:0,ladunek:0,zapalony:!1,zar:0,wir:0});function Ee(c,a){const e=ea(c.ziarno,9001,a),i=[],t=a*Y,o=1+(e()<.6?1:0)+(e()<.22?1:0);for(let n=0;n<o;n++){const h=t+(n+.15+.7*e())*Y/o,l=c.ziemia(h),u=Math.min(c.granicaLotu(h)-.9,l+9.5),f=l+1.4+e()*Math.max(.5,u-l-1.4),p=e()<.32,z=p?2+Math.floor(e()*3):1;for(let m=0;m<z;m++){const w=p?.2+e()*.32:.32+e()*.4,d=e()*Math.PI*2,k=m===0?0:.6+e()*.9,y=Ya(e,w),x=h+Math.cos(d)*k,v=f+Math.sin(d)*k*.8;i.push(Xa(a*64+i.length,x,v,y,e))}}const s=Pt(c,a);if(s)for(let n=0;n<3;n++){const h=Ya(e,.3+e()*.25),l=s.x-2.6+n*2.4+(e()-.5)*.6,u=s.y-1.9+(e()-.5)*.9;i.push(Xa(a*64+i.length,l,u,h,e))}const r=Te(c,a);if(r){const n=ea(c.ziarno,9002,a),h=13+Math.floor(n()*6),l=i.length;for(let u=0;u<h;u++)for(let f=0;f<8;f++){const p=r.x+(n()-.5)*9.5,z=c.ziemia(p),m=Math.min(c.granicaLotu(p)-.9,z+6.4),w=z+1.8+n()*Math.max(.5,m-z-1.8);let d=!0;for(let y=l;y<i.length;y++)if(Math.hypot(i[y].x-p,i[y].y-w)<1){d=!1;break}if(!d)continue;const k=Xa(a*64+i.length,p,w,Ya(n,.22+n()*.3),n);k.polana=!0,i.push(k);break}}return i}class rt{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[]}reset(){this.kawalki.clear(),this.widoczne.length=0}krok(a,e,i,t,o=null){const s=Math.floor((e.x-i-8)/Y),r=Math.floor((e.x+i+8)/Y);this.widoczne.length=0;for(let n=s;n<=r;n++){let h=this.kawalki.get(n);if(!h){if(this.kawalki.size>24)for(const l of this.kawalki.keys())(l<s-2||l>r+2)&&this.kawalki.delete(l);if(h=Ee(this.swiat,n),this.kawalki.set(n,h),this.pamiec)for(const l of h)this.pamiec.jestSzklo(this.swiat.ziarno+":"+l.id)&&(l.zapalony=!0,l.zar=1,l.ladunek=1);this.naNowyKawalek?.(n,h)}for(const l of h){if(o){const u=o.x-l.px,f=o.y-l.py,p=u*u+f*f,z=ka.zasieg+l.zasieg;if(p<z*z&&p>1e-4){const m=Math.sqrt(p),w=1-m/z;l.wir+=(u*o.vy-f*o.vx)/m*w*w*ka.sila*a,l.wir>ka.maks?l.wir=ka.maks:l.wir<-3.2&&(l.wir=-3.2)}}l.wir!==0&&(l.wir*=Math.exp(-a*ka.gasnie),Math.abs(l.wir)<.001&&(l.wir=0)),l.kat+=(l.obrot+l.wir)*a,l.py=l.y+Math.sin(t*.6+l.faza)*.12,l.px=l.x+Math.sin(t*.37+l.faza*1.7)*.05,this.widoczne.push(l)}}}laduj(a){for(const e of this.widoczne){if(e.zapalony){e.zar<1&&(e.zar=Math.min(1,e.zar+a*.8));continue}e.oswietlenie>Le?(e.ladunek+=a*e.oswietlenie/Re,e.ladunek>=1&&(e.ladunek=1,e.zapalony=!0,this.pamiec?.zapalSzklo(this.swiat.ziarno+":"+e.id),this.naZapalenie?.(e))):e.ladunek>0&&(e.ladunek=Math.max(0,e.ladunek-a*.04))}}static wierzcholki(a,e){const i=Math.cos(a.kat),t=Math.sin(a.kat);for(let o=0;o<a.v.length;o++){const s=a.v[o];e[o*2]=i*s[0]-t*s[1],e[o*2+1]=t*s[0]+i*s[1]}return e}}const Be=`#version 300 es
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
}`,Ce=E+Ma+`
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
}`,Ke=E+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){
  vec3 L = texture(uTex, vUv).rgb;
  float mn = min(L.r, min(L.g, L.b));
  L -= mn * 0.92;
  float mx = max(L.r, max(L.g, L.b));
  L *= (1.0 - exp(-mx * 1.35)) / max(mx, 1e-4) * 0.92;
  o = vec4(L, 1.0);
}`,Fe=`#version 300 es
uniform vec2 uCam, uPol, uSrodek; uniform float uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Ie=E+Ma+`
in vec2 vP; out vec4 o;
uniform vec2 uW[${Sa}]; uniform int uN;
uniform vec2 uDoIskry, uOs, uBlyskPoz, uRes;
uniform float uBlask, uFaza, uBlysk, uOsw, uZar;
uniform vec3 uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  // odległość ze znakiem od wielokąta i normalna najbliższej krawędzi
  float d2 = 1e9, znak = 1.0; vec2 nrm = vec2(0.0, 1.0);
  for (int i = 0; i < ${Sa}; i++) {
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
  // zapalone szkło: odłamek naładowany światłem tli się sam — barwna obwódka, żar wewnątrz i miękka
  // aureola w barwach widma wokół; widać go z daleka, także gdy iskierki nie ma w pobliżu
  if (uZar > 0.001) {
    float oddech = 0.8 + 0.2 * sin(uFaza * 1.3);
    float kat = atan(vP.y, vP.x) / 6.28318 + uFaza * 0.02;
    vec3 teczowa = widmo(abs(fract(kat) * 2.0 - 1.0));
    // wewnątrz jedno łagodne przejście widma od krawędzi do środka, powoli przesuwające się w czasie
    c += widmo(abs(fract(-d * 2.6 + uFaza * 0.05) * 2.0 - 1.0)) * wn * (0.07 + 0.26 * exp(d / 0.06)) * uZar * oddech;
    c += teczowa * exp(-max(d, 0.0) / 0.15) * (1.0 - wn) * 0.36 * uZar * oddech;
    c += lod * kraw * 0.22 * uZar;
  }
  // błysk na wierzchołku: miękki krzyżyk
  vec2 g = abs(vP - uBlyskPoz);
  float gw = exp(-g.x * 70.0 - g.y * 9.0) + exp(-g.y * 70.0 - g.x * 9.0) + 0.6 * exp(-length(g) * 22.0);
  c += lod * gw * uBlysk * (0.25 + uBlask);
  o = vec4(c, wn * 0.10 * min(1.0, widac + uZar));
}`;class Oe{constructor(a,e){this.gl=a,this.szum=e,this.pWachlarz=new R(a,Be,Ce,"wachlarz"),this.pNasycenie=new R(a,H,Ke,"nasycenie"),this.pOdlamek=new R(a,Fe,Ie,"odlamek"),this._w=new Float32Array(Sa*2)}wachlarze(a,e){const i=this.gl,t=this.pWachlarz;i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),t.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).tex("uSzum",0,this.szum);for(const o of e)t.f("uO",o.x,o.y).f("uKat",o.kat).f("uDl",o.dlugosc).f("uRozw",o.rozwarcie).f("uSila",o.sila).f("uZnak",o.znak).f("uZi",o.zi).f("uStart",o.start).f("uSkos",o.skos),i.drawArrays(i.TRIANGLE_STRIP,0,4);i.disable(i.BLEND)}odlamki(a,e,i,t,o,s){const r=this.gl,n=this.pOdlamek,h=a.iskra;n.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uBarwaSw",...e.barwaSw).tex("uSwiatlo",1,t);for(const l of i){if(Math.abs(l.px-a.cam.x)>a.polX+1.5)continue;const u=h.x-l.px,f=h.y-l.py,p=Math.hypot(u,f)||1,z=p/(h.zasieg*1.25);rt.wierzcholki(l,this._w);const m=Math.pow(Math.max(0,Math.sin(a.czas*.9+l.faza*3)),40),w=Math.floor(a.czas*.9/(2*Math.PI)+l.faza)%l.v.length;n.f("uSrodek",l.px,l.py).f("uObsz",l.zasieg+.5).fv("uW",2,this._w).i("uN",l.v.length).f("uDoIskry",u/p,f/p).f("uOs",Math.cos(l.os+l.kat),Math.sin(l.os+l.kat)).f("uBlyskPoz",this._w[w*2],this._w[w*2+1]).f("uBlask",Math.exp(-z*z)).f("uFaza",a.czas*.7+l.faza).f("uBlysk",m).f("uOsw",l.oswietlenie).f("uZar",l.zapalony?l.zar:l.ladunek*l.ladunek*.3),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}}const wa=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,At=`
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
  } else if (typ == 4) {               // skamielina: zwinięta muszla z żebrami
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
  } else {                             // dzwonek: klosz rozszerzający się ku dołowi, ucho, serce
    float sz = 0.56 + 0.05 * mod(w, 3.0);
    float t = clamp((0.5 - p.y) / 1.05, 0.0, 1.0);
    float prof = sz * (0.34 + 0.66 * pow(t, 1.5 + 0.35 * mod(w, 2.0)));
    if (p.y < 0.5 && p.y > -0.55) d = abs(abs(p.x) - prof);
    d = min(d, zSeg(p, vec2(-sz, -0.55), vec2(sz, -0.55)));
    d = min(d, zSeg(p, vec2(-sz * 0.34, 0.5), vec2(sz * 0.34, 0.5)));
    d = min(d, abs(length(p - vec2(0.0, 0.68)) - 0.16));
    d = min(d, abs(length(p - vec2((mod(w, 3.0) - 1.0) * 0.14, -0.74)) - 0.1));
    if (w > 0.5 && w < 1.5) {          // pęknięty
      d = min(d, zSeg(p, vec2(0.16, -0.55), vec2(0.02, -0.18)));
      d = min(d, zSeg(p, vec2(0.02, -0.18), vec2(0.13, 0.12)));
    }
    if (w > 2.5) d = min(d, zSeg(p, vec2(-sz * 0.62, -0.2), vec2(sz * 0.62, -0.2)));        // obręcz
    if (w > 3.5) d = min(d, zSeg(p, vec2(-sz * 0.45, 0.14), vec2(sz * 0.45, 0.14)));
  }
  return d;
}`,De=E+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uPuls;
void main(){
  float r = length(vP);
  float rdzen = exp(-r * r / 0.0035);
  float aura = exp(-r / 0.11) * 0.42 + exp(-r / 0.36) * 0.10;
  o = vec4((mix(uBarwa, vec3(0.93, 1.0, 0.96), 0.55) * rdzen * 0.9 + uBarwa * aura) * uPuls * smoothstep(1.0, 0.7, r), 0.0);
}`,Ne=E+At+`
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
}`,Ze=E+At+`
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
}`,We=E+`
in vec2 vP; out vec4 o; uniform float uPuls, uGoni, uZanik;
void main(){
  float r = length(vP) / (1.0 + uZanik * 1.5);
  float rdzen = exp(-r * r / 0.0050);
  float aura = exp(-r / 0.10) * 0.5 + exp(-r / 0.30) * 0.10;
  float zyje = 1.0 - uZanik;
  vec3 barwa = mix(vec3(0.42, 0.22, 0.85), vec3(0.66, 0.26, 0.92), uGoni);
  o = vec4(barwa * aura * (1.0 - rdzen) * uPuls * (0.8 + 0.5 * uGoni) * zyje * smoothstep(1.0, 0.7, length(vP)), min(rdzen * 1.25, 0.97) * zyje);
}`,Ge=E+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uT, uR;
void main(){
  float r = length(vP), prom = uR * (1.0 - exp(-uT * 2.6));
  // miękka fala światła, nie kreska cyrklem: szeroka, rozmyta i szybko gasnąca
  float pierscien = exp(-abs(r - prom) / (0.14 + 0.3 * uT)) * smoothstep(0.0, 0.25, r);
  o = vec4(mix(uBarwa, vec3(1.0), 0.3) * pierscien * exp(-uT * 3.0) * 0.42, 0.0);
}`;class qe{constructor(a,e){this.gl=a,this.szum=e,this.pDrobinka=new R(a,wa,De,"drobinka"),this.pCien=new R(a,wa,We,"cien"),this.pSlad=new R(a,wa,Ne,"slad"),this.pFresk=new R(a,wa,Ze,"fresk"),this.pKrag=new R(a,wa,Ge,"krag")}miniatura(a,e,i=144){const t=this.gl;this._mini||(this._mini=new ta(t,i,i,{wewn:t.RGBA8,format:t.RGBA,typ:t.UNSIGNED_BYTE}),this._czarna=Na(t,1,1,{dane:new Uint8Array([0,0,0,255])})),this._mini.ustaw(),t.disable(t.BLEND),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),this.pSlad.uzyj().f("uCam",0,0).f("uPol",.7,.7).f("uSrodek",0,0).f("uObsz",.7,.7).f("uRes",i,i).f("uCzas",0).tex("uSwiatlo",1,this._czarna).f("uSkala",.42).i("uTyp",a).f("uWariant",e).f("uBarwa",...W[a].c).f("uOdsl",1.15),t.drawArrays(t.TRIANGLE_STRIP,0,4);const o=new Uint8Array(i*i*4);t.readPixels(0,0,i,i,t.RGBA,t.UNSIGNED_BYTE,o),t.bindFramebuffer(t.FRAMEBUFFER,null);const s=document.createElement("canvas");s.width=s.height=i;const r=s.getContext("2d"),n=r.createImageData(i,i);for(let h=0;h<i;h++)for(let l=0;l<i;l++){const u=((i-1-h)*i+l)*4,f=(h*i+l)*4,p=o[u],z=o[u+1],m=o[u+2],w=Math.max(p,z,m);n.data[f]=p,n.data[f+1]=z,n.data[f+2]=m,n.data[f+3]=Math.min(255,w*1.6)}return r.putImageData(n,0,0),s.toDataURL("image/png")}_wspolne(a,e){return a.uzyj().f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY)}freski(a,e,i,t,o){if(!e.freski.length)return;const s=this.gl,r=this._wspolne(this.pFresk,a);r.f("uRes",t,o).f("uCzas",a.czas).tex("uSwiatlo",1,i).tex("uSzum",0,this.szum);for(const n of e.freski)Math.abs(n.x-a.cam.x)>a.polX+4||(r.f("uSrodek",n.x,n.y).f("uObsz",3.9,2.25).i("uTyp",n.kraina).f("uBarwa",...W[n.kraina].c).f("uOdsl",n.odkryty?0:n.odsloniecie).f("uOdkryty",n.odkryty?1:0).f("uZaplon",n.odkryty&&n.tZaplonu!=null?Math.exp(-Math.max(0,a.czas-n.tZaplonu)*.9):0),s.drawArrays(s.TRIANGLE_STRIP,0,4))}reszta(a,e,i,t,o,s){const r=this.gl,n=a.polX+1.5;let h=this._wspolne(this.pDrobinka,a);for(const l of i.drobinki)Math.abs(l.px-a.cam.x)>n||(h.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uBarwa",...e.barwaSw).f("uPuls",.8+.2*Math.sin(a.czas*2.2+l.faza)),r.drawArrays(r.TRIANGLE_STRIP,0,4));if(i.cienie.length){h=this._wspolne(this.pCien,a);for(const l of i.cienie)Math.abs(l.px-a.cam.x)>n||(h.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uGoni",l.stan===1?1:0).f("uZanik",l.zanik).f("uPuls",.8+.2*Math.sin(a.czas*2.2+l.faza)),r.drawArrays(r.TRIANGLE_STRIP,0,4))}if(i.slady.length){h=this._wspolne(this.pSlad,a),h.f("uRes",o,s).f("uCzas",a.czas).tex("uSwiatlo",1,t).f("uSkala",.42);for(const l of i.slady)Math.abs(l.x-a.cam.x)>n||(h.f("uSrodek",l.x,l.y+Math.sin(a.czas*.8+l.faza)*.06).f("uObsz",.75,.75).i("uTyp",l.kraina).f("uWariant",l.wariant).f("uBarwa",...W[l.kraina].c).f("uOdsl",l.odsloniecie),r.drawArrays(r.TRIANGLE_STRIP,0,4))}if(i.efekty.length){h=this._wspolne(this.pKrag,a);for(const l of i.efekty){const u=l.rodzaj===2?5:l.rodzaj===1?2.2:1.3;h.f("uSrodek",l.x,l.y).f("uObsz",u+.5,u+.5).f("uBarwa",...e.barwaSw).f("uT",l.t).f("uR",u),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}}}const jt=5,ya=7,Lt=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, faza, barwa (0..1), rodzaj (1 = z pąkiem)
layout(location = 2) in float aWzrost;
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
// punkt na łodydze (t = 0 u ziemi, 1 na czubku) i kierunek łodygi w tym punkcie
vec2 lodyga(float t, out vec2 kier){
  float wiatr = (sin(uCzas * 1.1 + aPar.y + aBaza.x * 0.4) * 0.2 + sin(uCzas * 0.43 + aBaza.x * 0.13) * 0.26) * 0.8;
  vec2 od = aBaza + vec2(0.0, aPar.x * 0.6) - uIskra.xy;
  float pchniecie = sign(od.x) * exp(-dot(od, od) / 0.9) * 0.8;
  float a = ((aPar.y - 3.14) * 0.12 + wiatr + pchniecie) * t;
  kier = vec2(sin(a), cos(a));
  return aBaza + kier * aPar.x * aWzrost * t;
}`,Ye=Lt+`
out float vV; out float vT; out float vBarwa; out float vPak;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${jt});
  vec2 kier; vec2 p = lodyga(t, kier);
  float gr = 0.02 * (1.0 - 0.75 * t) * (0.5 + 0.5 * aWzrost);
  if (aPar.w > 0.5) gr += 0.036 * smoothstep(0.6, 0.8, t) * smoothstep(1.0, 0.86, t) * aWzrost;   // pąk
  p += vec2(kier.y, -kier.x) * bok * gr;
  vV = bok; vT = t; vBarwa = aPar.z; vPak = aPar.w;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,Xe=E+Ma+`
in float vV; in float vT; in float vBarwa; in float vPak; out vec4 o;
uniform float uCzas;
void main(){
  float a = smoothstep(1.0, 0.2, abs(vV)) * smoothstep(1.03, 0.9, vT);
  vec3 barwa = mix(widmo(vBarwa), vec3(1.0), 0.18);
  // łodyga ledwo się tli, czubek (i pąk) świeci najmocniej
  float moc = 0.10 + 0.55 * vT * vT + vPak * 0.5 * smoothstep(0.6, 0.85, vT);
  o = vec4(barwa * moc * a, a * 0.5);
}`,Ve=Lt+`
out vec2 vQ; out float vBarwa; out float vMoc;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vec2 kier; vec2 p = lodyga(0.84, kier);
  float rozm = 0.20 + 0.10 * aPar.w;
  vQ = r; vBarwa = aPar.z;
  vMoc = aWzrost * aWzrost * (0.75 + 0.25 * sin(uCzas * 0.9 + aPar.y * 3.0)) * (0.7 + 0.5 * aPar.w);
  gl_Position = vec4((p + r * rozm - uCam) / uPol, 0.0, 1.0);
}`,Ue=E+Ma+`
in vec2 vQ; in float vBarwa; in float vMoc; out vec4 o;
void main(){
  float r2 = dot(vQ, vQ);
  o = vec4(widmo(vBarwa) * exp(-r2 * 3.4) * smoothstep(1.0, 0.5, r2) * vMoc * 0.34, 0.0);
}`;class $e{constructor(a){this.gl=a,this.pZdzblo=new R(a,Ye,Xe,"zarosla"),this.pPoswiata=new R(a,Ve,Ue,"zarosla-poswiata"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf),[[0,2,0],[1,4,2],[2,1,6]].forEach(([e,i,t])=>{a.enableVertexAttribArray(e),a.vertexAttribPointer(e,i,a.FLOAT,!1,ya*4,t*4),a.vertexAttribDivisor(e,1)}),a.bindVertexArray(a.domyslnyVAO),this.dane=new Float32Array(ya*256),this.ile=0,this._klucz=""}rysuj(a,e){if(!e.kielki.length)return;const i=this.gl,t=Math.floor((a.cam.x-a.polX-1.5)/4),o=Math.floor((a.cam.x+a.polX+1.5)/4),s=e.wersja+":"+t+":"+o;if(s!==this._klucz){this._klucz=s;const r=t*4,n=(o+1)*4;let h=0;for(const l of e.kielki){if(l.x<r||l.x>n)continue;if((h+1)*ya>this.dane.length){const p=new Float32Array(this.dane.length*2);p.set(this.dane),this.dane=p}const u=this.dane,f=h*ya;u[f]=l.x,u[f+1]=l.y,u[f+2]=l.dl,u[f+3]=l.faza,u[f+4]=l.t,u[f+5]=l.rodzaj,u[f+6]=l.wzrost,h++}this.ile=h,i.bindBuffer(i.ARRAY_BUFFER,this.buf),i.bufferData(i.ARRAY_BUFFER,this.dane.subarray(0,h*ya),i.DYNAMIC_DRAW)}if(this.ile){i.bindVertexArray(this.vao);for(const r of[this.pPoswiata,this.pZdzblo])r.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,r===this.pZdzblo?2*(jt+1):4,this.ile);i.bindVertexArray(i.domyslnyVAO)}}}const Fa=16,ra={predkosc:3.6,szer:1,szansa:.3,narasta:3.5};function He(c,a){if(a<2)return null;const e=ea(c.ziarno,5151,a);if(e()>ra.szansa)return null;const i=e()<.5?1:-1,t=14+Math.floor(e()*11),o=a*Fa+e()*Fa-(i<0?-t:0),s=.25+.5*e(),r=.5+e()*1.1,n=.25+e()*.25,h=e()*6.283,l=(e()-.5)*.12;let u=new Float32Array(t+1);for(let f=0;f<=t;f++){const p=o+i*f,z=c.ziemia(p)+1.7,m=c.granicaLotu(p)-1.3,w=z+(m-z)*s+r*Math.sin(f*n+h)+l*(f-t/2)*4;u[f]=Math.max(z,Math.min(Math.max(z,m),w))}for(let f=0;f<3;f++){const p=new Float32Array(t+1);for(let z=0;z<=t;z++)p[z]=(u[Math.max(0,z-1)]+u[z]*2+u[Math.min(t,z+1)])/4;u=p}return{id:a,x0:o,kier:i,L:t,y:u,faza:e()*100}}function Rt(c,a,e){const i=Math.max(0,Math.min(c.L-1,Math.floor(a))),t=Math.max(0,Math.min(1,a-i)),o=c.y[i+1]-c.y[i],s=Math.hypot(1,o);return e[0]=c.x0+c.kier*a,e[1]=c.y[i]+o*t,e[2]=c.kier/s,e[3]=o/s,e}const Pa=[0,0,0,0];class Je{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.sila=0,this.wlaczone=!0}krok(a,e,i,t){const o=Math.floor((e.x-i-30)/Fa),s=Math.floor((e.x+i+30)/Fa);this.widoczne.length=0;let r=0,n=0,h=0;if(this.wlaczone)for(let u=o;u<=s;u++){let f=this.kawalki.get(u);if(f===void 0&&(this.kawalki.size>40&&this.kawalki.clear(),f=He(this.swiat,u),this.kawalki.set(u,f)),!f)continue;this.widoczne.push(f);const p=(t.x-f.x0)*f.kier;if(p<=0||p>=f.L)continue;Rt(f,p,Pa);const z=t.y-Pa[1];if(Math.abs(z)>=ra.szer)continue;const m=(1-(z/ra.szer)**2)*Math.min(1,p/2,(f.L-p)/2);m>h&&(h=m,r=Pa[2]*ra.predkosc*m,n=Pa[3]*ra.predkosc*m-z*1.4*m)}const l=Math.min(1,a*ra.narasta);t.pradX+=(r-t.pradX)*l,t.pradY+=(n-t.pradY)*l,this.sila+=(h-this.sila)*l,t.wPradzie=this.sila,Math.abs(t.pradX)<1e-4&&Math.abs(t.pradY)<1e-4&&(t.pradX=0,t.pradY=0)}}const Ia=16,Z={szansa:.24,sladow:24,odstep:.6,promien:1,zarasta:9},Oa=3;function Qe(c,a){if(a<3)return null;const e=ea(c.ziarno,6262,a);if(e()>Z.szansa)return null;const i=a*Ia+e()*Ia,t=5+e()*4.5,o=2+e()*1.4,s=c.ziemia(i),r=c.granicaLotu(i),n=Math.min(r-o*.6,s+o*.7+e()*2.6);return{id:a,x:i,y:n,rx:t,ry:o}}class ai{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.wlaczone=!0,this.slad=new Float32Array(Z.sladow*4),this.banki=new Float32Array(Oa*4),this.nr=0,this.ox=null,this.oy=0,this.wyczysc()}wyczysc(){for(let a=0;a<Z.sladow;a++)this.slad[a*4+2]=1,this.slad[a*4+3]=-1e3;this.ox=null}krok(a,e,i,t){const o=Math.floor((a.x-e-10)/Ia),s=Math.floor((a.x+e+10)/Ia);if(this.widoczne.length=0,this.banki.fill(0),this.wlaczone)for(let h=o;h<=s&&this.widoczne.length<Oa;h++){let l=this.kawalki.get(h);if(l===void 0&&(this.kawalki.size>40&&this.kawalki.clear(),l=Qe(this.swiat,h),this.kawalki.set(h,l)),!l||Math.abs(l.x-a.x)>e+l.rx+1)continue;const u=this.widoczne.length*4;this.banki[u]=l.x,this.banki[u+1]=l.y,this.banki[u+2]=l.rx,this.banki[u+3]=l.ry,this.widoczne.push(l)}if(this.ox===null){this.ox=i.x,this.oy=i.y;return}const r=Math.hypot(i.x-this.ox,i.y-this.oy);if(r>4){this.ox=i.x,this.oy=i.y;return}if(r<Z.odstep)return;const n=this.nr*4;this.slad[n]=(i.x+this.ox)/2,this.slad[n+1]=(i.y+this.oy)/2,this.slad[n+2]=Z.promien*(.85+.3*Math.min(1,i.energia+.3)),this.slad[n+3]=t,this.nr=(this.nr+1)%Z.sladow,this.ox=i.x,this.oy=i.y}rozwianie(a,e,i,t){let o=1;for(let n=0;n<Z.sladow;n++){const h=a-this.slad[n*4],l=e-this.slad[n*4+1],u=this.slad[n*4+2];o*=1-Math.exp(-(h*h+l*l)/(u*u))*Math.exp(-Math.max(0,t-this.slad[n*4+3])/Z.zarasta)}const s=a-i.x,r=e-i.y;return o*=1-Math.exp(-(s*s+r*r)/(Z.promien*Z.promien)),1-o}gestosc(a,e,i,t){let o=0;for(const s of this.widoczne){const r=Math.hypot((a-s.x)/s.rx,(e-s.y)/s.ry),n=Math.max(0,Math.min(1,(1-r)/.75));o=Math.max(o,n*n*(3-2*n))}return o*(1-this.rozwianie(a,e,i,t))}}const mt=44,Aa=5,ti=`#version 300 es
layout(location = 0) in vec2 aPoz;
layout(location = 1) in vec3 aUv;       // wzdłuż (-1 ogon .. 1 czoło), w poprzek (-1..1), alfa
uniform vec2 uCam, uPol;
out vec3 vUv; out vec2 vSw;
void main(){ vUv = aUv; vSw = aPoz; gl_Position = vec4((aPoz - uCam) / uPol, 0.0, 1.0); }`,ei=E+`
in vec3 vUv; in vec2 vSw; out vec4 o;
uniform vec3 uIskra, uBarwa; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  // smużka: jasne czoło, długi gasnący ogon, miękkie brzegi
  float wzdluz = smoothstep(-1.0, 0.55, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
  float ksztalt = wzdluz * wzdluz * exp(-vUv.y * vUv.y * 4.5);
  vec2 L = uIskra.xy - vSw; float r = length(L) / (uIskra.z * 1.2);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = uBarwa * (0.085 + 0.30 * exp(-r * r)) + tecza * 0.8;
  o = vec4(c * ksztalt * vUv.z, 0.0);
}`,ii=E+ma+`
in vec2 vUv; out vec4 o;
uniform vec4 uBanki[${Oa}];       // x, y, rx, ry
uniform vec4 uSlad[${Z.sladow}];         // x, y, promień, chwila
uniform vec3 uIskra, uMgla, uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  vec2 pw = swiatZUv(vUv);
  float g = 0.0;
  for (int i = 0; i < ${Oa}; i++) {
    vec4 b = uBanki[i];
    if (b.z > 0.0) g = max(g, smoothstep(1.0, 0.25, length((pw - b.xy) / b.zw)));
  }
  if (g < 0.004) discard;
  // rozwianie: ślad przelotu i sama iskierka; mgła jest też wypychana na boki (przesunięcie szumu)
  float zostaje = 1.0; vec2 pch = vec2(0.0);
  for (int i = 0; i < ${Z.sladow}; i++) {
    vec4 s = uSlad[i];
    vec2 d = pw - s.xy;
    float w = exp(-dot(d, d) / (s.z * s.z)) * exp(-max(0.0, uCzas - s.w) / ${Z.zarasta.toFixed(1)});
    zostaje *= 1.0 - w;
    pch += d * w;
  }
  vec2 di = pw - uIskra.xy;
  float wi = exp(-dot(di, di) / ${(Z.promien*Z.promien).toFixed(3)});
  zostaje *= 1.0 - wi; pch += di * wi;
  float czysto = 1.0 - zostaje;
  vec2 ps = pw - pch * 0.55;
  float n1 = kleby(ps * vec2(0.045, 0.075) + vec2(uCzas * 0.006, -uCzas * 0.002));
  float n2 = kleby2(ps * vec2(0.16, 0.22) + vec2(-uCzas * 0.011, uCzas * 0.004));
  float gest = g * (0.18 + 1.35 * n1 + 0.5 * n2) * zostaje;
  gest += g * czysto * zostaje * 1.6;                      // wał mgły zgarniętej na brzeg tunelu
  float alfa = clamp(gest * 0.95, 0.0, 0.93);
  float r = length(di) / uIskra.z;
  vec3 tecza = texture(uSwiatlo, vUv).rgb;
  vec3 c = uMgla * (0.15 + 0.13 * n2 + 0.08 * n1) + mix(uBarwaSw, uMgla, 0.5) * exp(-r * r * 0.7) * (0.36 + 0.4 * n1) + tecza * (0.75 + 0.5 * n1);
  o = vec4(c * alfa, alfa);
}`,ia=[0,0,0,0],ja=c=>{const a=Math.sin(c*91.345+7.1)*47453.5453;return a-Math.floor(a)};class oi{constructor(a,e){this.gl=a,this.szum=e,this.pPrad=new R(a,ti,ei,"prad"),this.pMgla=new R(a,H,ii,"mglawica"),this.dane=new Float32Array(6*mt*4*Aa),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf),a.bufferData(a.ARRAY_BUFFER,this.dane.byteLength,a.DYNAMIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,2,a.FLOAT,!1,Aa*4,0),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,3,a.FLOAT,!1,Aa*4,8),a.bindVertexArray(a.domyslnyVAO)}prady(a,e,i,t,o,s){const r=this.gl,n=this.dane,h=a.czas;let l=0;const u=(z,m,w,d,k)=>{n[l++]=z,n[l++]=m,n[l++]=w,n[l++]=d,n[l++]=k};let f=0;for(const z of i.widoczne){if(f>=4)break;const m=Math.min(z.x0,z.x0+z.kier*z.L);if(!(Math.max(z.x0,z.x0+z.kier*z.L)<a.cam.x-a.polX-2||m>a.cam.x+a.polX+2)){f++;for(let d=0;d<mt;d++){const k=ja(d*3.1+z.faza),y=ja(d*5.7+z.faza+11),x=ja(d*7.3+z.faza+23),v=ja(d*1.9+z.faza+37),M=(k*z.L+h*ra.predkosc*(.75+.5*y))%z.L;Rt(z,M,ia);const b=(x*2-1)*ra.szer*.8+Math.sin(h*(.6+v)+k*40)*.12,g=ia[0]-ia[3]*b,T=ia[1]+ia[2]*b,j=.45+.75*v,L=.045+.04*y,N=Math.min(1,M/2.5,(z.L-M)/2.5)*(.4+.6*x)*(1-.55*Math.abs(x*2-1)),O=ia[2]*j,D=ia[3]*j,q=-ia[3]*L,S=ia[2]*L;u(g-O-q,T-D-S,-1,-1,N),u(g+O-q,T+D-S,1,-1,N),u(g+O+q,T+D+S,1,1,N),u(g-O-q,T-D-S,-1,-1,N),u(g+O+q,T+D+S,1,1,N),u(g-O+q,T-D+S,-1,1,N)}}}if(!l)return;const p=e.barwaSw;this.pPrad.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwa",.5+.5*p[0],.5+.5*p[1],.5+.5*p[2]).tex("uSwiatlo",1,t),r.bindVertexArray(this.vao),r.bindBuffer(r.ARRAY_BUFFER,this.buf),r.bufferSubData(r.ARRAY_BUFFER,0,n,0,l),r.drawArrays(r.TRIANGLES,0,l/Aa),r.bindVertexArray(r.domyslnyVAO)}mglawice(a,e,i,t,o,s){if(!i.widoczne.length)return;const r=(.4+.6*e.otoczenie)/Math.max(.05,e.otoczenie),n=e.mgla;this.pMgla.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uCzas",a.czas).tex("uSzum",0,this.szum).tex("uSwiatlo",1,t).fv("uBanki",4,i.banki).fv("uSlad",4,i.slad).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uMgla",n[0]*r,n[1]*r,n[2]*r).f("uBarwaSw",...e.barwaSw),Q(this.gl)}}const aa={wys:20,ziemia:-1,predkosc:.069,tempo:.9,przerwa:[240,480],pierwszy:[110,200]};class si{constructor(){this.aktywny=!1,this.auto=!0,this.x=0,this.kier=1,this.faza=0,this.czas=0,this.widziany=!1,this.wys=aa.wys,this.do=aa.pierwszy[0]+Math.random()*(aa.pierwszy[1]-aa.pierwszy[0]),this.przejsc=0}krok(a,e,i){if(!this.aktywny){this.auto&&(this.do-=a)<=0&&this.wywolaj(e,i);return}this.czas+=a,this.x+=this.kier*aa.predkosc*this.wys*a;const t=Math.floor(this.faza/Math.PI);this.faza+=aa.tempo*a;const o=Math.abs(this.x-e),s=this.wys*.8;o<i+s&&(this.widziany=!0),Math.floor(this.faza/Math.PI)!==t&&o<i*1.4&&this.naKrok?.({bliskosc:Math.max(0,1-o/(i*1.4))}),(this.widziany&&o>i+s*1.5||o>i*3||this.czas>420)&&(this.aktywny=!1,this.przejsc++,this.do=aa.przerwa[0]+Math.random()*(aa.przerwa[1]-aa.przerwa[0]))}wywolaj(a,e,i=Math.random()<.5?1:-1,t=0){this.aktywny=!0,this.kier=i,this.czas=0,this.widziany=!1,this.faza=Math.random()*6.283,this.x=a-i*(e+this.wys*.8-t)}}const kt=132,V=22,wt=46;class ri{constructor(a){this.ziarno=a|0,this._perm=new Map,this._komorki=new Map,this._w=new Float32Array(I),this._w2=new Float32Array(I)}_permSurowa(a){const e=ea(this.ziarno,a,5),i=[...Array(I).keys()];for(let t=I-1;t>0;t--){const o=Math.floor(e()*(t+1));[i[t],i[o]]=[i[o],i[t]]}if(a===0)for(;i[0]!==0;)i.push(i.shift());return i}_permutacja(a){let e=this._perm.get(a);if(!e){e=this._permSurowa(a);const i=this._permSurowa(a-1)[I-1];a!==0&&e[0]===i?[e[0],e[1]]=[e[1],e[0]]:a===0&&(this._permSurowa(1)[0],e[I-1]),this._perm.set(a,e)}return e}krainaSegmentu(a){const e=Math.floor(a/I);return this._permutacja(e)[a-e*I]}granica(a){return a*kt-wt+(za(a,this.ziarno,77)-.5)*34}segment(a){let e=Math.floor((a+wt)/kt);for(;a<this.granica(e);)e--;for(;a>=this.granica(e+1);)e++;return e}srodekSegmentu(a){return(this.granica(a)+this.granica(a+1))/2}wagi(a,e=new Float32Array(I)){e.fill(0);const i=this.segment(a),t=this.granica(i),o=this.granica(i+1),s=this.krainaSegmentu(i);if(a>o-V){const r=da(o-V,o+V,a);e[s]+=1-r,e[this.krainaSegmentu(i+1)]+=r}else if(a<t+V){const r=da(t-V,t+V,a);e[this.krainaSegmentu(i-1)]+=1-r,e[s]+=r}else e[s]=1;return e}krainaW(a){return this.krainaSegmentu(this.segment(a))}mieszaj(a,e,i=[0,0,0]){const t=this.wagi(a,this._w2);i[0]=i[1]=i[2]=0;for(let o=0;o<I;o++)if(t[o]>0){const s=W[o][e];i[0]+=s[0]*t[o],i[1]+=s[1]*t[o],i[2]+=s[2]*t[o]}return i}mieszajLiczbe(a,e){const i=this.wagi(a,this._w2);let t=0;for(let o=0;o<I;o++)i[o]>0&&(t+=i[o]*e(W[o],o));return t}teleporty(){const a=[];for(let e=0;a.length<I&&e<40;e++){const i=this.krainaSegmentu(e);a.some(t=>t.kraina===i)||a.push({nazwa:W[i].id,kraina:i,x:this.srodekSegmentu(e),segment:e})}return a.sort((e,i)=>e.kraina-i.kraina)}_terenKrainy(a,e){const i=W[a].teren,t=this.ziarno,o=K(e*.021,t+3,3);switch(a){case 1:{const s=K(e*.05,t+31,3);return i.baza+i.amp*(s-.5)*2.1+.12*(K(e*.4,t+32,2)-.5)}case 2:{const s=K(e*.35,t+41,2);return i.baza+i.amp*(o-.5)*2+i.drobne*Math.abs(s-.5)*2}case 3:{const s=i.baza+i.amp*(o-.5)*2*1.6,r=.55,n=s/r,h=Math.floor(n),l=n-h;return(h+da(.35,.65,l))*r+.05*(K(e*.6,t+51,2)-.5)}case 4:{const s=K(e*.032,t+61,2);return i.baza+i.amp*(s-.5)*2+.25*Math.sin(e*.21+6*s)}case 5:{const s=K(e*.045,t+81,2);return i.baza+i.amp*Math.pow(1-Math.abs(2*s-1),1.3)*1.3+i.drobne*(K(e*.4,t+82,2)-.5)}default:return i.baza+i.amp*(o-.5)*2+i.drobne*(K(e*.23,t+21,3)-.5)*2}}ziemia(a){const e=this.wagi(a,this._w);let i=0;for(let t=0;t<I;t++)e[t]>0&&(i+=e[t]*this._terenKrainy(t,a));return i}sufit(a){const e=this.wagi(a,this._w)[0];return e<.02?1e4:W[0].teren.sufit+1.1*(K(a*.11,this.ziarno+71,3)-.5)+(1-e)*9}granicaLotu(a){return Math.min(15.3,this.sufit(a)-.5)}terenWarstwy(a,e){if(a===J)return this.ziemia(e);const i=G[a],t=e/i.mnoznikX,o=e/i.z,s=this.ziarno+100*(a+1),r=this.wagi(t,this._w),n=a===0?1.7:a===1?1.25:1;let h=0;if(r[0]>0&&(h+=r[0]*(1.5*K(o*.06,s,3)+.3*K(o*.3,s+1,2))),r[1]>0&&(h+=r[1]*(.35*K(o*.07,s+2,2)+.2)),r[2]>0){const l=K(o*.11,s+3,3);h+=r[2]*(2.3*(1-Math.abs(2*l-1))*n+.5*K(o*.5,s+4,2))}if(r[3]>0){const l=K(o*.05,s+5,2)*3;h+=r[3]*((Math.floor(l)+da(.4,.6,l-Math.floor(l)))*.55+.2)}if(r[4]>0&&(h+=r[4]*(1.9*K(o*.045,s+6,2)*n+.25*Math.sin(o*.3))),r[5]>0){const l=K(o*.16,s+7,3),u=K(o*.55,s+8,2);h+=r[5]*(2.6*Math.pow(1-Math.abs(2*l-1),1.6)*n+.9*(1-Math.abs(2*u-1)))}return i.bliska&&(h=h*.6-.5),h*i.z}sufitWarstwy(a,e){if(a===J)return this.sufit(e);const i=G[a];if(a<2||i.bliska)return 1e4;const t=this.wagi(e/i.mnoznikX,this._w)[0];return t<.02?1e4:i.A+i.z*(a===2?3.4:4.3)+i.z*(1.4*(K(e/i.z*.1,this.ziarno+80+a,3)-.5)+(1-t)*9)}rekwizyty(a,e){const i=a*1e6+e+5e5;let t=this._komorki.get(i);return t||(this._komorki.size>600&&this._komorki.clear(),t=Me(this,a,e),this._komorki.set(i,t)),t}rekwizytyW(a,e,i){const t=G[a],o=t.komorka*t.z,s=9*t.z,r=[];for(let n=Math.floor((e-s)/o);n<=Math.floor((i+s)/o);n++)for(const h of this.rekwizyty(a,n))h.x+h.ox>e&&h.x-h.ox<i&&r.push(h);return r.sort((n,h)=>n.kolejnosc-h.kolejnosc),r}_bryly(a){const e=G[J],i=Math.floor(a/e.komorka),t=this._tmpBryly||(this._tmpBryly=[]);t.length=0;for(let o=i-1;o<=i+1;o++)for(const s of this.rekwizyty(J,o))s.bryla&&t.push(s.bryla);return t}odleglosc(a,e){let i=Math.min(e-this.ziemia(a),this.granicaLotu(a)-e);for(const t of this._bryly(a)){const o=Math.abs(a-t.x)-t.rx,s=Math.abs(e-t.y)-t.ry,r=Math.hypot(Math.max(o,0),Math.max(s,0))+Math.min(Math.max(o,s),0)-t.r;r<i&&(i=r)}return i}_normalna(a,e){const t=this.odleglosc(a+.06,e)-this.odleglosc(a-.06,e),o=this.odleglosc(a,e+.06)-this.odleglosc(a,e-.06),s=Math.hypot(t,o)||1;return[t/s,o/s]}odpychanie(a,e,i){const t=this.odleglosc(a,e)-i,o=.75;if(t>=o)return ni;const s=this._normalna(a,e),r=10*(1-Math.max(0,t)/o)**2;return[s[0]*r,s[1]*r]}zderzenie(a,e,i){const t=this.odleglosc(a,e)-i;if(t>=0)return null;const o=this._normalna(a,e);return{nx:o[0],ny:o[1],gl:-t}}woda(a){return this.ziemia(a)<et}}const ni=[0,0],nt=["wszystko","tlo","swiat","swiatlo","glow","maska"],li=204,ci=460;class ui{constructor(a,e){this.gl=a,this.swiat=e,this.szum=Zt(a),this.warstwa="wszystko",this.jakosc={tlo:.5,swiatlo:.5,ziarno:.028,drobinki:1,flora:!0},this.ziarno=.028;const i=Kt(a);this.bTlo=new ta(a,4,4,i),this.bSwiat=new ta(a,4,4,i),this.bSwiatlo=new ta(a,4,4,i),this.bSurowe=new ta(a,4,4,i),this.bGlow=[new ta(a,4,4,i),new ta(a,4,4,i),new ta(a,4,4,i)],this.bGlowWy=new ta(a,4,4,i),this.pNiebo=new R(a,H,Ut,"niebo"),this.pWarstwa=new R(a,H,$t,"warstwa"),this.pBliska=new R(a,H,Ht,"warstwa-bliska"),this.pGra=new R(a,H,Jt,"plan-gry"),this.pDrobinki=new R(a,te,ee,"drobinki"),this.pKopia=new R(a,H,Wt,"kopia"),this.pDol=new R(a,H,Gt,"rozmyj-dol"),this.pGora=new R(a,H,qt,"rozmyj-gora"),this.pFinal=new R(a,H,Yt,"final"),this.pOlbrzym=new R(a,H,ie,"olbrzym"),this.pPyl=new R(a,oe,se,"pyl"),this.iskierka=new fe(a),this.wypiek=new Pe(a,this.szum,e),this.flora=new je(a,e),this.szklo=new Oe(a,this.szum),this.obiekty=new qe(a,this.szum),this.zarosla=new $e(a),this.zjawiska=new oi(a,this.szum),this.bez={},this.w=0,this.h=0,this.atm={mglaL:[0,0,0],mglaP:[0,0,0],mgla:[0,0,0],mgla2:[0,0,0],gora:[0,0,0],dol:[0,0,0],barwaSw:[0,0,0],emis:[0,0,0],niebo:[0,0,0,0],zjawiska:[0,0],burza:[0,0,0,0],blysk:0,gestoscMgly:0,cialo:[0,0],poswiata:0,swNieba:[0,1,0],pogoda:[0,0,1,0],gruntY:[0,0],woda:[et,0,0],wL:new Float32Array(I),wP:new Float32Array(I)},this._camL=[0,0]}rozmiar(a,e){this.w=a,this.h=e;const i=this.jakosc;this.bTlo.rozmiar(a*i.tlo,e*i.tlo),this.bSwiat.rozmiar(a,e),this.bSwiatlo.rozmiar(a*i.swiatlo,e*i.swiatlo),this.bSurowe.rozmiar(a*i.swiatlo,e*i.swiatlo);let t=a*i.swiatlo,o=e*i.swiatlo;for(const s of this.bGlow)t/=2,o/=2,s.rozmiar(t,o);this.bGlowWy.rozmiar(a*i.swiatlo*.5,e*i.swiatlo*.5)}miniatura(a,e){return this.obiekty.miniatura(a,e)}_atmosfera(a){const e=this.atm,i=this.swiat,t=a.cam.x;i.mieszaj(t-a.polX,"mgla",e.mglaL),i.mieszaj(t+a.polX,"mgla",e.mglaP),i.mieszaj(t,"mgla",e.mgla),i.mieszaj(t,"mgla2",e.mgla2),i.mieszaj(t,"nieboGora",e.gora),i.mieszaj(t,"nieboDol",e.dol),i.mieszaj(t,"emis",e.emis);for(let b=0;b<3;b++)e.barwaSw[b]=e.mgla[b]*.68+.34;const o=b=>i.mieszajLiczbe(t,g=>g.niebo[b]);e.niebo[0]=o("tarcza"),e.niebo[1]=o("obrecz"),e.niebo[2]=o("zorza"),e.niebo[3]=o("gwiazdy"),e.poswiata=o("poswiata");const s=o("snopy");e.pogoda[0]=i.mieszajLiczbe(t,b=>b.wiatr),e.pogoda[1]=s,e.pogoda[2]=i.mieszajLiczbe(t,b=>b.mglistosc);const r=a.polX/a.polY,n=b=>Math.max(-r*.8,Math.min(r*.8,(i.srodekSegmentu(b)-t)*.011+r*.28)),h=i.segment(t),l=i.granica(h),u=i.granica(h+1);if(t>u-V){const b=da(u-V,u+V,t);e.cialo[0]=n(h)*(1-b)+n(h+1)*b}else if(t<l+V){const b=da(l-V,l+V,t);e.cialo[0]=n(h-1)*(1-b)+n(h)*b}else e.cialo[0]=n(h);e.cialo[1]=.4-(a.cam.y-5.3)*.012;const f=e.niebo[0]+e.niebo[1];let p=e.cialo[0]*f+.25*s,z=e.cialo[1]*f+1*s+.3;const m=Math.hypot(p,z)||1;e.swNieba[0]=p/m,e.swNieba[1]=z/m,e.swNieba[2]=Math.min(1,.35+f*.7+s*.3),e.gruntY[0]=i.ziemia(t-a.polX),e.gruntY[1]=i.ziemia(t+a.polX),i.wagi(t-a.polX,e.wL),i.wagi(t+a.polX,e.wP),e.woda[1]=e.wL[1],e.woda[2]=e.wP[1];const w=Math.max(0,Math.min(1,(a.iskra.zasieg-a.iskra.zasiegBazowy)/4.7)),d=a.pogoda,k=d?d.burza:0,y=d?d.blysk:0;e.otoczenie=.15+.85*Math.pow(w,.75);const x=e.otoczenie*(1-.35*k)+y*1.7;e.blysk=y,e.burza[0]=k,e.burza[1]=y,e.burza[2]=d?d.piorunX:0,e.burza[3]=d?d.piorunZiarno:0;for(let b=0;b<3;b++)e.mglaL[b]*=x,e.mglaP[b]*=x,e.mgla[b]*=x,e.mgla2[b]*=x,e.gora[b]*=x,e.dol[b]*=x;e.niebo[0]*=x,e.niebo[1]*=x,e.niebo[2]*=x,e.poswiata*=x,e.swNieba[2]*=x;const v=d?d.mgla:0,M=d?d.zacmienie:0;if(e.gestoscMgly=v,e.pogoda[2]*=1+2.4*v,e.zjawiska[0]=M,e.zjawiska[1]=.55*M*(e.wL[1]+e.wP[1])*.5,M>0){const b=1-.45*M*(e.wL[1]+e.wP[1])*.5;for(let g=0;g<3;g++)e.mglaL[g]*=b,e.mglaP[g]*=b,e.mgla[g]*=b,e.mgla2[g]*=b,e.dol[g]*=b;e.poswiata*=1-.6*M,e.swNieba[2]*=1-.5*M}return e}_widok(a,e){a.f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY).f("uRes",this.w,this.h).f("uCzas",e.czas).tex("uSzum",0,this.szum)}_warstwa(a,e,i,t){const o=G[e],s=this.wypiek.warstwy[e];ft(o,i.cam,this._camL),this._widok(a.uzyj(),i),a.tex("uKafle",1,s.bufor.tex[0]).tex("uKafle2",2,s.bufor.tex[1]).tex("uSwiatlo",3,this.bSwiatlo.tex[0]).f("uCamL",this._camL[0],this._camL[1]).f("uLz",o.z).f("uKafelPar",1/(Ae*o.szer),o.y0,1/o.wys).f("uMglaL",...t.mglaL).f("uMglaP",...t.mglaP).f("uMgla2",...t.mgla2).f("uAtm",o.zamglenie+(.97-o.zamglenie)*.7*t.gestoscMgly*(o.gra?0:1),o.mgla*(1+1.3*t.gestoscMgly),o.otoczenie+t.blysk*(o.gra?5:3),o.iskra).f("uIskra",i.iskra.x,i.iskra.y,i.iskra.zasieg).f("uBarwaSw",...t.barwaSw).f("uEmis",.9,.9,.9).f("uPogoda",...t.pogoda).f("uSwNieba",...t.swNieba).f("uGruntY",...t.gruntY).f("uJasnosc",o.jasnosc),Q(this.gl)}rysuj(a){const e=this.gl;if(e.disable(e.BLEND),this.warstwa==="maska"){this._maska(a);return}const i=this._atmosfera(a);if(this.wypiek.zapewnij(a.cam,a.polX,a.iskra.vx),this.bTlo.ustaw(),this._widok(this.pNiebo.uzyj(),a),this.pNiebo.f("uGora",...i.gora).f("uDol",...i.dol).f("uMgla",...i.mgla).f("uMgla2",...i.mgla2).f("uNiebo",...i.niebo).f("uCialo",...i.cialo).f("uPoswiata",i.poswiata).f("uZjawiska",...i.zjawiska).f("uBurza",...i.burza),Q(e),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),a.olbrzym&&a.olbrzym.aktywny&&this._olbrzym(a,i),!this.bez.dalekie)for(let l=0;l<4;l++)this._warstwa(this.pWarstwa,l,a,i);e.disable(e.BLEND);const t=a.tecze?a.tecze.wachlarze:[],o=t.length>0;o&&(this.bSurowe.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),this.szklo.wachlarze(a,t),this.bSwiatlo.ustaw(),this.szklo.pNasycenie.uzyj().tex("uTex",0,this.bSurowe.tex[0]),Q(e)),(o||this._swiecilo)&&(o||(this.bSwiatlo.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)),this._poswiata()),this._swiecilo=o,a.znaleziska&&a.znaleziska.freski.length&&(this.bTlo.ustaw(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.obiekty.freski(a,a.znaleziska,this.bSwiatlo.tex[0],this.bTlo.w,this.bTlo.h),e.disable(e.BLEND)),this.bSwiat.ustaw(),this.pGra.uzyj().tex("uTlo",4,this.bTlo.tex[0]).f("uWoda",...i.woda),this.bez.gra?(this.pKopia.uzyj().tex("uTex",0,this.bTlo.tex[0]),Q(e)):this._warstwa(this.pGra,J,a,i),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.jakosc.flora&&!this.bez.flora&&this.flora.rysuj(a,i,this.bSwiatlo.tex[0],this.w,this.h),a.zarosla&&!this.bez.zarosla&&this.zarosla.rysuj(a,a.zarosla),a.odlamki&&this.szklo.odlamki(a,i,a.odlamki,this.bSwiatlo.tex[0],this.w,this.h),a.prady&&!this.bez.prady&&this.zjawiska.prady(a,i,a.prady,this.bSwiatlo.tex[0],this.w,this.h),a.znaleziska&&this.obiekty.reszta(a,i,a.znaleziska,this.bSwiatlo.tex[0],this.w,this.h);const s=this.bez.drobinki?0:Math.round(li*this.jakosc.drobinki);s>0&&(this.pDrobinki.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).fv("uWL",1,i.wL).fv("uWP",1,i.wP).f("uWoda",et).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).f("uEmis",...i.emis).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),e.drawArrays(e.POINTS,0,s));const r=a.pogoda?a.pogoda.pyl:0;r>.01&&!this.bez.drobinki&&(this.pPyl.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uSila",r).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),e.drawArrays(e.POINTS,0,Math.round(ci*Math.max(.35,this.jakosc.drobinki)))),a.mgly&&!this.bez.mgly&&this.zjawiska.mglawice(a,i,a.mgly,this.bSwiatlo.tex[0],this.w,this.h),a.mgla=i.mgla,this.bez.iskra||this.iskierka.rysuj(a),this.bez.bliska||this._warstwa(this.pBliska,5,a,i),e.disable(e.BLEND),ht(e,this.w,this.h);const n=nt.indexOf(this.warstwa),h=n===1?this.bTlo.tex[0]:n===3?this.bSwiatlo.tex[0]:this.bSwiat.tex[0];this.pFinal.uzyj().tex("uSwiat",0,h).tex("uGlow",1,this.bGlowWy.tex[0]).tex("uSzum",2,this.szum).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uTryb",n===4?3:n===0?0:1).f("uZiarno",this.ziarno),Q(e)}_olbrzym(a,e){const i=G[0],t=a.olbrzym;ft(i,a.cam,this._camL),!(Math.abs(t.x-this._camL[0])>a.polX*i.z+t.wys*.8)&&(this._widok(this.pOlbrzym.uzyj(),a),this.pOlbrzym.f("uCamL",this._camL[0],this._camL[1]).f("uLz",i.z).f("uOlbrzym",t.x,aa.ziemia,t.wys,t.faza).f("uKier",t.kier).f("uMgla",...e.mgla).f("uMgla2",...e.mgla2),Q(this.gl))}pomiar(a,e=40){const i=this.gl,t=new Uint8Array(4);this.rysuj(a),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,t);const o=performance.now();for(let s=0;s<e;s++)a.czas+=.016,this.rysuj(a);return i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,t),(performance.now()-o)/e}_maska(a){const e=this.gl;ht(e,this.w,this.h),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),a.mgla=this.atm.mgla,this.iskierka.rysuj(a,!0)}_poswiata(){const a=this.gl;let e=this.bSwiatlo;this.pDol.uzyj();for(const i of this.bGlow)i.ustaw(),this.pDol.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),Q(a),e=i;this.pGora.uzyj();for(let i=this.bGlow.length-2;i>=0;i--){const t=this.bGlow[i];t.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),Q(a),e=t}this.bGlowWy.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),Q(a)}}const Va={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,1],w:[0,1],arrowdown:[0,-1],s:[0,-1]};class hi{constructor(a){this.canvas=a,this.wcisniete=new Set,this.wskaznik=null,this.poruszono=!1,this.naPierwszyRuch=null;const e=()=>{this.poruszono||(this.poruszono=!0,this.naPierwszyRuch?.())};addEventListener("keydown",t=>{const o=t.key.toLowerCase();Va[o]&&!t.ctrlKey&&!t.metaKey&&!t.altKey&&(this.wcisniete.add(o),t.preventDefault(),e())}),addEventListener("keyup",t=>this.wcisniete.delete(t.key.toLowerCase())),addEventListener("blur",()=>{this.wcisniete.clear(),this.wskaznik=null}),a.addEventListener("pointerdown",t=>{this.wskaznik={x:t.clientX,y:t.clientY};try{a.setPointerCapture(t.pointerId)}catch{}e()}),a.addEventListener("pointermove",t=>{this.wskaznik&&(this.wskaznik.x=t.clientX,this.wskaznik.y=t.clientY)});const i=()=>{this.wskaznik=null};a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),a.addEventListener("contextmenu",t=>t.preventDefault())}odczyt(a){let e=0,i=0;for(const s of this.wcisniete)e+=Va[s][0],i+=Va[s][1];const t=Math.hypot(e,i);t>1&&(e/=t,i/=t);let o=null;if(this.wskaznik){const s=this.canvas.getBoundingClientRect(),r=(this.wskaznik.x-s.left)/s.width*2-1,n=1-(this.wskaznik.y-s.top)/s.height*2;o=[a.cam.x+r*a.polX,a.cam.y+n*a.polY]}return{cel:o,os:[e,i]}}}function fi(c){const a=document.createElement("div");a.className="dev",a.innerHTML=`<div id="dev-stan"></div>
    <div class="rzad" id="dev-warstwy"></div>
    <div class="rzad" id="dev-tele"></div>
    <div class="rzad"><button id="dev-ziarno">nowe ziarno</button><button id="dev-pauza">pauza</button></div>
    <div class="rzad" id="dev-zjawiska"></div>`,document.getElementById("nakladka").appendChild(a);const e=a.querySelector("#dev-stan"),i=a.querySelector("#dev-warstwy");for(const r of nt){const n=document.createElement("button");n.textContent=r,n.dataset.w=r,n.onclick=()=>{c.renderer.warstwa=r,xa("warstwa",r==="wszystko"?null:r),s()},i.appendChild(n)}const t=a.querySelector("#dev-tele");for(const r of c.teleporty()){const n=document.createElement("button");n.textContent=r.nazwa,n.onclick=()=>c.teleport(r.x),t.appendChild(n)}const o=a.querySelector("#dev-zjawiska");for(const[r,n]of[["olbrzym",()=>c.wywolajOlbrzyma(1,20)],["pył",()=>c.pogoda.wywolaj("pyl")],["mgła",()=>c.pogoda.wywolaj("mgla")],["zaćmienie",()=>c.pogoda.wywolaj("zacmienie")],["burza",()=>c.pogoda.wywolaj("burza")],["koniec pogody",()=>c.pogoda.zakoncz()]]){const h=document.createElement("button");h.textContent=r,h.onclick=n,o.appendChild(h)}a.querySelector("#dev-ziarno").onclick=()=>{xa("ziarno",Math.floor(Math.random()*1e6)),location.reload()},a.querySelector("#dev-pauza").onclick=()=>{c.petla.pauza=!c.petla.pauza};function s(){for(const r of i.children)r.classList.toggle("wl",r.dataset.w===c.renderer.warstwa)}return s(),setInterval(()=>{const r=c.petla,n=c.renderer,h=c.stan;e.innerHTML=`<b>${r.fps.toFixed(0)} kl./s</b> · ${r.msKlatki.toFixed(1)} ms · ${n.w}×${n.h}<br>ziarno ${c.ziarno} · x ${h.iskra.x.toFixed(1)} y ${h.iskra.y.toFixed(1)} · ${c.opisJakosci()}`},250),a}const zi=1.44,pi=1.66,di=.54,mi=1.4,Ua=13,ki=.2,wi=28,yi=16,vi=3,va=new Float32Array(Sa*2);function gi(c,a,e,i,t,o,s){let r=!1,n=0;for(let h=0;h<5;h++){let l=1e9,u=0,f=0,p=-1;for(let v=0;v<c;v++){const M=(v+1)%c,b=va[v*2],g=va[v*2+1],T=va[M*2]-b,j=va[M*2+1]-g,L=i*j-t*T;if(Math.abs(L)<1e-9)continue;const N=b-a,O=g-e,D=(N*j-O*T)/L,q=(N*t-O*i)/L;D>1e-4&&q>=0&&q<=1&&D<l&&(l=D,u=T,f=j,p=v)}if(p<0)return null;a+=i*l,e+=t*l;let z=f,m=-u;const w=Math.hypot(z,m);z/=w,m/=w;let d=-(i*z+t*m);d<0&&(z=-z,m=-m,d=-d);const k=r?o:1/o,y=1-k*k*(1-d*d);if(y<0)i+=2*d*z,t+=2*d*m,n++;else{const v=Math.sqrt(y);if(i=k*i+(k*d-v)*z,t=k*t+(k*d-v)*m,r=!r,!r){const M=Math.hypot(i,t);return s[0]=a,s[1]=e,s[2]=i/M,s[3]=t/M,s[4]=p,s[5]=n,s}}const x=Math.hypot(i,t);i/=x,t/=x}return null}const xi=[0,0,0,0,0,0],Ca=(c,a)=>{let e=c-a;for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},$a=c=>c-Math.floor(c),la=[];for(let c=0;c<Sa;c++)la.push({wr:0,rx:0,ry:0,wf:0,fx:0,fy:0,px:0,py:0,ile:0,waga:0,kat:0,dk:0,ox:0,oy:0,szer:0});function yt(c,a,e){const i=c.v.length,t=Math.hypot(a,e),o=-a/t,s=-e/t,r=1.9*c.zasieg/Ua;rt.wierzcholki(c,va);for(let l=0;l<i;l++){const u=la[l];u.wr=u.rx=u.ry=u.wf=u.fx=u.fy=u.px=u.py=u.ile=u.waga=0}let n=0,h=0;for(let l=0;l<Ua;l++){const u=((l+.5)/Ua*2-1)*c.zasieg*.95;let f=-s*u-a,p=o*u-e;const z=Math.hypot(f,p);f/=z,p/=z;let m=!1;for(let w=0;w<2;w++){const d=gi(i,a,e,f,p,w?pi:zi,xi);if(!d||(m=!0,d[5]>2||d[2]*o+d[3]*s<ki))continue;const k=d[5]===0?1:d[5]===1?.5:.25,y=la[d[4]];w?(y.wf+=k,y.fx+=d[2]*k,y.fy+=d[3]*k):(y.wr+=k,y.rx+=d[2]*k,y.ry+=d[3]*k),y.px+=d[0]*k,y.py+=d[1]*k,y.ile++}m&&n++}for(let l=0;l<i;l++){const u=la[l];if(u.wr<=0||u.wf<=0){u.waga=0;continue}const f=Math.atan2(u.ry,u.rx);u.dk=Ca(Math.atan2(u.fy,u.fx),f),u.kat=f+u.dk/2,u.ox=u.px/(u.wr+u.wf),u.oy=u.py/(u.wr+u.wf),u.waga=(u.wr+u.wf)/(2*Math.max(1,n)),u.szer=u.ile*.5*r,u.waga>h&&(h=u.waga)}return h}function vt(c,a,e,i,t,o){const s=$a(a.faza*7.31+e*.37),r=$a(a.faza*3.17+e*.61),n=$a(a.faza*5.71+e*.23),h=Math.abs(c.dk);return o.rozw=Math.max(.27,Math.min(mi,(di+.72*(1-Math.exp(-h*4)))*(.9+.22*s)*(.3+1*t))),o.start=Math.min(1,Math.max(.2,c.szer*.8/Math.tan(o.rozw/2))),o.dlugosc=Math.min(5.2,i*(.52+.45*Math.sqrt(c.waga))*(.85+.3*r)*(.4+.85*t)),o.skos=(n*2-1)*.55,o.znak=(c.dk>=0?1:-1)*Math.min(1,h/.035),o}function ot(c,a,e,i=0){const t=Math.abs(c),o=a-i;if(t>=1||o<=0)return 0;const s=(t-.6)/.4,r=t<.6?1:1-s*s*(3-2*s),n=o/e,h=Math.min(1,o/.4);return r*h*h*(3-2*h)*Math.exp(-n*n*2.4)}const C={};class bi{constructor(){this.wachlarze=[],this._pula=[],this.spiewajace=[],this._klatka=0}aktualizuj(a,e,i){const t=this.wachlarze;t.length=0;const o=1.6+e.zasieg*1.25,s=1.7+e.zasieg*.62,r=1-Math.exp(-a*9),n=1-Math.exp(-a*5);let h=0;const l=()=>(this._pula[h]||(this._pula[h]={}),this._pula[h++]);for(const p of i){const z=p.px-e.x,m=p.py-e.y,w=Math.hypot(z,m);let d=0;w<o&&w>p.zasieg*.6&&(d=Math.pow(1-w/o,1.15));const k=p.oswietlenie;if(p.oswietlenie+=(d-p.oswietlenie)*n,k<.15&&p.oswietlenie>=.15&&this.naSzklo?.(p),p.oswietlenie<.01||w<.001){p.wachlarz=null;continue}const y=p.v.length;let x=p.wachlarz;if(!x){x=p.wachlarz=[];for(let M=0;M<y;M++)x.push({sila:0,kat:0,ox:0,oy:0,rozw:0,start:0,dlugosc:0,skos:0,znak:0})}const v=d>0?yt(p,-z,-m):0;for(let M=0;M<y;M++){const b=la[M],g=x[M],T=v>0?b.waga/v:0;if(T<.4)g.sila+=(0-g.sila)*n;else{vt(b,p,M,s,d,C);const N=b.ox-Math.cos(b.kat)*C.start,O=b.oy-Math.sin(b.kat)*C.start;g.sila<.02?(g.kat=b.kat,g.ox=N,g.oy=O,g.rozw=C.rozw,g.start=C.start,g.dlugosc=C.dlugosc,g.znak=C.znak):(g.kat+=Ca(b.kat,g.kat)*r,g.ox+=(N-g.ox)*r,g.oy+=(O-g.oy)*r,g.rozw+=(C.rozw-g.rozw)*r,g.start+=(C.start-g.start)*r,g.dlugosc+=(C.dlugosc-g.dlugosc)*r,g.znak+=(C.znak-g.znak)*r),g.skos=C.skos,g.sila+=(Math.pow(T,1.5)-g.sila)*n}const j=g.sila*p.oswietlenie*Math.min(1,Math.abs(g.znak)*1.6);if(j<.02||t.length>=yi)continue;const L=l();L.x=p.px+g.ox,L.y=p.py+g.oy,L.kat=g.kat,L.rozwarcie=g.rozw,L.dlugosc=g.dlugosc,L.start=g.start,L.skos=g.skos,L.sila=j,L.znak=g.znak>=0?1:-1,L.zi=p.faza+M*1.7,L.zrodlo=p,L.wtorny=!1,L.glebia=0,t.push(L)}}const u=++this._klatka,f=this.spiewajace;f.length=0;for(let p=0;p<t.length;p++){const z=t[p];if(z.glebia>=vi)continue;const m=z.glebia===0?.75:.85,w=z.glebia===0?.12:.09;for(const d of i){if(d===z.zrodlo)continue;const k=d.px-z.x,y=d.py-z.y,x=Math.hypot(k,y);if(x>z.start+z.dlugosc*.95||x<z.start+.4)continue;const v=Ca(Math.atan2(y,k),z.kat)/(z.rozwarcie/2),M=ot(v,x,z.dlugosc,z.start)*z.sila*m;if(M<.05||(d._spiewKl!==u?(d._spiewKl=u,d.spiew=M,f.push(d)):M>d.spiew&&(d.spiew=M),M<w||d._ogniwoKl===u||t.length>=wi)||yt(d,-k,-y)<=0)continue;let g=0;for(let L=1;L<d.v.length;L++)la[L].waga>la[g].waga&&(g=L);const T=la[g];if(vt(T,d,g+3,z.dlugosc*.9,Math.min(1,.35+M),C),Math.abs(C.znak)<.6)continue;d._ogniwoKl!==u-1&&(d.silaOgniwa=0),d._ogniwoKl=u,d.silaOgniwa+=(M-d.silaOgniwa)*Math.min(1,n*2.5);const j=l();j.x=d.px+T.ox-Math.cos(T.kat)*C.start,j.y=d.py+T.oy-Math.sin(T.kat)*C.start,j.kat=T.kat,j.rozwarcie=C.rozw,j.dlugosc=C.dlugosc,j.start=C.start,j.skos=C.skos,j.sila=d.silaOgniwa,j.znak=C.znak>=0?1:-1,j.zi=d.faza+1,j.zrodlo=d,j.wtorny=!0,j.glebia=z.glebia+1,d.oswietlenie=Math.max(d.oswietlenie,d.silaOgniwa*.8),t.push(j)}}}natezenie(a,e,i=1){let t=0;for(const o of this.wachlarze){const s=a-o.x,r=e-o.y,n=Math.hypot(s,r);n>o.start+o.dlugosc*1.4*i||(t+=ot(Ca(Math.atan2(r,s),o.kat)/(o.rozwarcie/2*i),n,o.dlugosc*i,o.start/i)*o.sila)}return t}}const lt=6,La={wech:2.8,lgniecie:3.4,kradnie:.17},Da=[{rodzaj:"Pióro",nazwy:["Pióro puszczyka","Pióro sójki","Pióro czapli","Pióro kruka","Pióro jastrzębia","Pióro bez ptaka"]},{rodzaj:"Klucz",nazwy:["Klucz od śluzy","Klucz przewoźnika","Klucz bez drzwi","Klucz z dna","Klucz latarnika","Klucz od niczego"]},{rodzaj:"Kwiat w krysztale",nazwy:["Kwiat pięciopłatkowy","Kwiat nocy","Kwiat szronu","Kwiat ośmiu płatków","Kwiat ciszy","Kwiat, który nie zwiądł"]},{rodzaj:"Znak w kamieniu",nazwy:["Znak bramy","Znak wody","Znak drogi","Znak snu","Znak strażnika","Znak zapomniany"]},{rodzaj:"Skamielina",nazwy:["Muszla mała","Muszla podwójna","Muszla żebrowana","Muszla wielka","Muszla ciasno zwinięta","Muszla sprzed światła"]},{rodzaj:"Dzwonek",nazwy:["Dzwonek przełęczy","Dzwonek pęknięty","Dzwonek mgły","Dzwonek z obręczą","Dzwonek wiatru","Dzwonek, którego nikt nie słyszał"]}],ct=["Fresk koron","Fresk księżyca nad wodą","Fresk kryształowego serca","Fresk procesji","Fresk czarnego słońca","Fresk morza chmur"];function Si(c,a,e){const i=ea(c.ziarno,7717,a),t=a*Y,o={drobinki:[],slady:[],fresk:Pt(c,a),cienie:[]};for(let n=0;n<3;n++){const h=t+(n+i())*Y/3,l=c.ziemia(h),u=Math.min(c.granicaLotu(h)-.8,l+8.5);o.drobinki.push({id:`d${a}:${n}`,x:h,y:l+.9+i()*Math.max(.5,u-l-.9),faza:i()*6.283})}const s=ea(c.ziarno,4243,a),r=t>40?(s()<.62?1:0)+(s()<.38?1:0):0;for(let n=0;n<r;n++){const h=t+(n+.1+.8*s())*Y/2,l=c.ziemia(h),u=Math.min(c.granicaLotu(h)-.8,l+8.5),f=l+.9+s()*Math.max(.5,u-l-.9);o.cienie.push({id:`c${a}:${n}`,x:h,y:f,px:h,py:f,faza:s()*6.283,stan:0,zanik:0})}return e.forEach((n,h)=>{if(!n.polana&&!(i()>.42))for(let l=0;l<6;l++){const u=i()*6.283,f=1.5+i()*1.1,p=n.x+Math.cos(u)*f,z=n.y+Math.sin(u)*f*.85;if(z>c.ziemia(p)+.7&&z<c.granicaLotu(p)-.5){o.slady.push({id:`s${a}:${h}`,x:p,y:z,kraina:c.krainaW(p),wariant:Math.floor(i()*lt),faza:i()*6.283,odsloniecie:0});break}}}),o}class Mi{constructor(a,e,i){this.swiat=a,this.kolekcja=i,this.kawalki=new Map,this.zebrane=new Set,this.drobinki=[],this.slady=[],this.freski=[],this.efekty=[],this.cienie=[],this.cienieWlaczone=!0,this.przemienionych=0,this.zdarzenie=null,e.naNowyKawalek=(t,o)=>this.kawalki.set(t,Si(a,t,o)),this._odlamki=e}krok(a,e,i,t){this.drobinki.length=0,this.slady.length=0,this.freski.length=0,this.cienie.length=0;for(const[o,s]of this.kawalki){if(!this._odlamki.kawalki.has(o)){this.kawalki.delete(o);continue}for(const n of s.drobinki){if(this.zebrane.has(n.id))continue;n.px=n.x+Math.sin(t*.7+n.faza)*.3,n.py=n.y+Math.cos(t*.9+n.faza)*.25;const h=Math.hypot(e.x-n.px,e.y-n.py);if(h<2.2&&h>.001){const l=(1-h/2.2)*2.4*a;n.x+=(e.x-n.px)*l,n.y+=(e.y-n.py)*l}if(h<.5){this.zebrane.add(n.id),e.energia=Math.min(1,e.energia+.17),e.tracnij(4),this.efekty.push({x:n.px,y:n.py,t:0,rodzaj:0}),this.zdarzenie?.("energia",n);continue}this.drobinki.push(n)}for(const n of s.slady){if(this.zebrane.has(n.id))continue;const h=i.natezenie(n.x,n.y,1.3),l=n.odsloniecie;if(n.odsloniecie=Math.max(0,Math.min(1,n.odsloniecie+(h>.05?a*(.9+h*2):-a*.015))),l<.6&&n.odsloniecie>=.6&&this.zdarzenie?.("odsloniecie",n),n.odsloniecie>=.6&&Math.hypot(e.x-n.x,e.y-n.y)<.75){this.zebrane.add(n.id);const u=this.kolekcja.dodajSlad(n.kraina,n.wariant);e.energia=Math.min(1,e.energia+.12),e.tracnij(3),this.efekty.push({x:n.x,y:n.y,t:0,rodzaj:1}),this.zdarzenie?.("slad",{...n,nowy:u});continue}n.odsloniecie>.005&&this.slady.push(n)}if(this.cienieWlaczone)for(const n of s.cienie)this.zebrane.has(n.id)||this._cien(n,a,e,i,t,s);const r=s.fresk;if(r){const n=this.swiat.ziarno+":"+r.id;if(!r.odkryty&&(this.zebrane.has(r.id)||this.kolekcja.jestZapalony(n))&&(r.odkryty=!0),!r.odkryty){let h=0;for(let l=-2;l<=2;l++)h+=i.natezenie(r.x+l*.9,r.y+l%2*.5,1.3);if(h/=5,r.odsloniecie=Math.max(0,Math.min(1,r.odsloniecie+(h>.06?a*(.12+h*.5):-a*.01))),r.odsloniecie>=1){r.odkryty=!0,r.tZaplonu=t,this.zebrane.add(r.id),this.kolekcja.zapalFresk(n);const l=this.kolekcja.dodajFresk(r.kraina);e.energia=1,this.efekty.push({x:r.x,y:r.y,t:0,rodzaj:2}),this.zdarzenie?.("fresk",{...r,nowy:l})}}this.freski.push(r)}}for(let o=this.efekty.length-1;o>=0;o--){const s=this.efekty[o];s.t+=a,s.t>1.6&&this.efekty.splice(o,1)}}_cien(a,e,i,t,o,s){if(a.zanik>0){if(a.zanik+=e*1.8,a.zanik>=1){this.zebrane.add(a.id);return}this.cienie.push(a);return}a.px=a.x+Math.sin(o*.7+a.faza)*.3,a.py=a.y+Math.cos(o*.9+a.faza)*.25;const r=Math.hypot(i.x-a.px,i.y-a.py);if(a.stan=r<La.wech?1:0,a.stan&&r>.001){const n=(1-r/La.wech)*La.lgniecie*e;a.x+=(i.x-a.px)*n,a.y+=(i.y-a.py)*n,a.y=Math.max(this.swiat.ziemia(a.x)+.4,Math.min(this.swiat.granicaLotu(a.x)-.3,a.y))}if(t.natezenie(a.px,a.py)>.22){this.zebrane.add(a.id),s.drobinki.push({id:"p"+a.id,x:a.x,y:a.y,px:a.px,py:a.py,faza:a.faza,zCienia:!0}),this.efekty.push({x:a.px,y:a.py,t:0,rodzaj:0}),this.przemienionych++,this.zdarzenie?.("cien-rozproszony",a);return}else r<.45&&(i.energia=Math.max(0,i.energia-La.kradnie),i.zasieg=Math.max(i.zasiegBazowy,i.zasieg-.3),i.vx*=.7,i.vy*=.7,i.tracnij(-4),a.zanik=.01,this.zdarzenie?.("cien",a));this.cienie.push(a)}}const gt="iskierka-kolekcja-v1",xt=800;class _i{constructor(a=Pi()){this.pamiec=a,this.slady={},this.freski={},this.zapalone={},this.szklo={},this.ogrody={};try{const e=JSON.parse(a?.getItem(gt)||"null");e&&typeof e=="object"&&(this.slady=e.slady||{},this.freski=e.freski||{},this.zapalone=e.zapalone||{},this.szklo=e.szklo||{},this.ogrody=e.ogrody||{})}catch{}this.naZmiane=null}_zapisz(a=!1){try{this.pamiec?.setItem(gt,JSON.stringify({slady:this.slady,freski:this.freski,zapalone:this.zapalone,szklo:this.szklo,ogrody:this.ogrody}))}catch{}a||this.naZmiane?.()}dodajSlad(a,e){const i=`${a}-${e}`,t=!this.slady[i];return this.slady[i]=(this.slady[i]||0)+1,this._zapisz(),t}dodajFresk(a){const e=!this.freski[a];return this.freski[a]=!0,this._zapisz(),e}zapalFresk(a){this.zapalone[a]=!0,this._zapisz()}jestZapalony(a){return!!this.zapalone[a]}zapalSzklo(a){this.szklo[a]=1;const e=Object.keys(this.szklo);if(e.length>xt)for(const i of e.slice(0,e.length-xt))delete this.szklo[i];this._zapisz(!0)}jestSzklo(a){return!!this.szklo[a]}ileSzkla(){return Object.keys(this.szklo).length}ogrod(a){return this.ogrody[a]||[]}zapiszOgrod(a,e){this.ogrody={[a]:e},this._zapisz(!0)}maSlad(a,e){return!!this.slady[`${a}-${e}`]}maFresk(a){return!!this.freski[a]}ileSladow(){return Object.keys(this.slady).length}ileFreskow(){return Object.keys(this.freski).length}wszystkichSladow(){return Da.length*lt}wszystkichFreskow(){return ct.length}wyczysc(){this.slady={},this.freski={},this.zapalone={},this._zapisz()}}function Pi(){try{return window.localStorage}catch{return null}}class Ai{constructor(a){this.kolekcja=a;const e=this.el=document.createElement("div");e.className="hud",e.innerHTML=`<div class="hud-prawy"><span class="hud-slady" id="hud-slady"></span>
      <div class="hud-energia" role="img" aria-label="Energia"><i id="hud-en"></i></div></div>
      <div class="hud-kraina" id="hud-kraina"></div><div class="hud-wiesc" id="hud-wiesc" role="status" aria-live="polite"></div>`,document.getElementById("nakladka").appendChild(e),this.slady=e.querySelector("#hud-slady"),this.en=e.querySelector("#hud-en"),this.krainaEl=e.querySelector("#hud-kraina"),this.wiescEl=e.querySelector("#hud-wiesc"),this.kraina=-1,this._enPoprz=-1,this.odswiez()}odswiez(){this.slady.textContent=`ślady ${this.kolekcja.ileSladow()} / ${this.kolekcja.wszystkichSladow()}`}energia(a){const e=Math.round(a*100);e!==this._enPoprz&&(this._enPoprz=e,this.en.style.width=e+"%")}ustawKraine(a){if(a===this.kraina)return;const e=this.kraina<0;this.kraina=a,clearTimeout(this._tk),this.krainaEl.classList.remove("widac"),this._tk=setTimeout(()=>{this.krainaEl.textContent=W[a].nazwa,this.krainaEl.classList.add("widac"),this._tk=setTimeout(()=>this.krainaEl.classList.remove("widac"),5e3)},e?300:900)}wiesc(a){clearTimeout(this._tw),this.wiescEl.textContent=a,this.wiescEl.classList.add("widac"),this._tw=setTimeout(()=>this.wiescEl.classList.remove("widac"),4200)}}const Ra=[{akord:[146.83,220,369.99,659.25],filtr:1e3,wiatr:0,wiatrHz:1800,skala:[293.66,369.99,440,554.37,659.25]},{akord:[69.3,103.83,164.81,246.94],filtr:480,wiatr:.16,wiatrHz:300,skala:[277.18,329.63,415.3,493.88,554.37]},{akord:[110,164.81,277.18,493.88],filtr:1100,wiatr:.03,wiatrHz:2400,skala:[440,554.37,659.25,830.61,987.77]},{akord:[98,146.83,196,220],filtr:700,wiatr:.08,wiatrHz:700,skala:[392,440,587.33,659.25,783.99]},{akord:[61.74,92.5,130.81,185],filtr:420,wiatr:.3,wiatrHz:900,skala:[246.94,277.18,369.99,415.3,493.88]},{akord:[87.31,130.81,196,329.63],filtr:900,wiatr:.22,wiatrHz:1500,skala:[349.23,392,440,523.25,659.25]}],ji=[.85,.9,1,.85,.65,.8],Li=6;function Ta(c,a){const e=[...a,...a.map(t=>t*2)].sort((t,o)=>t-o),i=Math.max(0,Math.min(.999,(.85-c.zasieg)/.7));return e[Math.floor(i*e.length)]}class Ri{constructor(){this.glosy=[];for(let a=0;a<Li;a++)this.glosy.push({o:null,hz:0,sila:0});this.spiewa=0,this._doSpiewu=0,this._ostKielek=0,this._ostPyl=0,this.ac=null,this.wlaczony=!1,this.wagi=new Float32Array(I),this.licznik={szklo:0,energia:0,odsloniecie:0,slad:0,fresk:0,zapalenie:0,kielek:0,"krok-olbrzyma":0,pyl:0,pogoda:0,grzmot:0},this._ostSzklo=0,this._doAktualizacji=0,this.glosnosc=.75}get dostepny(){return typeof(window.AudioContext||window.webkitAudioContext)=="function"}_zbuduj(){const a=window.AudioContext||window.webkitAudioContext,e=this.ac=new a;this.wyjscie=e.createGain(),this.wyjscie.gain.value=0,this.analizator=e.createAnalyser(),this.analizator.fftSize=1024;const i=e.createDynamicsCompressor();i.threshold.value=-20,i.knee.value=12,i.ratio.value=6,i.attack.value=.01,i.release.value=.4,this.wyjscie.connect(i),i.connect(this.analizator),this.analizator.connect(e.destination),this.poglos=e.createGain(),this.poglos.gain.value=.3;for(const[n,h]of[[.37,.52],[.53,.46]]){const l=e.createDelay(1.5);l.delayTime.value=n;const u=e.createBiquadFilter();u.type="lowpass",u.frequency.value=1900;const f=e.createGain();f.gain.value=h,this.poglos.connect(l),l.connect(u),u.connect(f),f.connect(l),u.connect(this.wyjscie)}const t=e.sampleRate*3,o=e.createBuffer(1,t,e.sampleRate),s=o.getChannelData(0);let r=0;for(let n=0;n<t;n++)r=r*.97+(Math.random()*2-1)*.03,s[n]=r*6;this.szum=e.createBufferSource(),this.szum.buffer=o,this.szum.loop=!0,this.szum.start();for(const n of this.glosy){n.osc=e.createOscillator(),n.osc.type="sine",n.osc.frequency.value=440,n.osc2=e.createOscillator(),n.osc2.type="sine",n.osc2.frequency.value=880;const h=e.createGain();h.gain.value=.14,n.wzm=e.createGain(),n.wzm.gain.value=0;const l=e.createOscillator();l.frequency.value=3.1+this.glosy.indexOf(n)*.47;const u=e.createGain();u.gain.value=1.6,l.connect(u),u.connect(n.osc.frequency),l.start(),n.osc.connect(n.wzm),n.osc2.connect(h),h.connect(n.wzm),n.wzm.connect(this.wyjscie),n.wzm.connect(this.poglos),n.osc.start(),n.osc2.start()}this.tla=Ra.map(n=>{const h=e.createGain();h.gain.value=0;const l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=n.filtr,l.Q.value=.4,l.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),n.akord.forEach((m,w)=>{for(const d of[-5,6]){const k=e.createOscillator();k.type=w%2?"triangle":"sine",k.frequency.value=m,k.detune.value=d+w;const y=e.createGain();y.gain.value=.034/(1+w*.35);const x=e.createOscillator();x.frequency.value=.03+.017*w+(d>0?.011:0);const v=e.createGain();v.gain.value=y.gain.value*.6,x.connect(v),v.connect(y.gain),x.start(),k.connect(y),y.connect(l),k.start()}});const u=e.createBiquadFilter();u.type="bandpass",u.frequency.value=n.wiatrHz,u.Q.value=.7;const f=e.createGain();f.gain.value=n.wiatr*.45;const p=e.createOscillator();p.frequency.value=.07;const z=e.createGain();return z.gain.value=n.wiatr*.2,p.connect(z),z.connect(f.gain),p.start(),this.szum.connect(u),u.connect(f),f.connect(h),h})}async przelacz(a=!this.wlaczony){return this.dostepny?(this.ac||this._zbuduj(),this.wlaczony=a,a&&this.ac.resume().catch(()=>{}),this.wyjscie.gain.setTargetAtTime(a?this.glosnosc:0,this.ac.currentTime,.5),this.wlaczony):!1}ustawGlosnosc(a){this.glosnosc=a,this.ac&&this.wlaczony&&this.wyjscie.gain.setTargetAtTime(a,this.ac.currentTime,.2)}aktualizuj(a,e){if(this.wagi.set(e),!(!this.ac||!this.wlaczony)&&(this._doAktualizacji-=a,!(this._doAktualizacji>0))){this._doAktualizacji=.25;for(let i=0;i<I;i++)this.tla[i].gain.setTargetAtTime(e[i]*ji[i],this.ac.currentTime,1.6)}}spiewaj(a,e){if(this._doSpiewu-=a,this._doSpiewu>0)return;this._doSpiewu=.06;const i=this.glosy,t=Ra[this._krainaDominujaca()].skala,o=this.ac&&this.wlaczony?this.ac.currentTime:-1;for(const s of i)!(s.o&&e.includes(s.o))&&s.o&&(s.o=null,s.sila=0,o>=0&&s.wzm.gain.setTargetAtTime(0,o,.35));for(const s of e){let r=i.find(n=>n.o===s);if(!r){if(r=i.find(n=>!n.o),!r)continue;r.o=s,r.hz=Ta(s,t)}o>=0&&r.nastrojony!==r.hz&&(r.nastrojony=r.hz,r.osc.frequency.setTargetAtTime(r.hz,o,.03),r.osc2.frequency.setTargetAtTime(r.hz*2.005,o,.03)),r.sila=Math.min(1,s.spiew*2.2),o>=0&&r.wzm.gain.setTargetAtTime(.02*r.sila,o,.25)}this.spiewa=0;for(const s of i)s.o&&this.spiewa++}ton(a,e=this._krainaDominujaca()){return Ta(a,Ra[e].skala)}_krainaDominujaca(){let a=0;for(let e=1;e<I;e++)this.wagi[e]>this.wagi[a]&&(a=e);return a}_dzwonek(a,e,i=0,t=2.6,o="sine"){const s=this.ac,r=s.currentTime+i,n=s.createOscillator(),h=s.createOscillator(),l=s.createGain(),u=s.createGain();n.type=o,n.frequency.value=a,h.type="sine",h.frequency.value=a*2.01,u.gain.value=.18,l.gain.setValueAtTime(0,r),l.gain.linearRampToValueAtTime(e,r+.02),l.gain.exponentialRampToValueAtTime(4e-4,r+t),n.connect(l),h.connect(u),u.connect(l),l.connect(this.wyjscie),l.connect(this.poglos),n.start(r),h.start(r),n.stop(r+t+.1),h.stop(r+t+.1)}zdarzenie(a,e){if(a in this.licznik&&this.licznik[a]++,!this.ac||!this.wlaczony)return;const i=Ra[e&&e.kraina!=null?e.kraina:this._krainaDominujaca()].skala;if(a==="szklo"){const t=this.ac.currentTime;if(t-this._ostSzklo<.35)return;this._ostSzklo=t;const o=Ta(e,i)*2;this._dzwonek(o,.022,0,1.8),this._dzwonek(o*1.5,.008,.03,1.2)}else if(a==="zapalenie"){const t=Ta(e,i);this._dzwonek(t,.035,0,3.4),this._dzwonek(t*1.5,.02,.18,3),this._dzwonek(t*2,.012,.36,2.6)}else if(a==="kielek"){const t=this.ac.currentTime;if(t-this._ostKielek<.5)return;this._ostKielek=t,this._dzwonek(i[Math.floor(e.t*4.99)]*2,.012,0,1.1,"triangle")}else if(a==="krok-olbrzyma"){const t=.05+.09*(e?.bliskosc??.5);this._dzwonek(49,t,0,2.2),this._dzwonek(98,t*.35,.02,1.4,"triangle")}else if(a==="pyl")this._dzwonek(i[Math.floor(Math.random()*i.length)]*4,.006,0,.9);else if(a==="grzmot"){const t=this.ac,o=t.currentTime+.5+Math.random()*1.6,s=3.2+Math.random()*1.5,r=t.createBufferSource();r.buffer=this.szum.buffer,r.loop=!0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(260,o),n.frequency.exponentialRampToValueAtTime(70,o+s);const h=t.createGain();h.gain.setValueAtTime(0,o),h.gain.linearRampToValueAtTime(.5,o+.08),h.gain.linearRampToValueAtTime(.22,o+.5),h.gain.linearRampToValueAtTime(.3,o+.9),h.gain.exponentialRampToValueAtTime(5e-4,o+s),r.connect(n),n.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),r.start(o,Math.random()*2),r.stop(o+s+.1),this._dzwonek(41,.09,o-t.currentTime,s*.8)}else a==="pogoda"?[0,3].forEach((t,o)=>this._dzwonek(i[t]/2,.03,o*.5,5)):a==="cien"?(this._dzwonek(i[0]/2,.05,0,1.4,"triangle"),this._dzwonek(i[0]/2*.94,.04,.12,1.8,"triangle")):a==="cien-rozproszony"?this._dzwonek(i[4]*2,.02,0,1.2):a==="energia"?(this._dzwonek(i[1]*2,.04,0,1.6,"triangle"),this._dzwonek(i[3]*2,.035,.11,2,"triangle")):a==="odsloniecie"?[0,2,4].forEach((t,o)=>this._dzwonek(i[t],.04,o*.16,2.8)):a==="slad"?[0,1,2,3,4].forEach((t,o)=>this._dzwonek(i[t]*(o===4?2:1),.05,o*.13,3.2)):a==="fresk"&&[0,2,4,1,3].forEach((t,o)=>{this._dzwonek(i[t]/2,.06,o*.4,6),this._dzwonek(i[t]*2,.02,o*.4+.2,5)})}poziom(){if(!this.ac)return 0;const a=new Float32Array(this.analizator.fftSize);this.analizator.getFloatTimeDomainData(a);let e=0;for(const i of a)e+=i*i;return Math.sqrt(e/a.length)}}const ga=[{nazwa:"wysoka",tlo:1,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"średnia",tlo:.5,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"oszczędna",tlo:.5,swiatlo:.34,drobinki:.5,flora:!0,skala:1},{nazwa:"niska",tlo:.4,swiatlo:.34,drobinki:.35,flora:!0,skala:.9},{nazwa:"minimalna",tlo:.4,swiatlo:.25,drobinki:.25,flora:!1,skala:.8}],Ti=2.5;class Ei{constructor(a){this.auto=!0,this.poziom=1,this.naZmiane=a,this._ms=[],this._czas=0,this._dobre=0,this._sufit=0,this._blokada=0,this._rozgrzewka=4}get ustawienia(){return ga[this.poziom]}ustaw(a){a==="auto"?(this.auto=!0,this._sufit=0):(this.auto=!1,this._zmien(Math.max(0,Math.min(ga.length-1,a|0))))}_zmien(a){a!==this.poziom&&(this.poziom=a,this.naZmiane(ga[a])),this._ms.length=0,this._czas=0,this._rozgrzewka=1}probka(a,e){if(!this.auto)return;if(this._rozgrzewka>0){this._rozgrzewka-=e;return}if(this._blokada=Math.max(0,this._blokada-e),this._ms.push(a),this._czas+=e,this._czas<Ti)return;let i=0,t=0;for(const s of this._ms)s<120&&(i+=s,t++);const o=t?i/t:16.7;this._ms=[],this._czas=0,(this.dziennik||(this.dziennik=[])).push(`${this.poziom}:${o.toFixed(1)}`),this.dziennik.length>40&&this.dziennik.shift(),o>19.5&&this.poziom<ga.length-1?(this._blokada=this._probaWGore?600:45,this._probaWGore=!1,this._sufit=this.poziom+1,this._dobre=0,this._zmien(this.poziom+1)):o<17.4&&this.poziom>this._sufit&&this.poziom>0?++this._dobre>=4&&(this._dobre=0,this._probaWGore=!0,this._zmien(this.poziom-1)):(this._dobre=0,this._blokada===0&&(this._sufit=0))}}const Tt="iskierka-ustawienia-v1",A=(c,a,e)=>{const i=document.createElement(c);return a&&(i.className=a),e!=null&&(i.textContent=e),i};function Bi(){try{const c=JSON.parse(localStorage.getItem(Tt)||"null");if(c&&typeof c=="object")return{jakosc:"auto",glosnosc:.75,...c}}catch{}return{jakosc:"auto",glosnosc:.75}}function Ci(c){try{localStorage.setItem(Tt,JSON.stringify(c))}catch{}}class Ki{constructor(a){this.gra=a,this.otwarte=!1,this.ustawienia=Bi();const e=document.getElementById("nakladka");this.tytul=A("div","tytul"),this.tytul.innerHTML='<h1>Iskierka</h1><p class="podtytul">leć w ciemność · szkło pokaże barwy</p><p class="podpowiedz">Przytrzymaj mysz lub palec tam, dokąd iskierka ma lecieć. Klawiatura: W A S D lub strzałki.</p>',e.appendChild(this.tytul);const i=this.rzad=A("div","rzad-przyciskow");this.bDzwiek=A("button","przycisk"),this.bDzwiek.type="button",this.bDzwiek.id="b-dzwiek",this.bDzwiek.onclick=async()=>{await a.dzwiek.przelacz(),this._opiszDzwiek(),this.bDzwiek.blur()},this.bMenu=A("button","przycisk","Menu"),this.bMenu.type="button",this.bMenu.id="b-menu",this.bMenu.setAttribute("aria-haspopup","dialog"),this.bMenu.onclick=()=>this.przelacz(),i.append(this.bDzwiek,this.bMenu),e.appendChild(i),this._opiszDzwiek(),this.obrot=A("div","obrot","Obróć telefon poziomo: zobaczysz więcej świata."),e.appendChild(this.obrot),this.panel=A("div","panel"),this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-label","Menu"),this.panel.hidden=!0;const t=A("div","okno"),o=A("div","okno-naglowek");o.appendChild(A("h2",null,"Pauza"));const s=A("div","zakladki");this.zakladki={};for(const[r,n]of[["kolekcja","Kolekcja"],["ustawienia","Ustawienia"]]){const h=A("button","zakladka",n);h.type="button",h.onclick=()=>this._pokaz(r),s.appendChild(h),this.zakladki[r]=h}o.appendChild(s),this.bWroc=A("button","przycisk glowny","Wróć do lotu"),this.bWroc.type="button",this.bWroc.id="b-wroc",this.bWroc.onclick=()=>this.przelacz(!1),o.appendChild(this.bWroc),this.tresc=A("div","okno-tresc"),t.append(o,this.tresc),this.panel.appendChild(t),this.panel.addEventListener("pointerdown",r=>{r.target===this.panel&&this.przelacz(!1)}),e.appendChild(this.panel),addEventListener("keydown",r=>{r.key==="Escape"||r.key.toLowerCase()==="p"&&!this._wPolu(r)?(r.preventDefault(),this.przelacz()):r.key.toLowerCase()==="m"&&!this._wPolu(r)?this.bDzwiek.click():r.key.toLowerCase()==="f"&&!this._wPolu(r)&&this.pelnyEkran()}),document.addEventListener("visibilitychange",()=>{document.hidden&&!this.otwarte&&a.sterowanie.poruszono&&this.przelacz(!0)}),a.sterowanie.naPierwszyRuch=()=>this.tytul.classList.add("znika"),this._miniatury=new Map,this._zakladka="kolekcja",this._zastosuj()}_wPolu(a){const e=a.target;return e&&(e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA")}_opiszDzwiek(){const a=this.gra.dzwiek;if(!a.dostepny){this.bDzwiek.disabled=!0,this.bDzwiek.textContent="Brak dźwięku";return}this.bDzwiek.textContent=a.wlaczony?"Wycisz":"Włącz dźwięk",this.bDzwiek.setAttribute("aria-pressed",String(a.wlaczony))}_zastosuj(){const a=this.ustawienia,e=this.gra;e.jakosc.ustaw(a.jakosc==="auto"?"auto":Number(a.jakosc)),e.dzwiek.ustawGlosnosc(a.glosnosc)}przelacz(a=!this.otwarte){a!==this.otwarte&&(this.otwarte=a,this.panel.hidden=!a,this.gra.petla.pauza=a,this.gra.petla.zamrozona=a,this.rzad.classList.toggle("schowany",a),a?(this.tytul.classList.add("znika"),this._pokaz(this._zakladka),this.bWroc.focus()):(this.bMenu.blur(),this.gra.canvas.focus?.()))}_pokaz(a){this._zakladka=a;for(const[e,i]of Object.entries(this.zakladki))i.classList.toggle("wybrana",e===a);this.tresc.replaceChildren(a==="kolekcja"?this._kolekcja():this._ustawienia())}_miniatura(a,e){const i=a+"-"+e;return this._miniatury.has(i)||this._miniatury.set(i,this.gra.renderer.miniatura(a,e)),this._miniatury.get(i)}_kolekcja(){const a=this.gra.kolekcja,e=A("div","kolekcja");return e.appendChild(A("p","kolekcja-stan",`Ślady: ${a.ileSladow()} z ${a.wszystkichSladow()} · freski: ${a.ileFreskow()} z ${a.wszystkichFreskow()}`)),W.forEach((i,t)=>{const o=A("section","kolekcja-kraina");o.appendChild(A("h3",null,`${i.nazwa} · ${Da[t].rodzaj.toLowerCase()}`));const s=A("div","siatka");for(let n=0;n<lt;n++){const h=a.maSlad(t,n),l=A("figure","kafel"+(h?" znaleziony":""));if(h){const u=new Image;u.src=this._miniatura(t,n),u.alt="",l.appendChild(u)}else l.appendChild(A("div","nieznany","?"));l.appendChild(A("figcaption",null,h?Da[t].nazwy[n]:"jeszcze w ciemności")),s.appendChild(l)}const r=A("p","fresk"+(a.maFresk(t)?" znaleziony":""),a.maFresk(t)?"✦ "+ct[t]:"Fresk tej krainy czeka na barwne światło.");o.append(s,r),e.appendChild(o)}),e}_ustawienia(){const a=this.ustawienia,e=this.gra,i=A("div","ustawienia"),t=(f,p,z)=>{const m=A("label","pole");return m.appendChild(A("span","pole-opis",f)),m.appendChild(p),z&&m.appendChild(A("span","pole-uwaga",z)),i.appendChild(m),p},o=()=>{Ci(a),this._zastosuj()},s=A("select");s.id="u-jakosc",s.appendChild(new Option("automatyczna","auto")),ga.forEach((f,p)=>s.appendChild(new Option(f.nazwa,String(p)))),s.value=String(a.jakosc),s.onchange=()=>{a.jakosc=s.value,o()},t("Jakość obrazu",s,"Automatyczna pilnuje płynności: najpierw upraszcza efekty, rozdzielczość rusza na samym końcu.");const r=A("input");r.type="range",r.min="0",r.max="1",r.step="0.05",r.value=String(a.glosnosc),r.id="u-glosnosc",r.oninput=()=>{a.glosnosc=Number(r.value),o()},t("Głośność",r,e.dzwiek.wlaczony?null:"Dźwięk włącza się przyciskiem w rogu ekranu.");const n=A("div","rzad"),h=A("button","przycisk",document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran");h.type="button",h.onclick=async()=>{await this.pelnyEkran(),h.textContent=document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran"};const l=A("button","przycisk","Nowy świat");l.type="button",l.onclick=()=>{xa("ziarno",Math.floor(Math.random()*1e6)),xa("kraina",null),xa("x",null),location.reload()};const u=A("button","przycisk","Wyczyść kolekcję");return u.type="button",u.onclick=()=>{u.dataset.pewne?(e.kolekcja.wyczysc(),u.textContent="Kolekcja wyczyszczona",u.disabled=!0):(u.dataset.pewne="1",u.textContent="Na pewno? Naciśnij jeszcze raz")},n.append(h,l,u),i.appendChild(n),i.appendChild(A("p","pole-uwaga",`Świat nr ${e.ziarno}. Ten sam numer w adresie (?ziarno=${e.ziarno}) zawsze daje ten sam świat. Skróty: Esc lub P — pauza, M — dźwięk, F — pełny ekran.`)),i}async pelnyEkran(){try{if(document.fullscreenElement)await document.exitFullscreen();else{await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.("landscape")}catch{}}}catch{}}}const Ea=.3,Fi=1,Ii=2,Oi=600,Di=5,Ni=.1,Zi=3;class Wi{constructor(a,e=null){this.swiat=a,this.pamiec=e,this.kielki=[],this.komorki=new Map,this.los=st(a.ziarno^6221086),this._do=0,this._brudne=!1,this._doZapisu=0,this.wersja=0;const i=e?e.ogrod(a.ziarno):[];for(let t=0;t+3<i.length;t+=4)this._dodaj(i[t],i[t+1],i[t+2],i[t+3],1)}_dodaj(a,e,i,t,o){const s=Math.floor(a/Ea);let r=this.komorki.get(s);r||this.komorki.set(s,r={dawka:0,t:e,n:0}),r.n++;const n={x:a,y:this.swiat.ziemia(a)-.04,t:e,dl:i,rodzaj:t,faza:a*12.9898%6.283,wzrost:o};if(this.kielki.push(n),this.kielki.length>Oi){const h=this.kielki.shift(),l=this.komorki.get(Math.floor(h.x/Ea));l&&(l.n=Math.max(0,l.n-1))}return this.wersja++,n}krok(a,e){let i=!1;for(const s of this.kielki)s.wzrost<1&&(s.wzrost=Math.min(1,s.wzrost+a/Di),i=!0);if(i&&this.wersja++,this._brudne&&(this._doZapisu-=a)<=0&&this.zapisz(),this._do-=a,this._do>0)return;this._do=Ni;const t=this.swiat,o=this.los;for(const s of e.wachlarze){if(s.sila<.08)continue;const r=s.start+s.dlugosc*1.25;if(!(s.y-r>t.ziemia(s.x)+2.5))for(let n=0;n<Zi;n++){const h=o()*1.7-.85,l=s.kat+h*s.rozwarcie/2,u=Math.cos(l),f=Math.sin(l);if(!(f>-.05))for(let p=s.start+.3;p<r;p+=.3){const z=s.x+u*p,m=s.y+f*p,w=t.ziemia(z);if(m>w+.08)continue;const d=ot(h,p,s.dlugosc,s.start)*s.sila;d>.04&&!t.woda(z)&&this._naswietl(z,h*s.znak*.5+.5,d);break}}}}_naswietl(a,e,i){const t=Math.floor(a/Ea);let o=this.komorki.get(t);if(o||this.komorki.set(t,o={dawka:0,t:e,n:0}),o.n>=Ii||(o.t+=(e-o.t)*.35,o.dawka+=i,o.dawka<Fi))return;o.dawka=0;const s=this.los,r=this._dodaj((t+.15+.7*s())*Ea,Math.max(0,Math.min(1,o.t)),.28+s()*s()*.75,s()<.45?1:0,0);this._brudne=!0,this._doZapisu=4,this.naKielek?.(r)}zapisz(){if(!this._brudne||!this.pamiec)return;this._brudne=!1;const a=[];for(const e of this.kielki)a.push(Math.round(e.x*100)/100,Math.round(e.t*100)/100,Math.round(e.dl*100)/100,e.rodzaj);this.pamiec.zapiszOgrod(this.swiat.ziarno,a)}}const bt=["mgla","zacmienie","pyl","mgla","pyl","mgla"],Et={pyl:"Deszcz szklanego pyłu",mgla:"Mgła gęstnieje",zacmienie:"Zaćmienie",burza:"Burza"},Gi=.1,Ha=[3.5,9],Ja=12,St=65,qi=10,Qa=[170,330],at=[70,140],Yi=c=>c*c*(3-2*c);class Xi{constructor(){this.typ=null,this.auto=!0,this.wymuszone=!1,this.szansaBurzy=Gi,this.poziom=0,this.czas=0,this.zjawisk=0,this.pyl=0,this.mgla=0,this.zacmienie=0,this.burza=0,this.blysk=0,this.piorunX=0,this.piorunZiarno=0,this.blyskow=0,this._odBlysku=99,this._doBlysku=4,this.do=at[0]+Math.random()*(at[1]-at[0]),this._doPylu=0}krok(a,e){if(!this.typ){this.auto&&(this.do-=a)<=0&&this.wywolaj(Math.random()<this.szansaBurzy?"burza":bt[e],!1);return}this.czas+=a;const i=this.wymuszone||this.typ==="burza"||bt[e]===this.typ,t=this.czas<Ja+St&&i?1:0;this.poziom=Math.max(0,Math.min(1,this.poziom+(t>this.poziom?a/Ja:-a/qi)));const o=Yi(this.poziom);this.pyl=this.typ==="pyl"?o:0,this.mgla=this.typ==="mgla"?o:0,this.zacmienie=this.typ==="zacmienie"?o:0,this.burza=this.typ==="burza"?o:0,this._burza(a),this.pyl>.3&&(this._doPylu-=a)<=0&&(this._doPylu=.4+Math.random()*1.3,this.naPyl?.()),t===0&&this.poziom<=0&&(this.typ=null,this.zjawisk++,this.blysk=0,this.burza=0,this.do=Qa[0]+Math.random()*(Qa[1]-Qa[0]))}wywolaj(a,e=!0){a in Et&&(this.typ=a,this.wymuszone=e,this.czas=0,this.poziom=0,this.pyl=this.mgla=this.zacmienie=this.burza=0,this.blysk=0,this._odBlysku=99,this._doBlysku=5,this.naStart?.(a))}_burza(a){this._odBlysku+=a,this.burza>.5&&(this._doBlysku-=a)<=0&&this.blysnij();const e=this._odBlysku;this.blysk=e>1.2?0:Math.exp(-e*9)+(e>.2?.75*Math.exp(-(e-.2)*11):0),this.typ!=="burza"&&this.blysk<.01&&(this.blysk=0)}blysnij(){this._odBlysku=0,this.blyskow++,this._doBlysku=Ha[0]+Math.random()*(Ha[1]-Ha[0]),this.piorunX=(Math.random()*2-1)*1.3,this.piorunZiarno=Math.random()*10,this.naBlysk?.()}zakoncz(){this.typ&&(this.czas=Ja+St)}}const Vi=1080,$=document.getElementById("gra"),Ui=document.getElementById("nakladka");function Bt(c){const a=document.createElement("div");a.className="blad",a.textContent=c,Ui.appendChild(a)}function $i(){const c=Ct($);if(!c){(window.__bledy||(window.__bledy=[])).push("brak WebGL2"),Bt("Ta przeglądarka nie udostępnia WebGL2, a Iskierka go potrzebuje.");return}const a=new ri(F.ziarno),e=new ui(c,a);nt.includes(F.warstwa)&&(e.warstwa=F.warstwa);const i=new ce(F.ziarno);let t=null;const o=new hi($),s=new rt(a),r=new bi,n=new _i;s.pamiec=n;const h=new Mi(a,s,n),l=new Wi(a,n),u=new si,f=new Xi,p=new Vt,z=new Je(a),m=new ai(a),w=new Ai(n);(F.test||F.warstwa==="maska")&&(w.el.style.visibility="hidden"),n.naZmiane=()=>w.odswiez();const d=new Ri;r.naSzklo=S=>d.zdarzenie("szklo",S);const k=[(S,B)=>d.zdarzenie(S,B)],y=new Float32Array(W.length),x=(S,B)=>{for(const X of k)X(S,B)};s.naZapalenie=S=>x("zapalenie",S),l.naKielek=S=>x("kielek",S),u.naKrok=S=>x("krok-olbrzyma",S),f.naPyl=()=>x("pyl",null),f.naBlysk=()=>x("grzmot",null),f.naStart=S=>{w.wiesc(Et[S]),x("pogoda",{typ:S})},addEventListener("pagehide",()=>l.zapisz()),h.zdarzenie=(S,B)=>{S==="slad"?w.wiesc(Da[B.kraina].nazwy[B.wariant]+(B.nowy?"":" (już w kolekcji)")):S==="fresk"&&w.wiesc(ct[B.kraina]);for(const X of k)X(S,B)};const v={czas:0,iskra:i,cam:{x:i.x,y:6.5},polX:fa*16/9,polY:fa};let M=1;const b=new Ei(S=>{e.jakosc=S,M=S.skala,g()});e.jakosc=b.ustawienia;function g(){const S=Math.min(window.devicePixelRatio||1,2),B=$.clientWidth||innerWidth,X=$.clientHeight||innerHeight;let ca=Math.min(X*S,Vi)*M,pa=ca*B/X;pa=Math.max(320,Math.round(pa)),ca=Math.max(180,Math.round(ca)),($.width!==pa||$.height!==ca)&&($.width=pa,$.height=ca),v.polX=fa*pa/ca,e.rozmiar(pa,ca)}addEventListener("resize",g),g();function T(S){v.czas+=S,z.krok(S,v.cam,v.polX,i),i.krok(S,t||o.odczyt(v),a),m.krok(v.cam,v.polX,i,v.czas);const B=1-Math.exp(-S*1.6);v.cam.x+=(i.x+(i.vx+i.pradX)*.5-v.cam.x)*B,v.cam.y+=(i.y+.6-v.cam.y)*B,j(),p.krok(i,v.czas),s.krok(S,v.cam,v.polX,v.czas,i),r.aktualizuj(S,i,s.widoczne),s.laduj(S),h.krok(S,i,r,v.czas),l.krok(S,r);const X=G[0];u.krok(S,v.cam.x*X.mnoznikX,v.polX*X.z),f.krok(S,a.krainaW(i.x)),d.aktualizuj(S,a.wagi(i.x,y)),d.spiewaj(S,r.spiewajace)}function j(){v.cam.y=Math.max(Math.max(a.ziemia(v.cam.x)+fa-1.9,4.7),Math.min(12.4,v.cam.y))}const L=()=>({cam:v.cam,polX:v.polX,polY:v.polY,czas:v.czas,iskra:i,tecze:r.ukryte?null:r,odlamki:s.widoczne,znaleziska:h,zarosla:l,olbrzym:u,pogoda:f,podmuchy:p,prady:z,mgly:m});function N(S,B){B&&b.probka(B*1e3,B),i.zbudujSmuge(ha),w.energia(i.energia),w.ustawKraine(a.krainaW(i.x)),e.rysuj(L())}const O=new Ft({krok:T,rysuj:N}),D={gotowe:!0,canvas:$,sterowanie:o,jakosc:b,stan:v,petla:O,renderer:e,swiat:a,odlamki:s,tecze:r,znaleziska:h,zarosla:l,olbrzym:u,pogoda:f,podmuchy:p,prady:z,mgly:m,kolekcja:n,hud:w,sluchacze:k,dzwiek:d,ziarno:F.ziarno,bledy:[],teleporty:()=>a.teleporty(),wywolajOlbrzyma(S=1,B=0){const X=G[0];u.wywolaj(v.cam.x*X.mnoznikX,v.polX*X.z,S,B)},teleport(S,B){i.przenies(S,B??a.ziemia(S)+4.5),v.cam.x=S,v.cam.y=i.y+.6,j()},przewin(S){O.przewin(S),N()},rysuj:N,pomiar:S=>e.pomiar(L(),S),ustawWejscie(S){t=S},krainy:W,opisJakosci:()=>`jakość ${b.auto?"auto: ":""}${b.ustawienia.nazwa}`,info(){return{renderer:c.getParameter(c.RENDERER),w:$.width,h:$.height,fps:O.fps,hdr:c.ext.floatBuf}}};if(window.iskierka=D,F.kraina){const S=a.teleporty().find(B=>B.nazwa===F.kraina);S&&D.teleport(S.x+F.dx,a.ziemia(S.x+F.dx)+4.5+F.dy)}else F.x!=null?D.teleport(F.x):D.teleport(8);const q=D.menu=new Ki(D);F.jakosc!=null&&b.ustaw(F.jakosc==="auto"?"auto":Number(F.jakosc)),F.debug&&fi(D),F.test&&(O.pauza=!0,F.jakosc==null&&b.ustaw(1),h.cienieWlaczone=!1,u.auto=!1,f.auto=!1,f.szansaBurzy=0,z.wlaczone=!1,m.wlaczone=!1,q.tytul.style.display="none",q.rzad.style.visibility="hidden",q.obrot.style.visibility="hidden"),O.start()}addEventListener("error",c=>{(window.__bledy||(window.__bledy=[])).push(String(c.message))});try{$i()}catch(c){console.error(c),(window.__bledy||(window.__bledy=[])).push(String(c.message)),Bt("Nie udało się uruchomić gry: "+c.message)}
