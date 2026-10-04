import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  Text,
} from "@react-three/drei";

/* =========================================================
   TRAIN ENGINE
========================================================= */

function TrainEngine() {
  return (
    <group position={[3.5, 1, 0]}>

      {/* Main engine body */}
      <mesh castShadow position={[0, 0.8, 0]}>
        <boxGeometry args={[3.8, 1.5, 2]} />

        <meshStandardMaterial
          color="#17212b"
          metalness={0.82}
          roughness={0.25}
        />
      </mesh>

      {/* Lower chassis */}
      <mesh castShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[4.1, 0.25, 2.15]} />

        <meshStandardMaterial
          color="#070b10"
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>

      {/* Front nose */}
      <mesh castShadow position={[2.1, 0.45, 0]}>
        <boxGeometry args={[0.7, 0.8, 1.8]} />

        <meshStandardMaterial
          color="#06313b"
          emissive="#00d9ff"
          emissiveIntensity={0.35}
          metalness={0.75}
          roughness={0.2}
        />
      </mesh>

      {/* Cabin */}
      <mesh castShadow position={[-0.8, 1.8, 0]}>
        <boxGeometry args={[1.7, 1.4, 1.8]} />

        <meshStandardMaterial
          color="#263545"
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>

      {/* Cabin front window */}
      <mesh position={[-0.8, 1.9, 0.92]}>
        <boxGeometry args={[0.72, 0.55, 0.05]} />

        <meshStandardMaterial
          color="#061018"
          emissive="#00a8c7"
          emissiveIntensity={0.75}
        />
      </mesh>

      {/* Cabin back window */}
      <mesh position={[-0.8, 1.9, -0.92]}>
        <boxGeometry args={[0.72, 0.55, 0.05]} />

        <meshStandardMaterial
          color="#061018"
          emissive="#008da8"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Main front light */}
      <mesh position={[2.48, 0.65, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={5}
        />
      </mesh>

      {/* Small cyan lights */}
      {[-0.55, 0.55].map((z) => (
        <mesh
          key={z}
          position={[2.48, 0.65, z]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />

          <meshStandardMaterial
            color="#00eaff"
            emissive="#00eaff"
            emissiveIntensity={3}
          />
        </mesh>
      ))}

      {/* Engine wheels */}
      {[-0.9, 0.8].map((x) =>
        [-1.05, 1.05].map((z) => (
          <mesh
            key={`${x}-${z}`}
            castShadow
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 0.05, z]}
          >
            <cylinderGeometry
              args={[0.48, 0.48, 0.25, 32]}
            />

            <meshStandardMaterial
              color="#090b0f"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))
      )}

      {/* Cyan engine strip */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[3.3, 0.07, 2.03]} />

        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* Rear coupler */}
      <mesh position={[-2.05, 0.55, 0]}>
        <boxGeometry args={[0.35, 0.28, 0.45]} />

        <meshStandardMaterial
          color="#080b0f"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   TRAIN COACH
========================================================= */

