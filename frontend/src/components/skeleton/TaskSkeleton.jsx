import Skeleton from "@mui/material/Skeleton";
const TaskSkeleton = (props) => {
  const { loading } = props;

  return loading ? (
    <div className="skeleton_container">
      <Skeleton
        className="skeleton__search"
        variant="rectangular"
        width={290}
        height={30}
      />

      {[...new Array(5)].map((_, index) => {
        return (
          <Skeleton
            key={index}
            className="skeleton__taskrow"
            variant="rectangular"
            height={40}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default TaskSkeleton;
