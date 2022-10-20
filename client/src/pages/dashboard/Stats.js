import { useEffect } from "react";
import { ChartsContainer, Loading, StatsContainer } from "../../components";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const {
    page,
    activitySearchName,
    activitySort,
    activityCategories,
    clearActivity,
    isLoading,
    getEvents,
    getActivities,
  } = useAppContext();

  useEffect(() => {
    getEvents();
    clearActivity();
    //eslint-disabled-next-line
  }, []);

  useEffect(() => {
    getActivities({ pagination: false });
    //eslint-disabled-next-line
  }, [page, activitySearchName, activitySort, activityCategories]);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {/* {monthlyApplications.length > 0 && <ChartsContainer />} */}
    </>
  );
};

export default Stats;
