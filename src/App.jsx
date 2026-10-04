import Home from "./pages/Home/Home";
import Learn from "./pages/Learn/Learn";
import Lesson from "./pages/Lesson/Lesson";
import Practice from "./pages/Practice/Practice";
import Challenges from "./pages/Challenges/Challenges";
import Level01 from "./pages/Challenges/Level01";
import Level02 from "./pages/Challenges/Level02";
import Level03 from "./pages/Challenges/Level03";
import Level04 from "./pages/Challenges/Level04";
import Level05 from "./pages/Challenges/Level05";
import Level06 from "./pages/Challenges/Level06";
import Level07 from "./pages/Challenges/Level07";
import Level08 from "./pages/Challenges/Level08";
import Playground from "./pages/Playground/Playground";
function App() {
  const path = window.location.pathname;

  if (path === "/learn") {
    return <Learn />;
  }

  if (path.startsWith("/lesson/")) {
    return <Lesson />;
  }

  if (path === "/practice") {
    return <Practice />;
  }

  if (path === "/challenges/level-01") {
    return <Level01 />;
  }

  if (path === "/challenges/level-02") {
  return <Level02 />;
}

if (path === "/challenges/level-03") {
  return <Level03 />;
}
if (path === "/challenges/level-04") {
  return <Level04 />;
}
  if (path === "/challenges/level-05") {
    return <Level05 />;
  }
  if (path === "/challenges/level-06") {
  return <Level06 />;
}
if (path === "/challenges/level-07") {
  return <Level07 />;
}
if (path === "/challenges/level-08") {
  return <Level08 />;
}
  if (path === "/challenges") {
    return <Challenges />;
  }
  if (path === "/playground") {
  return <Playground />;
}

  return <Home />;
}

export default App;