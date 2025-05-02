// components/common/Skeleton.tsx
const Skeleton = ({ height = 200 }) => (
  <div
    className="bg-light rounded w-100"
    style={{
      height,
      animation: "pulse 1.5s infinite",
    }}
  ></div>
);

export default Skeleton;
