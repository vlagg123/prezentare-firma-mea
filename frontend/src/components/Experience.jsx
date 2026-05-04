import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Simplified vanilla Three.js scene — readability-friendly:
   core offset to the right side, fewer panels, single ring, fewer particles. */

export default function Experience() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = () => mount.clientWidth;
    const H = () => mount.clientHeight;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050508, 6, 22);

    const camera = new THREE.PerspectiveCamera(55, W() / H(), 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(W(), H());
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const lightA = new THREE.PointLight(0xa855f7, 1.8, 30);
    lightA.position.set(5, 5, 5);
    scene.add(lightA);
    const lightB = new THREE.PointLight(0x38bdf8, 1.4, 30);
    lightB.position.set(-5, -3, 4);
    scene.add(lightB);
    const lightC = new THREE.PointLight(0xec4899, 1.2, 30);
    lightC.position.set(0, -6, -2);
    scene.add(lightC);

    /* Energy core group — offset to the right so it doesn't sit behind text */
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);
    scene.add(coreGroup);

    const coreGeom = new THREE.IcosahedronGeometry(0.85, 24);
    const positionAttr = coreGeom.attributes.position;
    const original = new Float32Array(positionAttr.array.length);
    original.set(positionAttr.array);

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7c3aed,
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.7,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(core);

    const shellGeom = new THREE.IcosahedronGeometry(0.95, 4);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const shell = new THREE.Mesh(shellGeom, shellMat);
    coreGroup.add(shell);

    /* Single orbital ring */
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.008, 16, 160),
      new THREE.MeshBasicMaterial({ color: 0xec4899, toneMapped: false })
    );
    coreGroup.add(ring);

    /* Particles — colorful glowing field */
    const PCOUNT = isMobile ? 1200 : 2400;
    const pPos = new Float32Array(PCOUNT * 3);
    const pColor = new Float32Array(PCOUNT * 3);
    const palette = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xec4899),
      new THREE.Color(0xc4d6ff),
    ];
    for (let i = 0; i < PCOUNT; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColor[i * 3] = c.r;
      pColor[i * 3 + 1] = c.g;
      pColor[i * 3 + 2] = c.b;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute("color", new THREE.BufferAttribute(pColor, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    /* Just 3 floating panels, placed AROUND the right side, not behind text */
    const panelData = [
      { p: [4.0, 1.8, -1], c: 0x38bdf8, s: 0.9 },
      { p: [4.5, -1.6, -2], c: 0xec4899, s: 1.0 },
      { p: [3.2, 0.4, -3], c: 0xa855f7, s: 0.8 },
    ];
    const panels = panelData.map((d) => {
      const g = new THREE.PlaneGeometry(1.0, 0.6);
      const m = new THREE.MeshBasicMaterial({
        color: d.c,
        transparent: true,
        opacity: 0.07,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(...d.p);
      mesh.scale.setScalar(d.s);
      mesh.userData.basePos = mesh.position.clone();
      mesh.userData.phase = Math.random() * Math.PI * 2;
      const edges = new THREE.EdgesGeometry(g);
      const lines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: d.c, transparent: true, opacity: 0.5 })
      );
      mesh.add(lines);
      scene.add(mesh);
      return mesh;
    });

    /* Mouse + scroll */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scroll = 0;
    let smoothScroll = 0;

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      scroll = max > 0 ? h.scrollTop / max : 0;
    };
    const onResize = () => {
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    if (!isMobile) {
      window.addEventListener("mousemove", onMove);
    } else {
      // On touch, snap smoothScroll instantly so there's no accumulated lag when finger stops momentum
      const onTouchStart = () => { smoothScroll = scroll; };
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window._mobileTouchStart = onTouchStart;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    /* Loop */
    const clock = new THREE.Clock();
    let raf;

    const distortCore = (t) => {
      const arr = positionAttr.array;
      for (let i = 0; i < arr.length; i += 3) {
        const ox = original[i], oy = original[i + 1], oz = original[i + 2];
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len, ny = oy / len, nz = oz / len;
        const wave =
          Math.sin(nx * 3 + t * 1.2) * 0.10 +
          Math.cos(ny * 4 + t * 1.0) * 0.08 +
          Math.sin(nz * 5 + t * 0.8) * 0.06;
        const factor = 1 + wave;
        arr[i] = ox * factor;
        arr[i + 1] = oy * factor;
        arr[i + 2] = oz * factor;
      }
      positionAttr.needsUpdate = true;
      coreGeom.computeVertexNormals();
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t = clock.elapsedTime;

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      smoothScroll += (scroll - smoothScroll) * (isMobile ? 0.03 : 0.04);

      if (isMobile) {
        // scrollEffect starts at 0 through the hero, kicks in from chapter 1 onwards
        const scrollEffect = smoothScroll < 0.12 ? 0 : Math.min((smoothScroll - 0.12) / 0.88, 1);

        coreGroup.position.x = 0;
        coreGroup.position.y = -scrollEffect * 0.5;

        distortCore(t);
        core.rotation.y += dt * 0.25;
        core.rotation.x = Math.sin(t * 0.4) * 0.3;
        const coreScale = 1 + Math.sin(t * 1.0) * 0.04 + scrollEffect * 0.7;
        core.scale.setScalar(coreScale);

        shell.rotation.y -= dt * 0.15;
        shell.rotation.x = 0;
        shell.scale.setScalar(coreScale * 1.18);

        ring.rotation.x = t * 0.3;
        ring.rotation.y = t * 0.2;
        ring.rotation.z = 0;

        panels.forEach((p) => {
          const b = p.userData.basePos;
          const ph = p.userData.phase;
          p.position.y = b.y + Math.sin(t * 0.7 + ph) * 0.15;
          p.position.x = b.x + Math.cos(t * 0.5 + ph) * 0.08;
          p.rotation.z = Math.sin(t * 0.4 + ph) * 0.1;
          p.rotation.y = Math.cos(t * 0.3 + ph) * 0.2;
        });

        particles.rotation.y += dt * 0.03;

        lightA.intensity = 1.8 + scrollEffect * 0.8 + Math.sin(t) * 0.2;
        lightA.color.setHSL(0.7 - scrollEffect * 0.1, 0.9, 0.6);
        lightB.intensity = 1.4 + Math.cos(t * 0.7) * 0.2;
        lightC.intensity = 1.2 + scrollEffect * 1.0 + Math.sin(t * 1.3) * 0.15;
        lightC.color.setHSL(0.92, 0.9, 0.6);

        camera.position.x += (0 - camera.position.x) * 0.06;
        camera.position.y += (0 - camera.position.y) * 0.06;
        camera.position.z += (8 - camera.position.z) * 0.06;
        camera.lookAt(0, 0, 0);
      } else {
        const sideOffset = 3.0 * (1 - smoothScroll);
        coreGroup.position.x = sideOffset + mouse.x * 0.15;
        coreGroup.position.y = -smoothScroll * 0.3 + mouse.y * 0.1;

        distortCore(t);
        core.rotation.y += dt * 0.25;
        core.rotation.x = Math.sin(t * 0.4) * 0.3 + mouse.y * 0.25;
        const coreScale = 1 + Math.sin(t * 1.0) * 0.04 + smoothScroll * 0.6;
        core.scale.setScalar(coreScale);

        shell.rotation.y -= dt * 0.15;
        shell.rotation.x = -mouse.y * 0.2;
        shell.scale.setScalar(coreScale * 1.18);

        ring.rotation.x = t * 0.3 + mouse.y * 0.4;
        ring.rotation.y = t * 0.2;
        ring.rotation.z = mouse.x * 0.4;

        panels.forEach((p) => {
          const b = p.userData.basePos;
          const ph = p.userData.phase;
          p.position.y = b.y + Math.sin(t * 0.7 + ph) * 0.15;
          p.position.x = b.x + Math.cos(t * 0.5 + ph) * 0.08;
          p.rotation.z = Math.sin(t * 0.4 + ph) * 0.1;
          p.rotation.y = Math.cos(t * 0.3 + ph) * 0.2;
        });

        particles.rotation.y += dt * 0.03;
        particles.rotation.x = mouse.y * 0.1;

        lightA.intensity = 1.8 + smoothScroll * 1.2 + Math.sin(t) * 0.2;
        lightA.color.setHSL(0.7 - smoothScroll * 0.15, 0.9, 0.6);
        lightB.intensity = 1.4 + Math.cos(t * 0.7) * 0.2;
        lightB.color.setHSL(0.55 + smoothScroll * 0.2, 0.8, 0.55);
        lightC.intensity = 1.2 + smoothScroll * 1.5 + Math.sin(t * 1.3) * 0.15;
        lightC.color.setHSL(0.92 + smoothScroll * 0.05, 0.9, 0.6);

        const targetZ = 8 - smoothScroll * 4.5;
        const targetX = mouse.x * 0.4;
        const targetY = mouse.y * 0.3;
        camera.position.x += (targetX - camera.position.x) * 0.06;
        camera.position.y += (targetY - camera.position.y) * 0.06;
        camera.position.z += (targetZ - camera.position.z) * 0.06;
        camera.lookAt(coreGroup.position.x, coreGroup.position.y, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      if (!isMobile) window.removeEventListener("mousemove", onMove);
      if (isMobile && window._mobileTouchStart) window.removeEventListener("touchstart", window._mobileTouchStart);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      coreGeom.dispose();
      coreMat.dispose();
      shellGeom.dispose();
      shellMat.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
      pGeom.dispose();
      pMat.dispose();
      panels.forEach((p) => {
        p.geometry.dispose();
        p.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-testid="webgl-canvas"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
