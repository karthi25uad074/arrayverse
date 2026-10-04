import { useState } from "react";
import "./Learn.css";

import Navbar from "../../shared/Navbar/Navbar";
import "../../shared/Navbar/Navbar.css";

import SpaceBackground from "../../shared/SpaceBackground/SpaceBackground";
import "../../shared/SpaceBackground/SpaceBackground.css";

import ConceptCard from "./components/ConceptCard";
import LessonViewer from "./components/LessonViewer";


function Learn() {

  const [selectedLesson, setSelectedLesson] = useState(null);


  /* =========================================
     LESSON COMPLETION STATUS
     ========================================= */

  const completedLessons = Array.from(
    { length: 12 },
    (_, index) =>
      localStorage.getItem(`lesson${index + 1}Completed`) === "true"
  );


  /* =========================================
     FIND NEXT UNLOCKED LESSON
     ========================================= */

  const firstIncompleteIndex = completedLessons.findIndex(
    (completed) => !completed
  );

  const nextLessonNumber =
    firstIncompleteIndex === -1
      ? null
      : firstIncompleteIndex + 1;


  const allLessonsCompleted =
    completedLessons.every(Boolean);


  /* =========================================
     LESSON DATA
     ========================================= */

  const concepts = [

    {
      number: "01",
      title: "ARRAY BASICS",
      description:
        "Understand what an array is and why it is used.",
      explanation:
        "An array is a collection of elements stored under one common name. Each element can be accessed using its index.",
    },

    {
      number: "02",
      title: "CREATION",
      description:
        "Learn how arrays are created and initialized.",
      explanation:
        "Array creation defines the structure and size of the collection before values are stored inside it.",
    },

    {
      number: "03",
      title: "INDEX & POSITION",
      description:
        "Explore indexes, positions and direct element access.",
      explanation:
        "An index identifies the position of an element. In most programming languages, array indexing starts from zero.",
    },

    {
      number: "04",
      title: "MEMORY",
      description:
        "Visualize how array elements occupy memory.",
      explanation:
        "Array elements are stored in an organized memory structure, allowing direct access to individual elements.",
    },

    {
      number: "05",
      title: "TRAVERSAL",
      description:
        "Move through every element using traversal techniques.",
      explanation:
        "Traversal means visiting array elements one by one, usually with a loop.",
    },

    {
      number: "06",
      title: "INSERTION",
      description:
        "Learn how new elements are inserted into an array.",
      explanation:
        "Insertion adds a new value at a selected position. Existing elements may need to shift to create space.",
    },

    {
      number: "07",
      title: "DELETION",
      description:
        "Understand how elements are removed and shifted.",
      explanation:
        "Deletion removes an element from a selected position and remaining elements may shift to fill the gap.",
    },

    {
      number: "08",
      title: "UPDATION",
      description:
        "Change existing array values using their indexes.",
      explanation:
        "Updating an array means replacing the value stored at a particular index.",
    },

    {
      number: "09",
      title: "SEARCHING",
      description:
        "Find elements using linear and efficient search methods.",
      explanation:
        "Searching is the process of locating a required value inside an array.",
    },

    {
      number: "10",
      title: "SORTING",
      description:
        "Arrange array elements using sorting algorithms.",
      explanation:
        "Sorting rearranges array elements into a particular order, such as ascending or descending order.",
    },

    {
      number: "11",
      title: "2D ARRAYS",
      description:
        "Explore rows, columns and multidimensional arrays.",
      explanation:
        "A two-dimensional array organizes data using rows and columns, similar to a table.",
    },

    {
      number: "12",
      title: "APPLICATIONS",
      description:
        "Discover how arrays are used in real programs.",
      explanation:
        "Arrays are widely used for storing and processing collections of related data in software applications.",
    },

  ];


  /* =========================================
     APPLY PROGRESSION STATUS
     ========================================= */

  const updatedConcepts = concepts.map((concept) => {

    const lessonNumber = Number(concept.number);

    const completed =
      completedLessons[lessonNumber - 1];

    const isNext =
      !completed &&
      lessonNumber === nextLessonNumber;

    return {
      ...concept,

      status: completed
        ? "COMPLETED"
        : isNext
        ? "START HERE"
        : "NEXT",

      active:
        completed || isNext,

      recommended:
        isNext,
    };

  });


  /* =========================================
     RECOMMENDED LESSON
     ========================================= */

  const recommendedLesson =
    updatedConcepts.find(
      (concept) => concept.recommended
    );


  /* =========================================
     OPEN LESSON
     ========================================= */

  const openLesson = (concept) => {

    const lessonNumber =
      Number(concept.number);

    const canOpen =
      completedLessons[lessonNumber - 1] ||
      lessonNumber === nextLessonNumber;

    if (!canOpen) return;

    setSelectedLesson(concept);
  };


  /* =========================================
     PAGE
     ========================================= */

  return (
    <>

      <SpaceBackground />

      <Navbar />


      <main className="learn-page">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="learn-header">

          <span>
            01 / KNOWLEDGE SYSTEM
          </span>

          <h1>
            ENTER THE
            <strong> ARRAY LAB</strong>
          </h1>

          <p>
            Learn arrays from the fundamentals to advanced operations.
            <br />
            Complete each lesson to unlock the next stage.
          </p>

        </div>


        {/* =====================================
            RECOMMENDED LESSON
        ===================================== */}

        <section className="recommended-lesson">

          <div className="recommend-signal">
            <span></span>
            RECOMMENDED NEXT
          </div>


          <div className="recommend-content">

            <div>

              <small>
                {allLessonsCompleted
                  ? "ARRAYVERSE COMPLETE"
                  : `LESSON ${recommendedLesson?.number}`}
              </small>


              <h2>

                {allLessonsCompleted
                  ? "YOU ARE AN"
                  : "START WITH"}

                <strong>

                  {allLessonsCompleted
                    ? " ARRAY MASTER"
                    : ` ${recommendedLesson?.title}`}

                </strong>

              </h2>


              <p>

                {allLessonsCompleted
                  ? "You have completed all 12 core Arrayverse lessons. Continue your journey through Practice, Challenges and Playground."
                  : recommendedLesson?.description}

              </p>

            </div>


            {!allLessonsCompleted && recommendedLesson && (

              <button
                onClick={() =>
                  openLesson(recommendedLesson)
                }
                className="recommend-button"
                type="button"
              >
                START LESSON →
              </button>

            )}

          </div>

        </section>


        {/* =====================================
            CONCEPT SECTION
        ===================================== */}

        <section className="concept-section">


          <div className="concept-section-top">

            <div>

              <span>
                LEARNING SECTORS
              </span>

              <h2>
                ARRAY <strong>PROTOCOL</strong>
              </h2>

            </div>


            <div className="concept-count">

              <strong>
                12
              </strong>

              <span>
                LESSONS
              </span>

            </div>

          </div>


          {/* =====================================
              LESSON CARDS
          ===================================== */}

          <div className="concept-grid">

            {updatedConcepts.map((concept) => {

              const lessonNumber =
                Number(concept.number);

              const canOpen =
                completedLessons[lessonNumber - 1] ||
                lessonNumber === nextLessonNumber;


              return (

                <div
                  key={concept.number}

                  className={
                    concept.recommended
                      ? "recommended-card"
                      : ""
                  }

                  onClick={() =>
                    openLesson(concept)
                  }

                  style={{
                    cursor: canOpen
                      ? "pointer"
                      : "default",
                  }}
                >

                  <ConceptCard

                    number={concept.number}

                    title={concept.title}

                    description={
                      concept.description
                    }

                    status={
                      concept.status
                    }

                    active={
                      concept.active
                    }

                  />

                </div>

              );

            })}

          </div>

        </section>

      </main>


      {/* =====================================
          LESSON POPUP
      ===================================== */}

      <LessonViewer

        lesson={selectedLesson}

        onClose={() =>
          setSelectedLesson(null)
        }

      />

    </>
  );
}


export default Learn;