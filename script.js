document.addEventListener('DOMContentLoaded', () => {
  // Toggle mobile navigation
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-navbar');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      hamburger.classList.toggle('active'); // Add active class to hamburger for animations
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // Content for each section
  const pages = {
    home: `
      <!-- Advanced Hero Section -->
      <section id="home" class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">
              <span class="text-glow">Welcome to my Portfolio</span> <br>
              <span class="text-glow">I'm Sabir .H</span>
            </h1>
            <p class="hero-subtitle">You can Check my Portfolio or Contact Me</p>
          </div>
          <div class="hero-background"></div>
        </div>
      </section>
    `,
    about: `
      <section id="about" class="about">
        <div class="container">
          <div class="profile-image">
            <img src="images/profile.png" alt="Profile Image" loading="lazy">
          </div>
          <div class="about-content">
            <div class="bio">
              <h3>Hi, I'm Sabir Hussain,</h3>
              <p style="text-align: left;">A passionate UI/UX and Graphic Designer dedicated to crafting visually compelling and user-friendly digital experiences. With expertise in industry-leading tools like Figma, Adobe XD, Sketch, and the Adobe Creative Suite, I transform ideas into stunning designs that enhance usability and engagement. My approach blends creativity with functionality, ensuring every design not only looks great but also delivers an intuitive user experience. Let’s create something extraordinary together!</p>
              <div class="skills">
                <h3>Skills & Tools</h3>
                <ul>
                  <li>Figma</li>
                  <li>Adobe XD</li>
                  <li>Sketch</li>
                  <li>Adobe Photoshop</li>
                  <li>Adobe Illustrator</li>
                  <li>Adobe After Effects</li>
                  <li>Adobe Premiere Pro</li>
                  <li>CorelDRAW</li>
                  <li>Canva</li>
                  <li>Blender (3D Design)</li>
                  <li>HTML/CSS</li>
                  <li>JavaScript</li>
                  <li>WordPress</li>
                  <li>UI/UX Design</li>
                  <li>Brand Identity Design</li>
                  <li>Prototyping</li>
                  <li>Motion Graphics</li>
                  <li>Typography</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    portfolio: `
      <section id="portfolio" class="portfolio">
        <div class="grid" id="portfolio-grid">
          <!-- Portfolio items will be dynamically inserted here -->
        </div>
        <!-- Fullscreen Modal -->
        <div id="full-screen-modal" class="modal">
          <span class="close">&times;</span>
          <span class="nav-arrow left-arrow">&#10094;</span>
          <span class="nav-arrow right-arrow">&#10095;</span>
          <img class="modal-content" id="modal-img">
          <video class="modal-content" id="modal-video" controls></video>
          <div id="caption"></div>
        </div>
      </section>
    `,
    contact: `
      <section id="contact" class="contact">
  <div class="container">
    <h2>Let’s Create Something Amazing!</h2>
    <div class="contact-content">
      <div class="social-links">
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">Instagram</a>
        <a href="https://behance.com/sabirhussain9" target="_blank" aria-label="Behance">Behance</a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sabirhussain0166@gmail.com" target="_blank" aria-label="Gmail">Gmail</a>
      </div>
      <form id="contact-form" class="contact-form">
        <input type="text" id="name" placeholder="Your Name" required aria-label="Your Name">
        <input type="email" id="email" placeholder="Your Email" required aria-label="Your Email">
        <textarea id="message" placeholder="Your Message" required aria-label="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</section>
    `
  };

  // Function to generate portfolio items dynamically
  function generatePortfolioItems() {
    const portfolioItems = [];

    // Add 30 images
    for (let i = 1; i <= 30; i++) {
      portfolioItems.push({
        type: 'image',
        src: `images/project${i}.jpg`,
        caption: `Project ${i} - Graphic Design`
      });
    }

    // Add 5 videos
    for (let i = 1; i <= 5; i++) {
      portfolioItems.push({
        type: 'video',
        src: `videos/project${i}.mp4`,
        caption: `Project ${i + 30} - Play Video`
      });
    }

    return portfolioItems;
  }

  // Function to load content dynamically with smooth transitions
  function loadPage(page) {
    const mainContent = document.getElementById('main-content');

    if (!pages[page]) return; // Avoid errors if the page doesn't exist

    // Prevent unnecessary reload if the same page is already active
    if (mainContent.innerHTML.trim() === pages[page].trim()) return;

    // Hide current content
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
      // Load new content
      mainContent.innerHTML = pages[page];
      mainContent.style.opacity = '1';

      // Update active link in the navigation
      updateActiveLink(page);

      // Reinitialize functionality for specific pages
      if (page === 'portfolio') {
        generatePortfolioGrid();
        initializeModal();
      }

      // Initialize form validation for the contact page
      if (page === 'contact') {
        initializeFormValidation();
      }

      // Animate new content items one by one (top to bottom)
      animateContentItems();
    }, 300); // Match the duration of the CSS transition
  }

  // Function to animate content items one by one (top to bottom)
  function animateContentItems() {
    const contentItems = document.querySelectorAll('#main-content > *');
    contentItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-20px)'; // Start above
      item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)'; // Move down to final position
      }, index * 200); // Staggered delay for each item
    });
  }

  // Function to initialize animations on page load (top to bottom)
  function initializePageAnimations() {
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Hide elements initially
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-20px)'; // Start above
    navLinks.forEach(link => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(-20px)'; // Start above
    });

    // Animate logo after a slight delay
    setTimeout(() => {
      logo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0)'; // Move down to final position
    }, 200); // Delay for logo animation

    // Animate nav links with staggered delay
    navLinks.forEach((link, index) => {
      setTimeout(() => {
        link.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)'; // Move down to final position
      }, 400 + index * 200); // Staggered delay for each link
    });

    // Animate main content items (top to bottom)
    animateContentItems();
  }

  // Initialize animations when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initializePageAnimations);

  // Generate portfolio grid dynamically
  function generatePortfolioGrid() {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = ''; // Clear existing content

    const portfolioItems = generatePortfolioItems(); // Get the dynamically generated items

    portfolioItems.forEach((item, index) => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = `Project ${index + 1}`;
        img.loading = 'lazy';
        img.classList.add('project-img');
        gridItem.appendChild(img);
      } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        const source = document.createElement('source');
        source.src = item.src;
        source.type = 'video/mp4';
        video.appendChild(source);
        gridItem.appendChild(video);
        gridItem.classList.add('video-item');
      }

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      const caption = document.createElement('p');
      caption.innerText = item.caption;
      overlay.appendChild(caption);
      gridItem.appendChild(overlay);

      grid.appendChild(gridItem);
    });
  }

  // Update active link in the navigation
  function updateActiveLink(activePage) {
    document.querySelectorAll('.nav-links a, .logo, .mobile-nav-links a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-page') === activePage);
    });
  }

  // Event listeners for navigation links (desktop and mobile)
  document.querySelectorAll('.nav-links a, .logo, .mobile-nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('href').substring(1); // Get the page name from href
      loadPage(page);
      history.pushState({ page }, '', `#${page}`);
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    const page = e.state?.page || 'home';
    loadPage(page);
  });

  // Load default page (home) on initial load
  window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const page = hash || 'home';
    loadPage(page);
  });

  function initializeModal() {
    const modal = document.getElementById("full-screen-modal");
    const modalImg = document.getElementById("modal-img");
    const modalVideo = document.getElementById("modal-video");
    const captionText = document.getElementById("caption");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const closeBtn = document.querySelector(".close");

    const gridItems = document.querySelectorAll(".grid-item");
    const mediaItems = [];
    const captions = [];

    gridItems.forEach((item, index) => {
        const img = item.querySelector(".project-img");
        const video = item.querySelector("video");

        if (img) {
            mediaItems.push({ type: "image", src: img.src });
            captions.push(item.querySelector(".overlay p").innerText);
        } else if (video) {
            mediaItems.push({ type: "video", src: video.querySelector("source").src });
            captions.push(item.querySelector(".overlay p").innerText);
        }
    });

    let currentIndex = 0;
    let scale = 1; // Initial zoom scale
    const zoomLevels = [1, 1.5]; // Allowed zoom levels: 1x, 1.5x
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    let touchStartX, touchStartY, touchEndX, touchEndY;

    // Function to open modal at the user's current viewport position
    function openModal(index) {
        modal.style.display = "block";
        currentIndex = index;
        scale = 1; // Reset zoom scale
        translateX = 0; // Reset translate X
        translateY = 0; // Reset translate Y

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;

        modal.style.top = `${scrollTop}px`;
        modal.style.height = `${viewportHeight}px`;

        if (mediaItems[index].type === "image") {
            modalImg.src = mediaItems[index].src;
            modalImg.style.display = "block";
            modalVideo.style.display = "none";
            modalImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`; // Apply initial scale and translation
        } else {
            modalVideo.src = mediaItems[index].src;
            modalVideo.style.display = "block";
            modalImg.style.display = "none";
        }

        captionText.innerHTML = captions[index];
        document.body.style.overflow = 'hidden'; // Disable page scroll when modal is open
    }

    gridItems.forEach((item, index) => {
        const img = item.querySelector(".project-img");
        const video = item.querySelector("video");

        if (img) img.addEventListener("click", () => openModal(index));
        if (video) video.addEventListener("click", () => openModal(index));
    });

    leftArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        openModal(currentIndex);
    });

    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        openModal(currentIndex);
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        modalVideo.pause();
        document.body.style.overflow = 'auto'; // Enable page scroll when modal is closed
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modalVideo.pause();
            document.body.style.overflow = 'auto'; // Enable page scroll when modal is closed
        }
    });

    document.addEventListener("keydown", (event) => {
        if (modal.style.display === "block") {
            if (event.key === "Escape") {
                modal.style.display = "none";
                modalVideo.pause();
                document.body.style.overflow = 'auto'; // Enable page scroll when modal is closed
            } else if (event.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
                openModal(currentIndex);
            } else if (event.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % mediaItems.length;
                openModal(currentIndex);
            }
        }
    });

    modalImg.addEventListener("wheel", (event) => {
        if (mediaItems[currentIndex].type === "image") {
            event.preventDefault();

            const imageRect = modalImg.getBoundingClientRect();
            const offsetX = event.clientX - imageRect.left;
            const offsetY = event.clientY - imageRect.top;

            const zoomDirection = event.deltaY < 0 ? 1 : -1;
            const currentZoomIndex = zoomLevels.indexOf(scale);
            let newZoomIndex = currentZoomIndex + zoomDirection;

            if (newZoomIndex < 0) newZoomIndex = 0;
            if (newZoomIndex >= zoomLevels.length) newZoomIndex = zoomLevels.length - 1;

            scale = zoomLevels[newZoomIndex];

            const transformOriginX = (offsetX / modalImg.offsetWidth) * 100;
            const transformOriginY = (offsetY / modalImg.offsetHeight) * 100;

            modalImg.style.transition = "transform 0.3s ease";
            modalImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            modalImg.style.transformOrigin = `${transformOriginX}% ${transformOriginY}%`;
        }
    });

    // Drag functionality for zoomed-in images with persistent drag after mouse leave
    modalImg.addEventListener("mousedown", (event) => {
        if (scale > 1 && event.button === 0) {
            isDragging = true;
            startX = event.clientX - translateX;
            startY = event.clientY - translateY;
            modalImg.style.cursor = "grabbing";
        }
    });

    modalImg.addEventListener("mousemove", (event) => {
        if (isDragging) {
            event.preventDefault();
            translateX = event.clientX - startX;
            translateY = event.clientY - startY;
            modalImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    });

    modalImg.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            modalImg.style.cursor = "grab";
        }
    });

    modalImg.addEventListener("mouseleave", () => {
        if (isDragging) {
            isDragging = false;
            modalImg.style.cursor = "grab";
        }
    });

    modalImg.addEventListener("click", () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        modalImg.style.transition = "transform 0.3s ease";
        modalImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    });

    // Touch event handlers for mobile gestures
    modalImg.addEventListener("touchstart", (event) => {
        if (event.touches.length === 1) {
            // Single touch for swipe gestures
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        } else if (event.touches.length === 2) {
            // Pinch gesture for zoom
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            touchStartX = (touch1.clientX + touch2.clientX) / 2;
            touchStartY = (touch1.clientY + touch2.clientY) / 2;
            touchStartDistance = distance;
        }
    });

    modalImg.addEventListener("touchmove", (event) => {
        if (event.touches.length === 1 && scale === 1) {
            // Single touch for swipe gestures
            touchEndX = event.touches[0].clientX;
            touchEndY = event.touches[0].clientY;
        } else if (event.touches.length === 2) {
            // Pinch gesture for zoom
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            const scaleChange = distance / touchStartDistance;

            scale = Math.min(Math.max(1, scale * scaleChange), 2); // Limit zoom between 1x and 2x
            modalImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    });

    modalImg.addEventListener("touchend", (event) => {
        if (event.changedTouches.length === 1 && scale === 1) {
            // Single touch for swipe gestures
            touchEndX = event.changedTouches[0].clientX;
            touchEndY = event.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 50) {
                    // Swipe right (previous image)
                    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
                    openModal(currentIndex);
                } else if (deltaX < -50) {
                    // Swipe left (next image)
                    currentIndex = (currentIndex + 1) % mediaItems.length;
                    openModal(currentIndex);
                }
            }
        }
    });
}
});
