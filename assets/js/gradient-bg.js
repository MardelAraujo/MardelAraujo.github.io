// gradient-bg.js
// Interactive gradient background with floating spheres and particles

// Create particle effect
window.addEventListener('DOMContentLoaded', function () {
  const particlesContainer = document.getElementById('particles-container');
  if (!particlesContainer) return;
  const particleCount = 80;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    // Random size (small)
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Initial position
    resetParticle(particle);
    particlesContainer.appendChild(particle);
    // Animate
    animateParticle(particle);
  }

  function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    return { x: posX, y: posY };
  }

  function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);
    // Random animation properties
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    setTimeout(() => {
      particle.style.transition = `all ${duration}s linear`;
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      // Move in a slight direction
      const moveX = pos.x + (Math.random() * 20 - 10);
      const moveY = pos.y - Math.random() * 30; // Move upwards
      particle.style.left = `${moveX}%`;
      particle.style.top = `${moveY}%`;
      // Reset after animation completes
      setTimeout(() => {
        animateParticle(particle);
      }, duration * 1000);
    }, delay * 1000);
  }

  // Mouse interaction
  document.addEventListener('mousemove', (e) => {
    // Calcula a posição do mouse relativa ao container do hero
    const hero = document.getElementById('hero') || document.querySelector('.hero');
    const rect = hero.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    // Cria partícula exatamente onde o cursor está
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${mouseX - size/2}px`;
    particle.style.top = `${mouseY - size/2}px`;
    particle.style.opacity = '0.6';
    particle.style.position = 'absolute';
    particlesContainer.appendChild(particle);
    // Anima para fora
    setTimeout(() => {
      particle.style.transition = 'all 2s ease-out';
      particle.style.left = `${mouseX + (Math.random() * 20 - 10) - size/2}px`;
      particle.style.top = `${mouseY + (Math.random() * 20 - 10) - size/2}px`;
      particle.style.opacity = '0';
      setTimeout(() => {
        particle.remove();
      }, 2000);
    }, 10);
    // Movimento sutil das esferas
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    spheres.forEach(sphere => {
      sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
});
