'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Task3DModel({ completionRate = 0, isDark = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isDark ? 0x38bdf8 : 0x0284c7, 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Inner wireframe sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: completionRate === 1 ? 0x10b981 : isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Outer Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(1.75, 0.035, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x818cf8 : 0x4f46e5,
      metalness: 0.9,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // let id;
    // const clock = new THREE.Clock();

    // const animate = () => {
    //   id = requestAnimationFrame(animate);
    //   const elapsed = clock.getElapsedTime();
    //   const speed = 0.5 + completionRate * 2.2;

    //   sphere.rotation.y = elapsed * 0.3 * speed;
    //   sphere.rotation.x = elapsed * 0.15 * speed;
    //   ring.rotation.z = -elapsed * 0.4 * speed;

    //   renderer.render(scene, camera);
    // };
    // animate();
    // USE THIS (Pure, high-performance, no deprecation warning):
let id;
let startTime = null;

const animate = (timestamp) => {
  id = requestAnimationFrame(animate);
  if (!startTime) startTime = timestamp;
  const elapsed = (timestamp - startTime) * 0.001; // convert to seconds
  const speed = 0.5 + completionRate * 2.2;

  sphere.rotation.y = elapsed * 0.3 * speed;
  sphere.rotation.x = elapsed * 0.15 * speed;
  ring.rotation.z = -elapsed * 0.4 * speed;

  renderer.render(scene, camera);
};
id = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(id);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [completionRate, isDark]);

  return <div ref={mountRef} style={{ width: '100%', height: '210px' }} />;
}