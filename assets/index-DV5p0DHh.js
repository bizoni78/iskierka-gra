(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function Gt(r){const a=r.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!a)return null;const t={floatBuf:!!a.getExtension("EXT_color_buffer_float"),halfBuf:!!a.getExtension("EXT_color_buffer_half_float")};return a.ext=t,a.bezFloat=new URLSearchParams(location.search).has("rgba8"),a.domyslnyVAO=a.createVertexArray(),a.bindVertexArray(a.domyslnyVAO),a}function dt(r,a,t,i){const e=r.createShader(a);if(r.shaderSource(e,t),r.compileShader(e),!r.getShaderParameter(e,r.COMPILE_STATUS)){const o=r.getShaderInfoLog(e),s=t.split(`
`).map((n,c)=>`${c+1}: ${n}`).join(`
`);throw console.error(s),new Error(`Shader "${i}" się nie skompilował: ${o}`)}return e}const Q=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;class T{constructor(a,t,i,e="program"){this.gl=a,this.nazwa=e;const o=a.createProgram();if(a.attachShader(o,dt(a,a.VERTEX_SHADER,t,e+".vs")),a.attachShader(o,dt(a,a.FRAGMENT_SHADER,i,e+".fs")),a.linkProgram(o),!a.getProgramParameter(o,a.LINK_STATUS))throw new Error(`Program "${e}" się nie zlinkował: ${a.getProgramInfoLog(o)}`);this.p=o,this.u={};const s=a.getProgramParameter(o,a.ACTIVE_UNIFORMS);for(let n=0;n<s;n++){const c=a.getActiveUniform(o,n),h=c.name.replace(/\[0\]$/,"");this.u[h]=a.getUniformLocation(o,c.name)}}uzyj(){return this.gl.useProgram(this.p),this}f(a,t,i,e,o){const s=this.gl,n=this.u[a];return n==null?this:(o!==void 0?s.uniform4f(n,t,i,e,o):e!==void 0?s.uniform3f(n,t,i,e):i!==void 0?s.uniform2f(n,t,i):s.uniform1f(n,t),this)}i(a,t){const i=this.u[a];return i!=null&&this.gl.uniform1i(i,t),this}fv(a,t,i){const e=this.gl,o=this.u[a];return o==null?this:(t===1?e.uniform1fv(o,i):t===2?e.uniform2fv(o,i):t===3?e.uniform3fv(o,i):e.uniform4fv(o,i),this)}tex(a,t,i){const e=this.gl,o=this.u[a];return o==null?this:(e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,i),e.uniform1i(o,t),this)}}function qa(r,a,t,i={}){const{wewn:e=r.RGBA8,format:o=r.RGBA,typ:s=r.UNSIGNED_BYTE,dane:n=null,filtr:c=r.LINEAR,zawijanieS:h=r.CLAMP_TO_EDGE,zawijanieT:l=r.CLAMP_TO_EDGE,mipmapy:u=!1}=i,f=r.createTexture();return r.bindTexture(r.TEXTURE_2D,f),r.texImage2D(r.TEXTURE_2D,0,e,a,t,0,o,s,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,u?r.LINEAR_MIPMAP_LINEAR:c),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,c),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,h),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,l),u&&r.generateMipmap(r.TEXTURE_2D),f}function qt(r,a=!1){return r.ext.floatBuf&&!r.bezFloat?a?{wewn:r.RGBA16F,format:r.RGBA,typ:r.HALF_FLOAT}:{wewn:r.R11F_G11F_B10F,format:r.RGB,typ:r.HALF_FLOAT}:{wewn:r.RGBA8,format:r.RGBA,typ:r.UNSIGNED_BYTE}}class ia{constructor(a,t,i,e,o={}){this.gl=a,this.formaty=Array.isArray(e)?e:[e],this.opcje=o,this.fbo=a.createFramebuffer(),this.tex=[],this.w=0,this.h=0,this.rozmiar(t,i)}rozmiar(a,t){if(a=Math.max(1,Math.round(a)),t=Math.max(1,Math.round(t)),a===this.w&&t===this.h)return;const i=this.gl;this.w=a,this.h=t;for(const o of this.tex)i.deleteTexture(o);this.tex=this.formaty.map(o=>qa(i,a,t,{...o,...this.opcje})),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),this.tex.forEach((o,s)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+s,i.TEXTURE_2D,o,0)),i.drawBuffers(this.tex.map((o,s)=>i.COLOR_ATTACHMENT0+s));const e=i.checkFramebufferStatus(i.FRAMEBUFFER);if(e!==i.FRAMEBUFFER_COMPLETE)throw new Error("Niekompletny bufor ramki: 0x"+e.toString(16));i.bindFramebuffer(i.FRAMEBUFFER,null)}ustaw(){const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,this.fbo),a.viewport(0,0,this.w,this.h)}}function kt(r,a,t){r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,a,t)}function ta(r){r.drawArrays(r.TRIANGLES,0,3)}const da=1/120;class Yt{constructor({krok:a,rysuj:t}){this.krok=a,this.rysuj=t,this.zapas=0,this.ostatni=0,this.dziala=!1,this.pauza=!1,this.zamrozona=!1,this.fps=60,this.msKlatki=16.7,this._klatki=0,this._okno=0,this.historiaMs=[],this._tik=this._tik.bind(this)}start(){this.dziala||(this.dziala=!0,this.ostatni=performance.now(),requestAnimationFrame(this._tik))}stop(){this.dziala=!1}_tik(a){if(!this.dziala)return;const t=(a-this.ostatni)/1e3;this.ostatni=a;const i=Math.min(t,.1);if(!this.pauza){this.zapas+=i;let e=0;for(;this.zapas>=da&&e<16;)this.krok(da),this.zapas-=da,e++;e===16&&(this.zapas=0)}if(this.zamrozona){requestAnimationFrame(this._tik);return}this.rysuj(this.zapas/da,t),this._klatki++,this._okno+=t,this.historiaMs.push(t*1e3),this.historiaMs.length>240&&this.historiaMs.shift(),this._okno>=.5&&(this.fps=this._klatki/this._okno,this.msKlatki=1e3/this.fps,this._klatki=0,this._okno=0),requestAnimationFrame(this._tik)}przewin(a){const t=Math.round(a/da);for(let i=0;i<t;i++)this.krok(da)}}const na=new URLSearchParams(location.search),ja=(r,a)=>{const t=parseFloat(na.get(r));return Number.isFinite(t)?t:a},O={ziarno:Math.floor(ja("ziarno",1)),maZiarno:na.has("ziarno"),kraina:na.get("kraina"),x:na.has("x")?ja("x",0):null,dy:ja("dy",0),dx:ja("dx",0),debug:na.has("debug"),test:na.has("test"),warstwa:na.get("warstwa")||"wszystko",jakosc:na.get("jakosc"),maska:na.has("maska")};function _a(r,a){const t=new URL(location.href);a==null?t.searchParams.delete(r):t.searchParams.set(r,a),history.replaceState(null,"",t)}function ut(r){return()=>{r|=0,r=r+1831565813|0;let a=Math.imul(r^r>>>15,1|r);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function fa(r,a=0,t=0){let i=Math.imul(r|0,668265261)^Math.imul(a|0,374761393)^Math.imul(t|0,2654435761)|0;return i^=i>>>15,i=Math.imul(i,2246822507),i^=i>>>13,i=Math.imul(i,3266489909),i^=i>>>16,(i>>>0)/4294967296}function $(r,a=0,t=0){return ut(fa(r,a,t)*4294967296|0)}const Xt=r=>r*r*(3-2*r);function Vt(r,a=0){const t=Math.floor(r),i=r-t;return fa(t,a)+(fa(t+1,a)-fa(t,a))*Xt(i)}function K(r,a=0,t=4){let i=0,e=.5,o=0;for(let s=0;s<t;s++)i+=e*Vt(r,a+s*17),o+=e,r*=2.03,e*=.5;return i/o}const Ut=(r,a,t)=>Math.max(a,Math.min(t,r)),la=(r,a,t)=>{const i=Ut((t-r)/(a-r),0,1);return i*i*(3-2*i)};function $t(r,a,t){const i=new Float32Array(a*a);for(let s=0;s<i.length;s++)i[s]=fa(s,t,a);const e=new Float32Array(r*r),o=a/r;for(let s=0;s<r;s++){const n=s*o,c=Math.floor(n);let h=n-c;h=h*h*(3-2*h);const l=c%a*a,u=(c+1)%a*a;for(let f=0;f<r;f++){const p=f*o,z=Math.floor(p);let m=p-z;m=m*m*(3-2*m);const y=z%a,k=(z+1)%a,w=i[l+y],v=i[l+k],b=i[u+y],x=i[u+k];e[s*r+f]=w+(v-w)*m+(b+(x-b)*m-w-(v-w)*m)*h}}return e}function Xa(r,a,t,i){const e=new Float32Array(r*r);let o=.5,s=0;for(let n=0;n<t;n++){const c=a<<n;if(c>r)break;const h=$t(r,c,i+n*101);for(let l=0;l<e.length;l++)e[l]+=h[l]*o;s+=o,o*=.5}for(let n=0;n<e.length;n++)e[n]/=s;return e}function Ht(r,a=256){const t=Xa(a,4,5,11),i=Xa(a,4,5,57),e=Xa(a,16,4,93),o=new Uint8Array(a*a*4);for(let s=0;s<a*a;s++)o[s*4]=t[s]*255,o[s*4+1]=i[s]*255,o[s*4+2]=e[s]*255,o[s*4+3]=fa(s,7)*255;return qa(r,a,a,{dane:o,zawijanieS:r.REPEAT,zawijanieT:r.REPEAT,mipmapy:!0})}const B=`#version 300 es
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
`,Jt=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = vec4(texture(uTex, vUv).rgb, 1.0); }`,Qt=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb;
  o = vec4(s / 8.0, 1.0);
}`,ae=B+`
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
}`,te=B+`
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
}`,va=`
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
}`,Pa=16,ee=.3;class ie{constructor(){this.dane=new Float32Array(Pa*4),this.nr=0,this.ox=null,this.oy=0,this.wyslanych=0,this.wyczysc()}wyczysc(){for(let a=0;a<Pa;a++)this.dane[a*4+2]=0,this.dane[a*4+3]=-100;this.ox=null}krok(a,t){if(this.ox===null){this.ox=a.x,this.oy=a.y;return}const i=a.x-this.ox,e=a.y-this.oy,o=Math.hypot(i,e);if(o>3){this.wyczysc();return}if(o<ee)return;const s=this.nr*4;this.dane[s]=a.x-i*.5,this.dane[s+1]=a.y-e*.5,this.dane[s+2]=Math.max(-1.3,Math.min(1.3,a.vx/3)),this.dane[s+3]=t,this.nr=(this.nr+1)%Pa,this.wyslanych++,this.ox=a.x,this.oy=a.y}}const oe=B+ma+`
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
}`,Rt=`
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
uniform vec4 uPogoda;        // wiatr, snopy światła, mglistość, rozpraszanie światła w opadzie
uniform float uSnieg;        // pokrywa śnieżna (0..1)
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
`,se=B+ma+Rt+`
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
  // śnieg: jasne czapy na wszystkim, co zwrócone ku górze
  if (uSnieg > 0.01) c += vec3(0.80, 0.87, 1.0) * mg * uJasnosc * pok * smoothstep(0.1, 0.7, n.y) * uSnieg * 3.2 * (1.0 - zam * 0.6);
  // światło iskierki i tęcz
  float blask = 0.0; vec3 tecza = vec3(0.0);
  if (uAtm.w > 0.001) {
    vec2 Ld; float R; blask = krag(pw, Ld, R);
    tecza = texture(uSwiatlo, vUv).rgb;
    c += t.rgb * (uBarwaSw * blask * 1.5 + tecza * 1.6) * uAtm.w * (0.75 + 1.3 * max(dot(n, Ld), 0.0));
  }
  // płachta mgły przed poprzednią warstwą, a za tą; snopy światła z góry
  float gest = clamp(uAtm.y * uPogoda.z * (0.12 + 0.88 * przyZiemi) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = barwaMgly * 1.1 + (mg * blask * 0.20 + tecza * (0.25 + 0.5 * m1)) * uAtm.w * (1.0 + 1.6 * uPogoda.w);
  vec3 dodane = vec3(0.0);
  if (uPogoda.y > 0.01) {
    float sn = kleby(vec2((pl.x + pl.y * 0.38) * 0.045 / uLz + uCzas * 0.0015, 0.37 + uLz * 0.3));
    dodane = mix(mg, vec3(1.0), 0.25) * smoothstep(0.50, 0.72, sn) * smoothstep(-1.5, 6.0, wys) * uPogoda.y * uJasnosc * 0.55 * (0.5 + m2);
  }
  o = vec4(mglaC * gest * (1.0 - pok) + dodane * (1.0 - pok * 0.7) + c, 1.0 - (1.0 - gest) * (1.0 - pok));
}`,ne=B+ma+`
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
}`,re=B+ma+Rt+`
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
  // śnieg: biała pokrywa na powierzchniach zwróconych ku górze — odbija blask iskierki i barwy tęcz
  float czapa = uSnieg * smoothstep(0.12, 0.7, n.y);
  vec3 alb = mix(t.rgb, vec3(0.82, 0.88, 0.98) * pok, czapa);
  vec3 c = alb * uBarwaSw * blask * (0.30 + 1.5 * lam + 1.0 * rant);
  c += alb * tecza * (0.9 + 1.2 * lam);
  c += alb * mg * (uAtm.z * 0.1 + czapa * 0.22);
  c += (t.rgb / max(pok, 0.02)) * uEmis * t2.b * (0.7 + 0.3 * sin(uCzas * 0.7 + pw.x * 0.6));

  float grunt = mix(uGruntY.x, uGruntY.y, vUv.x);
  float wys = pw.y - grunt;
  vec2 mm = texture(uSzum, pw * 0.06 + vec2(uCzas * 0.006, -uCzas * 0.003)).rg;
  float m1 = mm.r, m2 = mm.g;
  float gest = clamp(uAtm.y * uPogoda.z * (0.10 + 0.9 * exp(-max(wys, 0.0) / 2.4)) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = mg * (0.05 + 0.03 * m2) + mg * blask * (0.30 + 0.5 * m1) + tecza * (0.3 + 0.6 * m1);
  // samo powietrze też lekko świeci wokół iskierki
  // w deszczu i śniegu samo powietrze rozprasza światło: krąg iskierki i tęcze stają się gęstsze
  vec3 powietrze = (mg * blask * 0.085 * (0.5 + m1) + tecza * (0.34 + 0.26 * m1)) * (1.0 + 1.7 * uPogoda.w)
    + mg * blask * 0.22 * uPogoda.w * (0.4 + m1);        // poświata: opad świeci wokół iskierki
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
}`,Et=6,le=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, grubość, faza, rodzaj (0 trawa, 1 liana, 2 trzcina)
layout(location = 2) in vec4 aKol;     // barwa, podatność na wiatr
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
uniform vec4 uPodmuchy[${Pa}];
out vec2 vSw; out float vV; out vec3 vKol; out float vT;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${Et});
  float wisi = aPar.w > 0.5 && aPar.w < 1.5 ? -1.0 : 1.0;
  float wiatr = (sin(uCzas * 1.3 + aPar.z + aBaza.x * 0.4) * 0.22 + sin(uCzas * 0.47 + aBaza.x * 0.13) * 0.34 + 0.12) * aKol.a;
  // Źdźbła kładą się za przelatującą iskierką: każdy zapisany podmuch działa jak pchnięcie
  // tłumionej sprężyny (wychylenie zgodne z lotem, powrót, lekkie przejście na drugą stronę).
  vec2 sr = aBaza + vec2(0.0, wisi * aPar.x * 0.6);
  float omega = 7.0 + 3.0 * fract(aPar.z * 1.61), pchniecie = 0.0;
  for (int k = 0; k < ${Pa}; k++) {
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
}`,ce=B+`
in vec2 vSw; in float vV; in vec3 vKol; in float vT; out vec4 o;
uniform vec3 uIskra, uBarwaSw; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  float a = smoothstep(1.0, 0.25, abs(vV)) * smoothstep(1.02, 0.9, vT);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = vKol * (uBarwaSw * blask * (0.5 + 0.6 * vT) + tecza * 1.3 + 0.004);
  o = vec4(c * a, a);
}`,ue=`#version 300 es
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
}`,he=B+`
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
}`,fe=B+ma+`
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
}`,ze=`#version 300 es
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
}`,pe=B+va+`
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
}`,de=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas, uSila, uRodzaj;     // rodzaj: 0 deszcz, 1 śnieg
uniform vec3 uIskra;
out float vAlfa; out vec2 vSw; out float vH; out float vMig; out float vBlask;
float hsz(float n){ return fract(sin(n * 63.217 + 5.9) * 51413.7391); }
void main(){
  float id = float(gl_VertexID);
  float h = hsz(id), h2 = hsz(id + 13.7), h3 = hsz(id + 31.1), h4 = hsz(id + 71.3);
  float glab = mix(0.75, 1.35, h3);
  vec2 pudlo = uPol * 2.0 + vec2(4.0, 4.0);
  bool deszcz = uRodzaj < 0.5;
  vec2 v = deszcz ? vec2(-1.7, -10.0 - 3.5 * h4) : vec2(-0.3 - 0.35 * h4, -0.7 - 0.6 * h3);
  vec2 dryf = deszcz ? vec2(0.0) : vec2(sin(uCzas * (0.5 + h) + h2 * 40.0) * 0.32, cos(uCzas * (0.3 + h4) + h * 20.0) * 0.08);
  vec2 od = mod(vec2(h, h2) * pudlo + v * uCzas + dryf - uCam * glab, pudlo) - pudlo * 0.5;
  vec2 kraw = smoothstep(pudlo * 0.5, pudlo * 0.5 - 1.0, abs(od));
  vSw = uCam + od; vH = h4;
  vAlfa = kraw.x * kraw.y * smoothstep(h * 0.85, h * 0.85 + 0.15, uSila) * (0.45 + 0.55 * h2);
  gl_Position = vec4(od / uPol, 0.0, 1.0);
  // migotanie: każda kropla i płatek łapie światło w swoim rytmie, krótkim błyskiem
  vMig = pow(0.5 + 0.5 * sin(uCzas * (2.5 + 5.0 * h2) + h * 50.0), 7.0);
  float ri = length(uIskra.xy - vSw) / (uIskra.z * 1.1);
  vBlask = exp(-ri * ri);
  float skala = uRes.y / 720.0 / mix(1.3, 0.75, h3);
  // w blasku iskierki płatek rośnie w miękką poświatę
  gl_PointSize = max(deszcz ? 10.0 : 2.5, (deszcz ? 24.0 + 12.0 * h4 : (5.0 + 6.0 * h4) * (1.0 + 1.5 * vBlask)) * skala);
}`,ke=B+`
in float vAlfa; in vec2 vSw; in float vH; in float vMig; in float vBlask; out vec4 o;
uniform vec3 uIskra, uBarwaSw, uMgla; uniform sampler2D uSwiatlo; uniform vec2 uRes; uniform float uRodzaj, uCzas;
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float blask = vBlask;
  // błysk ma barwę widma: kropla rozszczepia światło jak maleńki pryzmat
  vec3 iskrzy = mix(uBarwaSw, 0.55 + 0.45 * cos(6.2832 * (vH + uCzas * 0.05 + vec3(0.0, 0.33, 0.67))), 0.4) * vMig * blask;
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c; float ksztalt;
  if (uRodzaj < 0.5) {
    // kropla: cienka, lekko skośna kreska
    float d = q.x - q.y * 0.16;
    ksztalt = exp(-d * d * 300.0) * smoothstep(1.0, 0.25, abs(q.y));
    c = uMgla * 0.10 + uBarwaSw * blask * 2.4 + iskrzy * 3.2 + tecza * (1.5 + 2.0 * vMig);
  } else {
    float r2 = dot(q, q);
    // jądro płatka i szeroka poświata, która pojawia się w świetle
    ksztalt = (exp(-r2 * mix(3.5, 14.0, blask)) + 0.22 * blask * exp(-r2 * 2.2)) * smoothstep(1.0, 0.6, r2);
    c = vec3(0.86, 0.91, 1.0) * (0.10 + 0.06 * vH) * (uMgla * 2.0 + 0.3) + uBarwaSw * blask * 2.2 + iskrzy * 2.6 + tecza * (1.9 + 2.0 * vMig);
  }
  o = vec4(c * ksztalt * vAlfa, 0.0);
}`,Fa=20,nt=.17,H=96,me=.42,Va=1.55,Ua=.75,we=1.25,ye={ciagWskaznik:5.6,ciagKlawisze:5.6,oporCiag:1.55,oporSwobodny:.8,maksPredkosc:3.7,kolysanie:.16,drgniecieCo:[4.5,9],drgniecieSila:[.06,.14]};class ve{constructor(a=1){this.x=8,this.y=6,this.vx=0,this.vy=0,this.zasiegBazowy=1.15,this.zasieg=this.zasiegBazowy,this.energia=0,this.pradX=0,this.pradY=0,this.wPradzie=0,this.oslona=0,this.tempo=Ua,this.dx=0,this.dy=0,this.dvx=0,this.dvy=0,this.puls=0,this.pulsV=0,this.t=0,this.los=ut(a*7919+13),this.doDrgniecia=3,this.hx=new Float32Array(H),this.hy=new Float32Array(H),this.hi=0,this.hn=0,this.smuga=new Float32Array(Fa*2),this.dlSmugi=0,this.pudlo=[0,0,0,0],this.resetSmugi()}resetSmugi(){this.hn=0,this.hi=0;for(let a=0;a<Fa;a++)this.smuga[a*2]=this.x,this.smuga[a*2+1]=this.y}przenies(a,t){this.x=a,this.y=t,this.vx=0,this.vy=0,this.pradX=this.pradY=0,this.dx=this.dy=this.dvx=this.dvy=0,this.resetSmugi()}tracnij(a){this.pulsV+=a}krok(a,t,i){this.t+=a;const e=ye;this.tempo+=(Ua+(we-Ua)*this.energia-this.tempo)*Math.min(1,a*1.5);const o=this.tempo;let s=t.os[0]*e.ciagKlawisze*o,n=t.os[1]*e.ciagKlawisze*o,c=s!==0||n!==0;if(t.cel){const w=t.cel[0]-this.x,v=t.cel[1]-this.y,b=Math.hypot(w,v);if(b>.12){const x=Math.min(1,b/1.8)*e.ciagWskaznik*o;s+=w/b*x,n+=v/b*x}c=!0}const h=this.t;if(s+=e.kolysanie*(Math.sin(h*.83)+.6*Math.sin(h*1.91+1.7)+.35*Math.sin(h*3.3+.4)),n+=e.kolysanie*(Math.cos(h*.71+.6)+.6*Math.sin(h*2.17+2.2)+.35*Math.cos(h*2.9+1.1)),this.doDrgniecia-=a,this.doDrgniecia<=0){this.doDrgniecia=e.drgniecieCo[0]+this.los()*(e.drgniecieCo[1]-e.drgniecieCo[0]);const w=this.los()*Math.PI*2,v=e.drgniecieSila[0]+this.los()*(e.drgniecieSila[1]-e.drgniecieSila[0]);this.vx+=Math.cos(w)*v,this.vy+=Math.sin(w)*v,this.pulsV+=1.2}const l=i.odpychanie(this.x,this.y,nt);s+=l[0],n+=l[1],this.vx+=s*a,this.vy+=n*a;const u=Math.exp(-a*(c?e.oporCiag:e.oporSwobodny));this.vx*=u,this.vy*=u;const f=Math.hypot(this.vx,this.vy),p=e.maksPredkosc*o;f>p&&(this.vx*=p/f,this.vy*=p/f),this.x+=(this.vx+this.pradX)*a,this.y+=(this.vy+this.pradY)*a;const z=i.zderzenie(this.x,this.y,nt*.8);if(z){this.x+=z.nx*z.gl,this.y+=z.ny*z.gl;const w=this.vx*z.nx+this.vy*z.ny;w<0&&(this.vx-=1.25*w*z.nx,this.vy-=1.25*w*z.ny,this.pulsV+=Math.min(6,-w*3))}const m=(this.vx+this.pradX)*.085,y=(this.vy+this.pradY)*.085;this.dvx+=((m-this.dx)*46-this.dvx*6.2)*a,this.dvy+=((y-this.dy)*46-this.dvy*6.2)*a,this.dx+=this.dvx*a,this.dy+=this.dvy*a,this.pulsV+=(-this.puls*90-this.pulsV*7)*a,this.puls+=this.pulsV*a,this.energia=Math.max(0,this.energia-a*.02*(1-.85*Math.max(this.wPradzie,this.oslona)));const k=this.zasiegBazowy+this.energia*4.7;this.zasieg+=(k-this.zasieg)*Math.min(1,a*1.4),this.hi=(this.hi+1)%H,this.hx[this.hi]=this.x,this.hy[this.hi]=this.y,this.hn<H&&this.hn++}zbudujSmuge(a){const t=Fa,i=this.smuga,e=Math.min(this.hn,Math.round(me/a));let o=0,s=this.x,n=this.y;const c=this._odc||(this._odc=new Float32Array(H));let h=0;for(let w=0;w<e;w++){const v=(this.hi-w+H)%H,b=Math.hypot(this.hx[v]-s,this.hy[v]-n);if(o+b>Va){c[h++]=Va-o,o=Va;break}c[h++]=b,o+=b,s=this.hx[v],n=this.hy[v]}this.dlSmugi=o;let l=this.x,u=this.x,f=this.y,p=this.y,z=0,m=0,y=this.x,k=this.y;for(let w=0;w<t;w++){const v=o*w/(t-1);for(;z<h-1&&m+c[z]<v;){m+=c[z];const S=(this.hi-z+H)%H;y=this.hx[S],k=this.hy[S],z++}let b=y,x=k;if(h>0){const S=(this.hi-z+H)%H,_=this.hx[S],d=this.hy[S],A=Math.hypot(_-y,d-k),j=A>1e-6?Math.min(1,(v-m)/A):0;b=y+(_-y)*j,x=k+(d-k)*j}i[w*2]=b,i[w*2+1]=x}for(let w=1;w<t;w++){const v=w/(t-1),b=i[w*2]-i[w*2-2],x=i[w*2+1]-i[w*2-1],S=Math.hypot(b,x);if(S<1e-5)continue;const _=.03*v*v*Math.sin(v*o*5-this.t*6)*Math.min(1,o/.6);i[w*2]+=-x/S*_,i[w*2+1]+=b/S*_}for(let w=0;w<t;w++){const v=i[w*2],b=i[w*2+1];v<l&&(l=v),v>u&&(u=v),b<f&&(f=b),b>p&&(p=b)}this.pudlo[0]=l,this.pudlo[1]=f,this.pudlo[2]=u,this.pudlo[3]=p}}const ge=`#version 300 es
uniform vec2 uCam, uPol; uniform vec4 uPudlo;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  vP = mix(uPudlo.xy, uPudlo.zw, r);
  gl_Position = vec4((vP - uCam) / uPol, 0.0, 1.0);
}`,be=B+`
#define N ${Fa}
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
}`;class xe{constructor(a){this.gl=a,this.p=new T(a,ge,be,"iskierka")}rysuj(a,t=!1){const i=this.gl,e=a.iskra,o=1.3;this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uPudlo",e.pudlo[0]-o,e.pudlo[1]-o,e.pudlo[2]+o,e.pudlo[3]+o).fv("uSm",2,e.smuga).f("uGlowa",e.x,e.y).f("uDef",e.dx,e.dy).f("uR",nt).f("uCzas",a.czas).f("uPuls",e.puls).f("uMaska",t?1:0).f("uDl",e.dlSmugi).f("uBarwa",...a.mgla),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}const Se=`#version 300 es
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
}`,Me=`#version 300 es
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
}`,N=[{id:"las",nazwa:"Las szeptów",mgla:[.4,.9,.74],mgla2:[.34,.72,.92],nieboGora:[.01,.022,.026],nieboDol:[.045,.125,.105],grunt:[.2,.22,.24],wierzch:[.3,.52,.4],a:[.42,.38,.44],b:[.36,.62,.5],c:[.62,.86,.72],emis:[.5,1,.8],teren:{baza:1.6,amp:1,drobne:.35,sufit:13.4},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:0,snopy:1,poswiata:.55},wiatr:.5,mglistosc:1},{id:"mokradla",nazwa:"Mgliste mokradła",mgla:[.44,.72,1],mgla2:[.62,.66,1],nieboGora:[.012,.02,.04],nieboDol:[.06,.11,.17],grunt:[.16,.19,.22],wierzch:[.3,.42,.4],a:[.34,.36,.42],b:[.42,.56,.58],c:[.66,.82,.9],emis:[.5,.8,1],teren:{baza:.85,amp:.75,drobne:.2,sufit:15.5},niebo:{tarcza:1,obrecz:0,zorza:0,gwiazdy:.25,snopy:0,poswiata:1},wiatr:.35,mglistosc:1.7},{id:"krysztaly",nazwa:"Kryształowe pole",mgla:[.74,.56,1],mgla2:[1,.52,.84],nieboGora:[.022,.012,.042],nieboDol:[.105,.06,.165],grunt:[.15,.13,.21],wierzch:[.36,.3,.52],a:[.56,.44,.86],b:[.9,.56,.84],c:[.8,.9,1],emis:[.85,.55,1],teren:{baza:1.5,amp:1.2,drobne:.6,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:1,gwiazdy:.8,snopy:0,poswiata:.7},wiatr:0,mglistosc:.7},{id:"ruiny",nazwa:"Kamienne ruiny",mgla:[.5,.86,.94],mgla2:[.6,.76,1],nieboGora:[.012,.022,.034],nieboDol:[.055,.115,.14],grunt:[.21,.23,.26],wierzch:[.4,.46,.5],a:[.5,.56,.62],b:[.4,.56,.56],c:[.74,.86,.9],emis:[.6,.9,1],teren:{baza:1.7,amp:.55,drobne:.15,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:.45,snopy:.75,poswiata:.75},wiatr:.2,mglistosc:.9},{id:"kosci",nazwa:"Cmentarzysko olbrzymów",mgla:[.8,.74,.96],mgla2:[1,.76,.86],nieboGora:[.02,.016,.034],nieboDol:[.12,.095,.15],grunt:[.24,.22,.28],wierzch:[.5,.46,.56],a:[.68,.64,.7],b:[.52,.48,.62],c:[.92,.88,.96],emis:[.9,.8,1],teren:{baza:1.5,amp:1.25,drobne:.12,sufit:15.5},niebo:{tarcza:0,obrecz:1,zorza:0,gwiazdy:.55,snopy:0,poswiata:.95},wiatr:.9,mglistosc:.8},{id:"gran",nazwa:"Grań nad chmurami",mgla:[1,.58,.84],mgla2:[1,.7,.86],nieboGora:[.026,.012,.034],nieboDol:[.15,.07,.13],grunt:[.22,.2,.24],wierzch:[.58,.5,.56],a:[.66,.5,.62],b:[.46,.36,.56],c:[1,.88,.96],emis:[1,.7,.88],teren:{baza:1.2,amp:1.5,drobne:.3,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:.3,gwiazdy:1,snopy:0,poswiata:1},wiatr:.7,mglistosc:1.35}],F=N.length,rt=1.22,q=[{f:.07,z:4.2,s:-.26,px:512,miekkosc:.34,zamglenie:.8,mgla:.3,otoczenie:.5,iskra:0,jasnosc:.21,komorka:22,postrzep:0},{f:.15,z:2.9,s:-.42,px:512,miekkosc:.2,zamglenie:.64,mgla:.34,otoczenie:.4,iskra:.05,jasnosc:.155,komorka:15,postrzep:.1},{f:.3,z:2,s:-.58,px:640,miekkosc:.11,zamglenie:.46,mgla:.36,otoczenie:.3,iskra:.3,jasnosc:.105,komorka:11,postrzep:.25},{f:.58,z:1.35,s:-.78,px:768,miekkosc:.055,zamglenie:.26,mgla:.36,otoczenie:.2,iskra:.85,jasnosc:.066,komorka:8,postrzep:.6},{f:1,z:1,s:0,px:1024,miekkosc:.03,zamglenie:0,mgla:.4,otoczenie:.05,iskra:1,jasnosc:.05,komorka:5,gra:!0,postrzep:1},{f:2.3,z:.6,s:-1.12,px:384,miekkosc:.42,zamglenie:0,mgla:.16,otoczenie:0,iskra:.25,jasnosc:0,komorka:6.5,bliska:!0,postrzep:0}],aa=4,lt=5.3,ka=5.6,_e=16;for(const r of q){if(r.gra)r.y0=-1,r.wys=20,r.A=lt;else{r.A=-r.s*ka*r.z;const a=r.A-ka*r.z-.3*r.z,t=r.A+(15-lt)*r.f*r.z+ka*r.z+.3*r.z;r.y0=a,r.wys=t-a}r.szer=_e*r.z,r.pxW=r.px,r.pxH=Math.round(r.px*r.wys/r.szer/16)*16,r.mnoznikX=r.f*r.z}function mt(r,a,t=[0,0]){return t[0]=a.x*r.mnoznikX,t[1]=r.gra?a.y:r.A+(a.y-lt)*r.f*r.z,t}const M={TEREN:0,PIEN:1,KLAB:2,KOLUMNA:3,LUK:4,BLOK:5,AKWEDUKT:6,POSAG:7,KRYSZTAL:8,ZEBRO:9,KREGI:10,CZASZKA:11,DRZEWO:12,TRZCINY:13,KOSC:14,IGLICA:15},Pe=[2.3,1.75,1.4,1.12,1,1.35],Ae=.5;function $a(r,a,t=.07){const i=1+(r()-.5)*2*t;return[a[0]*i,a[1]*i,a[2]*i]}function P(r,a,t,i,e,o,s,n={}){const c=N[a],h={typ:t,x:i,y:e,w:o,h:s,rot:0,par:[0,0,0,0],zi:r(),kraina:a,ka:$a(r,c.a),kb:$a(r,c.b),kc:$a(r,c.c),przed:!1,kolejnosc:r(),odbij:r()<.5?-1:1,bryla:null,...n};if(h.ox==null&&(h.ox=Math.abs(o)*1.25),h.oy==null&&(h.oy=Math.abs(s)*1.12),h.rot){const l=Math.hypot(h.ox,h.oy);h.ox=l,h.oy=l}return h}function je(r,a,t,i,e,o,s){const n=r.terenWarstwy(a,o),c=t.y0+t.wys/2,h=t.wys/2+t.z,l=(u,f,p)=>s.push(P(e,0,M.PIEN,u,c,f,h,{par:[.35+e()*.6,p,.5+e()*.5,.45+e()*.25],ox:f*5.5}));if(a<=3){const u=a===3?e()<.7?1:0:1+(e()<.45?1:0);for(let f=0;f<u;f++)l(o+(e()-.5)*t.komorka*t.z*.8,i*(.85+e()*e()*1.5),Math.floor(e()*3.4));if(a>=2&&e()<.6){const f=i*(1.2+e()*1.6),p=i*(.45+e()*.6),z=o+(e()-.5)*4*t.z;s.push(P(e,0,M.KLAB,z,r.terenWarstwy(a,z)+p*.5,f,p,{par:[6,.55,0,.3],przed:!0}))}}else if(a===aa){if(e()<.34){const u=.5+e()*.9,f=.3+e()*.45;s.push(P(e,0,M.KLAB,o,n+f*.35,u,f,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+f*.2,rx:u*.5,ry:f*.45,r:.15}}))}else if(e()<.2){const u=.42+e()*.3,f=.45+e()*.5;s.push(P(e,0,M.PIEN,o,n+f*.6,u,f,{par:[.15,0,.9,.85],ox:u*2.2,bryla:{x:o,y:n+f*.5,rx:u*.3,ry:f*.9,r:.12}}))}}else{if(e()<.55){const u=i*(1.8+e()*2),f=i*(.7+e()*.6);s.push(P(e,0,M.KLAB,o+3*t.z,n+f*.2,u,f,{par:[6,.6,0,.3]}))}if(e()<.5){const u=i*(2+e()*2.5),f=i*(.8+e()*.7);s.push(P(e,0,M.KLAB,o-2*t.z,t.y0+t.wys-f*.4,u,f,{par:[7,.7,0,.3]}))}e()<.3&&l(o+(e()-.5)*3*t.z,i*(.8+e()*.8),0)}}function Le(r,a,t,i,e,o,s){const n=r.terenWarstwy(a,o),c=(l,u,f)=>{const p=u*(.55+e()*.25),z=r.terenWarstwy(a,l);s.push(P(e,1,M.DRZEWO,l,z+u-.25*i,p,u,{par:[3+Math.floor(e()*3),f,(e()-.5)*.7,0],ox:p*1.3}))},h=(l,u,f)=>{const p=r.terenWarstwy(a,l),z=u*(.5+e()*.5);s.push(P(e,1,M.TRZCINY,l,p+u*.85,z,u,{par:[4+Math.floor(e()*5),0,0,0],przed:f,ox:z*1.6}))};if(a===0)e()<.5&&c(o,i*(2.2+e()*2.2),0);else if(a<=2)e()<.7&&c(o,i*(2+e()*2.6),a===2&&e()<.5?1:0),e()<.65&&h(o+(e()-.5)*8*t.z,i*(.7+e()*.7),!0);else if(a===3){if(e()<.62&&c(o,i*(2.2+e()*3),e()<.5?1:0),e()<.6&&h(o+(e()-.5)*5*t.z,i*(.8+e()*.8),!0),e()<.35){const l=i*(.9+e()),u=i*(.3+e()*.3),f=o+2*t.z;s.push(P(e,1,M.KLAB,f,r.terenWarstwy(a,f)+u*.3,l,u,{par:[4,.3,1,.2],przed:!0}))}}else if(a===aa){if(e()<.22&&n>1.3){const l=.6+e()*.8,u=.25+e()*.3;s.push(P(e,1,M.KLAB,o,n+u*.3,l,u,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+u*.15,rx:l*.5,ry:u*.4,r:.12}}))}}else e()<.6&&h(o,i*(1.6+e()*1.4),!1),e()<.24&&c(o+(1.5+e()*2)*t.z,i*(4+e()*2.5),0),e()<.35&&h(o-(1+e()*2)*t.z,i*(2.2+e()*1.6),!1)}function Re(r,a,t,i,e,o,s){const n=r.terenWarstwy(a,o),c=(l,u,f,p,z={})=>{const m=r.terenWarstwy(a,l);return P(e,2,M.KRYSZTAL,l,m+u*.9,f,u,{par:[p,.35+e()*.4,0,.5+e()*.5],ox:f*1.9+u*.5,oy:u*1.25,...z})},h=(l,u,f)=>s.push(P(e,2,M.KRYSZTAL,l,u,f*.3,f,{par:[1,0,1,.8],rot:(e()-.5)*1.6,przed:!0}));if(a<=1)e()<.75&&s.push(c(o,i*(2.2+e()*3.6),i*(.9+e()*.9),3+Math.floor(e()*3)));else if(a<=3)e()<.75&&s.push(c(o,i*(1.2+e()*2.8),i*(.6+e()*.8),3+Math.floor(e()*4))),e()<.35&&h(o+(e()-.5)*6*t.z,n+i*(3+e()*4.5),i*(.35+e()*.5));else if(a===aa){if(e()<.5){const l=.35+e()*e()*1,u=.35+e()*.45,f=c(o,l,u,2+Math.floor(e()*4),{przed:e()<.5});l>.6&&(f.bryla={x:o,y:n+l*.6,rx:u*.45,ry:l*.7,r:.1}),s.push(f)}}else e()<.3&&s.push(c(o,i*(1.2+e()*1.2),i*(1.3+e()*.8),3)),e()<.22&&s.push(P(e,2,M.KRYSZTAL,o+4*t.z,t.y0+t.wys-i*1.2,i*.8,i*1.8,{par:[3,.5,0,.6],rot:Math.PI,ox:i*3,oy:i*3})),e()<.34&&s.push(c(o-(1+e()*2)*t.z,i*(2.6+e()*2.6),i*(.9+e()*.6),2+Math.floor(e()*2))),e()<.3&&h(o+(e()-.5)*4*t.z,n+i*(3.5+e()*3.5),i*(.8+e()*.8))}function Ee(r,a,t,i,e,o,s){const n=r.terenWarstwy(a,o),c=(l,u,f,p)=>{const z=r.terenWarstwy(a,l);s.push(P(e,3,M.KOLUMNA,l,z+u-.2*i,f,u,{par:[p,1,3+Math.floor(e()*3),0],ox:f*1.6}))},h=(l,u,f)=>{const p=r.terenWarstwy(a,l);s.push(P(e,3,M.LUK,l,p+f-.3*i,u,f,{par:[.2+e()*.08,e()<.45?.3+e()*.5:0,0,0]}))};if(a===0)if(e()<.55){const l=i*(1.6+e()*1.2),u=i*(5+e()*4);s.push(P(e,3,M.AKWEDUKT,o,n+l-.3*i,u,l,{par:[3+Math.floor(e()*3),0,e()<.5?.5+e()*.4:0,0]}))}else e()<.5&&c(o,i*(2.5+e()*3),i*(.5+e()*.4),e()<.5?e()*.3:0);else if(a===1)if(e()<.4){const l=i*(1.5+e()),u=i*(4+e()*3);s.push(P(e,3,M.AKWEDUKT,o,n+l-.3*i,u,l,{par:[3+Math.floor(e()*2),0,e()<.6?.4+e()*.5:0,0]}))}else e()<.6&&h(o,i*(1.3+e()),i*(1.8+e()*1.4));else if(a<=3){const l=i*(2.3+e()*2.4),u=i*(.34+e()*.16);if(e()<.78?(c(o,l,u,e()<.4?.15+e()*.55:0),e()<.5&&c(o+u*(7+e()*3),l,u,e()<.5?.2+e()*.6:0)):e()<.7&&h(o,i*(1.4+e()*.8),i*(2+e()*1.6)),a===3&&e()<.35){const f=i*(.6+e()*.7),p=i*(.3+e()*.25),z=o+3*t.z;s.push(P(e,3,M.BLOK,z,r.terenWarstwy(a,z)+p*.6,f,p,{par:[.06,0,0,0],rot:(e()-.5)*.7,przed:!0}))}}else if(a===aa){const l=e();if(l<.3){const u=.45+e()*.6,f=.28+e()*.3,p=(e()-.5)*.5;s.push(P(e,3,M.BLOK,o,n+f*.75,u,f,{par:[.05,0,0,0],rot:p,przed:!0,bryla:{x:o,y:n+f*.7,rx:u*.85,ry:f*.8,r:.08}}))}else if(l<.42){const u=1.2+e()*.7,f=.5+e()*.35;s.push(P(e,3,M.BLOK,o,n+f*.8,u,f,{par:[.03,3,0,0],przed:!0,bryla:{x:o,y:n+f*.3,rx:u*.9,ry:f*.5,r:.08}}))}else if(l<.56){const u=.42+e()*.12,f=.5+e()*.8;s.push(P(e,3,M.KOLUMNA,o,n+f-.1,u,f,{par:[.25+e()*.3,0,4,0],ox:u*1.6,bryla:{x:o,y:n+f*.6,rx:u*.6,ry:f*.75,r:.1}}))}}else{if(e()<.4){const l=i*(1.5+e()),u=i*(.8+e()*.5);s.push(P(e,3,M.BLOK,o,n+u*.5,l,u,{par:[.1,0,0,0],rot:(e()-.5)*.6}))}e()<.24&&c(o+(1.5+e()*2)*t.z,i*(3.5+e()*4),i*(.6+e()*.45),e()<.55?.2+e()*.5:0)}}function Te(r,a,t,i,e,o,s){const n=r.terenWarstwy(a,o),c=(l,u,f)=>{const p=e()<.5?-1:1,z=u*(.42+e()*.15);for(let m=0;m<f;m++){const y=u*(1-.13*m-e()*.05),k=l+m*z,w=r.terenWarstwy(a,k),v=y*(.42+e()*.1);s.push(P(e,4,M.ZEBRO,k,w+y-.3*i,v,y,{par:[.13+e()*.04,.9+e()*.35,0,0],odbij:p,ox:v*1.5,oy:y*1.15,kolejnosc:.5+m*.01}))}},h=(l,u,f={})=>{const p=r.terenWarstwy(a,l),z=u*(.16+e()*.05);return P(e,4,M.KOSC,l,p+z*.6,u,z,{rot:(e()-.5)*.5,par:[0,0,0,0],przed:!0,...f})};if(a<=1)e()<.62&&c(o,i*(2.4+e()*3),2+Math.floor(e()*3));else if(a<=3){if(e()<.58)c(o,i*(2+e()*3),2+Math.floor(e()*3));else if(e()<.5){const l=i*(2+e()*2),u=i*(.5+e()*.25);s.push(P(e,4,M.KREGI,o,n+u*.7,l,u,{par:[5+Math.floor(e()*4),0,0,0],przed:!0}))}a===3&&e()<.3&&s.push(h(o+3*t.z,i*(.8+e()*.8)))}else if(a===aa){const l=e();if(l<.2){const u=1+e()*.9,f=.3+e()*.15;s.push(P(e,4,M.KREGI,o,n+f*.55,u,f,{par:[4+Math.floor(e()*3),0,0,0],przed:!0,bryla:{x:o,y:n+f*.1,rx:u*.9,ry:f*.45,r:.08}}))}else if(l<.42){const u=.5+e()*.7,f=h(o,u);f.bryla={x:o,y:f.y,rx:u*.8,ry:f.h*.5,r:.08},s.push(f)}}else{const l=e();l<.2?c(o,i*(2.5+e()*2),1):l<.32&&c(o+(1+e()*2)*t.z,i*(3.6+e()*2),1)}}function Be(r,a,t,i,e,o,s){const n=r.terenWarstwy(a,o),c=(l,u,f,p={})=>{const z=r.terenWarstwy(a,l);return P(e,5,M.IGLICA,l,z+u-.35*i,f,u,{par:[(e()-.5)*.5,e()<.45?1:0,0,0],ox:f*2.4,oy:u*1.1,...p})},h=(l,u,f)=>s.push(P(e,5,M.BLOK,l,u,f,f*(.5+e()*.3),{par:[.12,0,0,0],rot:(e()-.5)*1.2,przed:!0}));if(a<=1)e()<.8&&s.push(c(o,i*(2.6+e()*4),i*(.7+e()*.8)));else if(a<=3)e()<.7&&s.push(c(o,i*(1.6+e()*3.2),i*(.5+e()*.6))),e()<.3&&h(o+(e()-.5)*6*t.z,n+i*(3+e()*4),i*(.5+e()*.6));else if(a===aa){const l=e();if(l<.3){const u=.5+e()*e()*1.1,f=.3+e()*.3,p=c(o,u,f,{przed:e()<.5});u>.7&&(p.bryla={x:o,y:n+u*.5,rx:f*.4,ry:u*.7,r:.1}),s.push(p)}else if(l<.48){const u=.45+e()*.5,f=.28+e()*.25;s.push(P(e,5,M.BLOK,o,n+f*.6,u,f,{par:[.1,0,0,0],rot:(e()-.5)*.5,przed:!0,bryla:{x:o,y:n+f*.5,rx:u*.8,ry:f*.7,r:.08}}))}}else e()<.4&&s.push(c(o,i*(3+e()*3),i*(.8+e()*.6)))}const Ce=[je,Le,Re,Ee,Te,Be];function wt(r,a,t,i,e,o,s,n){const c=r.terenWarstwy(a,s);switch(o){case 0:{const h=i*1.9,l=i*9;n.push(P(e,0,M.PIEN,s,c+i*2.3,h,l,{par:[.35,3,.8,.5],rot:1.28*(e()<.5?-1:1),ox:l*1.1,oy:l*1.1,kolejnosc:.9})),n.push(P(e,0,M.PIEN,s+i*11,t.y0+t.wys/2,i*2.6,t.wys/2+t.z,{par:[.3,2,.9,.7],ox:i*12,kolejnosc:.1}));break}case 1:{const h=i*4.2,l=h*.75;n.push(P(e,1,M.DRZEWO,s,c+h-.4*i,l,h,{par:[5,1,.25,0],ox:l*1.3,kolejnosc:.9}));break}case 2:{const h=i*4.6,l=i*1.7;n.push(P(e,2,M.KRYSZTAL,s,c+h*.86,l,h,{par:[1,.12,0,1.6],ox:l*2+h*.3,oy:h*1.2,kolejnosc:.9})),n.push(P(e,2,M.KRYSZTAL,s+i*2.2,c+i*1.6,i*1.3,i*2.2,{par:[4,.7,0,.9],ox:i*4,oy:i*3,kolejnosc:.95}));break}case 3:{const h=i*3.1;n.push(P(e,3,M.POSAG,s,c+h-.5*i,h*.62,h,{par:[e()<.35?1:0,0,0,0],kolejnosc:.9}));break}case 5:{const h=i*6.5,l=i*1.5;n.push(P(e,5,M.IGLICA,s,c+h-.5*i,l,h,{par:[.18*(e()<.5?-1:1),1,0,0],ox:l*2.4,oy:h*1.1,kolejnosc:.9}));for(let u=0;u<4;u++){const f=u*1.6+e(),p=i*(.35+e()*.4);n.push(P(e,5,M.BLOK,s+Math.cos(f)*i*3.6,c+h*1.55+Math.sin(f)*i*1.3,p,p*.6,{par:[.12,0,0,0],rot:(e()-.5)*1.4,przed:!0,kolejnosc:.95}))}break}case 4:{const h=i*2;n.push(P(e,4,M.CZASZKA,s,c+h*.62,h*1.45,h,{par:[0,0,0,0],rot:(e()-.5)*.3,kolejnosc:.9,ox:h*1.9,oy:h*1.5}));break}}}function Ke(r,a,t){const i=q[a],e=i.z*Pe[a],o=i.komorka*i.z;if(i.bliska&&K(t*.31,r.ziarno+555,2)<Ae)return[];const s=$(r.ziarno,a*7919+17,t),n=[],c=(t+.2+.6*s())*o,h=c/i.mnoznikX,l=r.wagi(h);let u=s(),f=0;for(;f<F-1&&(u-=l[f],!(u<0));f++);if(Ce[f](r,a,i,e,s,c,n),a===2){const p=r.segment(h),z=r.srodekSegmentu(p)*i.mnoznikX-5.5*i.z;z>=t*o&&z<(t+1)*o?wt(r,a,i,e,$(r.ziarno,991,p),r.krainaSegmentu(p),z,n):l[f]>.95&&s()<.07&&wt(r,a,i,e,s,f,c,n)}return n}const Da=16;function Oe(r,a){const t=$(r.ziarno,4242,a),i=[],e=a*Da,o=(s,n,c,h,l,u,f)=>i.push(s,n,c,h,t()*6.283,l,u[0],u[1],u[2],f);for(let s=e;s<e+Da;s+=.22){const n=s+t()*.22,c=r.wagi(n),h=r.ziemia(n);let l=t(),u=0;for(;u<F-1&&(l-=c[u],!(l<0));u++);const f=N[u],p=.6+t()*.6,z=[f.b[0]*p,f.b[1]*p,f.b[2]*p],m=t();if(u===0){if(m<.8&&o(n,h-.05,.18+t()*t()*.75,.014+t()*.012,0,z,1),t()<.085){const y=r.sufit(n);y<100&&o(n,y+.9,1.4+t()*t()*4.2,.018+t()*.014,1,[z[0]*.8,z[1]*.8,z[2]*.8],.55)}}else u===1?m<.42&&h<1.75?o(n,h-.05,.7+t()*1.7,.013+t()*.008,t()<.4?2:0,z,.7):m<.6&&o(n,h-.05,.15+t()*.4,.012,0,z,1):u===3?m<.22&&o(n,h-.04,.12+t()*.4,.011+t()*.006,0,z,1):u===4?m<.2&&o(n,h-.04,.25+t()*.75,.009+t()*.006,0,z,1.6):u===5&&m<.13&&o(n,h-.04,.1+t()*.3,.009+t()*.005,0,z,1.4)}return new Float32Array(i)}const ua=4,yt=4,pa=161;class Fe{constructor(a,t,i){this.gl=a,this.szum=t,this.swiat=i,this.p=new T(a,Se,Me,"wypiek");const e={wewn:a.RGBA8,format:a.RGBA,typ:a.UNSIGNED_BYTE};this.warstwy=q.map(o=>({W:o,bufor:new ia(a,o.pxW*ua,o.pxH,[e,e],{zawijanieS:a.REPEAT}),kafle:new Array(ua).fill(null)})),this.terenDane=new Float32Array(pa*4),this.terenTex=qa(a,pa,1,{wewn:a.RGBA32F,format:a.RGBA,typ:a.FLOAT,filtr:a.NEAREST,dane:this.terenDane}),this.zadanie=null,this.upieczono=0}reset(){for(const a of this.warstwy)a.kafle.fill(null);this.zadanie=null}zapewnij(a,t,i=1){let e=null;for(let o=0;o<this.warstwy.length;o++){const s=this.warstwy[o],n=s.W,c=a.x*n.mnoznikX,h=t*n.z+.6*n.z,l=Math.floor((c-h)/n.szer),u=Math.floor((c+h)/n.szer);for(let f=l;f<=u;f++)s.kafle[ra(f)]!==f&&this._pieczCaly(o,f);if(!e){const f=n.szer*.45,p=i>=0?Math.floor((c+h+f)/n.szer):Math.floor((c-h-f)/n.szer);s.kafle[ra(p)]!==p&&p-l<ua&&u-p<ua&&(e=[o,p])}}this.zadanie?this._pieczPasek():e&&(this.zadanie=this._przygotuj(e[0],e[1]),this.warstwy[e[0]].kafle[ra(e[1])]=null,this._pieczPasek())}_przygotuj(a,t){const i=q[a],e=this.swiat,o=t*i.szer,s=o+i.szer,n=new Float32Array(pa*4),c=i.szer/(pa-33),h=o-16*c;for(let p=0;p<pa;p++){const z=h+p*c,m=z/i.mnoznikX,y=e.wagi(m);n[p*4]=e.terenWarstwy(a,z),n[p*4+1]=e.sufitWarstwy(a,z),n[p*4+2]=y[2],n[p*4+3]=y[3]}const l=o/i.mnoznikX,u=s/i.mnoznikX,f=p=>e.mieszaj(p,"b",[0,0,0]);return{l:a,i:t,pasek:0,dane:n,xs:h,dx:c,x0:o,rekwizyty:e.rekwizytyW(a,o,s),barwy:{gL:e.mieszaj(l,"grunt",[0,0,0]),gP:e.mieszaj(u,"grunt",[0,0,0]),wL:e.mieszaj(l,"wierzch",[0,0,0]),wP:e.mieszaj(u,"wierzch",[0,0,0]),lL:f(l),lP:f(u)}}}_pieczCaly(a,t){this.zadanie&&this.zadanie.l===a&&ra(this.zadanie.i)===ra(t)&&(this.zadanie=null);const i=this._przygotuj(a,t);this._rysuj(i,0,q[a].pxH),this.warstwy[a].kafle[ra(t)]=t,this.upieczono++}_pieczPasek(){const a=this.zadanie,t=q[a.l],i=Math.ceil(t.pxH/yt);this._rysuj(a,a.pasek*i,Math.min(i,t.pxH-a.pasek*i)),++a.pasek>=yt&&(this.warstwy[a.l].kafle[ra(a.i)]=a.i,this.zadanie=null,this.upieczono++)}_rysuj(a,t,i){const e=this.gl,o=q[a.l],s=this.warstwy[a.l],n=this.p,c=ra(a.i);e.bindFramebuffer(e.FRAMEBUFFER,s.bufor.fbo),e.viewport(c*o.pxW,0,o.pxW,o.pxH),e.enable(e.SCISSOR_TEST),e.scissor(c*o.pxW,t,o.pxW,i),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.terenTex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,pa,1,0,e.RGBA,e.FLOAT,a.dane);const h=a.barwy;n.uzyj().tex("uSzum",0,this.szum).i("uTeren",1).f("uTerenZakres",a.xs,1/a.dx,pa).f("uKafel",a.x0,o.y0,o.szer,o.wys).f("uSkala",o.z).f("uPostrzep",o.postrzep).f("uMiekko",o.miekkosc*o.z).f("uPxJ",o.szer/o.pxW).f("uKafelX",a.x0,o.szer).f("uGruntL",...h.gL).f("uGruntP",...h.gP).f("uWierzchL",...h.wL).f("uWierzchP",...h.wP).f("uLiscL",...h.lL).f("uLiscP",...h.lP);const l=u=>{n.i("uTyp",u.typ).f("uPoz",u.x,u.y).f("uObsz",u.ox+o.miekkosc*o.z*2,u.oy+o.miekkosc*o.z*2).f("uRot",u.rot).f("uOdbij",u.odbij).f("uRozm",u.w,u.h).f("uPar",u.par[0],u.par[1],u.par[2],u.par[3]).f("uZi",u.zi).f("uKa",...u.ka).f("uKb",...u.kb).f("uKc",...u.kc),e.drawArrays(e.TRIANGLE_STRIP,0,4)};for(const u of a.rekwizyty)u.przed||l(u);n.i("uTyp",M.TEREN).f("uPoz",a.x0+o.szer/2,o.y0+o.wys/2).f("uObsz",o.szer/2,o.wys/2).f("uRot",0).f("uOdbij",1).f("uZi",.37+a.l*.11),e.drawArrays(e.TRIANGLE_STRIP,0,4);for(const u of a.rekwizyty)u.przed&&l(u);e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null)}}function ra(r){return(r%ua+ua)%ua}const Ie=ua,vt=10;class De{constructor(a,t){this.gl=a,this.swiat=t,this.p=new T(a,le,ce,"flora"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf);const i=vt*4;[[0,2,0],[1,4,2],[2,4,6]].forEach(([e,o,s])=>{a.enableVertexAttribArray(e),a.vertexAttribPointer(e,o,a.FLOAT,!1,i,s*4),a.vertexAttribDivisor(e,1)}),a.bindVertexArray(a.domyslnyVAO),this.klucz="",this.ile=0,this.pamiec=new Map,this._brak=new Float32Array(16*4)}reset(){this.klucz="",this.pamiec.clear()}rysuj(a,t,i,e,o){const s=this.gl,n=Math.floor((a.cam.x-a.polX-3)/Da),c=Math.floor((a.cam.x+a.polX+3)/Da),h=n+":"+c;if(h!==this.klucz){this.klucz=h;const l=[];let u=0;for(let z=n;z<=c;z++){let m=this.pamiec.get(z);m||(this.pamiec.size>12&&this.pamiec.clear(),m=Oe(this.swiat,z),this.pamiec.set(z,m)),l.push(m),u+=m.length}const f=new Float32Array(u);let p=0;for(const z of l)f.set(z,p),p+=z.length;s.bindBuffer(s.ARRAY_BUFFER,this.buf),s.bufferData(s.ARRAY_BUFFER,f,s.DYNAMIC_DRAW),this.ile=u/vt}this.ile&&(this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...t.barwaSw).f("uRes",e,o).tex("uSwiatlo",1,i),this.p.fv("uPodmuchy",4,a.podmuchy?a.podmuchy.dane:this._brak),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,2*(Et+1),this.ile),s.bindVertexArray(s.domyslnyVAO))}}const Z=16,Aa=8,ga={zasieg:1.5,sila:2.6,maks:3.2,gasnie:.45},Ne=.3,Ze=.9;function Ha(r,a){const t=4+Math.floor(r()*4.99),i=[];let e=0;for(let z=0;z<t;z++){const m=.35+r();i.push(m),e+=m}const o=1+r()*1.1,s=r()*Math.PI*2,n=[];let c=r()*Math.PI*2;const h=Math.floor(r()*t),l=r()<.4?Math.floor(r()*t):-1;for(let z=0;z<t;z++){c+=i[z]/e*Math.PI*2;let m=a*(.5+.5*r());(z===h||z===l)&&(m*=.38+r()*.2);const y=Math.cos(c)*m*o,k=Math.sin(c)*m;n.push([y*Math.cos(s)-k*Math.sin(s),y*Math.sin(s)+k*Math.cos(s)])}let u=0,f=0;for(const z of n)u+=z[0],f+=z[1];u/=t,f/=t;let p=0;for(const z of n)z[0]-=u,z[1]-=f,p=Math.max(p,Math.hypot(z[0],z[1]));return{v:n,zasieg:p}}function Tt(r,a){const t=a*Z,i=t+Z/2,e=r.segment(i),o=r.srodekSegmentu(e)+13;if(o<t||o>=t+Z)return null;const s=r.krainaSegmentu(e);return{id:"f"+e,x:o,y:Math.min(r.ziemia(o)+4.4,r.granicaLotu(o)-2.2),kraina:s,segment:e,odsloniecie:0,odkryty:!1}}const We=7,Bt=r=>Math.min(1,Math.abs(r)/We);function Ge(r,a){const t=$(r.ziarno,9003,a),i=Bt(a);return a!==0&&t()>.5+.3*i?0:3+Math.floor(t()*2.99)+Math.round(13*i*(.25+.75*t()))}function qe(r,a){const t=a*Z,i=r.segment(t+Z/2),e=r.srodekSegmentu(i)+38;if(e<t||e>=t+Z)return null;const o=Ge(r,i);return o?{x:e,segment:i,ile:o}:null}const Ja=(r,a,t,i,e)=>({id:r,x:a,y:t,px:a,py:t,kat:e()*Math.PI*2,obrot:(e()-.5)*.42,faza:e()*Math.PI*2,v:i.v,zasieg:i.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0,ladunek:0,zapalony:!1,zar:0,wir:0});function Ye(r,a){const t=$(r.ziarno,9001,a),i=[],e=a*Z,o=Bt(r.segment(e+Z/2)),s=1+(t()<.6?1:0)+(t()<.22?1:0);for(let h=0;h<s;h++){const l=e+(h+.15+.7*t())*Z/s,u=r.ziemia(l),f=Math.min(r.granicaLotu(l)-.9,u+9.5),p=u+1.4+t()*Math.max(.5,f-u-1.4),z=t()<.1+.2*o,m=z?2+Math.floor(t()*(1+2*o)):1;for(let y=0;y<m;y++){const k=z?.2+t()*.32:.32+t()*.4,w=t()*Math.PI*2,v=y===0?0:.6+t()*.9,b=Ha(t,k),x=l+Math.cos(w)*v,S=p+Math.sin(w)*v*.8;i.push(Ja(a*64+i.length,x,S,b,t))}}const n=Tt(r,a);if(n)for(let h=0;h<3;h++){const l=Ha(t,.3+t()*.25),u=n.x-2.6+h*2.4+(t()-.5)*.6,f=n.y-1.9+(t()-.5)*.9;i.push(Ja(a*64+i.length,u,f,l,t))}const c=qe(r,a);if(c){const h=$(r.ziarno,9002,a),l=c.ile,u=3.5+6*l/18,f=i.length;for(let p=0;p<l;p++)for(let z=0;z<8;z++){const m=c.x+(h()-.5)*u,y=r.ziemia(m),k=Math.min(r.granicaLotu(m)-.9,y+6.4),w=y+1.8+h()*Math.max(.5,k-y-1.8);let v=!0;for(let x=f;x<i.length;x++)if(Math.hypot(i[x].x-m,i[x].y-w)<1){v=!1;break}if(!v)continue;const b=Ja(a*64+i.length,m,w,Ha(h,.22+h()*.3),h);b.polana=!0,i.push(b);break}}return i}class ht{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[]}reset(){this.kawalki.clear(),this.widoczne.length=0}krok(a,t,i,e,o=null){const s=Math.floor((t.x-i-8)/Z),n=Math.floor((t.x+i+8)/Z);this.widoczne.length=0;for(let c=s;c<=n;c++){let h=this.kawalki.get(c);if(!h){if(this.kawalki.size>24)for(const l of this.kawalki.keys())(l<s-2||l>n+2)&&this.kawalki.delete(l);if(h=Ye(this.swiat,c),this.kawalki.set(c,h),this.pamiec)for(const l of h)this.pamiec.jestSzklo(this.swiat.ziarno+":"+l.id)&&(l.zapalony=!0,l.zar=1,l.ladunek=1);this.naNowyKawalek?.(c,h)}for(const l of h){if(o){const u=o.x-l.px,f=o.y-l.py,p=u*u+f*f,z=ga.zasieg+l.zasieg;if(p<z*z&&p>1e-4){const m=Math.sqrt(p),y=1-m/z;l.wir+=(u*o.vy-f*o.vx)/m*y*y*ga.sila*a,l.wir>ga.maks?l.wir=ga.maks:l.wir<-3.2&&(l.wir=-3.2)}}l.wir!==0&&(l.wir*=Math.exp(-a*ga.gasnie),Math.abs(l.wir)<.001&&(l.wir=0)),l.kat+=(l.obrot+l.wir)*a,l.py=l.y+Math.sin(e*.6+l.faza)*.12,l.px=l.x+Math.sin(e*.37+l.faza*1.7)*.05,this.widoczne.push(l)}}}laduj(a){for(const t of this.widoczne){if(t.zapalony){t.zar<1&&(t.zar=Math.min(1,t.zar+a*.8));continue}t.oswietlenie>Ne?(t.ladunek+=a*t.oswietlenie/Ze,t.ladunek>=1&&(t.ladunek=1,t.zapalony=!0,this.pamiec?.zapalSzklo(this.swiat.ziarno+":"+t.id),this.naZapalenie?.(t))):t.ladunek>0&&(t.ladunek=Math.max(0,t.ladunek-a*.04))}}static wierzcholki(a,t){const i=Math.cos(a.kat),e=Math.sin(a.kat);for(let o=0;o<a.v.length;o++){const s=a.v[o];t[o*2]=i*s[0]-e*s[1],t[o*2+1]=e*s[0]+i*s[1]}return t}}const Xe=`#version 300 es
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
}`,Ve=B+va+`
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
}`,Ue=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){
  vec3 L = texture(uTex, vUv).rgb;
  float mn = min(L.r, min(L.g, L.b));
  L -= mn * 0.92;
  float mx = max(L.r, max(L.g, L.b));
  L *= (1.0 - exp(-mx * 1.35)) / max(mx, 1e-4) * 0.92;
  o = vec4(L, 1.0);
}`,$e=`#version 300 es
uniform vec2 uCam, uPol, uSrodek; uniform float uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,He=B+va+`
in vec2 vP; out vec4 o;
uniform vec2 uW[${Aa}]; uniform int uN;
uniform vec2 uDoIskry, uOs, uBlyskPoz, uRes;
uniform float uBlask, uFaza, uBlysk, uOsw, uZar;
uniform vec3 uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  // odległość ze znakiem od wielokąta i normalna najbliższej krawędzi
  float d2 = 1e9, znak = 1.0; vec2 nrm = vec2(0.0, 1.0);
  for (int i = 0; i < ${Aa}; i++) {
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
}`;class Je{constructor(a,t){this.gl=a,this.szum=t,this.pWachlarz=new T(a,Xe,Ve,"wachlarz"),this.pNasycenie=new T(a,Q,Ue,"nasycenie"),this.pOdlamek=new T(a,$e,He,"odlamek"),this._w=new Float32Array(Aa*2)}wachlarze(a,t){const i=this.gl,e=this.pWachlarz;i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),e.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).tex("uSzum",0,this.szum);for(const o of t)e.f("uO",o.x,o.y).f("uKat",o.kat).f("uDl",o.dlugosc).f("uRozw",o.rozwarcie).f("uSila",o.sila).f("uZnak",o.znak).f("uZi",o.zi).f("uStart",o.start).f("uSkos",o.skos),i.drawArrays(i.TRIANGLE_STRIP,0,4);i.disable(i.BLEND)}odlamki(a,t,i,e,o,s){const n=this.gl,c=this.pOdlamek,h=a.iskra;c.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uBarwaSw",...t.barwaSw).tex("uSwiatlo",1,e);for(const l of i){if(Math.abs(l.px-a.cam.x)>a.polX+1.5)continue;const u=h.x-l.px,f=h.y-l.py,p=Math.hypot(u,f)||1,z=p/(h.zasieg*1.25);ht.wierzcholki(l,this._w);const m=Math.pow(Math.max(0,Math.sin(a.czas*.9+l.faza*3)),40),y=Math.floor(a.czas*.9/(2*Math.PI)+l.faza)%l.v.length;c.f("uSrodek",l.px,l.py).f("uObsz",l.zasieg+.5).fv("uW",2,this._w).i("uN",l.v.length).f("uDoIskry",u/p,f/p).f("uOs",Math.cos(l.os+l.kat),Math.sin(l.os+l.kat)).f("uBlyskPoz",this._w[y*2],this._w[y*2+1]).f("uBlask",Math.exp(-z*z)).f("uFaza",a.czas*.7+l.faza).f("uBlysk",m).f("uOsw",l.oswietlenie).f("uZar",l.zapalony?l.zar:l.ladunek*l.ladunek*.3),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}const ba=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Ct=`
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
}`,Qe=B+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uPuls;
void main(){
  float r = length(vP);
  float rdzen = exp(-r * r / 0.0035);
  float aura = exp(-r / 0.11) * 0.42 + exp(-r / 0.36) * 0.10;
  o = vec4((mix(uBarwa, vec3(0.93, 1.0, 0.96), 0.55) * rdzen * 0.9 + uBarwa * aura) * uPuls * smoothstep(1.0, 0.7, r), 0.0);
}`,ai=B+Ct+`
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
}`,ti=B+Ct+`
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
}`,ei=B+`
in vec2 vP; out vec4 o; uniform float uPuls, uGoni, uZanik;
void main(){
  float r = length(vP) / (1.0 + uZanik * 1.5);
  float rdzen = exp(-r * r / 0.0050);
  float aura = exp(-r / 0.10) * 0.5 + exp(-r / 0.30) * 0.10;
  float zyje = 1.0 - uZanik;
  vec3 barwa = mix(vec3(0.42, 0.22, 0.85), vec3(0.66, 0.26, 0.92), uGoni);
  o = vec4(barwa * aura * (1.0 - rdzen) * uPuls * (0.8 + 0.5 * uGoni) * zyje * smoothstep(1.0, 0.7, length(vP)), min(rdzen * 1.25, 0.97) * zyje);
}`,ii=B+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uT, uR;
void main(){
  float r = length(vP), prom = uR * (1.0 - exp(-uT * 2.6));
  // miękka fala światła, nie kreska cyrklem: szeroka, rozmyta i szybko gasnąca
  float pierscien = exp(-abs(r - prom) / (0.14 + 0.3 * uT)) * smoothstep(0.0, 0.25, r);
  o = vec4(mix(uBarwa, vec3(1.0), 0.3) * pierscien * exp(-uT * 3.0) * 0.42, 0.0);
}`;class oi{constructor(a,t){this.gl=a,this.szum=t,this.pDrobinka=new T(a,ba,Qe,"drobinka"),this.pCien=new T(a,ba,ei,"cien"),this.pSlad=new T(a,ba,ai,"slad"),this.pFresk=new T(a,ba,ti,"fresk"),this.pKrag=new T(a,ba,ii,"krag")}miniatura(a,t,i=144){const e=this.gl;this._mini||(this._mini=new ia(e,i,i,{wewn:e.RGBA8,format:e.RGBA,typ:e.UNSIGNED_BYTE}),this._czarna=qa(e,1,1,{dane:new Uint8Array([0,0,0,255])})),this._mini.ustaw(),e.disable(e.BLEND),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),this.pSlad.uzyj().f("uCam",0,0).f("uPol",.7,.7).f("uSrodek",0,0).f("uObsz",.7,.7).f("uRes",i,i).f("uCzas",0).tex("uSwiatlo",1,this._czarna).f("uSkala",.42).i("uTyp",a).f("uWariant",t).f("uBarwa",...N[a].c).f("uOdsl",1.15),e.drawArrays(e.TRIANGLE_STRIP,0,4);const o=new Uint8Array(i*i*4);e.readPixels(0,0,i,i,e.RGBA,e.UNSIGNED_BYTE,o),e.bindFramebuffer(e.FRAMEBUFFER,null);const s=document.createElement("canvas");s.width=s.height=i;const n=s.getContext("2d"),c=n.createImageData(i,i);for(let h=0;h<i;h++)for(let l=0;l<i;l++){const u=((i-1-h)*i+l)*4,f=(h*i+l)*4,p=o[u],z=o[u+1],m=o[u+2],y=Math.max(p,z,m);c.data[f]=p,c.data[f+1]=z,c.data[f+2]=m,c.data[f+3]=Math.min(255,y*1.6)}return n.putImageData(c,0,0),s.toDataURL("image/png")}_wspolne(a,t){return a.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY)}freski(a,t,i,e,o){if(!t.freski.length)return;const s=this.gl,n=this._wspolne(this.pFresk,a);n.f("uRes",e,o).f("uCzas",a.czas).tex("uSwiatlo",1,i).tex("uSzum",0,this.szum);for(const c of t.freski)Math.abs(c.x-a.cam.x)>a.polX+4||(n.f("uSrodek",c.x,c.y).f("uObsz",3.9,2.25).i("uTyp",c.kraina).f("uBarwa",...N[c.kraina].c).f("uOdsl",c.odkryty?0:c.odsloniecie).f("uOdkryty",c.odkryty?1:0).f("uZaplon",c.odkryty&&c.tZaplonu!=null?Math.exp(-Math.max(0,a.czas-c.tZaplonu)*.9):0),s.drawArrays(s.TRIANGLE_STRIP,0,4))}reszta(a,t,i,e,o,s){const n=this.gl,c=a.polX+1.5;let h=this._wspolne(this.pDrobinka,a);for(const l of i.drobinki)Math.abs(l.px-a.cam.x)>c||(h.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uBarwa",...t.barwaSw).f("uPuls",.8+.2*Math.sin(a.czas*2.2+l.faza)),n.drawArrays(n.TRIANGLE_STRIP,0,4));if(i.cienie.length){h=this._wspolne(this.pCien,a);for(const l of i.cienie)Math.abs(l.px-a.cam.x)>c||(h.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uGoni",l.stan===1?1:0).f("uZanik",l.zanik).f("uPuls",.8+.2*Math.sin(a.czas*2.2+l.faza)),n.drawArrays(n.TRIANGLE_STRIP,0,4))}if(i.slady.length){h=this._wspolne(this.pSlad,a),h.f("uRes",o,s).f("uCzas",a.czas).tex("uSwiatlo",1,e).f("uSkala",.42);for(const l of i.slady)Math.abs(l.x-a.cam.x)>c||(h.f("uSrodek",l.x,l.y+Math.sin(a.czas*.8+l.faza)*.06).f("uObsz",.75,.75).i("uTyp",l.kraina).f("uWariant",l.wariant).f("uBarwa",...N[l.kraina].c).f("uOdsl",l.odsloniecie),n.drawArrays(n.TRIANGLE_STRIP,0,4))}if(i.efekty.length){h=this._wspolne(this.pKrag,a);for(const l of i.efekty){const u=l.rodzaj===2?5:l.rodzaj===1?2.2:1.3;h.f("uSrodek",l.x,l.y).f("uObsz",u+.5,u+.5).f("uBarwa",...t.barwaSw).f("uT",l.t).f("uR",u),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}}const Kt=5,xa=7,Ot=`#version 300 es
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
}`,si=Ot+`
out float vV; out float vT; out float vBarwa; out float vPak;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${Kt});
  vec2 kier; vec2 p = lodyga(t, kier);
  float gr = 0.02 * (1.0 - 0.75 * t) * (0.5 + 0.5 * aWzrost);
  if (aPar.w > 0.5) gr += 0.036 * smoothstep(0.6, 0.8, t) * smoothstep(1.0, 0.86, t) * aWzrost;   // pąk
  p += vec2(kier.y, -kier.x) * bok * gr;
  vV = bok; vT = t; vBarwa = aPar.z; vPak = aPar.w;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,ni=B+va+`
in float vV; in float vT; in float vBarwa; in float vPak; out vec4 o;
uniform float uCzas;
void main(){
  float a = smoothstep(1.0, 0.2, abs(vV)) * smoothstep(1.03, 0.9, vT);
  vec3 barwa = mix(widmo(vBarwa), vec3(1.0), 0.18);
  // łodyga ledwo się tli, czubek (i pąk) świeci najmocniej
  float moc = 0.10 + 0.55 * vT * vT + vPak * 0.5 * smoothstep(0.6, 0.85, vT);
  o = vec4(barwa * moc * a, a * 0.5);
}`,ri=Ot+`
out vec2 vQ; out float vBarwa; out float vMoc;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vec2 kier; vec2 p = lodyga(0.84, kier);
  float rozm = 0.20 + 0.10 * aPar.w;
  vQ = r; vBarwa = aPar.z;
  vMoc = aWzrost * aWzrost * (0.75 + 0.25 * sin(uCzas * 0.9 + aPar.y * 3.0)) * (0.7 + 0.5 * aPar.w);
  gl_Position = vec4((p + r * rozm - uCam) / uPol, 0.0, 1.0);
}`,li=B+va+`
in vec2 vQ; in float vBarwa; in float vMoc; out vec4 o;
void main(){
  float r2 = dot(vQ, vQ);
  o = vec4(widmo(vBarwa) * exp(-r2 * 3.4) * smoothstep(1.0, 0.5, r2) * vMoc * 0.34, 0.0);
}`;class ci{constructor(a){this.gl=a,this.pZdzblo=new T(a,si,ni,"zarosla"),this.pPoswiata=new T(a,ri,li,"zarosla-poswiata"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf),[[0,2,0],[1,4,2],[2,1,6]].forEach(([t,i,e])=>{a.enableVertexAttribArray(t),a.vertexAttribPointer(t,i,a.FLOAT,!1,xa*4,e*4),a.vertexAttribDivisor(t,1)}),a.bindVertexArray(a.domyslnyVAO),this.dane=new Float32Array(xa*256),this.ile=0,this._klucz=""}rysuj(a,t){if(!t.kielki.length)return;const i=this.gl,e=Math.floor((a.cam.x-a.polX-1.5)/4),o=Math.floor((a.cam.x+a.polX+1.5)/4),s=t.wersja+":"+e+":"+o;if(s!==this._klucz){this._klucz=s;const n=e*4,c=(o+1)*4;let h=0;for(const l of t.kielki){if(l.x<n||l.x>c)continue;if((h+1)*xa>this.dane.length){const p=new Float32Array(this.dane.length*2);p.set(this.dane),this.dane=p}const u=this.dane,f=h*xa;u[f]=l.x,u[f+1]=l.y,u[f+2]=l.dl,u[f+3]=l.faza,u[f+4]=l.t,u[f+5]=l.rodzaj,u[f+6]=l.wzrost,h++}this.ile=h,i.bindBuffer(i.ARRAY_BUFFER,this.buf),i.bufferData(i.ARRAY_BUFFER,this.dane.subarray(0,h*xa),i.DYNAMIC_DRAW)}if(this.ile){i.bindVertexArray(this.vao);for(const n of[this.pPoswiata,this.pZdzblo])n.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,n===this.pZdzblo?2*(Kt+1):4,this.ile);i.bindVertexArray(i.domyslnyVAO)}}}const Na=16,ca={predkosc:3.6,szer:1,szansa:.3,narasta:3.5};function ui(r,a){if(a<2)return null;const t=$(r.ziarno,5151,a);if(t()>ca.szansa)return null;const i=t()<.5?1:-1,e=14+Math.floor(t()*11),o=a*Na+t()*Na-(i<0?-e:0),s=.25+.5*t(),n=.5+t()*1.1,c=.25+t()*.25,h=t()*6.283,l=(t()-.5)*.12,u=.25+t()*.6,f=c*(1.7+t()*1.1),p=t()*6.283;let z=new Float32Array(e+1);for(let m=0;m<=e;m++){const y=o+i*m,k=r.ziemia(y)+1.7,w=r.granicaLotu(y)-1.3,v=k+(w-k)*s+n*Math.sin(m*c+h)+u*Math.sin(m*f+p)+l*(m-e/2)*4;z[m]=Math.max(k,Math.min(Math.max(k,w),v))}for(let m=0;m<3;m++){const y=new Float32Array(e+1);for(let k=0;k<=e;k++)y[k]=(z[Math.max(0,k-1)]+z[k]*2+z[Math.min(e,k+1)])/4;z=y}return{id:a,x0:o,kier:i,L:e,y:z,faza:t()*100}}function Ft(r,a,t){const i=Math.max(0,Math.min(r.L-1,Math.floor(a))),e=Math.max(0,Math.min(1,a-i)),o=r.y[i+1]-r.y[i],s=Math.hypot(1,o);return t[0]=r.x0+r.kier*a,t[1]=r.y[i]+o*e,t[2]=r.kier/s,t[3]=o/s,t}const La=[0,0,0,0];class hi{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.sila=0,this.wlaczone=!0}krok(a,t,i,e){const o=Math.floor((t.x-i-30)/Na),s=Math.floor((t.x+i+30)/Na);this.widoczne.length=0;let n=0,c=0,h=0;if(this.wlaczone)for(let u=o;u<=s;u++){let f=this.kawalki.get(u);if(f===void 0&&(this.kawalki.size>40&&this.kawalki.clear(),f=ui(this.swiat,u),this.kawalki.set(u,f)),!f)continue;this.widoczne.push(f);const p=(e.x-f.x0)*f.kier;if(p<=0||p>=f.L)continue;Ft(f,p,La);const z=e.y-La[1];if(Math.abs(z)>=ca.szer)continue;const m=(1-(z/ca.szer)**2)*Math.min(1,p/2,(f.L-p)/2);m>h&&(h=m,n=La[2]*ca.predkosc*m,c=La[3]*ca.predkosc*m-z*1.4*m)}const l=Math.min(1,a*ca.narasta);e.pradX+=(n-e.pradX)*l,e.pradY+=(c-e.pradY)*l,this.sila+=(h-this.sila)*l,e.wPradzie=this.sila,Math.abs(e.pradX)<1e-4&&Math.abs(e.pradY)<1e-4&&(e.pradX=0,e.pradY=0)}}const Za=16,I={szansa:.24,sladow:24,odstep:.6,promien:1.6,moc:.5,mocIskry:.85,zarasta:9},ya=4,It=20;function fi(r,a){if(a<3)return null;const t=$(r.ziarno,6262,a);if(t()>I.szansa)return null;const i=t();let e,o;i<.4?(e=2.5+t()*2.5,o=1.2+t()*.9):i<.78?(e=5+t()*4.5,o=1.8+t()*1.4):(e=12+t()*(It-12),o=1.7+t()*1.6);const s=a*Za+t()*Za,n=r.ziemia(s),c=r.granicaLotu(s),h=Math.min(c-o*.6,n+o*.7+t()*2.6);return{id:a,x:s,y:h,rx:e,ry:o,ziarno:t()*60,gest:.75+t()*.55}}function zi(r,a,t){const i=(a-r.x)/r.rx,e=r.ziarno,o=r.y+r.ry*(.5*(Math.sin(i*2.3+e)-Math.sin(e))+.22*(Math.sin(i*5.1+e*1.7)-Math.sin(e*1.7))),s=r.ry*(.78+.3*Math.sin(i*3.4+e*2.3)+.16*Math.sin(i*7.7+e*.6));return Math.hypot(i,(t-o)/s)}const gt=r=>{const a=Math.sin(r*78.233+3.7)*43758.5453;return a-Math.floor(a)};class pi{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.wlaczone=!0,this.slad=new Float32Array(I.sladow*4),this.banki=new Float32Array(ya*4),this.banki2=new Float32Array(ya*2),this.nr=0,this.ile=0,this.ox=null,this.oy=0,this.wyczysc()}wyczysc(){for(let a=0;a<I.sladow;a++)this.slad[a*4+2]=1,this.slad[a*4+3]=-1e3;this.ox=null}krok(a,t,i,e){const o=It+2,s=Math.floor((a.x-t-o)/Za),n=Math.floor((a.x+t+o)/Za);if(this.widoczne.length=0,this.banki.fill(0),this.banki2.fill(0),this.wlaczone)for(let m=s;m<=n&&this.widoczne.length<ya;m++){let y=this.kawalki.get(m);if(y===void 0&&(this.kawalki.size>40&&this.kawalki.clear(),y=fi(this.swiat,m),this.kawalki.set(m,y)),!y||Math.abs(y.x-a.x)>t+y.rx+1.5)continue;const k=this.widoczne.length,w=k*4;this.banki[w]=y.x,this.banki[w+1]=y.y,this.banki[w+2]=y.rx,this.banki[w+3]=y.ry,this.banki2[k*2]=y.ziarno,this.banki2[k*2+1]=y.gest,this.widoczne.push(y)}if(this.ox===null){this.ox=i.x,this.oy=i.y;return}const c=i.x-this.ox,h=i.y-this.oy,l=Math.hypot(c,h);if(l>4){this.ox=i.x,this.oy=i.y;return}if(l<I.odstep)return;const u=this.nr*4,f=gt(this.ile),p=gt(this.ile+.5),z=(p-.5)*.7;this.slad[u]=(i.x+this.ox)/2-h/l*z,this.slad[u+1]=(i.y+this.oy)/2+c/l*z,this.slad[u+2]=I.promien*(.7+.75*f)*(.85+.3*Math.min(1,i.energia+.3)),this.slad[u+3]=e,this.nr=(this.nr+1)%I.sladow,this.ile++,this.ox=i.x,this.oy=i.y}rozwianie(a,t,i,e){let o=1;for(let c=0;c<I.sladow;c++){const h=a-this.slad[c*4],l=t-this.slad[c*4+1],u=this.slad[c*4+2];o*=1-I.moc*Math.exp(-(h*h+l*l)/(u*u))*Math.exp(-Math.max(0,e-this.slad[c*4+3])/I.zarasta)}const s=a-i.x,n=t-i.y;return o*=1-I.mocIskry*Math.exp(-(s*s+n*n)/(I.promien*I.promien)),1-o}gestosc(a,t,i,e){let o=0;for(const s of this.widoczne){const n=Math.max(0,Math.min(1,(1-zi(s,a,t))/.75));o=Math.max(o,n*n*(3-2*n))}return o*(1-this.rozwianie(a,t,i,e))}}const bt=30,Ra=5,di=`#version 300 es
layout(location = 0) in vec2 aPoz;
layout(location = 1) in vec3 aUv;       // wzdłuż (-1 ogon .. 1 czoło), w poprzek (-1..1), alfa
uniform vec2 uCam, uPol;
out vec3 vUv; out vec2 vSw;
void main(){ vUv = aUv; vSw = aPoz; gl_Position = vec4((aPoz - uCam) / uPol, 0.0, 1.0); }`,ki=B+ma+`
in vec3 vUv; in vec2 vSw; out vec4 o;
uniform vec3 uIskra, uBarwa; uniform sampler2D uSwiatlo;
void main(){
  // pasmo wiatru: bardzo miękki, rozmyty obłok bez ostrych krawędzi; szum rwie go na nierówne strzępy
  float wzdluz = 1.0 - vUv.x * vUv.x;
  float ksztalt = wzdluz * wzdluz * exp(-vUv.y * vUv.y * 3.2);
  float strzep = kleby(vSw * vec2(0.07, 0.19) + vec2(-uCzas * 0.035, uCzas * 0.006));
  ksztalt *= smoothstep(0.2, 0.75, strzep);
  vec2 L = uIskra.xy - vSw; float r = length(L) / (uIskra.z * 1.3);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = uBarwa * (0.15 + 0.22 * exp(-r * r)) + tecza * 0.4;
  o = vec4(c * ksztalt * vUv.z, 0.0);
}`,mi=B+ma+`
in vec2 vUv; out vec4 o;
uniform vec4 uBanki[${ya}];       // x, y, rx, ry
uniform vec2 uBanki2[${ya}];      // ziarno kształtu, gęstość
uniform vec4 uSlad[${I.sladow}];         // x, y, promień, chwila
uniform vec3 uIskra, uMgla, uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  vec2 pw = swiatZUv(vUv);
  // szum kształtu jest przyklejony do świata, więc płat nie „pływa” razem z kamerą
  float nk = kleby(pw * vec2(0.031, 0.052) + 0.37);
  float nk2 = kleby2(pw * vec2(0.083, 0.12) + 0.11);
  float g = 0.0;
  for (int i = 0; i < ${ya}; i++) {
    vec4 b = uBanki[i];
    if (b.z <= 0.0) continue;
    float z = uBanki2[i].x, u = (pw.x - b.x) / b.z;
    // oś płatu wije się, a jego grubość zmienia się wzdłuż niego (to samo liczy ksztaltMglawicy)
    float os = b.y + b.w * (0.5 * (sin(u * 2.3 + z) - sin(z)) + 0.22 * (sin(u * 5.1 + z * 1.7) - sin(z * 1.7)));
    float gr = b.w * (0.78 + 0.3 * sin(u * 3.4 + z * 2.3) + 0.16 * sin(u * 7.7 + z * 0.6));
    float q = length(vec2(u, (pw.y - os) / gr)) + (nk - 0.5) * 0.75 + (nk2 - 0.5) * 0.3;
    g = max(g, smoothstep(1.0, 0.2, q) * uBanki2[i].y);
  }
  if (g < 0.004) discard;
  // rozwianie: ślady przelotu i sama iskierka. Granica rozwiania jest postrzępiona (odległości
  // liczone w przestrzeni wykrzywionej szumem), a mgła jest też wypychana na boki.
  vec2 pz = pw + (vec2(kleby(pw * 0.13 + vec2(0.0, uCzas * 0.004)), kleby2(pw * 0.13 + 0.5)) - 0.5) * 2.2;
  float zostaje = 1.0; vec2 pch = vec2(0.0);
  for (int i = 0; i < ${I.sladow}; i++) {
    vec4 s = uSlad[i];
    vec2 d = pz - s.xy;
    float w = ${I.moc.toFixed(2)} * exp(-dot(d, d) / (s.z * s.z)) * exp(-max(0.0, uCzas - s.w) / ${I.zarasta.toFixed(1)});
    zostaje *= 1.0 - w;
    pch += d * w;
  }
  vec2 di = pw - uIskra.xy, dz = pz - uIskra.xy;
  float wi = ${I.mocIskry.toFixed(2)} * exp(-dot(dz, dz) / ${(I.promien*I.promien).toFixed(3)});
  zostaje *= 1.0 - wi; pch += dz * wi;
  // zbite miejsca: mgły jest tam więcej i jeden przelot jej nie rozgoni
  float zbite = smoothstep(0.5, 0.76, kleby2(pw * vec2(0.024, 0.04) + 0.71));
  zostaje = pow(zostaje, mix(1.0, 0.26, zbite));
  vec2 ps = pw - pch * 0.45;
  float n1 = kleby(ps * vec2(0.045, 0.075) + vec2(uCzas * 0.006, -uCzas * 0.002));
  float n2 = kleby2(ps * vec2(0.16, 0.22) + vec2(-uCzas * 0.011, uCzas * 0.004));
  float gest = g * (0.18 + 1.35 * n1 + 0.5 * n2) * (1.0 + 0.9 * zbite) * zostaje;
  gest += g * (1.0 - zostaje) * zostaje * 0.5;             // mgła zgarnięta na brzeg rozwiania
  float alfa = clamp(gest * 0.95, 0.0, 0.93);
  float r = length(di) / uIskra.z;
  vec3 tecza = texture(uSwiatlo, vUv).rgb;
  vec3 c = uMgla * (0.15 + 0.13 * n2 + 0.08 * n1) + mix(uBarwaSw, uMgla, 0.5) * exp(-r * r * 0.7) * (0.36 + 0.4 * n1) + tecza * (0.75 + 0.5 * n1);
  o = vec4(c * alfa, alfa);
}`,wi=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,yi=B+va+`
in vec2 vP; out vec4 o;
uniform float uCzas, uRozw, uZanik, uKier, uSen, uBarwa;
uniform sampler2D uSwiatlo; uniform vec2 uRes;
float odc(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
void main(){
  vec2 p = vP; p.x *= uKier;
  float rozw = uRozw * uRozw * (3.0 - 2.0 * uRozw);
  float dl = mix(0.5, 1.35, rozw), rozp = mix(0.16, 0.9, rozw);
  float xx = p.x / dl;
  // płetwy falują: fala biegnie od nosa ku ogonowi, najmocniej na końcach
  float mach = sin(uCzas * 2.4 - p.x * 2.2) * 0.16 * rozw;
  float y = p.y - mach * abs(p.y) / max(rozp, 0.05) * 0.5;
  float profil = pow(max(0.0, 1.0 - xx * xx), 0.75) * (0.5 + 0.5 * smoothstep(-1.0, 0.35, xx));
  float d = max(abs(y) - rozp * profil, (abs(xx) - 1.0) * dl);
  float ogonY = 0.12 * sin(uCzas * 1.8 + 1.0) * rozw;
  float ogon = odc(p, vec2(-dl * 0.9, 0.0), vec2(-dl - 1.0 * rozw - 0.1, ogonY)) - 0.016;
  float ksz = max(smoothstep(0.035, -0.035, d), smoothstep(0.025, 0.0, ogon) * (0.3 + 0.7 * rozw));
  if (ksz < 0.003) discard;
  float rant = exp(-abs(d) * 26.0);
  float zylki = 0.5 + 0.5 * sin(abs(y) * 34.0 / max(rozp, 0.1) + xx * 5.0);
  vec3 barwa = mix(widmo(fract(uBarwa + abs(y) * 0.55 + xx * 0.12 + uCzas * 0.02)), vec3(1.0), 0.3);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  // we śnie: ciemna bryłka, której rant zaczyna się tlić, gdy pada na nią barwne światło
  vec3 sen = barwa * rant * (0.03 + 0.5 * uSen * (0.6 + 0.4 * sin(uCzas * 3.0))) + tecza * 0.25;
  vec3 jawa = barwa * (0.16 + 0.55 * rant + 0.05 * zylki * smoothstep(0.0, -0.2, d)) + tecza * 0.5;
  float zyje = 1.0 - uZanik;
  vec3 c = mix(sen, jawa, rozw) * ksz * zyje;
  float alfa = ksz * mix(0.62, 0.22, rozw) * zyje;
  o = vec4(c, alfa);
}`,sa=[0,0,0,0],Ea=r=>{const a=Math.sin(r*91.345+7.1)*47453.5453;return a-Math.floor(a)};class vi{constructor(a,t){this.gl=a,this.szum=t,this.pPrad=new T(a,di,ki,"prad"),this.pMgla=new T(a,Q,mi,"mglawica"),this.pStw=new T(a,wi,yi,"stworzenie"),this.dane=new Float32Array(6*bt*4*Ra),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf),a.bufferData(a.ARRAY_BUFFER,this.dane.byteLength,a.DYNAMIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,2,a.FLOAT,!1,Ra*4,0),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,3,a.FLOAT,!1,Ra*4,8),a.bindVertexArray(a.domyslnyVAO)}prady(a,t,i,e,o,s){const n=this.gl,c=this.dane,h=a.czas;let l=0;const u=(z,m,y,k,w)=>{c[l++]=z,c[l++]=m,c[l++]=y,c[l++]=k,c[l++]=w};let f=0;for(const z of i.widoczne){if(f>=4)break;const m=Math.min(z.x0,z.x0+z.kier*z.L);if(!(Math.max(z.x0,z.x0+z.kier*z.L)<a.cam.x-a.polX-2||m>a.cam.x+a.polX+2)){f++;for(let k=0;k<bt;k++){const w=Ea(k*3.1+z.faza),v=Ea(k*5.7+z.faza+11),b=Ea(k*7.3+z.faza+23),x=Ea(k*1.9+z.faza+37),S=(w*z.L+h*ca.predkosc*(.75+.5*v))%z.L;Ft(z,S,sa);const _=(b*2-1)*ca.szer*.75+Math.sin(h*(.3+.5*x)+w*40)*.3,d=sa[0]-sa[3]*_,A=sa[1]+sa[2]*_,j=1+2.4*x*x,R=.2+.45*v,oa=Math.max(0,Math.sin(h*(.17+.3*w)+x*30))**1.5,W=Math.min(1,S/3.5,(z.L-S)/3.5)*(.25+.75*b)*(.25+.75*oa),X=sa[2]*j,V=sa[3]*j,U=-sa[3]*R,Y=sa[2]*R;u(d-X-U,A-V-Y,-1,-1,W),u(d+X-U,A+V-Y,1,-1,W),u(d+X+U,A+V+Y,1,1,W),u(d-X-U,A-V-Y,-1,-1,W),u(d+X+U,A+V+Y,1,1,W),u(d-X+U,A-V+Y,-1,1,W)}}}if(!l)return;const p=t.barwaSw;this.pPrad.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uCzas",h).tex("uSzum",0,this.szum).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwa",.5+.5*p[0],.5+.5*p[1],.5+.5*p[2]).tex("uSwiatlo",1,e),n.bindVertexArray(this.vao),n.bindBuffer(n.ARRAY_BUFFER,this.buf),n.bufferSubData(n.ARRAY_BUFFER,0,c,0,l),n.drawArrays(n.TRIANGLES,0,l/Ra),n.bindVertexArray(n.domyslnyVAO)}stworzenia(a,t,i,e,o){const s=this.gl;let n=null;for(const c of t)Math.abs(c.x-a.cam.x)>a.polX+3||(n||(n=this.pStw.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",e,o).tex("uSwiatlo",1,i)),n.f("uSrodek",c.x,c.y).f("uObsz",2.7,1.5).f("uCzas",a.czas+c.faza).f("uRozw",c.rozw).f("uZanik",c.zanik).f("uKier",c.kier).f("uSen",c.ladunek).f("uBarwa",c.barwa),s.drawArrays(s.TRIANGLE_STRIP,0,4))}mglawice(a,t,i,e,o,s){if(!i.widoczne.length)return;const n=(.4+.6*t.otoczenie)/Math.max(.05,t.otoczenie),c=t.mgla;this.pMgla.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uCzas",a.czas).tex("uSzum",0,this.szum).tex("uSwiatlo",1,e).fv("uBanki",4,i.banki).fv("uBanki2",2,i.banki2).fv("uSlad",4,i.slad).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uMgla",c[0]*n,c[1]*n,c[2]*n).f("uBarwaSw",...t.barwaSw),ta(this.gl)}}const ea={wys:20,ziemia:-1,predkosc:.069,tempo:.9,przerwa:[240,480],pierwszy:[110,200]};class gi{constructor(){this.aktywny=!1,this.auto=!0,this.x=0,this.kier=1,this.faza=0,this.czas=0,this.widziany=!1,this.wys=ea.wys,this.do=ea.pierwszy[0]+Math.random()*(ea.pierwszy[1]-ea.pierwszy[0]),this.przejsc=0}krok(a,t,i){if(!this.aktywny){this.auto&&(this.do-=a)<=0&&this.wywolaj(t,i);return}this.czas+=a,this.x+=this.kier*ea.predkosc*this.wys*a;const e=Math.floor(this.faza/Math.PI);this.faza+=ea.tempo*a;const o=Math.abs(this.x-t),s=this.wys*.8;o<i+s&&(this.widziany=!0),Math.floor(this.faza/Math.PI)!==e&&o<i*1.4&&this.naKrok?.({bliskosc:Math.max(0,1-o/(i*1.4))}),(this.widziany&&o>i+s*1.5||o>i*3||this.czas>420)&&(this.aktywny=!1,this.przejsc++,this.do=ea.przerwa[0]+Math.random()*(ea.przerwa[1]-ea.przerwa[0]))}wywolaj(a,t,i=Math.random()<.5?1:-1,e=0){this.aktywny=!0,this.kier=i,this.czas=0,this.widziany=!1,this.faza=Math.random()*6.283,this.x=a-i*(t+this.wys*.8-e)}}const xt=132,D=22,St=46;class bi{constructor(a){this.ziarno=a|0,this.auraWl=!0,this._perm=new Map,this._komorki=new Map,this._w=new Float32Array(F),this._w2=new Float32Array(F)}_permSurowa(a){const t=$(this.ziarno,a,5),i=[...Array(F).keys()];for(let e=F-1;e>0;e--){const o=Math.floor(t()*(e+1));[i[e],i[o]]=[i[o],i[e]]}if(a===0)for(;i[0]!==0;)i.push(i.shift());return i}_permutacja(a){let t=this._perm.get(a);if(!t){t=this._permSurowa(a);const i=this._permSurowa(a-1)[F-1];a!==0&&t[0]===i?[t[0],t[1]]=[t[1],t[0]]:a===0&&(this._permSurowa(1)[0],t[F-1]),this._perm.set(a,t)}return t}krainaSegmentu(a){const t=Math.floor(a/F);return this._permutacja(t)[a-t*F]}granica(a){return a*xt-St+(fa(a,this.ziarno,77)-.5)*34}segment(a){let t=Math.floor((a+St)/xt);for(;a<this.granica(t);)t--;for(;a>=this.granica(t+1);)t++;return t}auraSegmentu(a){if(a===0||!this.auraWl)return 0;const t=fa(a,this.ziarno,8181),i=t<.3?1:t<.56?2:0;return i===1&&N[this.krainaSegmentu(a)].id==="gran"?2:i}mieszajSegmenty(a,t){const i=this.segment(a),e=this.granica(i),o=this.granica(i+1);if(a>o-D){const s=la(o-D,o+D,a);return t(i)*(1-s)+t(i+1)*s}if(a<e+D){const s=la(e-D,e+D,a);return t(i-1)*(1-s)+t(i)*s}return t(i)}deszcz(a){return this.mieszajSegmenty(a,t=>this.auraSegmentu(t)===1?1:0)}snieg(a){return this.mieszajSegmenty(a,t=>this.auraSegmentu(t)===2?1:0)}srodekSegmentu(a){return(this.granica(a)+this.granica(a+1))/2}wagi(a,t=new Float32Array(F)){t.fill(0);const i=this.segment(a),e=this.granica(i),o=this.granica(i+1),s=this.krainaSegmentu(i);if(a>o-D){const n=la(o-D,o+D,a);t[s]+=1-n,t[this.krainaSegmentu(i+1)]+=n}else if(a<e+D){const n=la(e-D,e+D,a);t[this.krainaSegmentu(i-1)]+=1-n,t[s]+=n}else t[s]=1;return t}krainaW(a){return this.krainaSegmentu(this.segment(a))}mieszaj(a,t,i=[0,0,0]){const e=this.wagi(a,this._w2);i[0]=i[1]=i[2]=0;for(let o=0;o<F;o++)if(e[o]>0){const s=N[o][t];i[0]+=s[0]*e[o],i[1]+=s[1]*e[o],i[2]+=s[2]*e[o]}return i}mieszajLiczbe(a,t){const i=this.wagi(a,this._w2);let e=0;for(let o=0;o<F;o++)i[o]>0&&(e+=i[o]*t(N[o],o));return e}teleporty(){const a=[];for(let t=0;a.length<F&&t<40;t++){const i=this.krainaSegmentu(t);a.some(e=>e.kraina===i)||a.push({nazwa:N[i].id,kraina:i,x:this.srodekSegmentu(t),segment:t})}return a.sort((t,i)=>t.kraina-i.kraina)}_terenKrainy(a,t){const i=N[a].teren,e=this.ziarno,o=K(t*.021,e+3,3);switch(a){case 1:{const s=K(t*.05,e+31,3);return i.baza+i.amp*(s-.5)*2.1+.12*(K(t*.4,e+32,2)-.5)}case 2:{const s=K(t*.35,e+41,2);return i.baza+i.amp*(o-.5)*2+i.drobne*Math.abs(s-.5)*2}case 3:{const s=i.baza+i.amp*(o-.5)*2*1.6,n=.55,c=s/n,h=Math.floor(c),l=c-h;return(h+la(.35,.65,l))*n+.05*(K(t*.6,e+51,2)-.5)}case 4:{const s=K(t*.032,e+61,2);return i.baza+i.amp*(s-.5)*2+.25*Math.sin(t*.21+6*s)}case 5:{const s=K(t*.045,e+81,2);return i.baza+i.amp*Math.pow(1-Math.abs(2*s-1),1.3)*1.3+i.drobne*(K(t*.4,e+82,2)-.5)}default:return i.baza+i.amp*(o-.5)*2+i.drobne*(K(t*.23,e+21,3)-.5)*2}}ziemia(a){const t=this.wagi(a,this._w);let i=0;for(let e=0;e<F;e++)t[e]>0&&(i+=t[e]*this._terenKrainy(e,a));return i}sufit(a){const t=this.wagi(a,this._w)[0];return t<.02?1e4:N[0].teren.sufit+1.1*(K(a*.11,this.ziarno+71,3)-.5)+(1-t)*9}granicaLotu(a){return Math.min(15.3,this.sufit(a)-.5)}terenWarstwy(a,t){if(a===aa)return this.ziemia(t);const i=q[a],e=t/i.mnoznikX,o=t/i.z,s=this.ziarno+100*(a+1),n=this.wagi(e,this._w),c=a===0?1.7:a===1?1.25:1;let h=0;if(n[0]>0&&(h+=n[0]*(1.5*K(o*.06,s,3)+.3*K(o*.3,s+1,2))),n[1]>0&&(h+=n[1]*(.35*K(o*.07,s+2,2)+.2)),n[2]>0){const l=K(o*.11,s+3,3);h+=n[2]*(2.3*(1-Math.abs(2*l-1))*c+.5*K(o*.5,s+4,2))}if(n[3]>0){const l=K(o*.05,s+5,2)*3;h+=n[3]*((Math.floor(l)+la(.4,.6,l-Math.floor(l)))*.55+.2)}if(n[4]>0&&(h+=n[4]*(1.9*K(o*.045,s+6,2)*c+.25*Math.sin(o*.3))),n[5]>0){const l=K(o*.16,s+7,3),u=K(o*.55,s+8,2);h+=n[5]*(2.6*Math.pow(1-Math.abs(2*l-1),1.6)*c+.9*(1-Math.abs(2*u-1)))}return i.bliska&&(h=h*.6-.5),h*i.z}sufitWarstwy(a,t){if(a===aa)return this.sufit(t);const i=q[a];if(a<2||i.bliska)return 1e4;const e=this.wagi(t/i.mnoznikX,this._w)[0];return e<.02?1e4:i.A+i.z*(a===2?3.4:4.3)+i.z*(1.4*(K(t/i.z*.1,this.ziarno+80+a,3)-.5)+(1-e)*9)}rekwizyty(a,t){const i=a*1e6+t+5e5;let e=this._komorki.get(i);return e||(this._komorki.size>600&&this._komorki.clear(),e=Ke(this,a,t),this._komorki.set(i,e)),e}rekwizytyW(a,t,i){const e=q[a],o=e.komorka*e.z,s=9*e.z,n=[];for(let c=Math.floor((t-s)/o);c<=Math.floor((i+s)/o);c++)for(const h of this.rekwizyty(a,c))h.x+h.ox>t&&h.x-h.ox<i&&n.push(h);return n.sort((c,h)=>c.kolejnosc-h.kolejnosc),n}_bryly(a){const t=q[aa],i=Math.floor(a/t.komorka),e=this._tmpBryly||(this._tmpBryly=[]);e.length=0;for(let o=i-1;o<=i+1;o++)for(const s of this.rekwizyty(aa,o))s.bryla&&e.push(s.bryla);return e}odleglosc(a,t){let i=Math.min(t-this.ziemia(a),this.granicaLotu(a)-t);for(const e of this._bryly(a)){const o=Math.abs(a-e.x)-e.rx,s=Math.abs(t-e.y)-e.ry,n=Math.hypot(Math.max(o,0),Math.max(s,0))+Math.min(Math.max(o,s),0)-e.r;n<i&&(i=n)}return i}_normalna(a,t){const e=this.odleglosc(a+.06,t)-this.odleglosc(a-.06,t),o=this.odleglosc(a,t+.06)-this.odleglosc(a,t-.06),s=Math.hypot(e,o)||1;return[e/s,o/s]}odpychanie(a,t,i){const e=this.odleglosc(a,t)-i,o=.75;if(e>=o)return xi;const s=this._normalna(a,t),n=10*(1-Math.max(0,e)/o)**2;return[s[0]*n,s[1]*n]}zderzenie(a,t,i){const e=this.odleglosc(a,t)-i;if(e>=0)return null;const o=this._normalna(a,t);return{nx:o[0],ny:o[1],gl:-e}}woda(a){return this.ziemia(a)<rt}}const xi=[0,0],ft=["wszystko","tlo","swiat","swiatlo","glow","maska"],Si=204,Mi=340,_i=280,Pi=460;class Ai{constructor(a,t){this.gl=a,this.swiat=t,this.szum=Ht(a),this.warstwa="wszystko",this.jakosc={tlo:.5,swiatlo:.5,ziarno:.028,drobinki:1,flora:!0},this.ziarno=.028;const i=qt(a);this.bTlo=new ia(a,4,4,i),this.bSwiat=new ia(a,4,4,i),this.bSwiatlo=new ia(a,4,4,i),this.bSurowe=new ia(a,4,4,i),this.bGlow=[new ia(a,4,4,i),new ia(a,4,4,i),new ia(a,4,4,i)],this.bGlowWy=new ia(a,4,4,i),this.pNiebo=new T(a,Q,oe,"niebo"),this.pWarstwa=new T(a,Q,se,"warstwa"),this.pBliska=new T(a,Q,ne,"warstwa-bliska"),this.pGra=new T(a,Q,re,"plan-gry"),this.pDrobinki=new T(a,ue,he,"drobinki"),this.pKopia=new T(a,Q,Jt,"kopia"),this.pDol=new T(a,Q,Qt,"rozmyj-dol"),this.pGora=new T(a,Q,ae,"rozmyj-gora"),this.pFinal=new T(a,Q,te,"final"),this.pOlbrzym=new T(a,Q,fe,"olbrzym"),this.pPyl=new T(a,ze,pe,"pyl"),this.pOpad=new T(a,de,ke,"opad"),this.iskierka=new xe(a),this.wypiek=new Fe(a,this.szum,t),this.flora=new De(a,t),this.szklo=new Je(a,this.szum),this.obiekty=new oi(a,this.szum),this.zarosla=new ci(a),this.zjawiska=new vi(a,this.szum),this.bez={},this.w=0,this.h=0,this.atm={mglaL:[0,0,0],mglaP:[0,0,0],mgla:[0,0,0],mgla2:[0,0,0],gora:[0,0,0],dol:[0,0,0],barwaSw:[0,0,0],emis:[0,0,0],niebo:[0,0,0,0],zjawiska:[0,0],burza:[0,0,0,0],blysk:0,deszcz:0,snieg:0,dzien:0,gestoscMgly:0,cialo:[0,0],poswiata:0,swNieba:[0,1,0],pogoda:[0,0,1,0],gruntY:[0,0],woda:[rt,0,0],wL:new Float32Array(F),wP:new Float32Array(F)},this._camL=[0,0]}rozmiar(a,t){this.w=a,this.h=t;const i=this.jakosc;this.bTlo.rozmiar(a*i.tlo,t*i.tlo),this.bSwiat.rozmiar(a,t),this.bSwiatlo.rozmiar(a*i.swiatlo,t*i.swiatlo),this.bSurowe.rozmiar(a*i.swiatlo,t*i.swiatlo);let e=a*i.swiatlo,o=t*i.swiatlo;for(const s of this.bGlow)e/=2,o/=2,s.rozmiar(e,o);this.bGlowWy.rozmiar(a*i.swiatlo*.5,t*i.swiatlo*.5)}miniatura(a,t){return this.obiekty.miniatura(a,t)}_atmosfera(a){const t=this.atm,i=this.swiat,e=a.cam.x;i.mieszaj(e-a.polX,"mgla",t.mglaL),i.mieszaj(e+a.polX,"mgla",t.mglaP),i.mieszaj(e,"mgla",t.mgla),i.mieszaj(e,"mgla2",t.mgla2),i.mieszaj(e,"nieboGora",t.gora),i.mieszaj(e,"nieboDol",t.dol),i.mieszaj(e,"emis",t.emis);for(let d=0;d<3;d++)t.barwaSw[d]=t.mgla[d]*.68+.34;const o=d=>i.mieszajLiczbe(e,A=>A.niebo[d]);t.niebo[0]=o("tarcza"),t.niebo[1]=o("obrecz"),t.niebo[2]=o("zorza"),t.niebo[3]=o("gwiazdy"),t.poswiata=o("poswiata");const s=o("snopy");t.pogoda[0]=i.mieszajLiczbe(e,d=>d.wiatr),t.pogoda[1]=s,t.pogoda[2]=i.mieszajLiczbe(e,d=>d.mglistosc);const n=a.polX/a.polY,c=d=>Math.max(-n*.8,Math.min(n*.8,(i.srodekSegmentu(d)-e)*.011+n*.28)),h=i.segment(e),l=i.granica(h),u=i.granica(h+1);if(e>u-D){const d=la(u-D,u+D,e);t.cialo[0]=c(h)*(1-d)+c(h+1)*d}else if(e<l+D){const d=la(l-D,l+D,e);t.cialo[0]=c(h-1)*(1-d)+c(h)*d}else t.cialo[0]=c(h);t.cialo[1]=.4-(a.cam.y-5.3)*.012;const f=t.niebo[0]+t.niebo[1];let p=t.cialo[0]*f+.25*s,z=t.cialo[1]*f+1*s+.3;const m=Math.hypot(p,z)||1;t.swNieba[0]=p/m,t.swNieba[1]=z/m,t.swNieba[2]=Math.min(1,.35+f*.7+s*.3),t.gruntY[0]=i.ziemia(e-a.polX),t.gruntY[1]=i.ziemia(e+a.polX),i.wagi(e-a.polX,t.wL),i.wagi(e+a.polX,t.wP),t.woda[1]=t.wL[1],t.woda[2]=t.wP[1];const y=Math.max(0,Math.min(1,(a.iskra.zasieg-a.iskra.zasiegBazowy)/4.7)),k=a.pogoda,w=k?k.burza:0,v=k?k.blysk:0;t.otoczenie=.15+.85*Math.pow(y,.75);const b=t.dzien=a.dzien?a.dzien.w(e):0;t.otoczenie+=(1-t.otoczenie)*.45*b,t.deszcz=Math.max(i.deszcz(e),w*.9),t.snieg=i.snieg(e),t.pogoda[3]=Math.min(1,t.deszcz*.7+t.snieg);const x=t.otoczenie*(1-.35*w)+v*1.7;t.blysk=v,t.burza[0]=w,t.burza[1]=v,t.burza[2]=k?k.piorunX:0,t.burza[3]=k?k.piorunZiarno:0;for(let d=0;d<3;d++)t.mglaL[d]*=x,t.mglaP[d]*=x,t.mgla[d]*=x,t.mgla2[d]*=x,t.gora[d]*=x,t.dol[d]*=x;if(t.niebo[0]*=x,t.niebo[1]*=x,t.niebo[2]*=x,t.poswiata*=x,t.swNieba[2]*=x,b>0){t.niebo[3]+=.6*b,t.niebo[2]+=.5*b*(.5+.5*x),t.poswiata*=1+.7*b;for(let d=0;d<3;d++)t.dol[d]*=1+.9*b,t.mgla2[d]*=1+.35*b}const S=k?k.mgla:0,_=k?k.zacmienie:0;if(t.gestoscMgly=S,t.pogoda[2]*=1+2.4*S,t.zjawiska[0]=_,t.zjawiska[1]=.55*_*(t.wL[1]+t.wP[1])*.5,_>0){const d=1-.45*_*(t.wL[1]+t.wP[1])*.5;for(let A=0;A<3;A++)t.mglaL[A]*=d,t.mglaP[A]*=d,t.mgla[A]*=d,t.mgla2[A]*=d,t.dol[A]*=d;t.poswiata*=1-.6*_,t.swNieba[2]*=1-.5*_}return t}_widok(a,t){a.f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uRes",this.w,this.h).f("uCzas",t.czas).tex("uSzum",0,this.szum)}_warstwa(a,t,i,e){const o=q[t],s=this.wypiek.warstwy[t];mt(o,i.cam,this._camL),this._widok(a.uzyj(),i),a.tex("uKafle",1,s.bufor.tex[0]).tex("uKafle2",2,s.bufor.tex[1]).tex("uSwiatlo",3,this.bSwiatlo.tex[0]).f("uCamL",this._camL[0],this._camL[1]).f("uLz",o.z).f("uKafelPar",1/(Ie*o.szer),o.y0,1/o.wys).f("uMglaL",...e.mglaL).f("uMglaP",...e.mglaP).f("uMgla2",...e.mgla2).f("uAtm",o.zamglenie+(.97-o.zamglenie)*.7*e.gestoscMgly*(o.gra?0:1),o.mgla*(1+1.3*e.gestoscMgly),o.otoczenie+e.blysk*(o.gra?5:3),o.iskra).f("uIskra",i.iskra.x,i.iskra.y,i.iskra.zasieg).f("uBarwaSw",...e.barwaSw).f("uEmis",.9,.9,.9).f("uPogoda",...e.pogoda).f("uSwNieba",...e.swNieba).f("uGruntY",...e.gruntY).f("uJasnosc",o.jasnosc).f("uSnieg",e.snieg),ta(this.gl)}rysuj(a){const t=this.gl;if(t.disable(t.BLEND),this.warstwa==="maska"){this._maska(a);return}const i=this._atmosfera(a);if(this.wypiek.zapewnij(a.cam,a.polX,a.iskra.vx),this.bTlo.ustaw(),this._widok(this.pNiebo.uzyj(),a),this.pNiebo.f("uGora",...i.gora).f("uDol",...i.dol).f("uMgla",...i.mgla).f("uMgla2",...i.mgla2).f("uNiebo",...i.niebo).f("uCialo",...i.cialo).f("uPoswiata",i.poswiata).f("uZjawiska",...i.zjawiska).f("uBurza",...i.burza),ta(t),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),a.olbrzym&&a.olbrzym.aktywny&&this._olbrzym(a,i),!this.bez.dalekie)for(let l=0;l<4;l++)this._warstwa(this.pWarstwa,l,a,i);t.disable(t.BLEND);const e=a.tecze?a.tecze.wachlarze:[],o=e.length>0;o&&(this.bSurowe.ustaw(),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),this.szklo.wachlarze(a,e),this.bSwiatlo.ustaw(),this.szklo.pNasycenie.uzyj().tex("uTex",0,this.bSurowe.tex[0]),ta(t)),(o||this._swiecilo)&&(o||(this.bSwiatlo.ustaw(),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)),this._poswiata()),this._swiecilo=o,a.znaleziska&&a.znaleziska.freski.length&&(this.bTlo.ustaw(),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),this.obiekty.freski(a,a.znaleziska,this.bSwiatlo.tex[0],this.bTlo.w,this.bTlo.h),t.disable(t.BLEND)),this.bSwiat.ustaw(),this.pGra.uzyj().tex("uTlo",4,this.bTlo.tex[0]).f("uWoda",...i.woda),this.bez.gra?(this.pKopia.uzyj().tex("uTex",0,this.bTlo.tex[0]),ta(t)):this._warstwa(this.pGra,aa,a,i),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),a.stworzenia&&a.stworzenia.widoczne.length&&this.zjawiska.stworzenia(a,a.stworzenia.widoczne,this.bSwiatlo.tex[0],this.w,this.h),this.jakosc.flora&&!this.bez.flora&&this.flora.rysuj(a,i,this.bSwiatlo.tex[0],this.w,this.h),a.zarosla&&!this.bez.zarosla&&this.zarosla.rysuj(a,a.zarosla),a.odlamki&&this.szklo.odlamki(a,i,a.odlamki,this.bSwiatlo.tex[0],this.w,this.h),a.prady&&!this.bez.prady&&this.zjawiska.prady(a,i,a.prady,this.bSwiatlo.tex[0],this.w,this.h),a.znaleziska&&this.obiekty.reszta(a,i,a.znaleziska,this.bSwiatlo.tex[0],this.w,this.h);const s=this.bez.drobinki?0:Math.round(Si*this.jakosc.drobinki);s>0&&(this.pDrobinki.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).fv("uWL",1,i.wL).fv("uWP",1,i.wP).f("uWoda",rt).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).f("uEmis",...i.emis).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),t.drawArrays(t.POINTS,0,s));const n=a.pogoda?a.pogoda.pyl:0;if(n>.01&&!this.bez.drobinki&&(this.pPyl.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uSila",n).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),t.drawArrays(t.POINTS,0,Math.round(Pi*Math.max(.35,this.jakosc.drobinki)))),(i.deszcz>.01||i.snieg>.01)&&!this.bez.drobinki&&!this.bez.opad){const l=Math.max(.4,this.jakosc.drobinki);this.pOpad.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),t.blendFunc(t.ONE,t.ONE),i.deszcz>.01&&(this.pOpad.f("uRodzaj",0).f("uSila",i.deszcz),t.drawArrays(t.POINTS,0,Math.round(Mi*l))),i.snieg>.01&&(this.pOpad.f("uRodzaj",1).f("uSila",i.snieg),t.drawArrays(t.POINTS,0,Math.round(_i*l))),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA)}a.mgly&&!this.bez.mgly&&this.zjawiska.mglawice(a,i,a.mgly,this.bSwiatlo.tex[0],this.w,this.h),a.mgla=i.mgla,this.bez.iskra||this.iskierka.rysuj(a),this.bez.bliska||this._warstwa(this.pBliska,5,a,i),t.disable(t.BLEND),kt(t,this.w,this.h);const c=ft.indexOf(this.warstwa),h=c===1?this.bTlo.tex[0]:c===3?this.bSwiatlo.tex[0]:this.bSwiat.tex[0];this.pFinal.uzyj().tex("uSwiat",0,h).tex("uGlow",1,this.bGlowWy.tex[0]).tex("uSzum",2,this.szum).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uTryb",c===4?3:c===0?0:1).f("uZiarno",this.ziarno),ta(t)}_olbrzym(a,t){const i=q[0],e=a.olbrzym;mt(i,a.cam,this._camL),!(Math.abs(e.x-this._camL[0])>a.polX*i.z+e.wys*.8)&&(this._widok(this.pOlbrzym.uzyj(),a),this.pOlbrzym.f("uCamL",this._camL[0],this._camL[1]).f("uLz",i.z).f("uOlbrzym",e.x,ea.ziemia,e.wys,e.faza).f("uKier",e.kier).f("uMgla",...t.mgla).f("uMgla2",...t.mgla2),ta(this.gl))}pomiar(a,t=40){const i=this.gl,e=new Uint8Array(4);this.rysuj(a),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,e);const o=performance.now();for(let s=0;s<t;s++)a.czas+=.016,this.rysuj(a);return i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,e),(performance.now()-o)/t}_maska(a){const t=this.gl;kt(t,this.w,this.h),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),a.mgla=this.atm.mgla,this.iskierka.rysuj(a,!0)}_poswiata(){const a=this.gl;let t=this.bSwiatlo;this.pDol.uzyj();for(const i of this.bGlow)i.ustaw(),this.pDol.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),ta(a),t=i;this.pGora.uzyj();for(let i=this.bGlow.length-2;i>=0;i--){const e=this.bGlow[i];e.ustaw(),this.pGora.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),ta(a),t=e}this.bGlowWy.ustaw(),this.pGora.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),ta(a)}}const Qa={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,1],w:[0,1],arrowdown:[0,-1],s:[0,-1]};class ji{constructor(a){this.canvas=a,this.wcisniete=new Set,this.wskaznik=null,this.poruszono=!1,this.naPierwszyRuch=null;const t=()=>{this.poruszono||(this.poruszono=!0,this.naPierwszyRuch?.())};addEventListener("keydown",e=>{const o=e.key.toLowerCase();Qa[o]&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(this.wcisniete.add(o),e.preventDefault(),t())}),addEventListener("keyup",e=>this.wcisniete.delete(e.key.toLowerCase())),addEventListener("blur",()=>{this.wcisniete.clear(),this.wskaznik=null}),a.addEventListener("pointerdown",e=>{this.wskaznik={x:e.clientX,y:e.clientY};try{a.setPointerCapture(e.pointerId)}catch{}t()}),a.addEventListener("pointermove",e=>{this.wskaznik&&(this.wskaznik.x=e.clientX,this.wskaznik.y=e.clientY)});const i=()=>{this.wskaznik=null};a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),a.addEventListener("contextmenu",e=>e.preventDefault())}odczyt(a){let t=0,i=0;for(const s of this.wcisniete)t+=Qa[s][0],i+=Qa[s][1];const e=Math.hypot(t,i);e>1&&(t/=e,i/=e);let o=null;if(this.wskaznik){const s=this.canvas.getBoundingClientRect(),n=(this.wskaznik.x-s.left)/s.width*2-1,c=1-(this.wskaznik.y-s.top)/s.height*2;o=[a.cam.x+n*a.polX,a.cam.y+c*a.polY]}return{cel:o,os:[t,i]}}}function Li(r){const a=document.createElement("div");a.className="dev",a.innerHTML=`<div id="dev-stan"></div>
    <div class="rzad" id="dev-warstwy"></div>
    <div class="rzad" id="dev-tele"></div>
    <div class="rzad"><button id="dev-ziarno">nowe ziarno</button><button id="dev-pauza">pauza</button></div>
    <div class="rzad" id="dev-zjawiska"></div>`,document.getElementById("nakladka").appendChild(a);const t=a.querySelector("#dev-stan"),i=a.querySelector("#dev-warstwy");for(const n of ft){const c=document.createElement("button");c.textContent=n,c.dataset.w=n,c.onclick=()=>{r.renderer.warstwa=n,_a("warstwa",n==="wszystko"?null:n),s()},i.appendChild(c)}const e=a.querySelector("#dev-tele");for(const n of r.teleporty()){const c=document.createElement("button");c.textContent=n.nazwa,c.onclick=()=>r.teleport(n.x),e.appendChild(c)}const o=a.querySelector("#dev-zjawiska");for(const[n,c]of[["olbrzym",()=>r.wywolajOlbrzyma(1,20)],["pył",()=>r.pogoda.wywolaj("pyl")],["mgła",()=>r.pogoda.wywolaj("mgla")],["zaćmienie",()=>r.pogoda.wywolaj("zacmienie")],["burza",()=>r.pogoda.wywolaj("burza")],["koniec pogody",()=>r.pogoda.zakoncz()]]){const h=document.createElement("button");h.textContent=n,h.onclick=c,o.appendChild(h)}a.querySelector("#dev-ziarno").onclick=()=>{_a("ziarno",Math.floor(Math.random()*1e6)),location.reload()},a.querySelector("#dev-pauza").onclick=()=>{r.petla.pauza=!r.petla.pauza};function s(){for(const n of i.children)n.classList.toggle("wl",n.dataset.w===r.renderer.warstwa)}return s(),setInterval(()=>{const n=r.petla,c=r.renderer,h=r.stan;t.innerHTML=`<b>${n.fps.toFixed(0)} kl./s</b> · ${n.msKlatki.toFixed(1)} ms · ${c.w}×${c.h}<br>ziarno ${r.ziarno} · x ${h.iskra.x.toFixed(1)} y ${h.iskra.y.toFixed(1)} · ${r.opisJakosci()}`},250),a}const Ri=1.44,Ei=1.66,Ti=.54,Bi=1.4,at=13,Ci=.2,Ki=28,Oi=16,Fi=3,Sa=new Float32Array(Aa*2);function Ii(r,a,t,i,e,o,s){let n=!1,c=0;for(let h=0;h<5;h++){let l=1e9,u=0,f=0,p=-1;for(let x=0;x<r;x++){const S=(x+1)%r,_=Sa[x*2],d=Sa[x*2+1],A=Sa[S*2]-_,j=Sa[S*2+1]-d,R=i*j-e*A;if(Math.abs(R)<1e-9)continue;const oa=_-a,W=d-t,X=(oa*j-W*A)/R,V=(oa*e-W*i)/R;X>1e-4&&V>=0&&V<=1&&X<l&&(l=X,u=A,f=j,p=x)}if(p<0)return null;a+=i*l,t+=e*l;let z=f,m=-u;const y=Math.hypot(z,m);z/=y,m/=y;let k=-(i*z+e*m);k<0&&(z=-z,m=-m,k=-k);const w=n?o:1/o,v=1-w*w*(1-k*k);if(v<0)i+=2*k*z,e+=2*k*m,c++;else{const x=Math.sqrt(v);if(i=w*i+(w*k-x)*z,e=w*e+(w*k-x)*m,n=!n,!n){const S=Math.hypot(i,e);return s[0]=a,s[1]=t,s[2]=i/S,s[3]=e/S,s[4]=p,s[5]=c,s}}const b=Math.hypot(i,e);i/=b,e/=b}return null}const Di=[0,0,0,0,0,0],Ia=(r,a)=>{let t=r-a;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t},tt=r=>r-Math.floor(r),ha=[];for(let r=0;r<Aa;r++)ha.push({wr:0,rx:0,ry:0,wf:0,fx:0,fy:0,px:0,py:0,ile:0,waga:0,kat:0,dk:0,ox:0,oy:0,szer:0});function Mt(r,a,t){const i=r.v.length,e=Math.hypot(a,t),o=-a/e,s=-t/e,n=1.9*r.zasieg/at;ht.wierzcholki(r,Sa);for(let l=0;l<i;l++){const u=ha[l];u.wr=u.rx=u.ry=u.wf=u.fx=u.fy=u.px=u.py=u.ile=u.waga=0}let c=0,h=0;for(let l=0;l<at;l++){const u=((l+.5)/at*2-1)*r.zasieg*.95;let f=-s*u-a,p=o*u-t;const z=Math.hypot(f,p);f/=z,p/=z;let m=!1;for(let y=0;y<2;y++){const k=Ii(i,a,t,f,p,y?Ei:Ri,Di);if(!k||(m=!0,k[5]>2||k[2]*o+k[3]*s<Ci))continue;const w=k[5]===0?1:k[5]===1?.5:.25,v=ha[k[4]];y?(v.wf+=w,v.fx+=k[2]*w,v.fy+=k[3]*w):(v.wr+=w,v.rx+=k[2]*w,v.ry+=k[3]*w),v.px+=k[0]*w,v.py+=k[1]*w,v.ile++}m&&c++}for(let l=0;l<i;l++){const u=ha[l];if(u.wr<=0||u.wf<=0){u.waga=0;continue}const f=Math.atan2(u.ry,u.rx);u.dk=Ia(Math.atan2(u.fy,u.fx),f),u.kat=f+u.dk/2,u.ox=u.px/(u.wr+u.wf),u.oy=u.py/(u.wr+u.wf),u.waga=(u.wr+u.wf)/(2*Math.max(1,c)),u.szer=u.ile*.5*n,u.waga>h&&(h=u.waga)}return h}function _t(r,a,t,i,e,o){const s=tt(a.faza*7.31+t*.37),n=tt(a.faza*3.17+t*.61),c=tt(a.faza*5.71+t*.23),h=Math.abs(r.dk);return o.rozw=Math.max(.27,Math.min(Bi,(Ti+.72*(1-Math.exp(-h*4)))*(.9+.22*s)*(.3+1*e))),o.start=Math.min(1,Math.max(.2,r.szer*.8/Math.tan(o.rozw/2))),o.dlugosc=Math.min(5.2,i*(.52+.45*Math.sqrt(r.waga))*(.85+.3*n)*(.4+.85*e)),o.skos=(c*2-1)*.55,o.znak=(r.dk>=0?1:-1)*Math.min(1,h/.035),o}function ct(r,a,t,i=0){const e=Math.abs(r),o=a-i;if(e>=1||o<=0)return 0;const s=(e-.6)/.4,n=e<.6?1:1-s*s*(3-2*s),c=o/t,h=Math.min(1,o/.4);return n*h*h*(3-2*h)*Math.exp(-c*c*2.4)}const C={};class Ni{constructor(){this.wachlarze=[],this._pula=[],this.spiewajace=[],this._klatka=0}aktualizuj(a,t,i){const e=this.wachlarze;e.length=0;const o=1.6+t.zasieg*1.25,s=1.7+t.zasieg*.62,n=1-Math.exp(-a*9),c=1-Math.exp(-a*5);let h=0;const l=()=>(this._pula[h]||(this._pula[h]={}),this._pula[h++]);for(const p of i){const z=p.px-t.x,m=p.py-t.y,y=Math.hypot(z,m);let k=0;y<o&&y>p.zasieg*.6&&(k=Math.pow(1-y/o,1.15));const w=p.oswietlenie;if(p.oswietlenie+=(k-p.oswietlenie)*c,w<.15&&p.oswietlenie>=.15&&this.naSzklo?.(p),p.oswietlenie<.01||y<.001){p.wachlarz=null;continue}const v=p.v.length;let b=p.wachlarz;if(!b){b=p.wachlarz=[];for(let S=0;S<v;S++)b.push({sila:0,kat:0,ox:0,oy:0,rozw:0,start:0,dlugosc:0,skos:0,znak:0})}const x=k>0?Mt(p,-z,-m):0;for(let S=0;S<v;S++){const _=ha[S],d=b[S],A=x>0?_.waga/x:0;if(A<.4)d.sila+=(0-d.sila)*c;else{_t(_,p,S,s,k,C);const oa=_.ox-Math.cos(_.kat)*C.start,W=_.oy-Math.sin(_.kat)*C.start;d.sila<.02?(d.kat=_.kat,d.ox=oa,d.oy=W,d.rozw=C.rozw,d.start=C.start,d.dlugosc=C.dlugosc,d.znak=C.znak):(d.kat+=Ia(_.kat,d.kat)*n,d.ox+=(oa-d.ox)*n,d.oy+=(W-d.oy)*n,d.rozw+=(C.rozw-d.rozw)*n,d.start+=(C.start-d.start)*n,d.dlugosc+=(C.dlugosc-d.dlugosc)*n,d.znak+=(C.znak-d.znak)*n),d.skos=C.skos,d.sila+=(Math.pow(A,1.5)-d.sila)*c}const j=d.sila*p.oswietlenie*Math.min(1,Math.abs(d.znak)*1.6);if(j<.02||e.length>=Oi)continue;const R=l();R.x=p.px+d.ox,R.y=p.py+d.oy,R.kat=d.kat,R.rozwarcie=d.rozw,R.dlugosc=d.dlugosc,R.start=d.start,R.skos=d.skos,R.sila=j,R.znak=d.znak>=0?1:-1,R.zi=p.faza+S*1.7,R.zrodlo=p,R.wtorny=!1,R.glebia=0,e.push(R)}}const u=++this._klatka,f=this.spiewajace;f.length=0;for(let p=0;p<e.length;p++){const z=e[p];if(z.glebia>=Fi)continue;const m=z.glebia===0?.75:.85,y=z.glebia===0?.12:.09;for(const k of i){if(k===z.zrodlo)continue;const w=k.px-z.x,v=k.py-z.y,b=Math.hypot(w,v);if(b>z.start+z.dlugosc*.95||b<z.start+.4)continue;const x=Ia(Math.atan2(v,w),z.kat)/(z.rozwarcie/2),S=ct(x,b,z.dlugosc,z.start)*z.sila*m;if(S<.05||(k._spiewKl!==u?(k._spiewKl=u,k.spiew=S,f.push(k)):S>k.spiew&&(k.spiew=S),S<y||k._ogniwoKl===u||e.length>=Ki)||Mt(k,-w,-v)<=0)continue;let d=0;for(let R=1;R<k.v.length;R++)ha[R].waga>ha[d].waga&&(d=R);const A=ha[d];if(_t(A,k,d+3,z.dlugosc*.9,Math.min(1,.35+S),C),Math.abs(C.znak)<.6)continue;k._ogniwoKl!==u-1&&(k.silaOgniwa=0),k._ogniwoKl=u,k.silaOgniwa+=(S-k.silaOgniwa)*Math.min(1,c*2.5);const j=l();j.x=k.px+A.ox-Math.cos(A.kat)*C.start,j.y=k.py+A.oy-Math.sin(A.kat)*C.start,j.kat=A.kat,j.rozwarcie=C.rozw,j.dlugosc=C.dlugosc,j.start=C.start,j.skos=C.skos,j.sila=k.silaOgniwa,j.znak=C.znak>=0?1:-1,j.zi=k.faza+1,j.zrodlo=k,j.wtorny=!0,j.glebia=z.glebia+1,k.oswietlenie=Math.max(k.oswietlenie,k.silaOgniwa*.8),e.push(j)}}}natezenie(a,t,i=1){let e=0;for(const o of this.wachlarze){const s=a-o.x,n=t-o.y,c=Math.hypot(s,n);c>o.start+o.dlugosc*1.4*i||(e+=ct(Ia(Math.atan2(n,s),o.kat)/(o.rozwarcie/2*i),c,o.dlugosc*i,o.start/i)*o.sila)}return e}}const zt=6,Ta={wech:2.8,lgniecie:3.4,kradnie:.17},Wa=[{rodzaj:"Pióro",nazwy:["Pióro puszczyka","Pióro sójki","Pióro czapli","Pióro kruka","Pióro jastrzębia","Pióro bez ptaka"]},{rodzaj:"Klucz",nazwy:["Klucz od śluzy","Klucz przewoźnika","Klucz bez drzwi","Klucz z dna","Klucz latarnika","Klucz od niczego"]},{rodzaj:"Kwiat w krysztale",nazwy:["Kwiat pięciopłatkowy","Kwiat nocy","Kwiat szronu","Kwiat ośmiu płatków","Kwiat ciszy","Kwiat, który nie zwiądł"]},{rodzaj:"Znak w kamieniu",nazwy:["Znak bramy","Znak wody","Znak drogi","Znak snu","Znak strażnika","Znak zapomniany"]},{rodzaj:"Skamielina",nazwy:["Muszla mała","Muszla podwójna","Muszla żebrowana","Muszla wielka","Muszla ciasno zwinięta","Muszla sprzed światła"]},{rodzaj:"Dzwonek",nazwy:["Dzwonek przełęczy","Dzwonek pęknięty","Dzwonek mgły","Dzwonek z obręczą","Dzwonek wiatru","Dzwonek, którego nikt nie słyszał"]}],pt=["Fresk koron","Fresk księżyca nad wodą","Fresk kryształowego serca","Fresk procesji","Fresk czarnego słońca","Fresk morza chmur"];function Zi(r,a,t){const i=$(r.ziarno,7717,a),e=a*Z,o={drobinki:[],slady:[],fresk:Tt(r,a),cienie:[]};for(let c=0;c<3;c++){const h=e+(c+i())*Z/3,l=r.ziemia(h),u=Math.min(r.granicaLotu(h)-.8,l+8.5);o.drobinki.push({id:`d${a}:${c}`,x:h,y:l+.9+i()*Math.max(.5,u-l-.9),faza:i()*6.283})}const s=$(r.ziarno,4243,a),n=e>40?(s()<.62?1:0)+(s()<.38?1:0):0;for(let c=0;c<n;c++){const h=e+(c+.1+.8*s())*Z/2,l=r.ziemia(h),u=Math.min(r.granicaLotu(h)-.8,l+8.5),f=l+.9+s()*Math.max(.5,u-l-.9);o.cienie.push({id:`c${a}:${c}`,x:h,y:f,px:h,py:f,faza:s()*6.283,stan:0,zanik:0})}return t.forEach((c,h)=>{if(!c.polana&&!(i()>.42))for(let l=0;l<6;l++){const u=i()*6.283,f=1.5+i()*1.1,p=c.x+Math.cos(u)*f,z=c.y+Math.sin(u)*f*.85;if(z>r.ziemia(p)+.7&&z<r.granicaLotu(p)-.5){o.slady.push({id:`s${a}:${h}`,x:p,y:z,kraina:r.krainaW(p),wariant:Math.floor(i()*zt),faza:i()*6.283,odsloniecie:0});break}}}),o}class Wi{constructor(a,t,i){this.swiat=a,this.kolekcja=i,this.kawalki=new Map,this.zebrane=new Set,this.drobinki=[],this.slady=[],this.freski=[],this.efekty=[],this.cienie=[],this.cienieWlaczone=!0,this.przemienionych=0,this.zdarzenie=null,t.naNowyKawalek=(e,o)=>this.kawalki.set(e,Zi(a,e,o)),this._odlamki=t}krok(a,t,i,e){this.drobinki.length=0,this.slady.length=0,this.freski.length=0,this.cienie.length=0;for(const[o,s]of this.kawalki){if(!this._odlamki.kawalki.has(o)){this.kawalki.delete(o);continue}for(const c of s.drobinki){if(this.zebrane.has(c.id))continue;c.px=c.x+Math.sin(e*.7+c.faza)*.3,c.py=c.y+Math.cos(e*.9+c.faza)*.25;const h=Math.hypot(t.x-c.px,t.y-c.py);if(h<2.2&&h>.001){const l=(1-h/2.2)*2.4*a;c.x+=(t.x-c.px)*l,c.y+=(t.y-c.py)*l}if(h<.5){this.zebrane.add(c.id),t.energia=Math.min(1,t.energia+.17),t.tracnij(4),this.efekty.push({x:c.px,y:c.py,t:0,rodzaj:0}),this.zdarzenie?.("energia",c);continue}this.drobinki.push(c)}for(const c of s.slady){if(this.zebrane.has(c.id))continue;const h=i.natezenie(c.x,c.y,1.3),l=c.odsloniecie;if(c.odsloniecie=Math.max(0,Math.min(1,c.odsloniecie+(h>.05?a*(.9+h*2):-a*.015))),l<.6&&c.odsloniecie>=.6&&this.zdarzenie?.("odsloniecie",c),c.odsloniecie>=.6&&Math.hypot(t.x-c.x,t.y-c.y)<.75){this.zebrane.add(c.id);const u=this.kolekcja.dodajSlad(c.kraina,c.wariant);t.energia=Math.min(1,t.energia+.12),t.tracnij(3),this.efekty.push({x:c.x,y:c.y,t:0,rodzaj:1}),this.zdarzenie?.("slad",{...c,nowy:u});continue}c.odsloniecie>.005&&this.slady.push(c)}if(this.cienieWlaczone)for(const c of s.cienie)this.zebrane.has(c.id)||this._cien(c,a,t,i,e,s);const n=s.fresk;if(n){const c=this.swiat.ziarno+":"+n.id;if(!n.odkryty&&(this.zebrane.has(n.id)||this.kolekcja.jestZapalony(c))&&(n.odkryty=!0),!n.odkryty){let h=0;for(let l=-2;l<=2;l++)h+=i.natezenie(n.x+l*.9,n.y+l%2*.5,1.3);if(h/=5,n.odsloniecie=Math.max(0,Math.min(1,n.odsloniecie+(h>.06?a*(.12+h*.5):-a*.01))),n.odsloniecie>=1){n.odkryty=!0,n.tZaplonu=e,this.zebrane.add(n.id),this.kolekcja.zapalFresk(c);const l=this.kolekcja.dodajFresk(n.kraina);t.energia=1,this.efekty.push({x:n.x,y:n.y,t:0,rodzaj:2}),this.zdarzenie?.("fresk",{...n,nowy:l})}}this.freski.push(n)}}for(let o=this.efekty.length-1;o>=0;o--){const s=this.efekty[o];s.t+=a,s.t>1.6&&this.efekty.splice(o,1)}}dodajDrobinke(a,t){const i=this.kawalki.get(Math.floor(a/Z));return i?(i.drobinki.push({id:"x"+(this._nrDod=(this._nrDod||0)+1),x:a,y:t,px:a,py:t,faza:(a*7.3+t*3.1)%6.283}),!0):!1}_cien(a,t,i,e,o,s){if(a.zanik>0){if(a.zanik+=t*1.8,a.zanik>=1){this.zebrane.add(a.id);return}this.cienie.push(a);return}a.px=a.x+Math.sin(o*.7+a.faza)*.3,a.py=a.y+Math.cos(o*.9+a.faza)*.25;const n=Math.hypot(i.x-a.px,i.y-a.py);if(a.stan=n<Ta.wech?1:0,a.stan&&n>.001){const c=(1-n/Ta.wech)*Ta.lgniecie*t;a.x+=(i.x-a.px)*c,a.y+=(i.y-a.py)*c,a.y=Math.max(this.swiat.ziemia(a.x)+.4,Math.min(this.swiat.granicaLotu(a.x)-.3,a.y))}if(e.natezenie(a.px,a.py)>.22){this.zebrane.add(a.id),s.drobinki.push({id:"p"+a.id,x:a.x,y:a.y,px:a.px,py:a.py,faza:a.faza,zCienia:!0}),this.efekty.push({x:a.px,y:a.py,t:0,rodzaj:0}),this.przemienionych++,this.zdarzenie?.("cien-rozproszony",a);return}else n<.45&&(i.energia=Math.max(0,i.energia-Ta.kradnie),i.zasieg=Math.max(i.zasiegBazowy,i.zasieg-.3),i.vx*=.7,i.vy*=.7,i.tracnij(-4),a.zanik=.01,this.zdarzenie?.("cien",a));this.cienie.push(a)}}const Pt="iskierka-kolekcja-v1",At=800;class Gi{constructor(a=qi()){this.pamiec=a,this.slady={},this.freski={},this.zapalone={},this.szklo={},this.ogrody={};try{const t=JSON.parse(a?.getItem(Pt)||"null");t&&typeof t=="object"&&(this.slady=t.slady||{},this.freski=t.freski||{},this.zapalone=t.zapalone||{},this.szklo=t.szklo||{},this.ogrody=t.ogrody||{})}catch{}this.naZmiane=null}_zapisz(a=!1){try{this.pamiec?.setItem(Pt,JSON.stringify({slady:this.slady,freski:this.freski,zapalone:this.zapalone,szklo:this.szklo,ogrody:this.ogrody}))}catch{}a||this.naZmiane?.()}dodajSlad(a,t){const i=`${a}-${t}`,e=!this.slady[i];return this.slady[i]=(this.slady[i]||0)+1,this._zapisz(),e}dodajFresk(a){const t=!this.freski[a];return this.freski[a]=!0,this._zapisz(),t}zapalFresk(a){this.zapalone[a]=!0,this._zapisz()}jestZapalony(a){return!!this.zapalone[a]}zapalSzklo(a){this.szklo[a]=1;const t=Object.keys(this.szklo);if(t.length>At)for(const i of t.slice(0,t.length-At))delete this.szklo[i];this._zapisz(!0)}jestSzklo(a){return!!this.szklo[a]}ileSzkla(){return Object.keys(this.szklo).length}ogrod(a){return this.ogrody[a]||[]}zapiszOgrod(a,t){this.ogrody={[a]:t},this._zapisz(!0)}maSlad(a,t){return!!this.slady[`${a}-${t}`]}maFresk(a){return!!this.freski[a]}ileSladow(){return Object.keys(this.slady).length}ileFreskow(){return Object.keys(this.freski).length}wszystkichSladow(){return Wa.length*zt}wszystkichFreskow(){return pt.length}wyczysc(){this.slady={},this.freski={},this.zapalone={},this._zapisz()}}function qi(){try{return window.localStorage}catch{return null}}class Yi{constructor(a){this.kolekcja=a;const t=this.el=document.createElement("div");t.className="hud",t.innerHTML=`<div class="hud-prawy"><span class="hud-slady" id="hud-slady"></span>
      <div class="hud-energia" role="img" aria-label="Energia"><i id="hud-en"></i></div></div>
      <div class="hud-kraina" id="hud-kraina"></div><div class="hud-wiesc" id="hud-wiesc" role="status" aria-live="polite"></div>`,document.getElementById("nakladka").appendChild(t),this.slady=t.querySelector("#hud-slady"),this.en=t.querySelector("#hud-en"),this.krainaEl=t.querySelector("#hud-kraina"),this.wiescEl=t.querySelector("#hud-wiesc"),this.kraina=-1,this._enPoprz=-1,this.odswiez()}odswiez(){this.slady.textContent=`ślady ${this.kolekcja.ileSladow()} / ${this.kolekcja.wszystkichSladow()}`}energia(a){const t=Math.round(a*100);t!==this._enPoprz&&(this._enPoprz=t,this.en.style.width=t+"%")}ustawKraine(a,t=0){if(a===this.kraina&&t===this.aura)return;const i=this.kraina<0;this.kraina=a,this.aura=t,clearTimeout(this._tk),this.krainaEl.classList.remove("widac"),this._tk=setTimeout(()=>{this.krainaEl.textContent=N[a].nazwa+(t===1?" w deszczu":t===2?" pod śniegiem":""),this.krainaEl.classList.add("widac"),this._tk=setTimeout(()=>this.krainaEl.classList.remove("widac"),5e3)},i?300:900)}wiesc(a){clearTimeout(this._tw),this.wiescEl.textContent=a,this.wiescEl.classList.add("widac"),this._tw=setTimeout(()=>this.wiescEl.classList.remove("widac"),4200)}}const Ba=[{akord:[146.83,220,369.99,659.25],filtr:1e3,wiatr:0,wiatrHz:1800,skala:[293.66,369.99,440,554.37,659.25]},{akord:[69.3,103.83,164.81,246.94],filtr:480,wiatr:.16,wiatrHz:300,skala:[277.18,329.63,415.3,493.88,554.37]},{akord:[110,164.81,277.18,493.88],filtr:1100,wiatr:.03,wiatrHz:2400,skala:[440,554.37,659.25,830.61,987.77]},{akord:[98,146.83,196,220],filtr:700,wiatr:.08,wiatrHz:700,skala:[392,440,587.33,659.25,783.99]},{akord:[61.74,92.5,130.81,185],filtr:420,wiatr:.3,wiatrHz:900,skala:[246.94,277.18,369.99,415.3,493.88]},{akord:[87.31,130.81,196,329.63],filtr:900,wiatr:.22,wiatrHz:1500,skala:[349.23,392,440,523.25,659.25]}],Xi=[.85,.9,1,.85,.65,.8],Vi=6;function Ca(r,a){const t=[...a,...a.map(e=>e*2)].sort((e,o)=>e-o),i=Math.max(0,Math.min(.999,(.85-r.zasieg)/.7));return t[Math.floor(i*t.length)]}class Ui{constructor(){this.glosy=[];for(let a=0;a<Vi;a++)this.glosy.push({o:null,hz:0,sila:0});this.spiewa=0,this._doSpiewu=0,this._ostKielek=0,this._ostPyl=0,this.ac=null,this.wlaczony=!1,this.wagi=new Float32Array(F),this.licznik={szklo:0,energia:0,odsloniecie:0,slad:0,fresk:0,zapalenie:0,kielek:0,"krok-olbrzyma":0,pyl:0,pogoda:0,grzmot:0,kropla:0,stworzenie:0,dzien:0},this._ostSzklo=0,this._doAktualizacji=0,this.glosnosc=.75}get dostepny(){return typeof(window.AudioContext||window.webkitAudioContext)=="function"}_zbuduj(){const a=window.AudioContext||window.webkitAudioContext,t=this.ac=new a;this.wyjscie=t.createGain(),this.wyjscie.gain.value=0,this.analizator=t.createAnalyser(),this.analizator.fftSize=1024;const i=t.createDynamicsCompressor();i.threshold.value=-20,i.knee.value=12,i.ratio.value=6,i.attack.value=.01,i.release.value=.4,this.wyjscie.connect(i),i.connect(this.analizator),this.analizator.connect(t.destination),this.poglos=t.createGain(),this.poglos.gain.value=.3;for(const[c,h]of[[.37,.52],[.53,.46]]){const l=t.createDelay(1.5);l.delayTime.value=c;const u=t.createBiquadFilter();u.type="lowpass",u.frequency.value=1900;const f=t.createGain();f.gain.value=h,this.poglos.connect(l),l.connect(u),u.connect(f),f.connect(l),u.connect(this.wyjscie)}const e=t.sampleRate*3,o=t.createBuffer(1,e,t.sampleRate),s=o.getChannelData(0);let n=0;for(let c=0;c<e;c++)n=n*.97+(Math.random()*2-1)*.03,s[c]=n*6;this.szum=t.createBufferSource(),this.szum.buffer=o,this.szum.loop=!0,this.szum.start();for(const c of this.glosy){c.osc=t.createOscillator(),c.osc.type="sine",c.osc.frequency.value=440,c.osc2=t.createOscillator(),c.osc2.type="sine",c.osc2.frequency.value=880;const h=t.createGain();h.gain.value=.14,c.wzm=t.createGain(),c.wzm.gain.value=0;const l=t.createOscillator();l.frequency.value=3.1+this.glosy.indexOf(c)*.47;const u=t.createGain();u.gain.value=1.6,l.connect(u),u.connect(c.osc.frequency),l.start(),c.osc.connect(c.wzm),c.osc2.connect(h),h.connect(c.wzm),c.wzm.connect(this.wyjscie),c.wzm.connect(this.poglos),c.osc.start(),c.osc2.start()}this.tla=Ba.map(c=>{const h=t.createGain();h.gain.value=0;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=c.filtr,l.Q.value=.4,l.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),c.akord.forEach((m,y)=>{for(const k of[-5,6]){const w=t.createOscillator();w.type=y%2?"triangle":"sine",w.frequency.value=m,w.detune.value=k+y;const v=t.createGain();v.gain.value=.034/(1+y*.35);const b=t.createOscillator();b.frequency.value=.03+.017*y+(k>0?.011:0);const x=t.createGain();x.gain.value=v.gain.value*.6,b.connect(x),x.connect(v.gain),b.start(),w.connect(v),v.connect(l),w.start()}});const u=t.createBiquadFilter();u.type="bandpass",u.frequency.value=c.wiatrHz,u.Q.value=.7;const f=t.createGain();f.gain.value=c.wiatr*.15;const p=t.createOscillator();p.frequency.value=.07;const z=t.createGain();return z.gain.value=c.wiatr*.06,p.connect(z),z.connect(f.gain),p.start(),this.szum.connect(u),u.connect(f),f.connect(h),h})}async przelacz(a=!this.wlaczony){return this.dostepny?(this.ac||this._zbuduj(),this.wlaczony=a,a&&this.ac.resume().catch(()=>{}),this.wyjscie.gain.setTargetAtTime(a?this.glosnosc:0,this.ac.currentTime,.5),this.wlaczony):!1}ustawGlosnosc(a){this.glosnosc=a,this.ac&&this.wlaczony&&this.wyjscie.gain.setTargetAtTime(a,this.ac.currentTime,.2)}aktualizuj(a,t){if(this.wagi.set(t),!(!this.ac||!this.wlaczony)&&(this._doAktualizacji-=a,!(this._doAktualizacji>0))){this._doAktualizacji=.25;for(let i=0;i<F;i++)this.tla[i].gain.setTargetAtTime(t[i]*Xi[i],this.ac.currentTime,1.6)}}spiewaj(a,t){if(this._doSpiewu-=a,this._doSpiewu>0)return;this._doSpiewu=.06;const i=this.glosy,e=Ba[this._krainaDominujaca()].skala,o=this.ac&&this.wlaczony?this.ac.currentTime:-1;for(const s of i)!(s.o&&t.includes(s.o))&&s.o&&(s.o=null,s.sila=0,o>=0&&s.wzm.gain.setTargetAtTime(0,o,.35));for(const s of t){let n=i.find(c=>c.o===s);if(!n){if(n=i.find(c=>!c.o),!n)continue;n.o=s,n.hz=Ca(s,e)}o>=0&&n.nastrojony!==n.hz&&(n.nastrojony=n.hz,n.osc.frequency.setTargetAtTime(n.hz,o,.03),n.osc2.frequency.setTargetAtTime(n.hz*2.005,o,.03)),n.sila=Math.min(1,s.spiew*2.2),o>=0&&n.wzm.gain.setTargetAtTime(.02*n.sila,o,.25)}this.spiewa=0;for(const s of i)s.o&&this.spiewa++}ton(a,t=this._krainaDominujaca()){return Ca(a,Ba[t].skala)}_krainaDominujaca(){let a=0;for(let t=1;t<F;t++)this.wagi[t]>this.wagi[a]&&(a=t);return a}_dzwonek(a,t,i=0,e=2.6,o="sine"){const s=this.ac,n=s.currentTime+i,c=s.createOscillator(),h=s.createOscillator(),l=s.createGain(),u=s.createGain();c.type=o,c.frequency.value=a,h.type="sine",h.frequency.value=a*2.01,u.gain.value=.18,l.gain.setValueAtTime(0,n),l.gain.linearRampToValueAtTime(t,n+.02),l.gain.exponentialRampToValueAtTime(4e-4,n+e),c.connect(l),h.connect(u),u.connect(l),l.connect(this.wyjscie),l.connect(this.poglos),c.start(n),h.start(n),c.stop(n+e+.1),h.stop(n+e+.1)}zdarzenie(a,t){if(a in this.licznik&&this.licznik[a]++,!this.ac||!this.wlaczony)return;const i=Ba[t&&t.kraina!=null?t.kraina:this._krainaDominujaca()].skala;if(a==="szklo"){const e=this.ac.currentTime;if(e-this._ostSzklo<.35)return;this._ostSzklo=e;const o=Ca(t,i)*2;this._dzwonek(o,.022,0,1.8),this._dzwonek(o*1.5,.008,.03,1.2)}else if(a==="zapalenie"){const e=Ca(t,i);this._dzwonek(e,.035,0,3.4),this._dzwonek(e*1.5,.02,.18,3),this._dzwonek(e*2,.012,.36,2.6)}else if(a==="kielek"){const e=this.ac.currentTime;if(e-this._ostKielek<.5)return;this._ostKielek=e,this._dzwonek(i[Math.floor(t.t*4.99)]*2,.012,0,1.1,"triangle")}else if(a==="krok-olbrzyma"){const e=.05+.09*(t?.bliskosc??.5);this._dzwonek(49,e,0,2.2),this._dzwonek(98,e*.35,.02,1.4,"triangle")}else if(a==="pyl")this._dzwonek(i[Math.floor(Math.random()*i.length)]*4,.006,0,.9);else if(a==="kropla")this._dzwonek(i[Math.floor(Math.random()*i.length)]*(Math.random()<.5?2:4),.004+Math.random()*.004,0,.45);else if(a==="stworzenie")[0,2,4].forEach((e,o)=>{this._dzwonek(i[e]/2,.045,o*.35,5),this._dzwonek(i[e],.02,o*.35+.15,4)});else if(a==="dzien")[0,1,2,3,4].forEach((e,o)=>this._dzwonek(i[e]*(t.stopien===2?2:1),.035,o*.22,4.5));else if(a==="grzmot"){const e=this.ac,o=e.currentTime+.5+Math.random()*1.6,s=3.2+Math.random()*1.5,n=e.createBufferSource();n.buffer=this.szum.buffer,n.loop=!0;const c=e.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(260,o),c.frequency.exponentialRampToValueAtTime(70,o+s);const h=e.createGain();h.gain.setValueAtTime(0,o),h.gain.linearRampToValueAtTime(.5,o+.08),h.gain.linearRampToValueAtTime(.22,o+.5),h.gain.linearRampToValueAtTime(.3,o+.9),h.gain.exponentialRampToValueAtTime(5e-4,o+s),n.connect(c),c.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),n.start(o,Math.random()*2),n.stop(o+s+.1),this._dzwonek(41,.09,o-e.currentTime,s*.8)}else a==="pogoda"?[0,3].forEach((e,o)=>this._dzwonek(i[e]/2,.03,o*.5,5)):a==="cien"?(this._dzwonek(i[0]/2,.05,0,1.4,"triangle"),this._dzwonek(i[0]/2*.94,.04,.12,1.8,"triangle")):a==="cien-rozproszony"?this._dzwonek(i[4]*2,.02,0,1.2):a==="energia"?(this._dzwonek(i[1]*2,.04,0,1.6,"triangle"),this._dzwonek(i[3]*2,.035,.11,2,"triangle")):a==="odsloniecie"?[0,2,4].forEach((e,o)=>this._dzwonek(i[e],.04,o*.16,2.8)):a==="slad"?[0,1,2,3,4].forEach((e,o)=>this._dzwonek(i[e]*(o===4?2:1),.05,o*.13,3.2)):a==="fresk"&&[0,2,4,1,3].forEach((e,o)=>{this._dzwonek(i[e]/2,.06,o*.4,6),this._dzwonek(i[e]*2,.02,o*.4+.2,5)})}poziom(){if(!this.ac)return 0;const a=new Float32Array(this.analizator.fftSize);this.analizator.getFloatTimeDomainData(a);let t=0;for(const i of a)t+=i*i;return Math.sqrt(t/a.length)}}const Ma=[{nazwa:"wysoka",tlo:1,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"średnia",tlo:.5,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"oszczędna",tlo:.5,swiatlo:.34,drobinki:.5,flora:!0,skala:1},{nazwa:"niska",tlo:.4,swiatlo:.34,drobinki:.35,flora:!0,skala:.9},{nazwa:"minimalna",tlo:.4,swiatlo:.25,drobinki:.25,flora:!1,skala:.8}],$i=2.5;class Hi{constructor(a){this.auto=!0,this.poziom=1,this.naZmiane=a,this._ms=[],this._czas=0,this._dobre=0,this._sufit=0,this._blokada=0,this._rozgrzewka=4}get ustawienia(){return Ma[this.poziom]}ustaw(a){a==="auto"?(this.auto=!0,this._sufit=0):(this.auto=!1,this._zmien(Math.max(0,Math.min(Ma.length-1,a|0))))}_zmien(a){a!==this.poziom&&(this.poziom=a,this.naZmiane(Ma[a])),this._ms.length=0,this._czas=0,this._rozgrzewka=1}probka(a,t){if(!this.auto)return;if(this._rozgrzewka>0){this._rozgrzewka-=t;return}if(this._blokada=Math.max(0,this._blokada-t),this._ms.push(a),this._czas+=t,this._czas<$i)return;let i=0,e=0;for(const s of this._ms)s<120&&(i+=s,e++);const o=e?i/e:16.7;this._ms=[],this._czas=0,(this.dziennik||(this.dziennik=[])).push(`${this.poziom}:${o.toFixed(1)}`),this.dziennik.length>40&&this.dziennik.shift(),o>19.5&&this.poziom<Ma.length-1?(this._blokada=this._probaWGore?600:45,this._probaWGore=!1,this._sufit=this.poziom+1,this._dobre=0,this._zmien(this.poziom+1)):o<17.4&&this.poziom>this._sufit&&this.poziom>0?++this._dobre>=4&&(this._dobre=0,this._probaWGore=!0,this._zmien(this.poziom-1)):(this._dobre=0,this._blokada===0&&(this._sufit=0))}}const Dt="iskierka-ustawienia-v1",L=(r,a,t)=>{const i=document.createElement(r);return a&&(i.className=a),t!=null&&(i.textContent=t),i};function Ji(){try{const r=JSON.parse(localStorage.getItem(Dt)||"null");if(r&&typeof r=="object")return{jakosc:"auto",glosnosc:.75,...r}}catch{}return{jakosc:"auto",glosnosc:.75}}function Qi(r){try{localStorage.setItem(Dt,JSON.stringify(r))}catch{}}class ao{constructor(a){this.gra=a,this.otwarte=!1,this.ustawienia=Ji();const t=document.getElementById("nakladka");this.tytul=L("div","tytul"),this.tytul.innerHTML='<h1>Iskierka</h1><p class="podtytul">leć w ciemność · szkło pokaże barwy</p><p class="podpowiedz">Przytrzymaj mysz lub palec tam, dokąd iskierka ma lecieć. Klawiatura: W A S D lub strzałki.</p>',t.appendChild(this.tytul);const i=this.rzad=L("div","rzad-przyciskow");this.bDzwiek=L("button","przycisk"),this.bDzwiek.type="button",this.bDzwiek.id="b-dzwiek",this.bDzwiek.onclick=async()=>{await a.dzwiek.przelacz(),this._opiszDzwiek(),this.bDzwiek.blur()},this.bMenu=L("button","przycisk","Menu"),this.bMenu.type="button",this.bMenu.id="b-menu",this.bMenu.setAttribute("aria-haspopup","dialog"),this.bMenu.onclick=()=>this.przelacz(),i.append(this.bDzwiek,this.bMenu),t.appendChild(i),this._opiszDzwiek(),this.obrot=L("div","obrot","Obróć telefon poziomo: zobaczysz więcej świata."),t.appendChild(this.obrot),this.panel=L("div","panel"),this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-label","Menu"),this.panel.hidden=!0;const e=L("div","okno"),o=L("div","okno-naglowek");o.appendChild(L("h2",null,"Pauza"));const s=L("div","zakladki");this.zakladki={};for(const[n,c]of[["kolekcja","Kolekcja"],["ustawienia","Ustawienia"]]){const h=L("button","zakladka",c);h.type="button",h.onclick=()=>this._pokaz(n),s.appendChild(h),this.zakladki[n]=h}o.appendChild(s),this.bWroc=L("button","przycisk glowny","Wróć do lotu"),this.bWroc.type="button",this.bWroc.id="b-wroc",this.bWroc.onclick=()=>this.przelacz(!1),o.appendChild(this.bWroc),this.tresc=L("div","okno-tresc"),e.append(o,this.tresc),this.panel.appendChild(e),this.panel.addEventListener("pointerdown",n=>{n.target===this.panel&&this.przelacz(!1)}),t.appendChild(this.panel),addEventListener("keydown",n=>{n.key==="Escape"||n.key.toLowerCase()==="p"&&!this._wPolu(n)?(n.preventDefault(),this.przelacz()):n.key.toLowerCase()==="m"&&!this._wPolu(n)?this.bDzwiek.click():n.key.toLowerCase()==="f"&&!this._wPolu(n)&&this.pelnyEkran()}),document.addEventListener("visibilitychange",()=>{document.hidden&&!this.otwarte&&a.sterowanie.poruszono&&this.przelacz(!0)}),a.sterowanie.naPierwszyRuch=()=>this.tytul.classList.add("znika"),this._miniatury=new Map,this._zakladka="kolekcja",this._zastosuj()}_wPolu(a){const t=a.target;return t&&(t.tagName==="INPUT"||t.tagName==="SELECT"||t.tagName==="TEXTAREA")}_opiszDzwiek(){const a=this.gra.dzwiek;if(!a.dostepny){this.bDzwiek.disabled=!0,this.bDzwiek.textContent="Brak dźwięku";return}this.bDzwiek.textContent=a.wlaczony?"Wycisz":"Włącz dźwięk",this.bDzwiek.setAttribute("aria-pressed",String(a.wlaczony))}_zastosuj(){const a=this.ustawienia,t=this.gra;t.jakosc.ustaw(a.jakosc==="auto"?"auto":Number(a.jakosc)),t.dzwiek.ustawGlosnosc(a.glosnosc)}przelacz(a=!this.otwarte){a!==this.otwarte&&(this.otwarte=a,this.panel.hidden=!a,this.gra.petla.pauza=a,this.gra.petla.zamrozona=a,this.rzad.classList.toggle("schowany",a),a?(this.tytul.classList.add("znika"),this._pokaz(this._zakladka),this.bWroc.focus()):(this.bMenu.blur(),this.gra.canvas.focus?.()))}_pokaz(a){this._zakladka=a;for(const[t,i]of Object.entries(this.zakladki))i.classList.toggle("wybrana",t===a);this.tresc.replaceChildren(a==="kolekcja"?this._kolekcja():this._ustawienia())}_miniatura(a,t){const i=a+"-"+t;return this._miniatury.has(i)||this._miniatury.set(i,this.gra.renderer.miniatura(a,t)),this._miniatury.get(i)}_kolekcja(){const a=this.gra.kolekcja,t=L("div","kolekcja");return t.appendChild(L("p","kolekcja-stan",`Ślady: ${a.ileSladow()} z ${a.wszystkichSladow()} · freski: ${a.ileFreskow()} z ${a.wszystkichFreskow()}`)),N.forEach((i,e)=>{const o=L("section","kolekcja-kraina");o.appendChild(L("h3",null,`${i.nazwa} · ${Wa[e].rodzaj.toLowerCase()}`));const s=L("div","siatka");for(let c=0;c<zt;c++){const h=a.maSlad(e,c),l=L("figure","kafel"+(h?" znaleziony":""));if(h){const u=new Image;u.src=this._miniatura(e,c),u.alt="",l.appendChild(u)}else l.appendChild(L("div","nieznany","?"));l.appendChild(L("figcaption",null,h?Wa[e].nazwy[c]:"jeszcze w ciemności")),s.appendChild(l)}const n=L("p","fresk"+(a.maFresk(e)?" znaleziony":""),a.maFresk(e)?"✦ "+pt[e]:"Fresk tej krainy czeka na barwne światło.");o.append(s,n),t.appendChild(o)}),t}_ustawienia(){const a=this.ustawienia,t=this.gra,i=L("div","ustawienia"),e=(f,p,z)=>{const m=L("label","pole");return m.appendChild(L("span","pole-opis",f)),m.appendChild(p),z&&m.appendChild(L("span","pole-uwaga",z)),i.appendChild(m),p},o=()=>{Qi(a),this._zastosuj()},s=L("select");s.id="u-jakosc",s.appendChild(new Option("automatyczna","auto")),Ma.forEach((f,p)=>s.appendChild(new Option(f.nazwa,String(p)))),s.value=String(a.jakosc),s.onchange=()=>{a.jakosc=s.value,o()},e("Jakość obrazu",s,"Automatyczna pilnuje płynności: najpierw upraszcza efekty, rozdzielczość rusza na samym końcu.");const n=L("input");n.type="range",n.min="0",n.max="1",n.step="0.05",n.value=String(a.glosnosc),n.id="u-glosnosc",n.oninput=()=>{a.glosnosc=Number(n.value),o()},e("Głośność",n,t.dzwiek.wlaczony?null:"Dźwięk włącza się przyciskiem w rogu ekranu.");const c=L("div","rzad"),h=L("button","przycisk",document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran");h.type="button",h.onclick=async()=>{await this.pelnyEkran(),h.textContent=document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran"};const l=L("button","przycisk","Nowy świat");l.type="button",l.onclick=()=>{_a("ziarno",Math.floor(Math.random()*1e6)),_a("kraina",null),_a("x",null),location.reload()};const u=L("button","przycisk","Wyczyść kolekcję");return u.type="button",u.onclick=()=>{u.dataset.pewne?(t.kolekcja.wyczysc(),u.textContent="Kolekcja wyczyszczona",u.disabled=!0):(u.dataset.pewne="1",u.textContent="Na pewno? Naciśnij jeszcze raz")},c.append(h,l,u),i.appendChild(c),i.appendChild(L("p","pole-uwaga",`Świat nr ${t.ziarno}. Ten sam numer w adresie (?ziarno=${t.ziarno}) zawsze daje ten sam świat. Skróty: Esc lub P — pauza, M — dźwięk, F — pełny ekran.`)),i}async pelnyEkran(){try{if(document.fullscreenElement)await document.exitFullscreen();else{await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.("landscape")}catch{}}}catch{}}}const Ka=.3,to=1,eo=2,io=600,oo=5,so=.1,no=3;class ro{constructor(a,t=null){this.swiat=a,this.pamiec=t,this.kielki=[],this.komorki=new Map,this.los=ut(a.ziarno^6221086),this._do=0,this._brudne=!1,this._doZapisu=0,this.wersja=0;const i=t?t.ogrod(a.ziarno):[];for(let e=0;e+3<i.length;e+=4)this._dodaj(i[e],i[e+1],i[e+2],i[e+3],1)}_dodaj(a,t,i,e,o){const s=Math.floor(a/Ka);let n=this.komorki.get(s);n||this.komorki.set(s,n={dawka:0,t,n:0}),n.n++;const c={x:a,y:this.swiat.ziemia(a)-.04,t,dl:i,rodzaj:e,faza:a*12.9898%6.283,wzrost:o};if(this.kielki.push(c),this.kielki.length>io){const h=this.kielki.shift(),l=this.komorki.get(Math.floor(h.x/Ka));l&&(l.n=Math.max(0,l.n-1))}return this.wersja++,c}krok(a,t){let i=!1;for(const s of this.kielki)s.wzrost<1&&(s.wzrost=Math.min(1,s.wzrost+a/oo),i=!0);if(i&&this.wersja++,this._brudne&&(this._doZapisu-=a)<=0&&this.zapisz(),this._do-=a,this._do>0)return;this._do=so;const e=this.swiat,o=this.los;for(const s of t.wachlarze){if(s.sila<.08)continue;const n=s.start+s.dlugosc*1.25;if(!(s.y-n>e.ziemia(s.x)+2.5))for(let c=0;c<no;c++){const h=o()*1.7-.85,l=s.kat+h*s.rozwarcie/2,u=Math.cos(l),f=Math.sin(l);if(!(f>-.05))for(let p=s.start+.3;p<n;p+=.3){const z=s.x+u*p,m=s.y+f*p,y=e.ziemia(z);if(m>y+.08)continue;const k=ct(h,p,s.dlugosc,s.start)*s.sila;k>.04&&!e.woda(z)&&this._naswietl(z,h*s.znak*.5+.5,k);break}}}}_naswietl(a,t,i){const e=Math.floor(a/Ka);let o=this.komorki.get(e);if(o||this.komorki.set(e,o={dawka:0,t,n:0}),o.n>=eo||(o.t+=(t-o.t)*.35,o.dawka+=i,o.dawka<to))return;o.dawka=0;const s=this.los,n=this._dodaj((e+.15+.7*s())*Ka,Math.max(0,Math.min(1,o.t)),.28+s()*s()*.75,s()<.45?1:0,0);this._brudne=!0,this._doZapisu=4,this.naKielek?.(n)}zapisz(){if(!this._brudne||!this.pamiec)return;this._brudne=!1;const a=[];for(const t of this.kielki)a.push(Math.round(t.x*100)/100,Math.round(t.t*100)/100,Math.round(t.dl*100)/100,t.rodzaj);this.pamiec.zapiszOgrod(this.swiat.ziarno,a)}}const jt=["mgla","zacmienie","pyl","mgla","pyl","mgla"],Nt={pyl:"Deszcz szklanego pyłu",mgla:"Mgła gęstnieje",zacmienie:"Zaćmienie",burza:"Burza"},lo=.1,et=[3.5,9],it=12,Lt=65,co=10,ot=[170,330],st=[70,140],uo=r=>r*r*(3-2*r);class ho{constructor(){this.typ=null,this.auto=!0,this.wymuszone=!1,this.szansaBurzy=lo,this.poziom=0,this.czas=0,this.zjawisk=0,this.pyl=0,this.mgla=0,this.zacmienie=0,this.burza=0,this.blysk=0,this.piorunX=0,this.piorunZiarno=0,this.blyskow=0,this._odBlysku=99,this._doBlysku=4,this.do=st[0]+Math.random()*(st[1]-st[0]),this._doPylu=0}krok(a,t){if(!this.typ){this.auto&&(this.do-=a)<=0&&this.wywolaj(Math.random()<this.szansaBurzy?"burza":jt[t],!1);return}this.czas+=a;const i=this.wymuszone||this.typ==="burza"||jt[t]===this.typ,e=this.czas<it+Lt&&i?1:0;this.poziom=Math.max(0,Math.min(1,this.poziom+(e>this.poziom?a/it:-a/co)));const o=uo(this.poziom);this.pyl=this.typ==="pyl"?o:0,this.mgla=this.typ==="mgla"?o:0,this.zacmienie=this.typ==="zacmienie"?o:0,this.burza=this.typ==="burza"?o:0,this._burza(a),this.pyl>.3&&(this._doPylu-=a)<=0&&(this._doPylu=.4+Math.random()*1.3,this.naPyl?.()),e===0&&this.poziom<=0&&(this.typ=null,this.zjawisk++,this.blysk=0,this.burza=0,this.do=ot[0]+Math.random()*(ot[1]-ot[0]))}wywolaj(a,t=!0){a in Nt&&(this.typ=a,this.wymuszone=t,this.czas=0,this.poziom=0,this.pyl=this.mgla=this.zacmienie=this.burza=0,this.blysk=0,this._odBlysku=99,this._doBlysku=5,this.naStart?.(a))}_burza(a){this._odBlysku+=a,this.burza>.5&&(this._doBlysku-=a)<=0&&this.blysnij();const t=this._odBlysku;this.blysk=t>1.2?0:Math.exp(-t*9)+(t>.2?.75*Math.exp(-(t-.2)*11):0),this.typ!=="burza"&&this.blysk<.01&&(this.blysk=0)}blysnij(){this._odBlysku=0,this.blyskow++,this._doBlysku=et[0]+Math.random()*(et[1]-et[0]),this.piorunX=(Math.random()*2-1)*1.3,this.piorunZiarno=Math.random()*10,this.naBlysk?.()}zakoncz(){this.typ&&(this.czas=it+Lt)}}const Oa={pelnia:10,zaFresk:.35,progi:[.5,1]};class fo{constructor(a,t){this.swiat=a,this.kolekcja=t,this._szkla=null,this._znane=new Map,this.naPrzebudzenie=null}_licz(){const a=this._szkla=new Map,t=this.swiat.ziarno+":";for(const i of Object.keys(this.kolekcja.szklo)){if(!i.startsWith(t))continue;const e=Number(i.slice(t.length));if(!Number.isFinite(e))continue;const o=this.swiat.segment(Math.floor(e/64)*Z+Z/2);a.set(o,(a.get(o)||0)+1)}}zapalono(a){if(!this._szkla)this._licz();else{const t=this.swiat.segment(a);this._szkla.set(t,(this._szkla.get(t)||0)+1)}}odswiez(){this._szkla=null}szkiel(a){return this._szkla||this._licz(),this._szkla.get(a)||0}postep(a){const t=this.kolekcja.jestZapalony(this.swiat.ziarno+":f"+a)?Oa.zaFresk:0;return Math.min(1,this.szkiel(a)/Oa.pelnia+t)}w(a){return this.swiat.mieszajSegmenty(a,t=>this.postep(t))}krok(a){const t=this.swiat.segment(a),i=this.postep(t),e=i>=Oa.progi[1]?2:i>=Oa.progi[0]?1:0,o=this._znane.get(t);this._znane.set(t,e),o!==void 0&&e>o&&this.naPrzebudzenie?.(t,e)}}const Ga=16,Zt={szansa:.12,prog:.9,budzenie:1.4,towarzyszy:16,odplywa:5,drobinkaCo:3.6,drobinek:4};function zo(r,a){if(a<3)return null;const t=$(r.ziarno,7373,a);if(t()>Zt.szansa)return null;const i=a*Ga+t()*Ga,e=r.ziemia(i),o=r.granicaLotu(i)-1.6,s=Math.min(o,e+2+t()*3.2);return{id:a,x:i,y:s,x0:i,y0:s,faza:t()*6.283,barwa:t(),stan:0,ladunek:0,t:0,vx:0,vy:0,kier:t()<.5?1:-1,rozw:0,zanik:0,dalo:0,doDrobinki:1.5}}class po{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.odeszly=new Set,this.wlaczone=!0,this.obudzonych=0,this.towarzyszy=!1,this.naPrzebudzenie=null,this.naDrobinke=null,this.naOdejscie=null}krok(a,t,i,e,o,s){const n=Math.floor((t.x-i-24)/Ga),c=Math.floor((t.x+i+24)/Ga);this.widoczne.length=0,this.towarzyszy=!1;let h=0;if(this.wlaczone)for(let l=n;l<=c;l++){if(this.odeszly.has(l))continue;let u=this.kawalki.get(l);u===void 0&&(this.kawalki.size>40&&this._przytnij(n,c),u=zo(this.swiat,l),this.kawalki.set(l,u)),u&&(this._jedno(u,a,e,o,s),u.stan===2&&(this.towarzyszy=!0,h=1),u.stan<4&&this.widoczne.push(u))}e.oslona+=(h-e.oslona)*Math.min(1,a*2)}_przytnij(a,t){for(const[i,e]of this.kawalki)(i<a||i>t)&&(!e||e.stan===0)&&this.kawalki.delete(i)}_jedno(a,t,i,e,o){const s=Zt;if(a.stan===0){a.x=a.x0+Math.sin(o*.3+a.faza)*.08,a.y=a.y0+Math.sin(o*.5+a.faza)*.1;const n=e.natezenie(a.x,a.y,1.4);a.ladunek=Math.max(0,Math.min(1,a.ladunek+(n>.05?t*(.5+n*1.5):-t*.08))),a.ladunek>=s.prog&&(a.stan=1,a.t=0,this.obudzonych++,this.naPrzebudzenie?.(a));return}if(a.t+=t,a.stan===1){a.rozw=Math.min(1,a.t/s.budzenie),a.rozw>=1&&(a.stan=2,a.t=0);return}if(a.stan===2){const n=i.vx+i.pradX;Math.abs(n)>.4&&(a.kier=n>0?1:-1);const c=i.x-a.kier*2.1,h=i.y+1.4+.35*Math.sin(a.t*.9+a.faza),l=i.vy+i.pradY;a.vx+=((c-a.x)*2.4-(a.vx-n)*2.2)*t,a.vy+=((h-a.y)*2.4-(a.vy-l)*2.2)*t,a.x+=a.vx*t,a.y+=a.vy*t,a.doDrobinki-=t,a.doDrobinki<=0&&a.dalo<s.drobinek&&(a.doDrobinki=s.drobinkaCo,a.dalo++,this.naDrobinke?.(a.x-a.kier*.9,a.y-.2,a)),(a.t>=s.towarzyszy||Math.hypot(i.x-a.x,i.y-a.y)>14)&&(a.stan=3,a.t=0,this.naOdejscie?.(a));return}a.vy+=.9*t,a.vx+=(a.kier*1.2-a.vx)*t,a.x+=a.vx*t,a.y+=a.vy*t,a.zanik=Math.min(1,a.t/s.odplywa),a.zanik>=1&&(a.stan=4,this.odeszly.add(a.id))}}const ko=1080,J=document.getElementById("gra"),mo=document.getElementById("nakladka");function Wt(r){const a=document.createElement("div");a.className="blad",a.textContent=r,mo.appendChild(a)}function wo(){const r=Gt(J);if(!r){(window.__bledy||(window.__bledy=[])).push("brak WebGL2"),Wt("Ta przeglądarka nie udostępnia WebGL2, a Iskierka go potrzebuje.");return}const a=new bi(O.ziarno),t=new Ai(r,a);ft.includes(O.warstwa)&&(t.warstwa=O.warstwa);const i=new ve(O.ziarno);let e=null;const o=new ji(J),s=new ht(a),n=new Ni,c=new Gi;s.pamiec=c;const h=new Wi(a,s,c),l=new ro(a,c),u=new gi,f=new ho,p=new ie,z=new hi(a),m=new pi(a),y=new fo(a,c),k=new po(a);let w=0;const v=new Yi(c);(O.test||O.warstwa==="maska")&&(v.el.style.visibility="hidden"),c.naZmiane=()=>v.odswiez();const b=new Ui;n.naSzklo=g=>b.zdarzenie("szklo",g);const x=[(g,E)=>b.zdarzenie(g,E)],S=new Float32Array(N.length),_=(g,E)=>{for(const G of x)G(g,E)};s.naZapalenie=g=>{y.zapalono(g.x),_("zapalenie",g)},y.naPrzebudzenie=(g,E)=>{const G=N[a.krainaSegmentu(g)].nazwa;v.wiesc(E===2?`${G}: niebo rozbudzone`:`${G}: niebo jaśnieje`),_("dzien",{stopien:E})},k.naPrzebudzenie=g=>{v.wiesc("Coś się obudziło"),_("stworzenie",g)},k.naDrobinke=(g,E)=>h.dodajDrobinke(g,E),l.naKielek=g=>_("kielek",g),u.naKrok=g=>_("krok-olbrzyma",g),f.naPyl=()=>_("pyl",null),f.naBlysk=()=>_("grzmot",null),f.naStart=g=>{v.wiesc(Nt[g]),_("pogoda",{typ:g})},addEventListener("pagehide",()=>l.zapisz()),h.zdarzenie=(g,E)=>{g==="slad"?v.wiesc(Wa[E.kraina].nazwy[E.wariant]+(E.nowy?"":" (już w kolekcji)")):g==="fresk"&&v.wiesc(pt[E.kraina]);for(const G of x)G(g,E)};const d={czas:0,iskra:i,cam:{x:i.x,y:6.5},polX:ka*16/9,polY:ka};let A=1;const j=new Hi(g=>{t.jakosc=g,A=g.skala,R()});t.jakosc=j.ustawienia;function R(){const g=Math.min(window.devicePixelRatio||1,2),E=J.clientWidth||innerWidth,G=J.clientHeight||innerHeight;let za=Math.min(G*g,ko)*A,wa=za*E/G;wa=Math.max(320,Math.round(wa)),za=Math.max(180,Math.round(za)),(J.width!==wa||J.height!==za)&&(J.width=wa,J.height=za),d.polX=ka*wa/za,t.rozmiar(wa,za)}addEventListener("resize",R),R();function oa(g){d.czas+=g,z.krok(g,d.cam,d.polX,i),i.krok(g,e||o.odczyt(d),a),m.krok(d.cam,d.polX,i,d.czas);const E=1-Math.exp(-g*1.6);d.cam.x+=(i.x+(i.vx+i.pradX)*.5-d.cam.x)*E,d.cam.y+=(i.y+.6-d.cam.y)*E,W(),p.krok(i,d.czas),s.krok(g,d.cam,d.polX,d.czas,i),n.aktualizuj(g,i,s.widoczne),s.laduj(g),h.krok(g,i,n,d.czas),l.krok(g,n),k.krok(g,d.cam,d.polX,i,n,d.czas),y.krok(i.x),a.deszcz(i.x)>.4&&(w-=g)<=0&&(w=.25+Math.random()*.9,_("kropla",null));const G=q[0];u.krok(g,d.cam.x*G.mnoznikX,d.polX*G.z),f.krok(g,a.krainaW(i.x)),b.aktualizuj(g,a.wagi(i.x,S)),b.spiewaj(g,n.spiewajace)}function W(){d.cam.y=Math.max(Math.max(a.ziemia(d.cam.x)+ka-1.9,4.7),Math.min(12.4,d.cam.y))}const X=()=>({cam:d.cam,polX:d.polX,polY:d.polY,czas:d.czas,iskra:i,tecze:n.ukryte?null:n,odlamki:s.widoczne,znaleziska:h,zarosla:l,olbrzym:u,pogoda:f,podmuchy:p,prady:z,mgly:m,dzien:y,stworzenia:k});function V(g,E){E&&j.probka(E*1e3,E),i.zbudujSmuge(da),v.energia(i.energia),v.ustawKraine(a.krainaW(i.x),a.auraSegmentu(a.segment(i.x))),t.rysuj(X())}const U=new Yt({krok:oa,rysuj:V}),Y={gotowe:!0,canvas:J,sterowanie:o,jakosc:j,stan:d,petla:U,renderer:t,swiat:a,odlamki:s,tecze:n,znaleziska:h,zarosla:l,olbrzym:u,pogoda:f,podmuchy:p,prady:z,mgly:m,dzien:y,stworzenia:k,kolekcja:c,hud:v,sluchacze:x,dzwiek:b,ziarno:O.ziarno,bledy:[],teleporty:()=>a.teleporty(),wywolajOlbrzyma(g=1,E=0){const G=q[0];u.wywolaj(d.cam.x*G.mnoznikX,d.polX*G.z,g,E)},teleport(g,E){i.przenies(g,E??a.ziemia(g)+4.5),d.cam.x=g,d.cam.y=i.y+.6,W()},przewin(g){U.przewin(g),V()},rysuj:V,pomiar:g=>t.pomiar(X(),g),ustawWejscie(g){e=g},krainy:N,opisJakosci:()=>`jakość ${j.auto?"auto: ":""}${j.ustawienia.nazwa}`,info(){return{renderer:r.getParameter(r.RENDERER),w:J.width,h:J.height,fps:U.fps,hdr:r.ext.floatBuf}}};if(window.iskierka=Y,O.kraina){const g=a.teleporty().find(E=>E.nazwa===O.kraina);g&&Y.teleport(g.x+O.dx,a.ziemia(g.x+O.dx)+4.5+O.dy)}else O.x!=null?Y.teleport(O.x):Y.teleport(8);const Ya=Y.menu=new ao(Y);O.jakosc!=null&&j.ustaw(O.jakosc==="auto"?"auto":Number(O.jakosc)),O.debug&&Li(Y),O.test&&(U.pauza=!0,O.jakosc==null&&j.ustaw(1),h.cienieWlaczone=!1,u.auto=!1,f.auto=!1,f.szansaBurzy=0,z.wlaczone=!1,m.wlaczone=!1,k.wlaczone=!1,a.auraWl=!1,Ya.tytul.style.display="none",Ya.rzad.style.visibility="hidden",Ya.obrot.style.visibility="hidden"),U.start()}addEventListener("error",r=>{(window.__bledy||(window.__bledy=[])).push(String(r.message))});try{wo()}catch(r){console.error(r),(window.__bledy||(window.__bledy=[])).push(String(r.message)),Wt("Nie udało się uruchomić gry: "+r.message)}
