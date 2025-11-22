const COURSE_DATA = {
    mechanics: {
        title: "Classical Mechanics",
        description: "Master motion, forces, momentum, and energy.",
        content: "Lecture notes, videos, assignments, PYQs.",
    },
    em: {
        title: "Electricity & Magnetism",
        description: "Explore electric fields, magnetic forces, circuits, and waves.",
        content: "Simulations, notes, interactive problems.",
    },
    quantum: {
        title: "Quantum Physics",
        description: "Study wave functions, probability, and atomic structure.",
        content: "Advanced lectures, animations, solved examples.",
    }
};

const content = document.getElementById("content");

function loadPage(page, callback = null) {
    fetch(`pages/${page}.html`)
        .then(res => res.text())
        .then(data => {
            content.innerHTML = data;
            window.scrollTo(0, 0);

            if (callback) callback();
        })
        .catch(err => {
            content.innerHTML = "<h2 style='padding:40px;'>Page not found</h2>";
        });
}


// router
function router() {
    let hash = window.location.hash.replace("#", "");

    // Detect if route has parameters
    if (hash.includes("?")) {
        const [route, params] = hash.split("?");
        const query = new URLSearchParams(params);

        if (route === "course-details") {
            loadPage("course-details", () => {
                const courseKey = query.get("course");
                updateCourseDetails(courseKey);
            });
            return;
        }

        loadPage(route);
        return;
    }

    if (!hash || hash === "home") {
        loadPage("home");
    } else {
        loadPage(hash);
    }
}
function updateCourseDetails(courseKey) {
    const data = COURSE_DATA[courseKey];

    if (!data) return; // if course not found

    document.querySelector(".course-title").textContent = data.title;
    document.querySelector(".course-subtitle").textContent = data.description;

    const materialSection = document.querySelector(".uploaded-material");
    if (materialSection) {
        materialSection.textContent = data.content;
    }
}



// run router whenever hash changes
window.addEventListener("hashchange", router);

// initial load
router();
document.querySelectorAll('a[href="#home"]').forEach(btn => {
    btn.addEventListener("click", () => {
        setTimeout(() => window.scrollTo(0, 0), 0);
    });
});
