document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const TOTAL = 100;
  const petalArray = [];

  const petalImg = new Image();
  petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png';
  petalImg.addEventListener('load', () => {
      for (let i = 0; i < TOTAL; i++) {
          petalArray.push(new Petal());
      }
      render();
  });
  function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalArray.forEach(petal => petal.animate());
      window.requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });

  let mouseX = 0;
  function touchHandler(e) {
      mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
  }
  window.addEventListener('mousemove', touchHandler);
  window.addEventListener('touchmove', touchHandler);
  class Petal {
      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = (Math.random() * canvas.height * 2) - canvas.height;
          this.w = 25 + Math.random() * 15;
          this.h = 20 + Math.random() * 10;
          this.opacity = this.w / 40;
          this.flip = Math.random();

          this.xSpeed = 1.5 + Math.random() * 2;
          this.ySpeed = 1 + Math.random() * 1;
          this.flipSpeed = Math.random() * 0.03;
      }

      draw() {
          if (this.y > canvas.height || this.x > canvas.width) {
              this.x = -petalImg.width;
              this.y = (Math.random() * canvas.height * 2) - canvas.height;
              this.xSpeed = 1.5 + Math.random() * 2;
              this.ySpeed = 1 + Math.random() * 1;
              this.flip = Math.random();
          }
          ctx.globalAlpha = this.opacity;
          ctx.drawImage(
              petalImg, 
              this.x, 
              this.y, 
              this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)), 
              this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
          );
      }
      animate() {
          this.x += this.xSpeed + mouseX * 5;
          this.y += this.ySpeed + mouseX * 2;
          this.flip += this.flipSpeed;
          this.draw();
      }
  }

  // Scatter images to cover the heart
  const images = document.querySelectorAll('.draggable');
  const heartElement = document.querySelector('.heart');
  const heartBoundingBox = heartElement.getBoundingClientRect();

  images.forEach(img => {
      const randomX = heartBoundingBox.left + Math.random() * heartBoundingBox.width - 30;
      const randomY = heartBoundingBox.top + Math.random() * heartBoundingBox.height - 300;
      const randomRotation = Math.random() * 45 - 15; 

      img.style.position = 'absolute';
      img.style.left = `${randomX}px`;
      img.style.top = `${randomY}px`;
      img.style.transform = `rotate(${randomRotation}deg)`;
  });

  // Drag and Drop functionality
  let draggedImagesCount = 0;

  images.forEach(img => {
      img.addEventListener('mousedown', startDrag);
      img.addEventListener('touchstart', startDrag);
  });

  function startDrag(e) {
      e.preventDefault();
      let img = e.target;
      let offsetX = e.clientX - img.getBoundingClientRect().left;
      let offsetY = e.clientY - img.getBoundingClientRect().top;

      function moveAt(x, y) {
          img.style.left = x - offsetX + 'px';
          img.style.top = y - offsetY + 'px';
      }

      function onMouseMove(event) {
          moveAt(event.clientX, event.clientY);
      }

      function onTouchMove(event) {
          let touch = event.touches[0];
          moveAt(touch.clientX, touch.clientY);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onTouchMove);

      function stopDrag() {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('touchmove', onTouchMove);
          document.removeEventListener('mouseup', stopDrag);
          document.removeEventListener('touchend', stopDrag);
          draggedImagesCount++;
      }

      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchend', stopDrag);
  }
  let a = document.querySelector('.gradient-glow-button');
a.addEventListener('click', () => {
    setTimeout(() => {
        document.querySelector('#first').innerHTML = '❤️ To the most beautiful girl I have ever met... ❤️';
    }, 2000);
    
    setTimeout(() => {
        document.querySelector('#first').innerHTML = '✨❤️ Every moment i spend with you feels magical! ✨❤️';
    }, 6000);
    
    setTimeout(() => {
        document.querySelector('#first').innerHTML = 'You make my world brighter! 😊';
    }, 10000);

    setTimeout(() => {
        document.querySelector('#first').innerHTML = '❤️ It’s always been you ❤️';
    }, 14000);

    setTimeout(() => {
        document.querySelector('#nameInHeart').innerHTML = '❤️ It’s You Aakansha ❤️';
    }, 14000);
});
});
