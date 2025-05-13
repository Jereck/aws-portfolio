document.addEventListener("DOMContentLoaded", () => {
  // Fetch visitor count
  fetchVisitorCount()

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Add scroll animation for elements
  const animateOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  })

  // Observe elements to animate
  document.querySelectorAll(".project-item, .experience-item, .skill-category").forEach((item) => {
    observer.observe(item)
  })

  // Add active state to navigation based on scroll position
  const sections = document.querySelectorAll("section[id]")

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`nav a[href="#${sectionId}"]`).classList.add("active")
      } else {
        document.querySelector(`nav a[href="#${sectionId}"]`).classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavOnScroll)
})

function fetchVisitorCount() {
  var requestOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  }

  fetch("https://fg3foz4liqzdl4kl46jluesp440kwggh.lambda-url.us-east-1.on.aws/", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#count-value").innerHTML = data
    })
    .catch((error) => {
      console.log("Error: ", error)
      document.querySelector("#count-value").innerHTML = "unavailable"
    })
}