function TrainCoach({
  label,
  position,
  highlighted,
}) {
  return (
    <group position={position}>

      {/* =====================================================
          SEARCH GLOW - BACK LAYER
      ===================================================== */}

      {highlighted && (
        <mesh
          position={[0, 0.8, 0]}
          scale={[1.08, 1.08, 1.08]}
        >
          <boxGeometry args={[3.55, 1.75, 2.15]} />

          <meshStandardMaterial
            color="#00eaff"
            emissive="#00eaff"
            emissiveIntensity={1.4}
            transparent
            opacity={0.12}
          />
        </mesh>
      )}


      {/* =====================================================
          COACH BODY
      ===================================================== */}

      <mesh
        castShadow
        position={[0, 0.8, 0]}
      >
        <boxGeometry args={[3.4, 1.6, 2]} />

        <meshStandardMaterial
          color={
            highlighted
              ? "#075b6b"
              : "#162532"
          }

          emissive={
            highlighted
              ? "#00d9ff"
              : "#000000"
          }

          emissiveIntensity={
            highlighted
              ? 0.85
              : 0
          }

          metalness={0.78}
          roughness={0.25}
        />
      </mesh>


      {/* =====================================================
          LOWER CHASSIS
      ===================================================== */}

      <mesh
        castShadow
        position={[0, 0.08, 0]}
      >
        <boxGeometry args={[3.65, 0.3, 2.1]} />

        <meshStandardMaterial
          color="#070b10"
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>


      {/* =====================================================
          TOP LIGHT STRIP
      ===================================================== */}

      <mesh position={[0, 1.58, 0]}>
        <boxGeometry args={[3.2, 0.09, 2.02]} />

        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={
            highlighted ? 1.2 : 0.45
          }
        />
      </mesh>


      {/* =====================================================
          FRONT WINDOWS
      ===================================================== */}

      {[-1.05, -0.35, 0.35, 1.05].map((x) => (
        <mesh
          key={`front-${x}`}
          position={[x, 1.05, 1.01]}
        >
          <boxGeometry args={[0.48, 0.55, 0.04]} />

          <meshStandardMaterial
            color="#02080d"

            emissive={
              highlighted
                ? "#00f6ff"
                : "#007f99"
            }

            emissiveIntensity={
              highlighted
                ? 1.8
                : 0.4
            }
          />
        </mesh>
      ))}


      {/* =====================================================
          BACK WINDOWS
      ===================================================== */}

      {[-1.05, -0.35, 0.35, 1.05].map((x) => (
        <mesh
          key={`back-${x}`}
          position={[x, 1.05, -1.01]}
        >
          <boxGeometry args={[0.48, 0.55, 0.04]} />

          <meshStandardMaterial
            color="#02080d"

            emissive={
              highlighted
                ? "#00c8e8"
                : "#00677d"
            }

            emissiveIntensity={
              highlighted
                ? 1.2
                : 0.3
            }
          />
        </mesh>
      ))}


      {/* =====================================================
          COACH NUMBER PLATE
      ===================================================== */}

      <mesh
        position={[0, 0.55, 1.045]}
      >
        <boxGeometry
          args={[1.35, 0.43, 0.055]}
        />

        <meshStandardMaterial
          color={
            highlighted
              ? "#041a22"
              : "#061018"
          }

          emissive="#00d9ff"
          emissiveIntensity={
            highlighted ? 0.9 : 0.35
          }

          metalness={0.65}
          roughness={0.25}
        />
      </mesh>


      {/* =====================================================
          S1 / S2 LABEL
      ===================================================== */}

      <Text
        position={[0, 0.55, 1.085]}
        fontSize={0.24}
        maxWidth={1.15}
        color={
          highlighted
            ? "#ffffff"
            : "#00eaff"
        }
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        outlineWidth={
          highlighted ? 0.025 : 0.012
        }
        outlineColor="#00151c"
      >
        {label}
      </Text>


      {/* =====================================================
          ARRAY INDEX
      ===================================================== */}

      <Text
        position={[0, 0.23, 1.075]}
        fontSize={0.075}
        color={
          highlighted
            ? "#ff2bd6"
            : "#5e778a"
        }
        anchorX="center"
        anchorY="middle"
      >
        ARRAY COACH
      </Text>


      {/* =====================================================
          WHEELS
      ===================================================== */}

      {[-1.15, 1.15].map((x) =>
        [-1.05, 1.05].map((z) => (
          <mesh
            key={`${x}-${z}`}
            castShadow
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 0.05, z]}
          >
            <cylinderGeometry
              args={[0.4, 0.4, 0.24, 32]}
            />

            <meshStandardMaterial
              color="#080b0f"
              metalness={0.9}
              roughness={0.18}
            />
          </mesh>
        ))
      )}


      {/* =====================================================
          FRONT COUPLER
      ===================================================== */}

      <mesh position={[-1.85, 0.55, 0]}>
        <boxGeometry args={[0.32, 0.28, 0.42]} />

        <meshStandardMaterial
          color="#090d12"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>


      {/* =====================================================
          REAR COUPLER
      ===================================================== */}

      <mesh position={[1.85, 0.55, 0]}>
        <boxGeometry args={[0.32, 0.28, 0.42]} />

        <meshStandardMaterial
          color="#090d12"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>


      {/* =====================================================
          SEARCH OUTLINE
      ===================================================== */}

      {highlighted && (
        <>
          {/* Main outline */}
          <mesh
            position={[0, 0.8, 0]}
          >
            <boxGeometry
              args={[3.62, 1.76, 2.12]}
            />

            <meshBasicMaterial
              color="#00f6ff"
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Bottom glow */}
          <mesh
            position={[0, -0.13, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <torusGeometry
              args={[1.35, 0.035, 10, 48]}
            />

            <meshStandardMaterial
              color="#00f6ff"
              emissive="#00f6ff"
              emissiveIntensity={3}
            />
          </mesh>

          {/* FOUND label */}
          <Text
            position={[0, 2.55, 0]}
            fontSize={0.17}
            color="#00f6ff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.018}
            outlineColor="#00151c"
          >
            ✓ FOUND
          </Text>

          {/* Coach name above */}
          <Text
            position={[0, 2.83, 0]}
            fontSize={0.12}
            color="#ff2bd6"
            anchorX="center"
            anchorY="middle"
          >
            {label} DETECTED
          </Text>
        </>
      )}
    </group>
  );
}


