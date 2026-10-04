import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Text,
} from "@react-three/drei";

/* =========================================================
   MUSIC DISC
========================================================= */

function MusicDisc({ position, active }) {
  return (
    <group position={position}>
      <Float
        speed={active ? 3 : 1.5}
        rotationIntensity={active ? 0.45 : 0.12}
        floatIntensity={active ? 0.7 : 0.2}
      >
        {/* Main disc */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[1.05, 1.05, 0.12, 48]} />

          <meshStandardMaterial
            color={active ? "#00d9ff" : "#172638"}
            metalness={0.8}
            roughness={0.28}
            emissive={active ? "#00d9ff" : "#07121e"}
            emissiveIntensity={active ? 0.75 : 0.12}
          />
        </mesh>

        {/* Outer ring */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.075, 0]}
        >
          <torusGeometry args={[0.82, 0.025, 10, 48]} />

          <meshStandardMaterial
            color={active ? "#ff2bd6" : "#31506b"}
            emissive={active ? "#ff2bd6" : "#07111d"}
            emissiveIntensity={active ? 1.1 : 0.12}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Inner ring */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.08, 0]}
        >
          <torusGeometry args={[0.52, 0.018, 8, 40]} />

          <meshStandardMaterial
            color={active ? "#00f6ff" : "#28465d"}
            emissive={active ? "#00f6ff" : "#06131d"}
            emissiveIntensity={active ? 0.8 : 0.1}
          />
        </mesh>

        {/* Center hub */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.16, 24]} />

          <meshStandardMaterial
            color={active ? "#ff2bd6" : "#263b55"}
            emissive={active ? "#ff2bd6" : "#000000"}
            emissiveIntensity={active ? 1.1 : 0}
            metalness={0.75}
            roughness={0.2}
          />
        </mesh>

        {/* Center hole */}
        <mesh position={[0, 0.19, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.04, 20]} />

          <meshStandardMaterial
            color="#02050a"
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>
      </Float>

      {/* Active glow */}
      {active && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.04, 0]}
        >
          <torusGeometry args={[1.28, 0.025, 10, 56]} />

          <meshStandardMaterial
            color="#00f6ff"
            emissive="#00f6ff"
            emissiveIntensity={2.5}
          />
        </mesh>
      )}
    </group>
  );
}

/* =========================================================
   STUDIO FLOOR
========================================================= */

function StudioFloor() {
  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.65, 0]}
        receiveShadow
      >
        <planeGeometry args={[28, 20]} />

        <meshStandardMaterial
          color="#030811"
          metalness={0.55}
          roughness={0.5}
        />
      </mesh>

      {/* Cyan line */}
      <mesh position={[0, -0.61, -2.8]}>
        <boxGeometry args={[24, 0.035, 0.035]} />

        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* Pink line */}
      <mesh position={[0, -0.61, 2.8]}>
        <boxGeometry args={[24, 0.035, 0.035]} />

        <meshStandardMaterial
          color="#ff2bd6"
          emissive="#ff2bd6"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   MUSIC CONSOLE
========================================================= */

function StudioConsole() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Main console */}
      <mesh
        castShadow
        receiveShadow
      >
        <boxGeometry args={[11, 0.35, 3.4]} />

        <meshStandardMaterial
          color="#081522"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Upper panel */}
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[10.2, 0.14, 2.7]} />

        <meshStandardMaterial
          color="#0d2030"
          metalness={0.55}
          roughness={0.28}
          emissive="#001722"
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* Cyan edge */}
      <mesh position={[0, 0.34, 1.34]}>
        <boxGeometry args={[10.2, 0.04, 0.04]} />

        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Pink edge */}
      <mesh position={[0, 0.34, -1.34]}>
        <boxGeometry args={[10.2, 0.04, 0.04]} />

        <meshStandardMaterial
          color="#ff2bd6"
          emissive="#ff2bd6"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* Console title */}
      <Text
        position={[0, 0.37, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="#00d9ff"
        anchorX="center"
        anchorY="middle"
      >
        ARRAYVERSE MUSIC CORE
      </Text>
    </group>
  );
}

/* =========================================================
   EMPTY PLAYLIST
========================================================= */

function EmptyPlaylist() {
  return (
    <group position={[0, 1.8, 0]}>
      <Float
        speed={2}
        rotationIntensity={0.15}
        floatIntensity={0.35}
      >
        {/* Outer hologram */}
        <mesh>
          <sphereGeometry args={[0.55, 24, 24]} />

          <meshStandardMaterial
            color="#07131f"
            emissive="#00d9ff"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.25}
            wireframe
          />
        </mesh>

        {/* Inner hologram */}
        <mesh>
          <sphereGeometry args={[0.26, 20, 20]} />

          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.2}
          />
        </mesh>

        <Text
          position={[0, -0.95, 0]}
          fontSize={0.27}
          color="#71869c"
          anchorX="center"
          anchorY="middle"
        >
          PLAYLIST EMPTY
        </Text>
      </Float>
    </group>
  );
}

/* =========================================================
   MUSIC SCENE
========================================================= */

function MusicWorld({
  songs = [],
  searchIndex = -1,
}) {
  return (
    <>
      {/* Background */}
      <color
        attach="background"
        args={["#02050a"]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.55} />

      <directionalLight
        position={[5, 9, 6]}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      <pointLight
        position={[-6, 4, 3]}
        intensity={30}
        distance={16}
        color="#00d9ff"
      />

      <pointLight
        position={[6, 4, -3]}
        intensity={26}
        distance={16}
        color="#ff2bd6"
      />

      <pointLight
        position={[0, 3, -7]}
        intensity={22}
        distance={14}
        color="#714cff"
      />

      {/* Environment */}
      <StudioFloor />
      <StudioConsole />

      {/* Empty state */}
      {songs.length === 0 && <EmptyPlaylist />}

      {/* Music array */}
      {songs.map((song, index) => {
        const total = songs.length;

        const spacing = 2.65;

        const x =
          (index - (total - 1) / 2) * spacing;

        const active =
          index === searchIndex;

        return (
          <group
            key={`${song}-${index}`}
            position={[0, 0, 0]}
          >
            {/* Disc */}
            <MusicDisc
              position={[x, 1.45, 0]}
              active={active}
            />

            {/* Index */}
            <Text
              position={[x, 0.56, 0]}
              fontSize={0.14}
              color={
                active
                  ? "#ff2bd6"
                  : "#71869c"
              }
              anchorX="center"
              anchorY="middle"
            >
              INDEX {index}
            </Text>

            {/* Song title */}
            <Text
              position={[x, 0.22, 0]}
              fontSize={0.17}
              maxWidth={2.15}
              color={
                active
                  ? "#00f6ff"
                  : "#dce8f5"
              }
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              outlineWidth={
                active ? 0.012 : 0
              }
              outlineColor="#00151c"
            >
              {song}
            </Text>

            {/* Active label */}
            {active && (
              <Text
                position={[x, 2.85, 0]}
                fontSize={0.13}
                color="#00f6ff"
                anchorX="center"
                anchorY="middle"
              >
                NOW SCANNING
              </Text>
            )}
          </group>
        );
      })}

      {/* Camera */}
      <OrbitControls
        enablePan={false}
        minDistance={7}
        maxDistance={18}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0.8, 0]}
      />
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function MusicScene({
  songs = [],
  searchIndex = -1,
}) {
  return (
    <div
      className="music-scene"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "520px",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 5.8, 11.5],
          fov: 48,
        }}
      >
        <MusicWorld
          songs={songs}
          searchIndex={searchIndex}
        />
      </Canvas>
    </div>
  );
}

export default MusicScene;