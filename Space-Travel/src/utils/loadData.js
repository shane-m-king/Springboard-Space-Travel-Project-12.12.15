import SpaceTravelApi from "../services/SpaceTravelApi";

const loadSpacecrafts = async (setSpacecrafts, setLoading) => {
  if (setLoading) setLoading(true);
  try {
    const { data, isError } = await SpaceTravelApi.getSpacecrafts();
    if (!isError && data) setSpacecrafts(data);
  } catch (err) {
    console.error("Could not retrieve spacecrafts:", err);
  } finally {
    if (setLoading) setLoading(false);
  }
};

const loadPlanets = async (setPlanets, setLoading) => {
  if (setLoading) setLoading(true);
  try {
    const { data, isError } = await SpaceTravelApi.getPlanets();
    if (!isError && data) setPlanets(data);
  } catch (err) {
    console.error("Could not retrieve planets:", err);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export { loadSpacecrafts, loadPlanets };
