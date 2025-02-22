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

  // Add animation to experience timeline
  const experienceItems = document.querySelectorAll(".experience-item")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    { threshold: 0.5 },
  )

  experienceItems.forEach((item) => {
    observer.observe(item)
  })
})

function fetchVisitorCount() {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": true,
    }
  }
  fetch("https://2p6490wb85.execute-api.us-east-1.amazonaws.com/Dev", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const visitorCount = data
      document.querySelector("#visitor-count").innerHTML = `Visitors: ${visitorCount}`
    })
    .catch((error) => {
      console.log("Error: ", error)
      document.querySelector("#visitor-count").innerHTML = "Visitor count unavailable"
    })
}

