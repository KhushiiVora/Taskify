import Skeleton from "@mui/material/Skeleton";

const TaskCategorySkeleton = (props) => {
  const { loading } = props;
  return loading ? (
    <div className="task_category_skeleton">
      <Skeleton
        className="skeleton__progress"
        variant="rectangular"
        height={20}
      />
      <Skeleton
        className="skeleton__search"
        variant="rectangular"
        width={330}
        height={25}
      />
      <div className="skeleton__cards">
        {[...new Array(6)].map((_, index) => {
          return (
            <div className="skeleton__cards--card">
              <Skeleton className="text" width={200} />
              <Skeleton className="text" width={150} />
              <Skeleton className="text" width={100} />
              <Skeleton
                className="skeleton__progress"
                variant="rectangular"
                height={20}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default TaskCategorySkeleton;
