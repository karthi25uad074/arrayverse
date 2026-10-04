import { useState } from "react";
import "./Practice.css";

import SpaceBackground from "../../shared/SpaceBackground/SpaceBackground";
import "../../shared/SpaceBackground/SpaceBackground.css";

import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

function Practice() {
  const [array, setArray] = useState([10, 20, 30, 40, 50]);

  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");

  const [operation, setOperation] = useState("INSERT");
  const [sortOrder, setSortOrder] = useState("ASCENDING");

  const [status, setStatus] = useState("READY");
  const [searchIndex, setSearchIndex] = useState(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState("");

  const [reasonCard, setReasonCard] = useState(null);

  /* =========================================================
     OPERATION SELECTION
     ========================================================= */

  const selectOperation = (selectedOperation) => {
    if (isAnimating) return;

    setOperation(selectedOperation);
    setStatus(`${selectedOperation} MODE`);

    setValue("");
    setIndex("");
    setSearchIndex(null);
  };

  /* =========================================================
     REASONING CARD
     ========================================================= */

  const showReasonCard = (data) => {
    setReasonCard(data);
  };

  const closeReasonCard = () => {
    setReasonCard(null);
  };

  /* =========================================================
     ANIMATION HELPER
     ========================================================= */

  const runAnimation = (type, callback, duration = 850) => {
    setIsAnimating(true);
    setAnimationType(type);

    setTimeout(() => {
      callback();

      setTimeout(() => {
        setAnimationType("");
        setIsAnimating(false);
      }, 150);
    }, duration);
  };

  /* =========================================================
     INSERT
     ========================================================= */

  const handleInsert = () => {
    const newValue = Number(value);
    const newIndex = Number(index);

    if (value === "" || index === "") {
      setStatus("ENTER VALUE & INDEX");
      return;
    }

    if (!Number.isInteger(newIndex)) {
      setStatus("INDEX MUST BE A NUMBER");
      return;
    }

    if (newIndex < 0 || newIndex > array.length) {
      setStatus("INVALID INDEX");
      return;
    }

    setStatus("INSERTING...");
    setSearchIndex(null);

    const oldArray = [...array];

    runAnimation(
      "insert",
      () => {
        const newArray = [...oldArray];
        newArray.splice(newIndex, 0, newValue);

        setArray(newArray);
        setValue("");
        setIndex("");
        setStatus("INSERT SUCCESS");

        showReasonCard({
          title: "INSERTION COMPLETE",
          operation: `Inserted ${newValue} at index ${newIndex}`,
          icon: "＋",
          accent: "cyan",
          reason:
            newIndex < oldArray.length
              ? `A new element was inserted at index ${newIndex}. To create space, the existing elements from index ${newIndex} onward had to shift one position to the right.`
              : `The new element was added at the end of the array, so no existing elements needed to shift.`,
          steps:
            newIndex < oldArray.length
              ? [
                  "Locate the target index.",
                  "Shift existing elements one position right.",
                  `Place ${newValue} into index ${newIndex}.`,
                  "Array size increases by 1.",
                ]
              : [
                  "Locate the end of the array.",
                  `Place ${newValue} after the last element.`,
                  "Array size increases by 1.",
                ],
        });
      },
      900
    );
  };

  /* =========================================================
     DELETE
     ========================================================= */

  const handleDelete = () => {
    const deleteIndex = Number(index);

    if (index === "") {
      setStatus("ENTER INDEX");
      return;
    }

    if (!Number.isInteger(deleteIndex)) {
      setStatus("INDEX MUST BE A NUMBER");
      return;
    }

    if (deleteIndex < 0 || deleteIndex >= array.length) {
      setStatus("INVALID INDEX");
      return;
    }

    const deletedValue = array[deleteIndex];

    setStatus("DELETING...");
    setSearchIndex(null);

    const oldArray = [...array];

    runAnimation(
      "delete",
      () => {
        const newArray = [...oldArray];
        newArray.splice(deleteIndex, 1);

        setArray(newArray);
        setIndex("");
        setStatus("DELETE SUCCESS");

        showReasonCard({
          title: "DELETION COMPLETE",
          operation: `Removed ${deletedValue} from index ${deleteIndex}`,
          icon: "−",
          accent: "red",
          reason:
            deleteIndex < oldArray.length - 1
              ? `Removing index ${deleteIndex} created an empty position. Every element after it shifted one position to the left to keep the array continuous.`
              : `The last element was removed, so no shifting was required.`,
          steps:
            deleteIndex < oldArray.length - 1
              ? [
                  `Locate index ${deleteIndex}.`,
                  `Remove value ${deletedValue}.`,
                  "Shift following elements one position left.",
                  "Array size decreases by 1.",
                ]
              : [
                  `Locate the last index.`,
                  `Remove value ${deletedValue}.`,
                  "No shifting is required.",
                  "Array size decreases by 1.",
                ],
        });
      },
      900
    );
  };

  /* =========================================================
     UPDATE
     ========================================================= */

  const handleUpdate = () => {
    const updateIndex = Number(index);
    const newValue = Number(value);

    if (value === "" || index === "") {
      setStatus("ENTER VALUE & INDEX");
      return;
    }

    if (!Number.isInteger(updateIndex)) {
      setStatus("INDEX MUST BE A NUMBER");
      return;
    }

    if (updateIndex < 0 || updateIndex >= array.length) {
      setStatus("INVALID INDEX");
      return;
    }

    const oldValue = array[updateIndex];

    setStatus("UPDATING...");
    setSearchIndex(null);

    const oldArray = [...array];

    runAnimation(
      "update",
      () => {
        const newArray = [...oldArray];
        newArray[updateIndex] = newValue;

        setArray(newArray);
        setValue("");
        setIndex("");
        setStatus("UPDATE SUCCESS");

        showReasonCard({
          title: "UPDATE COMPLETE",
          operation: `Changed index ${updateIndex}: ${oldValue} → ${newValue}`,
          icon: "↻",
          accent: "yellow",
          reason: `An update changes the value stored at an existing index. The position stays the same; only the data inside that position is replaced.`,
          steps: [
            `Access index ${updateIndex}.`,
            `Read the existing value ${oldValue}.`,
            `Replace it with ${newValue}.`,
            "Array size remains unchanged.",
          ],
        });
      },
      800
    );
  };

  /* =========================================================
     SEARCH
     ========================================================= */

  const handleSearch = () => {
    if (value === "") {
      setStatus("ENTER VALUE");
      return;
    }

    const searchValue = Number(value);
    const foundIndex = array.indexOf(searchValue);

    setStatus("SEARCHING...");
    setSearchIndex(null);

    setIsAnimating(true);
    setAnimationType("search");

    let currentIndex = 0;

    const searchTimer = setInterval(() => {
      setSearchIndex(currentIndex);

      if (currentIndex === foundIndex || currentIndex >= array.length - 1) {
        clearInterval(searchTimer);

        setTimeout(() => {
          setIsAnimating(false);
          setAnimationType("");

          if (foundIndex === -1) {
            setSearchIndex(null);
            setStatus("ELEMENT NOT FOUND");

            showReasonCard({
              title: "SEARCH COMPLETE",
              operation: `Value ${searchValue} was not found`,
              icon: "?",
              accent: "red",
              reason:
                "Linear search checks each element one by one from the beginning. Since no element matched the target value, the search ended without a result.",
              steps: [
                "Start from index 0.",
                "Compare each element with the target.",
                "Move to the next index when it does not match.",
                "Stop after checking the complete array.",
              ],
            });
          } else {
            setStatus(`FOUND AT INDEX ${foundIndex}`);

            showReasonCard({
              title: "SEARCH COMPLETE",
              operation: `Found ${searchValue} at index ${foundIndex}`,
              icon: "⌕",
              accent: "cyan",
              reason:
                "The search compared the target value with each element until it found a match. Once the value matched, its index was returned.",
              steps: [
                "Start from index 0.",
                `Compare each element with ${searchValue}.`,
                `Stop when a match is found.`,
                `Return index ${foundIndex}.`,
              ],
            });
          }
        }, 450);

        return;
      }

      currentIndex += 1;
    }, 420);
  };

  /* =========================================================
     SORT
     ========================================================= */

  const handleSort = () => {
    const oldArray = [...array];

    const sortedArray = [...array].sort((a, b) => {
      if (sortOrder === "ASCENDING") {
        return a - b;
      }

      return b - a;
    });

    setStatus(`${sortOrder} SORTING...`);
    setSearchIndex(null);

    runAnimation(
      "sort",
      () => {
        setArray(sortedArray);
        setStatus(`${sortOrder} SORT SUCCESS`);

        showReasonCard({
          title: "SORT COMPLETE",
          operation: `${sortOrder} order applied`,
          icon: sortOrder === "ASCENDING" ? "↑" : "↓",
          accent: "cyan",
          reason:
            sortOrder === "ASCENDING"
              ? "The array was rearranged so smaller values appear before larger values."
              : "The array was rearranged so larger values appear before smaller values.",
          steps:
            sortOrder === "ASCENDING"
              ? [
                  "Compare neighbouring values.",
                  "Move smaller values toward the beginning.",
                  "Repeat until the values are ordered.",
                  "Final result: smallest → largest.",
                ]
              : [
                  "Compare neighbouring values.",
                  "Move larger values toward the beginning.",
                  "Repeat until the values are ordered.",
                  "Final result: largest → smallest.",
                ],
          before: oldArray.join("  →  "),
          after: sortedArray.join("  →  "),
        });
      },
      1100
    );
  };

  /* =========================================================
     REVERSE
     ========================================================= */

  const handleReverse = () => {
    const oldArray = [...array];
    const reversedArray = [...array].reverse();

    setStatus("REVERSING...");
    setSearchIndex(null);

    runAnimation(
      "reverse",
      () => {
        setArray(reversedArray);
        setStatus("REVERSE SUCCESS");

        showReasonCard({
          title: "REVERSE COMPLETE",
          operation: "Array order reversed",
          icon: "⇄",
          accent: "yellow",
          reason:
            "Reversing an array changes the order of elements so the first element becomes the last and the last becomes the first.",
          steps: [
            "Take the first and last positions.",
            "Swap their values.",
            "Move inward toward the center.",
            "Continue until all positions are reversed.",
          ],
          before: oldArray.join("  →  "),
          after: reversedArray.join("  →  "),
        });
      },
      1100
    );
  };

  /* =========================================================
     EXECUTE
     ========================================================= */

  const handleExecute = () => {
    if (isAnimating) return;

    if (operation === "INSERT") {
      handleInsert();
      return;
    }

    if (operation === "DELETE") {
      handleDelete();
      return;
    }

    if (operation === "UPDATE") {
      handleUpdate();
      return;
    }

    if (operation === "SEARCH") {
      handleSearch();
      return;
    }

    if (operation === "SORT") {
      handleSort();
      return;
    }

    if (operation === "REVERSE") {
      handleReverse();
    }
  };

  /* =========================================================
     CONTROLS
     ========================================================= */

  const renderControls = () => {
    if (operation === "INSERT") {
      return (
        <>
          <div className="control-heading">
            <span>INSERT ELEMENT</span>
            <small>ADD VALUE TO ARRAY</small>
          </div>

          <div className="control-row">
            <div className="input-group">
              <label>VALUE</label>
              <input
                type="number"
                placeholder="Enter value"
                value={value}
                disabled={isAnimating}
                onChange={(event) => setValue(event.target.value)}
              />
            </div>

            <div className="input-group">
              <label>INDEX</label>
              <input
                type="number"
                placeholder="Enter index"
                value={index}
                disabled={isAnimating}
                onChange={(event) => setIndex(event.target.value)}
              />
            </div>

            <button
              className="execute-button"
              type="button"
              disabled={isAnimating}
              onClick={handleExecute}
            >
              {isAnimating ? "RUNNING..." : "EXECUTE →"}
            </button>
          </div>
        </>
      );
    }

    if (operation === "DELETE") {
      return (
        <>
          <div className="control-heading">
            <span>DELETE ELEMENT</span>
            <small>REMOVE ELEMENT FROM ARRAY</small>
          </div>

          <div className="control-row">
            <div className="input-group">
              <label>INDEX</label>
              <input
                type="number"
                placeholder="Enter index"
                value={index}
                disabled={isAnimating}
                onChange={(event) => setIndex(event.target.value)}
              />
            </div>

            <div></div>

            <button
              className="execute-button"
              type="button"
              disabled={isAnimating}
              onClick={handleExecute}
            >
              {isAnimating ? "RUNNING..." : "DELETE →"}
            </button>
          </div>
        </>
      );
    }

    if (operation === "UPDATE") {
      return (
        <>
          <div className="control-heading">
            <span>UPDATE ELEMENT</span>
            <small>REPLACE VALUE AT INDEX</small>
          </div>

          <div className="control-row">
            <div className="input-group">
              <label>INDEX</label>
              <input
                type="number"
                placeholder="Enter index"
                value={index}
                disabled={isAnimating}
                onChange={(event) => setIndex(event.target.value)}
              />
            </div>

            <div className="input-group">
              <label>NEW VALUE</label>
              <input
                type="number"
                placeholder="Enter value"
                value={value}
                disabled={isAnimating}
                onChange={(event) => setValue(event.target.value)}
              />
            </div>

            <button
              className="execute-button"
              type="button"
              disabled={isAnimating}
              onClick={handleExecute}
            >
              {isAnimating ? "RUNNING..." : "UPDATE →"}
            </button>
          </div>
        </>
      );
    }

    if (operation === "SEARCH") {
      return (
        <>
          <div className="control-heading">
            <span>SEARCH ELEMENT</span>
            <small>FIND VALUE IN ARRAY</small>
          </div>

          <div className="control-row">
            <div className="input-group">
              <label>VALUE</label>
              <input
                type="number"
                placeholder="Enter value"
                value={value}
                disabled={isAnimating}
                onChange={(event) => {
                  setValue(event.target.value);
                  setSearchIndex(null);
                }}
              />
            </div>

            <div></div>

            <button
              className="execute-button"
              type="button"
              disabled={isAnimating}
              onClick={handleExecute}
            >
              {isAnimating ? "SCANNING..." : "SEARCH →"}
            </button>
          </div>
        </>
      );
    }

    if (operation === "SORT") {
      return (
        <>
          <div className="control-heading">
            <span>SORT ARRAY</span>
            <small>ARRANGE ELEMENTS BY ORDER</small>
          </div>

          <div className="control-row">
            <div className="input-group">
              <label>SORT ORDER</label>

              <select
                value={sortOrder}
                disabled={isAnimating}
                onChange={(event) => {
                  setSortOrder(event.target.value);
                  setStatus(`${event.target.value} MODE`);
                }}
              >
                <option value="ASCENDING">ASCENDING ↑</option>
                <option value="DESCENDING">DESCENDING ↓</option>
              </select>
            </div>

            <div></div>

            <button
              className="execute-button"
              type="button"
              disabled={isAnimating}
              onClick={handleExecute}
            >
              {isAnimating ? "SORTING..." : "SORT →"}
            </button>
          </div>
        </>
      );
    }

    if (operation === "REVERSE") {
      return (
        <>
          <div className="control-heading">
            <span>REVERSE ARRAY</span>
            <small>REVERSE ELEMENT ORDER</small>
          </div>

          <div className="control-row">
            <div className="input-group">
              <label>ACTION</label>
              <input type="text" value="REVERSE" readOnly />
            </div>

            <div></div>

            <button
              className="execute-button"
              type="button"
              disabled={isAnimating}
              onClick={handleExecute}
            >
              {isAnimating ? "REVERSING..." : "REVERSE →"}
            </button>
          </div>
        </>
      );
    }

    return null;
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
      <SpaceBackground />

      <main className="practice-page">
        <Navbar />

        <section className="practice-header">
          <div className="practice-header-content">
            <span className="practice-tag">
              ARRAYVERSE // PRACTICE LAB
            </span>

            <h1>
              PRACTICE
              <span> WITHOUT LIMITS.</span>
            </h1>

            <p>
              Experiment with arrays, perform operations, and watch every
              change happen in real time.
            </p>
          </div>

          <div className="practice-status">
            <div className="status-dot"></div>
            <span>{isAnimating ? "OPERATION RUNNING" : "LAB ONLINE"}</span>
          </div>
        </section>

        <section className="practice-workspace">

          {/* OPERATION PANEL */}

          <div className="practice-panel">
            <div className="panel-label">
              SELECT OPERATION
            </div>

            <div className="operation-list">

              <button
                className={`operation-button ${
                  operation === "INSERT" ? "active" : ""
                }`}
                type="button"
                disabled={isAnimating}
                onClick={() => selectOperation("INSERT")}
              >
                <span className="operation-number">01</span>
                <span>INSERT</span>
              </button>

              <button
                className={`operation-button ${
                  operation === "DELETE" ? "active" : ""
                }`}
                type="button"
                disabled={isAnimating}
                onClick={() => selectOperation("DELETE")}
              >
                <span className="operation-number">02</span>
                <span>DELETE</span>
              </button>

              <button
                className={`operation-button ${
                  operation === "UPDATE" ? "active" : ""
                }`}
                type="button"
                disabled={isAnimating}
                onClick={() => selectOperation("UPDATE")}
              >
                <span className="operation-number">03</span>
                <span>UPDATE</span>
              </button>

              <button
                className={`operation-button ${
                  operation === "SEARCH" ? "active" : ""
                }`}
                type="button"
                disabled={isAnimating}
                onClick={() => selectOperation("SEARCH")}
              >
                <span className="operation-number">04</span>
                <span>SEARCH</span>
              </button>

              <button
                className={`operation-button ${
                  operation === "SORT" ? "active" : ""
                }`}
                type="button"
                disabled={isAnimating}
                onClick={() => selectOperation("SORT")}
              >
                <span className="operation-number">05</span>
                <span>SORT</span>
              </button>

              <button
                className={`operation-button ${
                  operation === "REVERSE" ? "active" : ""
                }`}
                type="button"
                disabled={isAnimating}
                onClick={() => selectOperation("REVERSE")}
              >
                <span className="operation-number">06</span>
                <span>REVERSE</span>
              </button>

            </div>
          </div>

          {/* ARRAY AREA */}

          <div className="array-practice-area">

            <div className="array-area-top">
              <div>
                <span className="array-label">LIVE ARRAY</span>
                <h2>ARRAY STATE</h2>
              </div>

              <span className="array-mode">
                {operation} MODE
              </span>
            </div>

            <div
              className={`practice-array animation-${animationType}`}
            >
              {array.length === 0 ? (
                <div className="empty-array">
                  ARRAY IS EMPTY
                </div>
              ) : (
                array.map((item, arrayIndex) => (
                  <div
                    className={`array-cell ${
                      searchIndex === arrayIndex
                        ? "search-highlight"
                        : ""
                    }`}
                    key={`${arrayIndex}-${item}`}
                    style={{
                      "--cell-delay": `${arrayIndex * 90}ms`,
                    }}
                  >
                    <span className="cell-index">
                      IDX {arrayIndex}
                    </span>

                    <span className="cell-value">
                      {item}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="array-info">

              <div className="info-item">
                <span>SIZE</span>
                <strong>{array.length}</strong>
              </div>

              <div className="info-item">
                <span>INDEX RANGE</span>

                <strong>
                  {array.length === 0
                    ? "—"
                    : `0 — ${array.length - 1}`}
                </strong>
              </div>

              <div className="info-item">
                <span>STATUS</span>
                <strong>{status}</strong>
              </div>

            </div>

            <div className="practice-controls">
              {renderControls()}
            </div>

          </div>
        </section>

        {/* PRACTICE TIP */}

        <section className="practice-tip">
          <div className="tip-icon">◆</div>

          <div>
            <span>PRACTICE TIP</span>

            <p>
              Try different operations and observe how the array changes.
              Understanding the visual movement makes array operations
              easier to remember.
            </p>
          </div>
        </section>

        <Footer />

        {/* =====================================================
            LOGIC REASONING POPUP
            ===================================================== */}

        {reasonCard && (
          <div
            className="reason-overlay"
            onClick={closeReasonCard}
          >
            <div
              className={`reason-card reason-${reasonCard.accent}`}
              onClick={(event) => event.stopPropagation()}
            >

              <button
                className="reason-close"
                type="button"
                onClick={closeReasonCard}
              >
                ×
              </button>

              <div className="reason-card-top">

                <div className="reason-icon">
                  {reasonCard.icon}
                </div>

                <div>
                  <span className="reason-kicker">
                    ARRAYVERSE // OPERATION LOG
                  </span>

                  <h3>{reasonCard.title}</h3>
                </div>

              </div>

              <div className="reason-operation">
                {reasonCard.operation}
              </div>

              <div className="reason-divider"></div>

              <div className="reason-section">

                <span className="reason-label">
                  WHY DID THIS HAPPEN?
                </span>

                <p>{reasonCard.reason}</p>

              </div>

              <div className="reason-section">

                <span className="reason-label">
                  LOGIC TRACE
                </span>

                <div className="reason-steps">
                  {reasonCard.steps.map((step, stepIndex) => (
                    <div
                      className="reason-step"
                      key={stepIndex}
                    >
                      <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

              </div>

              {reasonCard.before && reasonCard.after && (
                <div className="reason-result">

                  <div>
                    <small>BEFORE</small>
                    <strong>{reasonCard.before}</strong>
                  </div>

                  <span className="result-arrow">→</span>

                  <div>
                    <small>AFTER</small>
                    <strong>{reasonCard.after}</strong>
                  </div>

                </div>
              )}

              <button
                className="reason-continue"
                type="button"
                onClick={closeReasonCard}
              >
                UNDERSTOOD →
              </button>

            </div>
          </div>
        )}

      </main>
    </>
  );
}

export default Practice;