/* =========================================================
   RAILWAY TRACK
========================================================= */

function RailwayTrack() {
  return (
    <group>

      {/* Left rail */}
      <mesh position={[0, 0, -1.15]}>
        <boxGeometry args={[40, 0.12, 0.12]} />

        <meshStandardMaterial
          color="#555b63"
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>

      {/* Right rail */}
      <mesh position={[0, 0, 1.15]}>
        <boxGeometry args={[40, 0.12, 0.12]} />

        <meshStandardMaterial
          color="#555b63"
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>

      {/* Sleepers */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -19 + i * 1.6,
            -0.08,
            0,
          ]}
        >
          <boxGeometry
            args={[0.35, 0.18, 3]}
          />

          <meshStandardMaterial
            color="#35251c"
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}


/* =========================================================
   STATION PLATFORM
========================================================= */

function StationPlatform() {
  return (
    <group>

      {/* Platform */}
      <mesh
        receiveShadow
        position={[0, -0.35, -3.2]}
      >
        <boxGeometry
          args={[40, 0.6, 3.5]}
        />

        <meshStandardMaterial
          color="#171d25"
          roughness={0.8}
          metalness={0.12}
        />
      </mesh>

      {/* Platform cyan edge */}
      <mesh
        position={[0, -0.02, -1.48]}
      >
        <boxGeometry
          args={[40, 0.06, 0.06]}
        />

        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   3D SCENE
========================================================= */

function Scene({
  coaches = [],
  searchIndex = -1,
}) {
  return (
    <>
      {/* Background */}
      <color
        attach="background"
        args={["#03070d"]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.55} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cyan key light */}
      <pointLight
        position={[2, 5, 3]}
        intensity={80}
        distance={20}
        color="#00eaff"
      />

      {/* Purple fill light */}
      <pointLight
        position={[-8, 4, -4]}
        intensity={35}
        distance={18}
        color="#713cff"
      />

      {/* Engine */}
      <TrainEngine />

      {/* Coaches */}
      {coaches.map((coach, index) => (
        <TrainCoach
          key={`${coach}-${index}`}
          label={coach}
          position={[
            0.5 - index * 3.55,
            1,
            0,
          ]}
          highlighted={
            searchIndex === index
          }
        />
      ))}

      {/* Railway */}
      <RailwayTrack />

      {/* Platform */}
      <StationPlatform />

      {/* Grid */}
      <Grid
        position={[0, -0.28, 0]}
        args={[45, 45]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#163342"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#00a9c0"
        fadeDistance={35}
        fadeStrength={1}
      />

      {/* Camera */}
      <OrbitControls
        enablePan={false}
        minDistance={7}
        maxDistance={25}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0.9, 0]}
      />
    </>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

function TrainScene({
  coaches = [],
  searchIndex = -1,
}) {
  return (
    <div className="train-scene">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [10, 6, 11],
          fov: 45,
        }}
      >
        <Scene
          coaches={coaches}
          searchIndex={searchIndex}
        />
      </Canvas>
    </div>
  );
}

export default TrainScene;